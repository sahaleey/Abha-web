import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { FiLoader, FiCopy, FiCheck } from "react-icons/fi";
import { IoMdSend } from "react-icons/io";
import { FaRobot, FaRegLightbulb } from "react-icons/fa";
import { RiUser3Fill } from "react-icons/ri";
import { BsThreeDotsVertical, BsArrowReturnLeft } from "react-icons/bs";
import logo1 from "../assets/abha.png";

export default function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [showPromptSuggestions, setShowPromptSuggestions] = useState(true);
  const messageEndRef = useRef(null);
  const inputRef = useRef(null);
  const containerControls = useAnimation();
  const headerControls = useAnimation();

  const promptSuggestions = [
    "What is ABHA?",
    "List out ABHA members",
    "Who are the leaders of ABHA?",
  ];

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
    containerControls.start({
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    });
    headerControls.start({
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    });
  }, [containerControls, headerControls]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return; // Prevent multiple sends

    const userMsg = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setInput("");
    setIsLoading(true);
    setShowPromptSuggestions(false);

    try {
      const response = await fetch("https://project1-flox.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });

      if (response.status === 429) {
        // Handle too many requests
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "Too many requests! Please slow down and try again shortly.",
          },
        ]);
        return;
      }

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

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handlePromptClick = (prompt) => {
    setInput(prompt);
    inputRef.current.focus();
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
    <div className="flex justify-center items-center mt-18 min-h-screen p-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <motion.div
        className="w-full max-w-4xl h-[90vh]"
        initial={{ opacity: 0, y: 20 }}
        animate={containerControls}
      >
        <div className="flex flex-col w-full h-full bg-zinc-800 rounded-2xl overflow-hidden shadow-2xl border border-zinc-700 relative">
          {/* Floating particles background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-indigo-500/10"
                style={{
                  width: Math.random() * 6 + 2 + "px",
                  height: Math.random() * 6 + 2 + "px",
                  top: Math.random() * 100 + "%",
                  left: Math.random() * 100 + "%",
                }}
                animate={{
                  y: [0, (Math.random() - 0.5) * 40],
                  x: [0, (Math.random() - 0.5) * 40],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            ))}
          </div>

          {/* Header */}
          <motion.div
            className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white border-b border-zinc-700 relative z-10"
            initial={{ y: -50 }}
            animate={headerControls}
          >
            <div className="flex items-center gap-3">
              <motion.div
                className="w-10 h-10 bg-white/10 rounded-full flex justify-center items-center backdrop-blur-sm border border-white/20"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                <img
                  src={logo1} // <-- put your logo path here
                  alt="ABHA Logo"
                  className="text-lg rounded-full scale-150"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-xl font-semibold bg-gradient-to-r from-white to-indigo-100 bg-clip-text text-transparent">
                  ABHA AI Assistant
                </h2>
                <p className="text-xs text-indigo-100/70">
                  NRIC 14th batch union chat bot
                </p>
              </motion.div>
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
              <motion.span
                className="w-2 h-2 rounded-full bg-current"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              />
              <span>{isLoading ? "Typing..." : "Online"}</span>
            </motion.div>
          </motion.div>

          {/* Chat area */}
          <div className="flex-1 overflow-y-auto  bg-zinc-800/70 relative">
            {/* Gradient overlays */}
            <div className="absolute top-0 left-0 right-0 h-14 bg-gradient-to-b from-zinc-800 to-transparent pointer-events-none z-10"></div>
            <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-zinc-800 to-transparent pointer-events-none z-10"></div>

            <div className="p-4 relative z-0">
              {messages.length === 0 ? (
                <motion.div
                  className="flex flex-col justify-center items-center h-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.div
                    className="bg-zinc-700/80 rounded-xl mt-10 p-8 text-center max-w-md border border-zinc-600 shadow-lg backdrop-blur-sm"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.7, type: "spring" }}
                  >
                    <motion.div
                      className="w-16 h-16 mx-auto mb-4 bg-indigo-500/20 rounded-full flex items-center justify-center border border-indigo-500/30"
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <img
                        src={logo1} // <-- put your logo path here
                        alt="ABHA Logo"
                        className="text-2xl rounded-full scale-150"
                      />
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-white to-indigo-100 bg-clip-text text-transparent">
                      Welcome to ABHA AI!
                    </h3>
                    <p className="text-zinc-400 mb-6">
                      Ask me anything about ABHA, and I will do my best to help
                      you.
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

                  {showPromptSuggestions && (
                    <motion.div
                      className="mt-8 w-full max-w-md"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 }}
                    >
                      <div className="flex items-center gap-2 mb-3 text-zinc-400">
                        <FaRegLightbulb className="text-amber-400/80" />
                        <span className="text-sm font-medium">
                          Try these prompts
                        </span>
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {promptSuggestions.map((prompt, i) => (
                          <motion.div
                            key={i}
                            className="bg-zinc-700/50 hover:bg-zinc-700/70 border border-zinc-600 rounded-lg px-4 py-3 text-sm cursor-pointer transition-colors"
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePromptClick(prompt)}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1 + i * 0.1 }}
                          >
                            {prompt}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
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
                      whileHover={{
                        scale: m.sender === "bot" ? 1.01 : 1,
                      }}
                    >
                      <motion.div
                        className={`w-9 h-9 rounded-full flex justify-center items-center flex-shrink-0 mt-1 ${
                          m.sender === "user"
                            ? "bg-indigo-500/20 text-indigo-300"
                            : "bg-zinc-700/30 text-zinc-200"
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {m.sender === "user" ? (
                          <RiUser3Fill className="text-lg" />
                        ) : (
                          <img
                            src={logo1} // <-- put your logo path here
                            alt="ABHA Logo"
                            className="text-lg scale-150"
                          />
                        )}
                      </motion.div>
                      <div
                        className={`flex flex-col ${
                          m.sender === "user" ? "items-end" : "items-start"
                        }`}
                      >
                        <motion.div
                          className={`px-4 py-3 rounded-xl text-sm relative group ${
                            m.sender === "user"
                              ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-tr-sm"
                              : "bg-zinc-700/80 text-zinc-100 border border-zinc-600 rounded-tl-sm backdrop-blur-sm"
                          } shadow-md`}
                          whileHover={{
                            boxShadow:
                              m.sender === "bot"
                                ? "0 4px 20px rgba(99, 102, 241, 0.2)"
                                : "0 4px 20px rgba(16, 185, 129, 0.2)",
                          }}
                        >
                          {m.text}
                          {m.sender === "bot" && (
                            <motion.button
                              className="absolute -right-2 -top-2 bg-zinc-700 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity border border-zinc-600 shadow-sm"
                              onClick={() => copyToClipboard(m.text, i)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              {copiedIndex === i ? (
                                <FiCheck className="text-emerald-400 text-xs" />
                              ) : (
                                <FiCopy className="text-zinc-300 text-xs" />
                              )}
                            </motion.button>
                          )}
                        </motion.div>
                        <div
                          className={`text-xs mt-1 px-2 text-zinc-400 flex items-center gap-1 ${
                            m.sender === "user" ? "text-right" : "text-left"
                          }`}
                        >
                          {new Date().toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                          {m.sender === "bot" && (
                            <span className="text-zinc-500">•</span>
                          )}
                          {m.sender === "bot" && (
                            <button
                              className="text-zinc-500 hover:text-zinc-300 transition-colors"
                              onClick={() => {
                                setInput(m.text);
                                inputRef.current.focus();
                              }}
                            >
                              <BsArrowReturnLeft className="text-xs" />
                            </button>
                          )}
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
                    <img
                      src={logo1} // <-- put your logo path here
                      alt="ABHA Logo"
                      className="text-lg rounded-full scale-150"
                    />
                  </div>
                  <div className="flex flex-col items-start">
                    <TypingIndicator />
                  </div>
                </motion.div>
              )}

              <div ref={messageEndRef} />
            </div>
          </div>

          {/* Input area */}
          <motion.div
            className="p-3 bg-zinc-700/80 border-t border-zinc-600 backdrop-blur-sm relative z-10"
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
                  !isLoading && input.trim()
                    ? {
                        scale: 1.05,
                        rotate: [0, 5, -5, 0],
                        transition: { duration: 0.5 },
                      }
                    : {}
                }
                whileTap={!isLoading && input.trim() ? { scale: 0.95 } : {}}
                animate={{
                  background: isLoading
                    ? "linear-gradient(to bottom right, #555, #444)"
                    : input.trim()
                    ? "linear-gradient(to bottom right, #6366f1, #4f46e5)"
                    : "linear-gradient(to bottom right, #555, #444)",
                  color: isLoading || !input.trim() ? "#aaa" : "#fff",
                  boxShadow:
                    isLoading || !input.trim()
                      ? "none"
                      : "0 4px 20px rgba(99, 102, 241, 0.5)",
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
            <motion.div
              className="text-xs text-zinc-500 mt-2 px-2 flex items-center gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 1 }}
            >
              <BsArrowReturnLeft className="text-xs" />
              <span>Press Enter to send</span>
              <span className="text-zinc-500 mx-1">•</span>
              <span>Shift + Enter for new line</span>
              <span className="text-zinc-500 mx-1">•</span>
              <span>
                Found a bug or error? Let us know through message — we're here
                to help!
              </span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
