import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiLoader } from "react-icons/fi";
import { IoMdSend } from "react-icons/io";
import { FaRobot } from "react-icons/fa";
import { RiUser3Fill } from "react-icons/ri";

export default function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messageEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("https://project1-flox.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.response }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error: " + error.message },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const TypingIndicator = () => (
    <motion.div
      className="flex px-3 py-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center h-6">
        {[...Array(3)].map((_, i) => (
          <motion.span
            key={i}
            className="w-2 h-2 mx-1 bg-zinc-400 rounded-full inline-block"
            animate={{
              y: [0, -5, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.2,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </motion.div>
  );

  return (
    <div className="flex justify-center items-center mt-19 min-h-screen p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 animate-gradient-background">
      <motion.div
        className="w-full max-w-4xl h-[90vh]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col w-full h-full bg-zinc-800 rounded-2xl overflow-hidden shadow-2xl border border-zinc-700">
          <motion.div
            className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white border-b border-zinc-700"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center gap-3">
              <motion.div
                className="w-10 h-10 bg-white/10 rounded-full flex justify-center items-center backdrop-blur-sm border border-white/20"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <FaRobot className="text-white text-xl" />
              </motion.div>
              <motion.h2
                className="text-xl font-semibold bg-gradient-to-r from-white to-indigo-100 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                ABHA AI Assistant
              </motion.h2>
            </div>
            <motion.div
              className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm border ${
                isLoading
                  ? "border-amber-400/30 bg-amber-400/10 text-amber-400"
                  : "border-emerald-400/30 bg-emerald-400/10 text-emerald-400"
              }`}
              animate={{
                boxShadow: isLoading
                  ? "0 0 12px rgba(245, 158, 11, 0.7)"
                  : "0 0 12px rgba(16, 185, 129, 0.7)",
              }}
              transition={{ duration: 0.3 }}
            >
              <span className="w-2 h-2 rounded-full bg-current"></span>
              <span>{isLoading ? "Typing..." : "Online"}</span>
            </motion.div>
          </motion.div>

          <div className="flex-1 overflow-y-auto bg-zinc-800 relative">
            <div className="absolute top-0 left-0 right-0 h-14 bg-gradient-to-b from-zinc-800 to-transparent pointer-events-none z-10"></div>
            <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-zinc-800 to-transparent pointer-events-none z-10"></div>

            <div className="p-4">
              {messages.length === 0 ? (
                <motion.div
                  className="flex justify-center items-center h-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.div
                    className="bg-zinc-700 rounded-xl p-8 text-center max-w-md border border-zinc-600 shadow-lg"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-white to-indigo-100 bg-clip-text text-transparent">
                      Welcome to ABHA AI!
                    </h3>
                    <p className="text-zinc-400 mb-6">
                      Ask me anything about health, wellness, or ABHA services.
                    </p>
                    <div className="flex justify-center gap-2 h-12 items-end">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-2.5 bg-gradient-to-t from-indigo-500 to-indigo-400 rounded-full"
                          style={{
                            height: [20, 35, 50, 35, 20][i] + "px",
                          }}
                          animate={{
                            y: [0, -15, 0],
                            opacity: [0.6, 1, 0.6],
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 2,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              ) : (
                <AnimatePresence>
                  {messages.map((m, i) => (
                    <motion.div
                      key={i}
                      className={`flex gap-3 mb-5 max-w-[85%] ${
                        m.sender === "user"
                          ? "ml-auto flex-row-reverse"
                          : "mr-auto"
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 10,
                        delay: m.sender === "user" ? 0 : 0.1,
                      }}
                      exit={{ opacity: 0, x: m.sender === "user" ? 50 : -50 }}
                    >
                      <div
                        className={`w-9 h-9 rounded-full flex justify-center items-center flex-shrink-0 mt-1 ${
                          m.sender === "user"
                            ? "bg-indigo-500/20 text-indigo-300"
                            : "bg-zinc-700/30 text-zinc-200"
                        }`}
                      >
                        {m.sender === "user" ? (
                          <RiUser3Fill className="text-lg" />
                        ) : (
                          <FaRobot className="text-lg" />
                        )}
                      </div>
                      <div
                        className={`flex flex-col ${
                          m.sender === "user" ? "items-end" : "items-start"
                        }`}
                      >
                        <div
                          className={`px-4 py-3 rounded-xl text-sm ${
                            m.sender === "user"
                              ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-tr-sm"
                              : "bg-zinc-700 text-zinc-100 border border-zinc-600 rounded-tl-sm"
                          } shadow-md`}
                        >
                          {m.text}
                        </div>
                        <div
                          className={`text-xs mt-1 px-2 text-zinc-400 ${
                            m.sender === "user" ? "text-right" : "text-left"
                          }`}
                        >
                          {new Date().toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}

              {isLoading && messages.length > 0 && (
                <motion.div
                  className="flex gap-3 mb-5 max-w-[85%] mr-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="w-9 h-9 rounded-full flex justify-center items-center flex-shrink-0 mt-1 bg-zinc-700/30 text-zinc-200">
                    <FaRobot className="text-lg" />
                  </div>
                  <div className="flex flex-col items-start">
                    <TypingIndicator />
                  </div>
                </motion.div>
              )}

              <div ref={messageEndRef} />
            </div>
          </div>

          <motion.div
            className="p-3 bg-zinc-700 border-t border-zinc-600"
            layout
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex gap-2 items-end">
              <motion.textarea
                ref={inputRef}
                rows={1}
                className="flex-1 min-h-[60px] bg-zinc-600/50 border border-zinc-600 rounded-xl px-4 py-3 text-zinc-100 text-sm resize-none outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 backdrop-blur-sm placeholder-zinc-400"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                animate={{
                  height: input.split("\n").length > 1 ? "auto" : "60px",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              <motion.button
                className="w-14 h-14 rounded-xl flex justify-center items-center text-xl shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                whileHover={
                  !isLoading && input.trim() ? { scale: 1.05, rotate: 5 } : {}
                }
                whileTap={!isLoading && input.trim() ? { scale: 0.95 } : {}}
                animate={{
                  background: isLoading
                    ? "linear-gradient(to bottom right, #555, #444)"
                    : input.trim()
                    ? "linear-gradient(to bottom right, #6366f1, #4f46e5)"
                    : "linear-gradient(to bottom right, #555, #444)",
                  color: isLoading || !input.trim() ? "#aaa" : "#fff",
                }}
              >
                {isLoading ? (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: "linear",
                    }}
                  >
                    <FiLoader />
                  </motion.span>
                ) : (
                  <IoMdSend />
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
