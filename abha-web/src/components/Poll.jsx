import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaRegStar, FaPaperPlane } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import emailjs from "@emailjs/browser";

const Feedback = () => {
  const [feedback, setFeedback] = useState({
    rating: 0,
    comment: "",
    email: "",
  });

  const [notifications, setNotifications] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Notifications
  const addNotification = (message, type = "info") => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 5000);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Submit
  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();

    if (!feedback.rating) {
      addNotification("⚠️ Please select a rating.", "warning");
      return;
    }

    if (!feedback.email) {
      addNotification("⚠️ Email is required.", "warning");
      return;
    }

    setIsSubmitting(true);

    const SERVICE_ID = "service_qxcd6in";
    const TEMPLATE_ID = "template_q4k7gqf";
    const PUBLIC_KEY = "FxMMqUID4zVlRnpM7";

    const templateParams = {
      user_email: feedback.email,
      rating: feedback.rating,
      comment: feedback.comment,
    };

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );

      addNotification("✅ Feedback sent successfully!", "success");
      setFeedback({ rating: 0, comment: "", email: "" });
    } catch (error) {
      console.error("EmailJS Feedback Error:", error);
      addNotification("❌ Failed to submit feedback.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0a0a0f] to-[#1a1a25] text-white py-20 px-6">

      {/* Notifications */}
      <AnimatePresence>
        {notifications.map((n) => (
          <motion.div
            key={n.id}
            className="fixed top-4 right-4 z-50 bg-black/80 border border-white/10 rounded-xl p-4"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
          >
            <div className="flex gap-3">
              <span>{n.message}</span>
              <button onClick={() => removeNotification(n.id)}>
                <FiX />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.div
        className="max-w-xl mx-auto bg-white/5 rounded-3xl p-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          Share Your Feedback
        </h2>

        <form onSubmit={handleFeedbackSubmit} className="space-y-6">

          {/* Email */}
          <input
            type="email"
            placeholder="Your Email"
            value={feedback.email}
            onChange={(e) =>
              setFeedback({ ...feedback, email: e.target.value })
            }
            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl"
            required
          />

          {/* Rating */}
          <div className="flex justify-center gap-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() =>
                  setFeedback({ ...feedback, rating: star })
                }
                className="text-3xl"
              >
                {feedback.rating >= star ? (
                  <FaStar className="text-amber-400" />
                ) : (
                  <FaRegStar className="text-gray-500" />
                )}
              </button>
            ))}
          </div>

          {/* Comment */}
          <textarea
            rows="4"
            placeholder="Your feedback"
            value={feedback.comment}
            onChange={(e) =>
              setFeedback({ ...feedback, comment: e.target.value })
            }
            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl"
            required
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center items-center gap-2 py-3 bg-amber-400 text-black font-bold rounded-xl"
          >
            <FaPaperPlane />
            {isSubmitting ? "Sending..." : "Submit"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Feedback;
