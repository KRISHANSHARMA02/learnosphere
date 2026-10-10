"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { chatbotApi } from "@/src/helper/chatbot_api";

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
  const [authStage, setAuthStage] = useState("loading"); // loading, email_input, otp_input, authenticated
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
      setUserType("student"); 
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

  const handleOptionClick = async (option) => {
    setIsLoading(true);
    
    // Add user's choice to UI
    setMessages(prev => [...prev, { role: "user", content: option.label }]);
    
    try {
      if (option.type === "conversation_choice") {
        await startFreshConversation(option.id === "continue");
      } else if (option.type === "group") {
        const newPath = [...currentPath, option.id];
        setCurrentPath(newPath);
        const nextOptions = await chatbotApi.getOptions(userType, newPath);
        
        setMessages(prev => [...prev, {
          role: "assistant", 
          content: "",
          options: Array.isArray(nextOptions) ? nextOptions : (nextOptions?.value || [])
        }]);
      } else if (option.type === "question") {
        const answerData = await chatbotApi.getAnswer(userType, currentPath, option.id);
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
        
        setLastQueryData({ path: currentPath, question: option.id });
        
        setMessages(prev => [...prev, {
          role: "assistant",
          content: "",
          options: FOLLOWUP_OPTIONS
        }]);
      } else if (option.type === "followup") {
        if (option.id === "more_q") {
          const nodes = await chatbotApi.getOptions(userType, currentPath);
          setMessages(prev => [...prev, {
            role: "assistant",
            content: "",
            options: Array.isArray(nodes) ? nodes : (nodes?.value || [])
          }]);
        } else if (option.id === "diff_cat") {
          setCurrentPath([]);
          const nodes = await chatbotApi.getOptions(userType, []);
          setMessages(prev => [...prev, {
            role: "assistant",
            content: "",
            options: Array.isArray(nodes) ? nodes : (nodes?.value || [])
          }]);
        } else if (option.id === "check_solved") {
          setMessages(prev => [...prev, {
            role: "assistant",
            content: "",
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
      setMessages(prev => [...prev, { role: "assistant", content: err.message || "" }]);
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <>
      <style>{`
        @keyframes scaleInGlow {
          0% { transform: scale(0.5); opacity: 0; box-shadow: 0 0 0 rgba(234, 88, 12, 0); }
          100% { transform: scale(1); opacity: 1; box-shadow: 0 0 15px rgba(234, 88, 12, 0.4); }
        }
        @keyframes subtleGlow {
          0% { box-shadow: 0 0 10px rgba(234, 88, 12, 0.3); }
          50% { box-shadow: 0 0 25px rgba(234, 88, 12, 0.7); }
          100% { box-shadow: 0 0 10px rgba(234, 88, 12, 0.3); }
        }
        @keyframes tooltipPulse {
          0%, 15% { opacity: 0; transform: translateY(-50%) translateX(10px) scale(0.95); }
          25%, 75% { opacity: 1; transform: translateY(-50%) translateX(0) scale(1); }
          85%, 100% { opacity: 0; transform: translateY(-50%) translateX(-10px) scale(0.95); }
        }
        .animate-chatbot-entrance {
          animation: scaleInGlow 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards, subtleGlow 3s infinite alternate ease-in-out 0.6s;
        }
        .animate-tooltip {
          animation: tooltipPulse 3s infinite ease-in-out;
        }
      `}</style>
      <div className="fixed bottom-8 right-4 sm:bottom-10 sm:right-6 z-[9999] flex flex-col items-end pointer-events-none">
        {isOpen && (
          <div className="bg-white w-[calc(100vw-2rem)] sm:w-96 rounded-2xl shadow-2xl border border-gray-200 mb-4 flex flex-col overflow-hidden transition-all duration-300 h-[calc(100vh-7rem)] max-h-[36rem] sm:max-h-[40rem] pointer-events-auto">
            {/* Header */}
            <div className="bg-orange-600 text-white p-4 flex justify-between items-center shadow-md shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 relative rounded-full overflow-hidden bg-white/20 p-1 flex items-center justify-center">
                  <Image src="/chatbot-robot.png" alt="Chatbot Icon" fill sizes="40px" className="object-cover rounded-full" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg tracking-wide leading-tight">Learnosphere AI</h3>
                  <p className="text-xs text-orange-100 opacity-90">{authStage === 'authenticated' ? 'Online' : 'Connecting...'}</p>
                </div>
              </div>
              <button onClick={toggleChat} className="text-white hover:text-gray-200 focus:outline-none text-3xl leading-none font-light">
                &times;
              </button>
            </div>
            
            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto bg-gray-50 flex flex-col relative">
              
              {/* Stage: Loading */}
              {authStage === "loading" && (
                 <div className="flex items-center justify-center h-full">
                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
                 </div>
              )}

              {/* Stage: Lead Form */}
              {authStage === "lead_form" && (
                <div className="p-6 flex flex-col h-full bg-white relative">
                  <h4 className="text-gray-800 font-bold text-lg mb-1">Welcome!</h4>
                  <p className="text-gray-500 text-sm mb-5">Please provide your details to start the chat.</p>
                  {errorMsg && <p className="text-red-600 text-xs mb-4 p-2.5 bg-red-50 rounded-lg border border-red-200">{errorMsg}</p>}
                  
                  <form onSubmit={handleLeadSubmit} className="space-y-4 flex flex-col flex-1">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Name</label>
                      <input type="text" required value={leadData.name} onChange={e => setLeadData({...leadData, name: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[14px] focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500" placeholder="Your Name" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
                      <input type="email" required value={leadData.email} onChange={e => setLeadData({...leadData, email: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[14px] focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500" placeholder="your@email.com" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number</label>
                      <input type="tel" required value={leadData.number} onChange={e => setLeadData({...leadData, number: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[14px] focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500" placeholder="Your Number" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Role</label>
                      <select required value={leadData.role} onChange={e => setLeadData({...leadData, role: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[14px] focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-gray-800 bg-white">
                        <option value="student">Student</option>
                        <option value="tutor">Tutor</option>
                        <option value="parent">Parent</option>
                      </select>
                    </div>
                    <div className="mt-auto pt-6">
                      <button type="submit" disabled={isLoading} className="w-full bg-orange-600 text-white rounded-full py-2.5 text-sm font-semibold hover:bg-orange-700 transition-colors disabled:opacity-50 flex items-center justify-center shadow-sm">
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
                <div className="p-4 flex flex-col space-y-4 min-h-max pb-4">
                  {messages.length === 0 && !isLoading && (
                    <p className="text-center text-gray-400 text-sm mt-10">No messages yet.</p>
                  )}
                  
                  {messages.map((msg, idx) => (
                    <div key={idx} className="flex flex-col space-y-2">
                      <div className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        {(msg.content || msg.whatsappUrl) && (
                          <div className={`max-w-[85%] p-3 rounded-2xl text-[14px] shadow-sm leading-relaxed whitespace-pre-wrap ${msg.role === "user" ? "bg-orange-600 text-white rounded-tr-none" : "bg-white text-gray-800 border border-gray-200 rounded-tl-none"}`}>
                            {msg.content && <div>{msg.content}</div>}
                            {msg.whatsappUrl && (
                              <div className={msg.content ? "mt-3" : ""}>
                                <a 
                                  href={msg.whatsappUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center space-x-2 bg-[#25D366] hover:bg-[#1ebe5a] text-white text-[13px] px-4 py-2 rounded-full transition-colors font-semibold shadow-sm"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c-.003 1.396.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c.003-3.625 2.952-6.574 6.577-6.574 1.757.002 3.409.686 4.653 1.93 1.243 1.243 1.926 2.894 1.928 4.651-.004 3.625-2.953 6.574-6.577 6.574zm3.608-4.928c-.198-.099-1.17-.578-1.352-.644-.182-.066-.315-.099-.448.099-.133.198-.513.644-.628.777-.116.133-.232.149-.43.05-.198-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.102-1.373-.116-.198-.012-.305.087-.403.09-.089.198-.23.298-.346.099-.116.132-.198.198-.33.065-.132.033-.248-.016-.347-.05-.099-.448-1.08-.613-1.48-.16-.389-.323-.336-.448-.342-.116-.005-.248-.005-.38-.005s-.348.05-.53.248c-.182.198-.71.694-.71 1.692s.728 1.964.828 2.097c.1.132 1.43 2.181 3.464 3.058.484.208.862.332 1.157.425.485.154.927.132 1.275.08.39-.059 1.17-.478 1.334-.94.164-.462.164-.858.116-.94-.05-.082-.182-.132-.38-.231z"/>
                                  </svg>
                                  <span>Chat on WhatsApp</span>
                                </a>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      {/* Render Actionable Options if Present */}
                      {msg.options && msg.options.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-1.5 max-w-[95%]">
                          {msg.options.map((opt, i) => (
                            <button
                              key={opt.id || i}
                              onClick={() => handleOptionClick(opt)}
                              disabled={isLoading}
                              className="bg-orange-50 text-orange-700 text-xs px-3.5 py-2 rounded-full border border-orange-200 hover:bg-orange-100 hover:border-orange-300 transition-all disabled:opacity-50 text-left shadow-sm font-medium"
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      )}
                      {msg.isEscalateInput && (
                        <form onSubmit={(e) => { e.preventDefault(); handleEscalateSubmit(e.target.elements.escalateText.value, idx); }} className="mt-2 flex gap-2 w-full max-w-[95%]">
                          <input name="escalateText" type="text" className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-[14px] focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-gray-800 shadow-sm transition-all" placeholder="Type your query..." required disabled={isLoading} />
                          <button type="submit" disabled={isLoading} className="bg-orange-600 text-white px-5 py-2 rounded-full text-[14px] font-medium hover:bg-orange-700 transition-colors disabled:opacity-50 shadow-sm shrink-0">Send</button>
                        </form>
                      )}
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex space-x-1.5 items-center">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>


          </div>
        )}
        
        {!isOpen && (
          <div className="relative animate-chatbot-entrance pointer-events-auto rounded-full">
            
            {/* Tooltip */}
            <div className="absolute right-[110%] top-1/2 -translate-y-1/2 bg-orange-600 text-white px-3.5 py-1.5 rounded-2xl shadow-lg text-[13.5px] font-semibold whitespace-nowrap pointer-events-none animate-tooltip flex items-center">
              How can I help you?
              <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2.5 h-2.5 bg-orange-600 rotate-45 rounded-sm"></div>
            </div>

            <button 
              onClick={toggleChat}
              className="w-16 h-16 relative rounded-full bg-white transition-all duration-300 hover:scale-110 flex items-center justify-center border-4 border-orange-50 focus:outline-none ring-4 ring-transparent focus:ring-orange-200 p-1 mb-1 shadow-xl"
              aria-label="Toggle AI Assistant"
            >
              <div className="relative w-full h-full rounded-full">
                 <Image src="/chatbot-robot.png" alt="AI Chat" fill sizes="60px" className="object-contain drop-shadow-md rounded-full" />
                 
                 {/* Green Status Dot directly on SVG wrapper */}
                 {authStage === "authenticated" && (
                   <span className="absolute top-0 left-0 w-3.5 h-3.5 bg-[#25D366] border-[2.5px] border-white rounded-full z-10 shadow-sm"></span>
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
