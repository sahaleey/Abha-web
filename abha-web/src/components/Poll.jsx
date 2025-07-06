import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaRegStar, FaPaperPlane, FaTimes } from "react-icons/fa";

const Feedback = () => {
  const [feedback, setFeedback] = useState({ rating: 0, comment: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Add notification
  const addNotification = (message, type = "info") => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };

  // Remove notification
  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post("/api/feedback", feedback);
      addNotification("🎉 Thank you for your feedback!", "success");
      setFeedback({ rating: 0, comment: "" });
    } catch (error) {
      console.error("Feedback submission error:", error);
      addNotification(
        "⚠️ Failed to submit feedback. Please try again.",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0a0a0f] to-[#1a1a25] text-white px-6 py-20 overflow-hidden">
      {/* Floating Notifications */}
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            className={`fixed top-4 right-4 z-[9999] p-4 rounded-xl shadow-2xl backdrop-blur-lg border ${
              notification.type === "success"
                ? "bg-green-900/30 text-green-400 border-green-400/20"
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
                <FaTimes />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 -z-10"></div>
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/3 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10"></div>

      <motion.div
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500 mb-4"
            whileHover={{ scale: 1.02 }}
          >
            Share Your Feedback
          </motion.h1>
          <motion.p
            className="text-lg text-gray-300 max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Help us improve your experience with ABHA
          </motion.p>
        </motion.div>

        {/* Feedback Form */}
        <motion.form
          onSubmit={handleFeedbackSubmit}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 space-y-8"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Rating */}
          <div className="space-y-4">
            <label className="block text-lg text-gray-300">
              How would you rate your experience?
            </label>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  type="button"
                  className={`text-3xl transition-colors ${
                    feedback.rating >= star
                      ? "text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                      : "text-gray-500 hover:text-amber-300"
                  }`}
                  onClick={() => setFeedback({ ...feedback, rating: star })}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {feedback.rating >= star ? <FaStar /> : <FaRegStar />}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div className="space-y-4">
            <label htmlFor="comment" className="block text-lg text-gray-300">
              Your Feedback
            </label>
            <textarea
              id="comment"
              rows="5"
              className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all"
              placeholder="What did you like or what can we improve?"
              value={feedback.comment}
              onChange={(e) =>
                setFeedback({ ...feedback, comment: e.target.value })
              }
              required
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <motion.button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-black font-bold rounded-xl relative overflow-hidden group"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 20px rgba(245, 158, 11, 0.5)",
              }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
            >
              <span className="relative z-10 flex items-center gap-2">
                <FaPaperPlane />
                {isSubmitting ? "Submitting..." : "Submit Feedback"}
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </motion.button>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Feedback;
