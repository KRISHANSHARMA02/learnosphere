"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { chatbotApi } from "@/src/helper/chatbot_api";
import { X, RotateCcw, Send, Sparkles } from "lucide-react";

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
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, authStage]);

  // Handle auth initialization immediately so status badge can reflect state
  useEffect(() => {
    if (session?.user?.email) {
      setUserEmail(session.user.email);
      const isTeacher =
        session?.user?.role === "teacher" ||
        (typeof window !== "undefined" &&
          window.location.pathname.toLowerCase().includes("teacherdashboard"));
      setUserType(isTeacher ? "teacher" : (session?.user?.role || "student")); 
      setAuthStage("authenticated");
      return;
    }
    
    // Check for guest in localStorage
    const guestEmail = localStorage.getItem("chatbot_guest_email");
    if (guestEmail) {
      const guestRole = localStorage.getItem("chatbot_guest_role") || "student";
      setUserEmail(guestEmail);
      setUserType(guestRole);
      setAuthStage("authenticated");
      return;
    }
    
    setAuthStage("lead_form");
  }, [session]);

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    try {
      await chatbotApi.postLead({
        name: leadData.name,
        email: leadData.email,
        number: leadData.number,
        role: leadData.role
      });
      localStorage.setItem("chatbot_guest_email", leadData.email);
      localStorage.setItem("chatbot_guest_role", leadData.role);
      setUserEmail(leadData.email);
      setUserType(leadData.role);
      setAuthStage("authenticated");
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Failed to submit details.");
    } finally {
      setIsLoading(false);
    }
  };

  // Load history and start conversation once authenticated
  useEffect(() => {
    if (authStage === "authenticated" && isOpen && !conversationId) {
      initChat();
    }
  }, [authStage, isOpen]);

  const initChat = async () => {
    setIsLoading(true);
    setErrorMsg("");
    try {
      const activeRes = await chatbotApi.checkActiveConversation(userEmail);
      if (activeRes.active) {
        setMessages([
          {
            role: "assistant",
            content: "",
            options: [
              { type: "conversation_choice", id: "continue", label: "Continue chat" },
              { type: "conversation_choice", id: "new", label: "Start new chat" }
            ]
          }
        ]);
        setIsLoading(false);
        return;
      }
      
      await startFreshConversation(false);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "");
      setIsLoading(false);
    }
  };

  const startFreshConversation = async (continueExisting) => {
      const sessionData = await chatbotApi.startConversation(userEmail, userType, continueExisting);
      setConversationId(sessionData.conversation_id);
      
      let formattedHistory = [];
      if (continueExisting) {
        const hist = await chatbotApi.getConversationHistory(userEmail, sessionData.conversation_id);
        if (hist && hist.history && hist.history.length > 0) {
          hist.history.forEach(item => {
            formattedHistory.push({ role: "user", content: item.question });
            if (item.answer) {
              formattedHistory.push({ role: "assistant", content: item.answer });
            }
          });
        }
      }

      const rootOptions = await chatbotApi.getOptions(userType, []);
      formattedHistory.push({
        role: "assistant",
        content: "",
        pathContext: [],
        options: Array.isArray(rootOptions) ? rootOptions : (rootOptions?.value || [])
      });
      
      setMessages(formattedHistory);
  };

  const toggleChat = () => setIsOpen(!isOpen);

  const handleEscalateSubmit = async (text, msgIdx) => {
    if (!text.trim()) return;
    setMessages(prev => prev.map((m, i) => i === msgIdx ? { ...m, isEscalateInput: false } : m));
    setMessages(prev => [...prev, { role: "user", content: text }]);
    setIsLoading(true);
    
    try {
        const ticketRes = await fetch("https://ai-backend.learnosphere.in/chatbot/tickets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            conversation_id: conversationId,
            email: userEmail,
            name: session?.user?.name || "",
            role: userType,
            question: text,
            category: lastQueryData?.path[0] || "",
            subcategory: lastQueryData?.path[1] || "",
            subsubcategory: lastQueryData?.path[2] || "",
            source: "unresolved_textbox"
          })
        });
        
        let ticketData = null;
        if (ticketRes.ok) ticketData = await ticketRes.json();
        
        const categoryEncoded = encodeURIComponent(lastQueryData?.path[0] || "Support");
        const waUrl = ticketData 
          ? `https://wa.me/918769600449?text=Hello,%20my%20ticket%20ID%20is%20${ticketData.ticket_id}%20regarding%20${categoryEncoded}.`
          : `https://wa.me/918769600449?text=Hello,%20I%20have%20a%20query%20regarding%20${categoryEncoded}.`;
        
        setMessages(prev => [...prev, {
          role: "assistant",
          content: "",
          whatsappUrl: waUrl
        }]);
        
        try {
          await chatbotApi.logConversation({
            conversation_id: conversationId,
            email: userEmail,
            question: text,
            answer: "",
            source: "unresolved_textbox"
          });
        } catch(e) {}
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
      if (option.type === "conversation_choice") {
        await startFreshConversation(option.id === "continue");
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
        const nextOptions = await chatbotApi.getOptions(userType, newPath);
        
        setMessages(prev => [...prev, {
          role: "assistant", 
          content: "",
          pathContext: newPath,
          options: Array.isArray(nextOptions) ? nextOptions : (nextOptions?.value || [])
        }]);
      } else if (option.type === "question") {
        const queryPath = Array.isArray(msgPathContext) ? msgPathContext : currentPath;
        const answerData = await chatbotApi.getAnswer(userType, queryPath, option.id);
        const answerText = answerData.answer || "";
        
        setMessages(prev => [...prev, { role: "assistant", content: answerText }]);
        
        // Log it
        try {
          await chatbotApi.logConversation({
            conversation_id: conversationId,
            email: userEmail,
            question: option.id,
            answer: answerText,
            source: "options_menu"
          });
        } catch (logErr) {
          console.error("Failed to log conversation:", logErr);
        }
        
        setLastQueryData({ path: queryPath, question: option.id });
        
        setMessages(prev => [...prev, {
          role: "assistant",
          content: "",
          pathContext: queryPath,
          options: FOLLOWUP_OPTIONS
        }]);
      } else if (option.type === "followup") {
        if (option.id === "more_q") {
          const queryPath = Array.isArray(msgPathContext) ? msgPathContext : currentPath;
          const nodes = await chatbotApi.getOptions(userType, queryPath);
          setMessages(prev => [...prev, {
            role: "assistant",
            content: "",
            pathContext: queryPath,
            options: Array.isArray(nodes) ? nodes : (nodes?.value || [])
          }]);
        } else if (option.id === "diff_cat") {
          setCurrentPath([]);
          const nodes = await chatbotApi.getOptions(userType, []);
          setMessages(prev => [...prev, {
            role: "assistant",
            content: "",
            pathContext: [],
            options: Array.isArray(nodes) ? nodes : (nodes?.value || [])
          }]);
        } else if (option.id === "check_solved") {
          setMessages(prev => [...prev, {
            role: "assistant",
            content: "",
            pathContext: currentPath,
            options: [
              { type: "resolved", id: "yes", label: "Yes, solved ✅" },
              { type: "resolved", id: "no", label: "No, not solved" }
            ]
          }]);
        } else if (option.id === "support") {
          let waUrl = `https://wa.me/918769600449`;
          try {
            const ticketRes = await fetch("https://ai-backend.learnosphere.in/chatbot/tickets", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                conversation_id: conversationId,
                email: userEmail,
                name: session?.user?.name || "",
                role: userType,
                question: lastQueryData?.question || "",
                category: lastQueryData?.path[0] || "",
                subcategory: lastQueryData?.path[1] || "",
                subsubcategory: lastQueryData?.path[2] || "",
                source: "talk_to_support_button"
              })
            });
            if (ticketRes.ok) {
              const ticketData = await ticketRes.json();
              const categoryEncoded = encodeURIComponent(lastQueryData?.path[0] || "Support");
              waUrl = `https://wa.me/918769600449?text=Hello,%20my%20ticket%20ID%20is%20${ticketData.ticket_id}%20regarding%20${categoryEncoded}.`;
            }
          } catch(err) {}
          
          setMessages(prev => [...prev, {
            role: "assistant",
            content: "",
            whatsappUrl: waUrl,
            options: FOLLOWUP_OPTIONS_SHORT
          }]);
        }
      } else if (option.type === "resolved") {
        if (option.id === "yes") {
          try { await chatbotApi.resolveConversation(conversationId, "yes"); } catch(e) {}
          const rootOptions = await chatbotApi.getOptions(userType, []);
          setCurrentPath([]);
          setMessages(prev => [...prev, {
            role: "assistant",
            content: "",
            pathContext: [],
            options: Array.isArray(rootOptions) ? rootOptions : (rootOptions?.value || [])
          }]);
        } else {
          try { await chatbotApi.resolveConversation(conversationId, "no"); } catch(e) {}
          setMessages(prev => [...prev, {
            role: "assistant",
            content: "",
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

              {/* Stage: Lead Form */}
              {authStage === "lead_form" && (
                <div className="p-5 sm:p-6 flex flex-col h-full bg-white relative overflow-y-auto overflow-x-hidden chatbot-scroll-area">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                      <Sparkles size={16} />
                    </div>
                    <h4 className="text-gray-800 font-bold text-base">Welcome!</h4>
                  </div>
                  <p className="text-gray-500 text-xs mb-4">Please provide your details to start chatting with AI.</p>
                  {errorMsg && (
                    <p className="text-red-600 text-xs mb-3 p-2.5 bg-red-50 rounded-xl border border-red-200">
                      {errorMsg}
                    </p>
                  )}
                  
                  <form onSubmit={handleLeadSubmit} className="space-y-3.5 flex flex-col flex-1">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        required
                        value={leadData.name}
                        onChange={e => setLeadData({...leadData, name: e.target.value})}
                        className="w-full border border-gray-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                        placeholder="Your Name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        required
                        value={leadData.email}
                        onChange={e => setLeadData({...leadData, email: e.target.value})}
                        className="w-full border border-gray-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={leadData.number}
                        onChange={e => setLeadData({...leadData, number: e.target.value})}
                        className="w-full border border-gray-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                        placeholder="Your Number"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Role</label>
                      <select
                        required
                        value={leadData.role}
                        onChange={e => setLeadData({...leadData, role: e.target.value})}
                        className="w-full border border-gray-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-gray-800 bg-white transition-all"
                      >
                        <option value="student">Student</option>
                        <option value="tutor">Tutor</option>
                        <option value="parent">Parent</option>
                      </select>
                    </div>
                    <div className="mt-auto pt-4">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl py-2.5 text-xs sm:text-sm font-bold transition-all disabled:opacity-50 flex items-center justify-center shadow-md active:scale-[0.98]"
                      >
                        {isLoading ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        ) : "Start Chat"}
                      </button>
                    </div>
                  </form>
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
