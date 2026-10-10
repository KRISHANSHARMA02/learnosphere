

const BASE_URL = "https://ai-backend.learnosphere.in/chatbot";

const handleResponse = async (res) => {
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    let msg = errData.detail || "";
    if (Array.isArray(msg)) msg = msg.map(e => e.msg).join(", ");
    else if (typeof msg === "object") msg = JSON.stringify(msg);
    throw new Error(msg);
  }
  return res.json();
};

export const chatbotApi = {
  getUsers: async () => {
    return fetch(`${BASE_URL}/users`).then(handleResponse);
  },
  getOptions: async (userType, path = []) => {
    const params = new URLSearchParams();
    params.append("user_type", userType);
    path.forEach(p => params.append("path", p));
    return fetch(`${BASE_URL}/options?${params.toString()}`).then(handleResponse);
  },
  getAnswer: async (userType, path = [], question) => {
    const params = new URLSearchParams();
    params.append("user_type", userType);
    path.forEach(p => params.append("path", p));
    params.append("question", question);
    return fetch(`${BASE_URL}/answer?${params.toString()}`).then(handleResponse);
  },
  startConversation: async (email, userType, continueExisting = false) => {
    return fetch(`${BASE_URL}/conversations/start`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, user_type: userType, continue_existing: continueExisting }),
    }).then(handleResponse);
  },
  checkActiveConversation: async (email) => {
    return fetch(`${BASE_URL}/conversations/active?email=${encodeURIComponent(email)}`).then(handleResponse);
  },
  logConversation: async (data) => {
    // data: { conversation_id, email, question, answer, role, category, subcategory, subsubcategory, source, name }
    return fetch(`${BASE_URL}/conversation/log`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(handleResponse);
  },
  getConversationHistory: async (email, conversationId = null) => {
    const url = new URL(`${BASE_URL}/conversation/${encodeURIComponent(email)}`);
    if (conversationId) url.searchParams.append("conversation_id", conversationId);
    return fetch(url.toString()).then(handleResponse);
  },
  resolveConversation: async (conversationId, resolved = "yes") => {
    return fetch(`${BASE_URL}/conversation/resolve`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conversation_id: conversationId, resolved }),
    }).then(handleResponse);
  },
  sendOtp: async (email) => {
    return fetch(`${BASE_URL}/otp/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }).then(handleResponse);
  },
  verifyOtp: async (email, otp) => {
    return fetch(`${BASE_URL}/otp/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    }).then(handleResponse);
  },
  postLead: async (data) => {
    return fetch(`${BASE_URL}/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(handleResponse);
  }
};
