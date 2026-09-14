"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles, AlertCircle, Loader2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

import { portfolioConfig } from "@/config/portfolioConfig";

const MAX_DAILY_REQUESTS = portfolioConfig.aiChat.maxDailyChats;
const SUGGESTED_PROMPTS = portfolioConfig.aiChat.suggestedPrompts;

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [requestsToday, setRequestsToday] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get today's cookie key name format: YYYY-MM-DD
  const getTodayCookieKey = () => {
    const d = new Date();
    return `chat_req_${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };

  // Load request count from secure browser cookie
  useEffect(() => {
    const key = getTodayCookieKey();
    const count = Cookies.get(key);
    setRequestsToday(count ? parseInt(count, 10) : 0);

    setMessages([
      {
        id: "welcome",
        sender: "bot",
        text: "Hi! I’m Arman Rakib’s AI Portfolio Assistant 🤖. Ask me about his software engineering experience, scalable systems, backend architecture, projects, technical skills, and approach to building production-ready software.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  }, []);

  // Auto-scroll chat history
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input.trim();
    if (!query || loading) return;

    // Check Cookie Rate Limit (Max 10 per day)
    const key = getTodayCookieKey();
    const currentCount = parseInt(Cookies.get(key) || "0", 10);

    if (currentCount >= MAX_DAILY_REQUESTS) {
      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now()),
          sender: "user",
          text: query,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
        {
          id: String(Date.now() + 1),
          sender: "bot",
          text: "⚠️ Daily AI chat limit reached (10/10 requests for today). For further inquiries about Arman Rakib’s experience, projects, or technical expertise, please use the Contact Form below or contact him directly via WhatsApp at +880172788832.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
      setInput("");
      return;
    }

    // Increment request count in cookie (expires in 1 day, SameSite=Lax)
    const newCount = currentCount + 1;
    Cookies.set(key, String(newCount), { expires: 1, sameSite: "lax" });
    setRequestsToday(newCount);

    // Add user message
    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
      });

      const data = await res.json();
      const botReply = data.reply || "I am currently unable to process your request. Please try contacting Arman Rakib directly.";

      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: "bot",
          text: botReply,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: "bot",
          text: "Network error processing AI query. Please contact Arman Rakib at armanrakib61@gmail.com.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const remaining = Math.max(0, MAX_DAILY_REQUESTS - requestsToday);

  return (
    <>
      {/* Floating Trigger Button in Bottom Right */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 via-violet-600 to-blue-600 text-white shadow-[0_8px_30px_rgba(124,58,237,0.5)] transition-all hover:shadow-[0_12px_40px_rgba(124,58,237,0.7)]"
          aria-label="AI Portfolio Assistant Chat"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <>
              <Bot className="h-7 w-7" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-bold text-white">
                  {remaining}
                </span>
              </span>
            </>
          )}
        </motion.button>
      </div>

      {/* Expandable Chat Window Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] h-[520px] max-h-[80vh] flex flex-col rounded-3xl glass-raised overflow-hidden shadow-2xl border border-purple-500/30 bg-slate-950/90 backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-[var(--border)] bg-white/5 dark:bg-black/30">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                    Arman Rakib&apos;s AI Assistant
                    <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                  </h3>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Online • {remaining} / {MAX_DAILY_REQUESTS} daily chats free
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-br-none shadow-md"
                        : "bg-slate-900/90 text-slate-200 border border-slate-800 rounded-bl-none shadow-sm whitespace-pre-line"
                    }`}
                  >
                    {msg.text}
                    <div
                      className={`text-[9px] mt-1 text-right ${
                        msg.sender === "user" ? "text-purple-200" : "text-slate-500"
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-slate-900/90 border border-slate-800 text-slate-400 rounded-2xl rounded-bl-none p-3 flex items-center gap-2">
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-purple-400" />
                    <span>AI thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Prompt Suggestions */}
            {messages.length <= 2 && remaining > 0 && (
              <div className="px-3 py-2 border-t border-[var(--border)] bg-slate-950/40 flex flex-wrap gap-1.5">
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSendMessage(prompt)}
                    className="text-[10px] font-semibold text-purple-400 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 px-2.5 py-1 rounded-full transition-colors truncate max-w-full"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Input Footer */}
            <div className="p-3 border-t border-[var(--border)] bg-slate-950">
              {remaining <= 0 ? (
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-400 font-semibold">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>Daily limit reached (10/10). Contact Arman Rakib via the form or WhatsApp!</span>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    placeholder="Ask AI about Arman Rakib..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={loading}
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || loading}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-600 hover:bg-purple-500 text-white disabled:opacity-50 transition-colors shrink-0"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
