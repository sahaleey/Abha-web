import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiUser, FiMail, FiMessageSquare, FiX } from "react-icons/fi";

const GetInTouch = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [notifications, setNotifications] = useState([]);
  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Add a new notification
  const addNotification = (message, type = "info") => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };

  // Remove a notification
  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && !emailRegex.test(value)) {
        setEmailError("Please enter a valid email address.");
      } else {
        setEmailError("");
      }
    }

    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (emailError || !formData.email) {
      addNotification(
        "⚠️ Please enter a valid email before submitting.",
        "warning"
      );
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("https://abha-web.vercel.app/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        addNotification("✅ Message sent successfully!", "success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        addNotification(
          "❌ Failed to send message. Please try again later.",
          "error"
        );
      }
    } catch (error) {
      addNotification(
        "⚠️ Error sending message. Please check your connection.",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0a0a0f] to-[#1a1a25] text-white py-20 px-6 md:px-20 overflow-hidden">
      {/* Floating Notifications */}
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            className={`fixed top-4 right-4 z-[9999] p-4 rounded-xl shadow-2xl backdrop-blur-lg border ${
              notification.type === "success"
                ? "bg-green-900/30 text-green-400 border-green-400/20"
                : notification.type === "warning"
                ? "bg-yellow-900/30 text-yellow-400 border-yellow-400/20"
                : "bg-red-900/30 text-red-400 border-red-400/20"
            }`}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
          >
            <div className="flex items-center gap-3">
              <span>{notification.message}</span>
              <button
                onClick={() => removeNotification(notification.id)}
                className="text-white/50 hover:text-white transition-colors"
              >
                <FiX />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-20">
        <div className="absolute inset-0 bg-[url('/grid.svg')]"></div>
      </div>
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/3 -right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -z-10"></div>

      <motion.div
        className="max-w-2xl mx-auto bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 p-8 text-center border-b border-white/10">
          <motion.h2
            className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Connect With Us
          </motion.h2>
          <motion.p
            className="mt-2 text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            We'd love to hear from you
          </motion.p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Name Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label
              htmlFor="name"
              className="block mb-3 text-gray-300 font-medium"
            >
              <span className="flex items-center gap-2">
                <FiUser className="text-amber-400" />
                Your Name
              </span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all"
              placeholder="Enter your name"
            />
          </motion.div>

          {/* Email Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label
              htmlFor="email"
              className="block mb-3 text-gray-300 font-medium"
            >
              <span className="flex items-center gap-2">
                <FiMail className="text-amber-400" />
                Email Address
              </span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all"
              placeholder="your@email.com"
            />
            {emailError && (
              <motion.p
                className="text-red-400 mt-2 text-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {emailError}
              </motion.p>
            )}
          </motion.div>

          {/* Message Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <label
              htmlFor="message"
              className="block mb-3 text-gray-300 font-medium"
            >
              <span className="flex items-center gap-2">
                <FiMessageSquare className="text-amber-400" />
                Your Message
              </span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full px-5 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all"
              placeholder="What would you like to say?"
            />
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="pt-4"
          >
            <motion.button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-black font-bold rounded-xl relative overflow-hidden group"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 20px rgba(245, 158, 11, 0.5)",
              }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
            >
              <span className="relative z-10 flex items-center gap-2">
                <FiSend className="text-lg" />
                {isSubmitting ? "Sending..." : "Send Message"}
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default GetInTouch;
