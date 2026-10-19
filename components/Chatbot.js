"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { chatbotApi } from "@/src/helper/chatbot_api";
import { X, RotateCcw, Send, Sparkles, ShieldCheck, Mail, ArrowLeft, RefreshCw } from "lucide-react";

const FOLLOWUP_OPTIONS = [
  { type: "followup", id: "more_q", label: "Another question" },
  { type: "followup", id: "diff_cat", label: "Different category" },
  { type: "followup", id: "check_solved", label: "Is your query solved?" },
  { type: "followup", id: "support", label: "Talk to support" },
];

const FOLLOWUP_OPTIONS_SHORT = [
  { type: "followup", id: "more_q", label: "Another question" },
  { type: "followup", id: "diff_cat", label: "Different category" },
];

const normalizeRole = (r) => {
  if (!r) return "student";
  const lower = r.toLowerCase();
  if (lower === "tutor") return "teacher";
  if (lower === "teacher" || lower === "parent" || lower === "student") return lower;
  return "student";
};

const Chatbot = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [authStage, setAuthStage] = useState("loading"); // loading, lead_form, authenticated
  const [userEmail, setUserEmail] = useState("");
  const [userType, setUserType] = useState("student");
  const [conversationId, setConversationId] = useState(null);
  
  const [messages, setMessages] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const [lastQueryData, setLastQueryData] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [leadData, setLeadData] = useState({ name: "", email: "", number: "", role: "student" });
  
  // OTP Verification States
  const [leadStep, setLeadStep] = useState("form"); // "form" | "otp"
  const [otpCode, setOtpCode] = useState("");
  const [otpTimer, setOtpTimer] = useState(0);
  const [otpSuccessMsg, setOtpSuccessMsg] = useState("");
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, authStage, leadStep]);

  // Countdown timer for OTP resend
  useEffect(() => {
    let interval = null;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  const getEffectiveEmail = () => {
    return (
      userEmail ||
      session?.user?.email ||
      (typeof window !== "undefined" ? localStorage.getItem("chatbot_guest_email") : "") ||
      ""
    );
  };

  const getEffectiveRole = () => {
    if (userType) return userType;
    if (session?.user?.role) return normalizeRole(session.user.role);
    if (typeof window !== "undefined") {
      const r = localStorage.getItem("chatbot_guest_role");
      if (r) return normalizeRole(r);
    }
    return "student";
  };

  // Handle auth initialization immediately so status badge can reflect state
  useEffect(() => {
    if (session?.user?.email) {
      const email = session.user.email;
      const isTeacher =
        session?.user?.role === "teacher" ||
        session?.user?.role === "tutor" ||
        (typeof window !== "undefined" &&
          window.location.pathname.toLowerCase().includes("teacherdashboard"));
      const cleanRole = isTeacher ? "teacher" : normalizeRole(session?.user?.role);
      setUserEmail(email);
      setUserType(cleanRole);
      setAuthStage("authenticated");
      return;
    }
    
    // Check for guest in localStorage
    const guestEmail = typeof window !== "undefined" ? localStorage.getItem("chatbot_guest_email") : null;
    if (guestEmail) {
      const guestRole = normalizeRole(localStorage.getItem("chatbot_guest_role"));
      setUserEmail(guestEmail);
      setUserType(guestRole);
      setAuthStage("authenticated");
      return;
    }
    
    setAuthStage("lead_form");
  }, [session]);

  // Step 1: Send OTP to guest email
  const handleSendOtp = async (e) => {
    if (e) e.preventDefault();
    if (!leadData.name.trim() || !leadData.email.trim() || !leadData.number.trim()) {
      setErrorMsg("Please fill in all details before continuing.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(leadData.email.trim())) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");
    setOtpSuccessMsg("");

    try {
      await chatbotApi.sendOtp(leadData.email.trim());
      setLeadStep("otp");
      setOtpTimer(60);
      setOtpSuccessMsg(`A 6-digit OTP has been sent to ${leadData.email.trim()}`);
    } catch (err) {
      console.error("OTP send error:", err);
      setErrorMsg(err.message || "Failed to send verification code. Please check your email.");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 1.5: Resend OTP
  const handleResendOtp = async () => {
    if (otpTimer > 0 || isLoading) return;
    setIsLoading(true);
    setErrorMsg("");
    try {
      await chatbotApi.sendOtp(leadData.email.trim());
      setOtpTimer(60);
      setOtpSuccessMsg(`New OTP sent to ${leadData.email.trim()}`);
    } catch (err) {
      console.error("OTP resend error:", err);
      setErrorMsg(err.message || "Failed to resend OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify OTP and save lead
  const handleVerifyOtp = async (e) => {
    if (e) e.preventDefault();
    const cleanOtp = otpCode.trim();
    if (cleanOtp.length < 6) {
      setErrorMsg("Please enter the complete 6-digit verification code.");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");

    try {
      // 1. Verify OTP with backend
      await chatbotApi.verifyOtp(leadData.email.trim(), cleanOtp);

      // 2. Post lead details
      let cleanRole = normalizeRole(leadData.role);
      const leadPayload = {
        name: leadData.name.trim(),
        email: leadData.email.trim(),
        number: leadData.number.trim(),
        role: cleanRole,
      };

      try {
        await chatbotApi.postLead(leadPayload);
      } catch (leadErr) {
        console.warn("Lead registration notice:", leadErr.message);
        if (leadErr.message && leadErr.message.includes("already exists as")) {
          const match = leadErr.message.match(/already exists as (\w+)/i);
          if (match && match[1]) {
            cleanRole = normalizeRole(match[1]);
          }
        }
      }

      // 3. Authenticate guest in localStorage & state
      const cleanEmail = leadData.email.trim();
      localStorage.setItem("chatbot_guest_email", cleanEmail);
      localStorage.setItem("chatbot_guest_role", cleanRole);
      setUserEmail(cleanEmail);
      setUserType(cleanRole);
      setAuthStage("authenticated");
      initChat(cleanEmail, cleanRole);
    } catch (err) {
      console.error("OTP verification error:", err);
      setErrorMsg(err.message || "Invalid or expired OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Load history and start conversation once authenticated
  useEffect(() => {
    if (authStage === "authenticated" && isOpen && !conversationId) {
      initChat();
    }
  }, [authStage, isOpen, userEmail]);

  const initChat = async (overrideEmail = null, overrideRole = null) => {
    const email = overrideEmail || getEffectiveEmail();
    const role = overrideRole || getEffectiveRole();
    if (!email) return;

    setIsLoading(true);
    setErrorMsg("");
    try {
      const activeRes = await chatbotApi.checkActiveConversation(email);
      if (activeRes && activeRes.active && activeRes.conversation_id) {
        setConversationId(activeRes.conversation_id);
        setMessages([
          {
            role: "assistant",
            content: "Welcome back! Would you like to continue our previous conversation or start fresh?",
            options: [
              { type: "conversation_choice", id: "continue", label: "Continue chat" },
              { type: "conversation_choice", id: "new", label: "Start new chat" }
            ]
          }
        ]);
        setIsLoading(false);
        return;
      }
      
      await startFreshConversation(false, email, role);
    } catch (err) {
      console.warn("checkActiveConversation notice:", err);
      try {
        await startFreshConversation(false, email, role);
      } catch (fallbackErr) {
        console.error("Failed to start initial conversation:", fallbackErr);
        setErrorMsg(fallbackErr.message || "Failed to start chat.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const startFreshConversation = async (continueExisting, overrideEmail = null, overrideRole = null) => {
    const email = overrideEmail || getEffectiveEmail();
    const role = overrideRole || getEffectiveRole();
    if (!email) return null;

    try {
      const sessionData = await chatbotApi.startConversation(email, role, continueExisting);
      const convId = sessionData?.conversation_id;
      if (convId) {
        setConversationId(convId);
      }
      
      let formattedHistory = [];
      if (continueExisting && convId) {
        try {
          const hist = await chatbotApi.getConversationHistory(email, convId);
          if (hist && hist.history && hist.history.length > 0) {
            hist.history.forEach(item => {
              if (item.question) {
                formattedHistory.push({ role: "user", content: item.question });
              }
              if (item.answer) {
                formattedHistory.push({ role: "assistant", content: item.answer });
              }
            });
          }
        } catch (histErr) {
          console.warn("Could not retrieve conversation history:", histErr);
        }
      }

      const rootOptions = await chatbotApi.getOptions(role, []);
      formattedHistory.push({
        role: "assistant",
        content: continueExisting && formattedHistory.length > 0
          ? "Here is our previous chat history. What would you like to explore next?"
          : "Hello! How can I help you today? Please choose a topic below:",
        pathContext: [],
        options: Array.isArray(rootOptions) ? rootOptions : (rootOptions?.value || [])
      });
      
      setMessages(formattedHistory);
      return convId;
    } catch (err) {
      console.error("startFreshConversation error:", err);
      throw err;
    }
  };

  const toggleChat = () => setIsOpen(!isOpen);

  const handleEscalateSubmit = async (text, msgIdx) => {
    if (!text.trim()) return;
    const email = getEffectiveEmail();
    const role = getEffectiveRole();

    setMessages(prev => prev.map((m, i) => i === msgIdx ? { ...m, isEscalateInput: false } : m));
    setMessages(prev => [...prev, { role: "user", content: text }]);
    setIsLoading(true);
    
    try {
      let activeConvId = conversationId;
      if (!activeConvId && email) {
        try {
          const sess = await chatbotApi.startConversation(email, role, false);
          activeConvId = sess?.conversation_id;
          if (activeConvId) setConversationId(activeConvId);
        } catch(e) {}
      }

      let ticketData = null;
      if (activeConvId && email) {
        try {
          ticketData = await chatbotApi.createTicket({
            conversation_id: activeConvId,
            email: email,
            name: session?.user?.name || leadData?.name || "",
            role: role,
            question: text,
            category: lastQueryData?.path?.[0] || "General Support",
            subcategory: lastQueryData?.path?.[1] || "",
            subsubcategory: lastQueryData?.path?.[2] || "",
            source: "unresolved_textbox"
          });
        } catch (ticketErr) {
          console.warn("Ticket creation note:", ticketErr);
        }
      }
      
      const categoryEncoded = encodeURIComponent(lastQueryData?.path?.[0] || "Support");
      const waUrl = ticketData?.ticket_id 
        ? `https://wa.me/918769600449?text=Hello,%20my%20ticket%20ID%20is%20${ticketData.ticket_id}%20regarding%20${categoryEncoded}:%20${encodeURIComponent(text)}`
        : `https://wa.me/918769600449?text=Hello,%20I%20have%20a%20query%20regarding%20${categoryEncoded}:%20${encodeURIComponent(text)}`;
      
      setMessages(prev => [...prev, {
        role: "assistant",
        content: ticketData?.ticket_id
          ? `Your ticket **#${ticketData.ticket_id}** has been registered! Our support team will assist you shortly. You can also chat with us directly on WhatsApp:`
          : "Thank you! Our support team has received your query and will connect with you shortly. You can also chat with us directly on WhatsApp:",
        whatsappUrl: waUrl
      }]);
      
      if (activeConvId && email) {
        try {
          await chatbotApi.logConversation({
            conversation_id: activeConvId,
            email: email,
            name: session?.user?.name || leadData?.name || "",
            role: role,
            category: lastQueryData?.path?.[0] || "",
            subcategory: lastQueryData?.path?.[1] || "",
            subsubcategory: lastQueryData?.path?.[2] || "",
            question: text,
            answer: "Support ticket registered",
            source: "unresolved_textbox"
          });
        } catch(e) {}
      }
    } catch(err) {
      console.error("Ticket Error:", err);
    } finally {
      setIsLoading(false);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "",
        options: FOLLOWUP_OPTIONS_SHORT
      }]);
    }
  };

  const ROOT_GROUPS = [
    "Getting Started",
    "Tutors & Booking",
    "Learning Resources",
    "Progress and Account",
    "Payments and Support",
  ];

  const handleOptionClick = async (option, msgPathContext = null) => {
    setIsLoading(true);
    
    // Add user's choice to UI
    setMessages(prev => [...prev, { role: "user", content: option.label }]);
    
    try {
      const email = getEffectiveEmail();
      const role = getEffectiveRole();

      if (option.type === "conversation_choice") {
        await startFreshConversation(option.id === "continue", email, role);
      } else if (option.type === "group") {
        let newPath = [];
        if (ROOT_GROUPS.includes(option.id)) {
          // Top-level category clicked: always reset path to start fresh with this group
          newPath = [option.id];
        } else {
          const basePath = Array.isArray(msgPathContext)
            ? msgPathContext
            : currentPath;
          
          if (basePath.includes(option.id)) {
            const idx = basePath.indexOf(option.id);
            newPath = basePath.slice(0, idx + 1);
          } else {
            newPath = [...basePath, option.id];
          }
        }

        setCurrentPath(newPath);
        const nextOptions = await chatbotApi.getOptions(role, newPath);
        
        setMessages(prev => [...prev, {
          role: "assistant", 
          content: "",
          pathContext: newPath,
          options: Array.isArray(nextOptions) ? nextOptions : (nextOptions?.value || [])
        }]);
      } else if (option.type === "question") {
        const queryPath = Array.isArray(msgPathContext) ? msgPathContext : currentPath;
        const answerData = await chatbotApi.getAnswer(role, queryPath, option.id);
        const answerText = answerData.answer || "";
        
        // Immediately render answer AND "Was your query solved?" prompt
        setMessages(prev => [
          ...prev,
          { role: "assistant", content: answerText },
          {
            role: "assistant",
            content: "Was your query solved?",
            pathContext: queryPath,
            options: [
              { type: "resolved", id: "yes", label: "Yes, solved ✅" },
              { type: "resolved", id: "no", label: "No, not solved ❌" },
              { type: "followup", id: "more_q", label: "Another question" },
              { type: "followup", id: "diff_cat", label: "Different category" },
              { type: "followup", id: "support", label: "Talk to support 💬" }
            ]
          }
        ]);
        
        setLastQueryData({ path: queryPath, question: option.id });
        setIsLoading(false); // Stop typing indicator immediately so prompt and answer are immediately usable!

        // Asynchronously ensure session & log to database without blocking UI
        (async () => {
          try {
            let activeConvId = conversationId;
            if (!activeConvId && email) {
              const sess = await chatbotApi.startConversation(email, role, false);
              activeConvId = sess?.conversation_id;
              if (activeConvId) setConversationId(activeConvId);
            }

            if (activeConvId && email) {
              await chatbotApi.logConversation({
                conversation_id: activeConvId,
                email: email,
                name: session?.user?.name || leadData?.name || "",
                role: role,
                category: queryPath[0] || "",
                subcategory: queryPath[1] || "",
                subsubcategory: queryPath[2] || "",
                question: option.id,
                answer: answerText,
                source: "options_menu"
              });
            }
          } catch (logErr) {
            console.error("Failed to log conversation:", logErr);
          }
        })();
        return; // Return early since setIsLoading(false) has already been called
      } else if (option.type === "followup") {
        if (option.id === "more_q") {
          const queryPath = Array.isArray(msgPathContext) ? msgPathContext : currentPath;
          const nodes = await chatbotApi.getOptions(role, queryPath);
          setMessages(prev => [...prev, {
            role: "assistant",
            content: "",
            pathContext: queryPath,
            options: Array.isArray(nodes) ? nodes : (nodes?.value || [])
          }]);
        } else if (option.id === "diff_cat") {
          setCurrentPath([]);
          const nodes = await chatbotApi.getOptions(role, []);
          setMessages(prev => [...prev, {
            role: "assistant",
            content: "",
            pathContext: [],
            options: Array.isArray(nodes) ? nodes : (nodes?.value || [])
          }]);
        } else if (option.id === "check_solved") {
          setMessages(prev => [...prev, {
            role: "assistant",
            content: "Was your query solved?",
            pathContext: currentPath,
            options: [
              { type: "resolved", id: "yes", label: "Yes, solved ✅" },
              { type: "resolved", id: "no", label: "No, not solved ❌" }
            ]
          }]);
        } else if (option.id === "support") {
          let activeConvId = conversationId;
          if (!activeConvId && email) {
            try {
              const sess = await chatbotApi.startConversation(email, role, false);
              activeConvId = sess?.conversation_id;
              if (activeConvId) setConversationId(activeConvId);
            } catch(e) {}
          }

          let waUrl = `https://wa.me/918769600449`;
          let ticketId = null;
          if (activeConvId && email) {
            try {
              const ticketData = await chatbotApi.createTicket({
                conversation_id: activeConvId,
                email: email,
                name: session?.user?.name || leadData?.name || "",
                role: role,
                question: lastQueryData?.question || "Talk to support request",
                category: lastQueryData?.path?.[0] || "General Support",
                subcategory: lastQueryData?.path?.[1] || "",
                subsubcategory: lastQueryData?.path?.[2] || "",
                source: "talk_to_support_button"
              });
              if (ticketData?.ticket_id) {
                ticketId = ticketData.ticket_id;
                const categoryEncoded = encodeURIComponent(lastQueryData?.path?.[0] || "Support");
                waUrl = `https://wa.me/918769600449?text=Hello,%20my%20ticket%20ID%20is%20${ticketData.ticket_id}%20regarding%20${categoryEncoded}.`;
              }
            } catch(err) {
              console.warn("Support ticket notice:", err);
            }
          }
          
          setMessages(prev => [...prev, {
            role: "assistant",
            content: ticketId 
              ? `Support Ticket **#${ticketId}** has been created. Connect directly with our team on WhatsApp:`
              : "Our support team is ready to assist you on WhatsApp:",
            whatsappUrl: waUrl,
            options: FOLLOWUP_OPTIONS_SHORT
          }]);
        }
      } else if (option.type === "resolved") {
        let activeConvId = conversationId;
        if (!activeConvId && email) {
          try {
            const sess = await chatbotApi.startConversation(email, role, false);
            activeConvId = sess?.conversation_id;
            if (activeConvId) setConversationId(activeConvId);
          } catch(e) {}
        }

        if (option.id === "yes") {
          if (activeConvId) {
            chatbotApi.resolveConversation(activeConvId, "yes").catch(e => console.warn(e));
          }
          setMessages(prev => [...prev, {
            role: "assistant",
            content: "Glad we could help! 😊 Feel free to explore other topics or ask another question.",
            pathContext: [],
            options: [
              { type: "followup", id: "more_q", label: "Another question" },
              { type: "followup", id: "diff_cat", label: "Different category" },
              { type: "followup", id: "support", label: "Talk to support 💬" }
            ]
          }]);
        } else {
          // option.id === "no"
          if (activeConvId) {
            chatbotApi.resolveConversation(activeConvId, "no").catch(e => console.warn(e));
          }

          let ticketId = null;
          let waUrl = "https://wa.me/918769600449";
          if (activeConvId && email) {
            try {
              const ticketData = await chatbotApi.createTicket({
                conversation_id: activeConvId,
                email: email,
                name: session?.user?.name || leadData?.name || "",
                role: role,
                question: lastQueryData?.question || "Unresolved Query",
                category: lastQueryData?.path?.[0] || "General Support",
                subcategory: lastQueryData?.path?.[1] || "",
                subsubcategory: lastQueryData?.path?.[2] || "",
                source: "unresolved_textbox"
              });
              if (ticketData?.ticket_id) {
                ticketId = ticketData.ticket_id;
                const catEncoded = encodeURIComponent(lastQueryData?.path?.[0] || "Support");
                waUrl = `https://wa.me/918769600449?text=Hello,%20my%20ticket%20ID%20is%20${ticketId}%20regarding%20${catEncoded}.%20My%20query%20was%20not%20solved.`;
              }
            } catch (tErr) {
              console.warn("Failed to create ticket on 'no':", tErr);
            }
          }

          setMessages(prev => [...prev, {
            role: "assistant",
            content: ticketId
              ? `We apologize that your query was not resolved. A support ticket **#${ticketId}** has been created for you.\n\nYou can chat directly with our team on WhatsApp or describe your issue below:`
              : "We apologize that your query was not resolved. You can chat directly with our support team on WhatsApp or describe your issue below:",
            whatsappUrl: waUrl,
            isEscalateInput: true
          }]);
        }
      }
    } catch (err) {
      console.error("Chatbot Error:", err);
      try {
        const rootOptions = await chatbotApi.getOptions(userType, []);
        setCurrentPath([]);
        setMessages(prev => [
          ...prev,
          {
            role: "assistant",
            content: "I couldn't find subcategories for that selection. Let's explore from the topics below:",
            pathContext: [],
            options: Array.isArray(rootOptions) ? rootOptions : (rootOptions?.value || [])
          }
        ]);
      } catch (fallbackErr) {
        setMessages(prev => [
          ...prev,
          {
            role: "assistant",
            content: "Something went wrong. Please click the reset icon at the top to restart the chat.",
            pathContext: []
          }
        ]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes scaleInGlow {
          0% { transform: scale(0.6); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes subtleGlow {
          0% { filter: drop-shadow(0 4px 6px rgba(234, 88, 12, 0.25)); }
          50% { filter: drop-shadow(0 6px 14px rgba(234, 88, 12, 0.55)); }
          100% { filter: drop-shadow(0 4px 6px rgba(234, 88, 12, 0.25)); }
        }
        @keyframes tooltipPulse {
          0%, 15% { opacity: 0; transform: translateY(-50%) translateX(10px) scale(0.95); }
          25%, 75% { opacity: 1; transform: translateY(-50%) translateX(0) scale(1); }
          85%, 100% { opacity: 0; transform: translateY(-50%) translateX(-10px) scale(0.95); }
        }
        .animate-chatbot-entrance {
          animation: scaleInGlow 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards, subtleGlow 3s infinite alternate ease-in-out 0.4s;
        }
        .animate-tooltip {
          animation: tooltipPulse 3.5s infinite ease-in-out;
        }
        .chatbot-scroll-area {
          overflow-x: hidden !important;
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 transparent;
        }
        .chatbot-scroll-area::-webkit-scrollbar {
          width: 4px;
        }
        .chatbot-scroll-area::-webkit-scrollbar-track {
          background: transparent;
        }
        .chatbot-scroll-area::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 9999px;
        }
        .chatbot-scroll-area::-webkit-scrollbar-thumb:hover {
          background-color: #f97316;
        }
      `}</style>

      {/* Floating Chat Container */}
      <div className="fixed bottom-6 right-4 sm:bottom-8 sm:right-6 z-[9999] flex flex-col items-end pointer-events-none">
        {isOpen && (
          <div className="bg-white w-[calc(100vw-2rem)] sm:w-[380px] rounded-3xl shadow-2xl border border-gray-200/90 mb-3 flex flex-col overflow-hidden transition-all duration-300 h-[calc(100vh-6.5rem)] max-h-[36rem] sm:max-h-[38rem] pointer-events-auto ring-1 ring-black/5">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 text-white p-3.5 sm:p-4 flex justify-between items-center shadow-md shrink-0">
              <div className="flex items-center space-x-3 min-w-0">
                <div className="w-10 h-10 relative rounded-full overflow-hidden bg-white/20 p-1 flex items-center justify-center shrink-0 border border-white/20 shadow-sm">
                  <Image
                    src="/chatbot-robot.png"
                    alt="Chatbot Icon"
                    fill
                    sizes="40px"
                    className="object-cover rounded-full"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-sm sm:text-base tracking-wide leading-tight truncate">
                    Learnosphere AI
                  </h3>
                  <div className="flex items-center gap-1.5 text-[11px] text-orange-100 opacity-90 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
                    <span className="truncate">
                      {authStage === "authenticated" ? "Instant Doubt Assistant" : "Connecting..."}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                {authStage === "authenticated" && (
                  <button
                    onClick={() => initChat()}
                    className="p-1.5 hover:bg-white/20 rounded-xl text-white/90 hover:text-white transition-colors"
                    title="Restart Conversation"
                    aria-label="Restart Conversation"
                  >
                    <RotateCcw size={16} />
                  </button>
                )}
                <button
                  onClick={toggleChat}
                  className="p-1.5 hover:bg-white/20 rounded-xl text-white/90 hover:text-white transition-colors"
                  aria-label="Close chat"
                >
                  <X size={19} />
                </button>
              </div>
            </div>
            
            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden bg-gradient-to-b from-orange-50/20 via-white to-gray-50/40 flex flex-col relative chatbot-scroll-area">
              {/* Stage: Loading */}
              {authStage === "loading" && (
                 <div className="flex items-center justify-center h-full">
                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
                 </div>
              )}

              {/* Stage: Lead Form (Two-step with OTP verification) */}
              {authStage === "lead_form" && (
                <div className="p-5 sm:p-6 flex flex-col h-full bg-white relative overflow-y-auto overflow-x-hidden chatbot-scroll-area">
                  {leadStep === "form" ? (
                    <>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                          <Sparkles size={16} />
                        </div>
                        <h4 className="text-gray-800 font-bold text-base">Welcome!</h4>
                      </div>
                      <p className="text-gray-500 text-xs mb-3.5">
                        Please provide your details. We'll send a quick verification code to your email.
                      </p>

                      {errorMsg && (
                        <p className="text-red-600 text-xs mb-3 p-2.5 bg-red-50 rounded-xl border border-red-200">
                          {errorMsg}
                        </p>
                      )}

                      <form onSubmit={handleSendOtp} className="space-y-3 flex flex-col flex-1">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">Name</label>
                          <input
                            type="text"
                            required
                            value={leadData.name}
                            onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                            className="w-full border border-gray-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                            placeholder="Your Full Name"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
                          <input
                            type="email"
                            required
                            value={leadData.email}
                            onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                            className="w-full border border-gray-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                            placeholder="your.email@example.com"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number</label>
                          <input
                            type="tel"
                            required
                            value={leadData.number}
                            onChange={(e) => setLeadData({ ...leadData, number: e.target.value })}
                            className="w-full border border-gray-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                            placeholder="Your Mobile Number"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">I am a</label>
                          <select
                            required
                            value={leadData.role}
                            onChange={(e) => setLeadData({ ...leadData, role: e.target.value })}
                            className="w-full border border-gray-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-gray-800 bg-white transition-all"
                          >
                            <option value="student">Student</option>
                            <option value="teacher">Tutor / Teacher</option>
                            <option value="parent">Parent</option>
                          </select>
                        </div>
                        <div className="mt-auto pt-3">
                          <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl py-2.5 text-xs sm:text-sm font-bold transition-all disabled:opacity-50 flex items-center justify-center shadow-md active:scale-[0.98]"
                          >
                            {isLoading ? (
                              <div className="flex items-center gap-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                <span>Sending OTP...</span>
                              </div>
                            ) : (
                              "Send Verification Code →"
                            )}
                          </button>
                        </div>
                      </form>
                    </>
                  ) : (
                    /* Step 2: OTP Verification */
                    <>
                      <div className="flex items-center justify-between mb-2">
                        <button
                          type="button"
                          onClick={() => {
                            setLeadStep("form");
                            setErrorMsg("");
                          }}
                          className="flex items-center gap-1 text-xs font-semibold text-orange-600 hover:text-orange-700 transition-colors"
                        >
                          <ArrowLeft size={14} /> Edit Details
                        </button>
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Step 2 of 2</span>
                      </div>

                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                          <ShieldCheck size={18} />
                        </div>
                        <h4 className="text-gray-800 font-bold text-base">Verify Your Email</h4>
                      </div>

                      <p className="text-gray-500 text-xs mb-3 leading-relaxed">
                        We sent a 6-digit code to <strong className="text-gray-700">{leadData.email}</strong>.
                      </p>

                      {otpSuccessMsg && (
                        <p className="text-emerald-700 text-xs mb-3 p-2.5 bg-emerald-50 rounded-xl border border-emerald-200">
                          {otpSuccessMsg}
                        </p>
                      )}

                      {errorMsg && (
                        <p className="text-red-600 text-xs mb-3 p-2.5 bg-red-50 rounded-xl border border-red-200">
                          {errorMsg}
                        </p>
                      )}

                      <form onSubmit={handleVerifyOtp} className="space-y-4 flex flex-col flex-1">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                            Enter 6-Digit OTP Code
                          </label>
                          <input
                            type="text"
                            inputMode="numeric"
                            autoComplete="one-time-code"
                            maxLength={6}
                            required
                            autoFocus
                            value={otpCode}
                            onChange={(e) => {
                              const val = e.target.value.replace(/\D/g, "");
                              setOtpCode(val);
                            }}
                            className="w-full border-2 border-orange-200 focus:border-orange-500 rounded-xl px-4 py-3 text-center text-xl sm:text-2xl font-black tracking-[0.4em] text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 bg-orange-50/20 transition-all placeholder:text-gray-300 placeholder:tracking-[0.2em]"
                            placeholder="••••••"
                          />
                        </div>

                        {/* Resend OTP Row */}
                        <div className="flex items-center justify-between text-xs pt-1">
                          <span className="text-gray-500">Didn't receive code?</span>
                          {otpTimer > 0 ? (
                            <span className="text-gray-400 font-medium">Resend in {otpTimer}s</span>
                          ) : (
                            <button
                              type="button"
                              onClick={handleResendOtp}
                              disabled={isLoading}
                              className="text-orange-600 font-bold hover:text-orange-700 hover:underline flex items-center gap-1"
                            >
                              <RefreshCw size={12} className={isLoading ? "animate-spin" : ""} /> Resend OTP
                            </button>
                          )}
                        </div>

                        <div className="mt-auto pt-4">
                          <button
                            type="submit"
                            disabled={isLoading || otpCode.length < 6}
                            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl py-2.5 text-xs sm:text-sm font-bold transition-all disabled:opacity-50 flex items-center justify-center shadow-md active:scale-[0.98]"
                          >
                            {isLoading ? (
                              <div className="flex items-center gap-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                <span>Verifying...</span>
                              </div>
                            ) : (
                              "Verify & Start Chatting"
                            )}
                          </button>
                        </div>
                      </form>
                    </>
                  )}
                </div>
              )}

              {/* Stage: Authenticated Chat */}
              {authStage === "authenticated" && (
                <div className="p-3.5 sm:p-4 flex flex-col space-y-3.5 w-full max-w-full overflow-hidden pb-4">
                  {messages.length === 0 && !isLoading && (
                    <div className="text-center py-10 px-4">
                      <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-500 mx-auto mb-2 flex items-center justify-center shadow-sm">
                        <Sparkles size={20} />
                      </div>
                      <p className="font-bold text-gray-700 text-sm">Hi! How can I assist you?</p>
                      <p className="text-gray-400 text-xs mt-1">Select an option below to get instant answers.</p>
                    </div>
                  )}
                  
                  {messages.map((msg, idx) => (
                    <div key={idx} className="flex flex-col space-y-1.5 w-full min-w-0 max-w-full">
                      {/* Message Bubble */}
                      <div className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        {(msg.content || msg.whatsappUrl) && (
                          <div
                            className={`max-w-[85%] sm:max-w-[82%] p-3 sm:p-3.5 rounded-2xl text-[13px] sm:text-[13.5px] leading-relaxed shadow-sm break-words [overflow-wrap:anywhere] [word-break:break-word] select-text ${
                              msg.role === "user"
                                ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-tr-none shadow-orange-500/10"
                                : "bg-white text-gray-800 border border-gray-100 rounded-tl-none shadow-slate-100"
                            }`}
                          >
                            {msg.content && (
                              <div className="break-words [overflow-wrap:anywhere] [word-break:break-word] whitespace-pre-wrap">
                                {msg.content}
                              </div>
                            )}

                            {msg.whatsappUrl && (
                              <div className={msg.content ? "mt-2.5" : ""}>
                                <a 
                                  href={msg.whatsappUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5a] text-white text-xs px-3.5 py-2 rounded-xl transition-all font-bold shadow-sm active:scale-95 break-words max-w-full"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 16 16" className="shrink-0">
                                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c-.003 1.396.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c.003-3.625 2.952-6.574 6.577-6.574 1.757.002 3.409.686 4.653 1.93 1.243 1.243 1.926 2.894 1.928 4.651-.004 3.625-2.953 6.574-6.577 6.574zm3.608-4.928c-.198-.099-1.17-.578-1.352-.644-.182-.066-.315-.099-.448.099-.133.198-.513.644-.628.777-.116.133-.232.149-.43.05-.198-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.102-1.373-.116-.198-.012-.305.087-.403.09-.089.198-.23.298-.346.099-.116.132-.198.198-.33.065-.132.033-.248-.016-.347-.05-.099-.448-1.08-.613-1.48-.16-.389-.323-.336-.448-.342-.116-.005-.248-.005-.38-.005s-.348.05-.53.248c-.182.198-.71.694-.71 1.692s.728 1.964.828 2.097c.1.132 1.43 2.181 3.464 3.058.484.208.862.332 1.157.425.485.154.927.132 1.275.08.39-.059 1.17-.478 1.334-.94.164-.462.164-.858.116-.94-.05-.082-.182-.132-.38-.231z"/>
                                  </svg>
                                  <span>Talk on WhatsApp</span>
                                </a>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Actionable Option Buttons */}
                      {msg.options && msg.options.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-1 w-full max-w-full">
                          {msg.options.map((opt, i) => (
                            <button
                              key={opt.id || i}
                              onClick={() => handleOptionClick(opt, msg.pathContext)}
                              disabled={isLoading}
                              className="bg-white text-orange-700 hover:bg-orange-500 hover:text-white text-xs px-3 py-1.5 rounded-xl border border-orange-200/90 hover:border-orange-500 transition-all disabled:opacity-50 text-left shadow-sm font-semibold active:scale-[0.98] break-words [overflow-wrap:anywhere] max-w-full"
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Escalate Text Input Form */}
                      {msg.isEscalateInput && (
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleEscalateSubmit(e.target.elements.escalateText.value, idx);
                          }}
                          className="mt-2 flex items-center gap-2 w-full max-w-full"
                        >
                          <input
                            name="escalateText"
                            type="text"
                            className="flex-1 min-w-0 border border-gray-200 bg-white rounded-xl px-3.5 py-2 text-xs sm:text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-gray-800 shadow-sm transition-all"
                            placeholder="Type your query here..."
                            required
                            disabled={isLoading}
                          />
                          <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all disabled:opacity-50 shadow-sm shrink-0 flex items-center gap-1.5 active:scale-95"
                          >
                            <span>Send</span>
                            <Send size={13} />
                          </button>
                        </form>
                      )}
                    </div>
                  ))}
                  
                  {/* Loading Typing Indicator */}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-gray-100 px-3.5 py-2 rounded-2xl rounded-tl-none shadow-sm flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce"></span>
                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce [animation-delay:0.15s]"></span>
                        <span className="w-1.5 h-1.5 bg-orange-600 rounded-full animate-bounce [animation-delay:0.3s]"></span>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Chat Launcher Button */}
        {!isOpen && (
          <div className="relative animate-chatbot-entrance pointer-events-auto rounded-full">
            {/* Tooltip */}
            <div className="absolute right-[112%] top-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-600 to-amber-600 text-white px-3.5 py-1.5 rounded-2xl shadow-xl text-xs font-bold whitespace-nowrap pointer-events-none animate-tooltip flex items-center border border-white/20">
              Need Help? Ask AI!
              <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-amber-600 rotate-45 rounded-sm"></div>
            </div>

            <button 
              onClick={toggleChat}
              className="w-14 h-14 sm:w-16 sm:h-16 relative rounded-full bg-white transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center border-4 border-orange-100 focus:outline-none ring-4 ring-orange-500/20 p-1 mb-1 shadow-xl"
              aria-label="Toggle AI Assistant"
            >
              <div className="relative w-full h-full rounded-full">
                <Image
                  src="/chatbot-robot.png"
                  alt="AI Chatbot"
                  fill
                  sizes="64px"
                  className="object-contain drop-shadow-md rounded-full"
                />
                 
                {/* Active Online Indicator */}
                {authStage === "authenticated" && (
                  <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full z-10 shadow-sm"></span>
                )}
              </div>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Chatbot;
