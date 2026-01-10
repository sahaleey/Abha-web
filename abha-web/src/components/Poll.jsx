import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaPaperPlane, FaTimes, FaSatelliteDish } from "react-icons/fa";
import { MessageSquare, Send } from "lucide-react";
import emailjs from "@emailjs/browser";

const Feedback = () => {
  const [feedback, setFeedback] = useState({
    rating: 0,
    comment: "",
    email: "",
  });

  const [hoveredStar, setHoveredStar] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notifications, setNotifications] = useState([]);

  /* ---------------- Notifications ---------------- */
  const addNotification = (message, type = "info") => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => removeNotification(id), 5000);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  /* ---------------- Submit (UNCHANGED BACKEND) ---------------- */
  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();

    if (!feedback.rating) {
      addNotification("⚠️ Please select a rating.", "error");
      return;
    }

    if (!feedback.email) {
      addNotification("⚠️ Email is required.", "error");
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

      addNotification("🚀 Transmission Received. Thank you.", "success");
      setFeedback({ rating: 0, comment: "", email: "" });
    } catch (error) {
      console.error("EmailJS Feedback Error:", error);
      addNotification("❌ Transmission Failed.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-white flex items-center justify-center py-20 px-4 overflow-hidden">

      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Notifications */}
      <AnimatePresence>
        {notifications.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`fixed top-6 right-6 z-50 p-4 rounded-xl border backdrop-blur-xl shadow-xl flex items-center gap-3 ${
              n.type === "success"
                ? "bg-emerald-950/60 border-emerald-500/30 text-emerald-400"
                : "bg-red-950/60 border-red-500/30 text-red-400"
            }`}
          >
            <span>{n.message}</span>
            <button onClick={() => removeNotification(n.id)}>
              <FaTimes />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="relative w-full max-w-5xl grid lg:grid-cols-2 gap-12 items-center">

        {/* Left Panel */}
        <div className="hidden lg:block space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-amber-400 font-mono tracking-widest uppercase">
            <FaSatelliteDish /> Feedback Channel Open
          </div>

          <h1 className="text-6xl font-bold leading-tight">
            Help Us <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">
              Tune The Signal
            </span>
          </h1>

          <p className="text-gray-400 text-lg max-w-md">
            Your feedback helps calibrate the ABHA system. Bugs, ideas, praise,
            complaints — send it all.
          </p>
        </div>

        {/* Form Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-xl"
        >
          <form onSubmit={handleFeedbackSubmit} className="space-y-8">

            {/* Email */}
            <input
              type="email"
              placeholder="Your Email"
              value={feedback.email}
              onChange={(e) =>
                setFeedback({ ...feedback, email: e.target.value })
              }
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-white/20 focus:border-amber-500/50 outline-none"
              required
            />

            {/* Rating */}
            <div className="text-center space-y-3">
              <label className="text-xs font-mono uppercase tracking-widest text-gray-400">
                Signal Strength
              </label>
              <div
                className="flex justify-center gap-2"
                onMouseLeave={() => setHoveredStar(0)}
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoveredStar(star)}
                    onClick={() =>
                      setFeedback({ ...feedback, rating: star })
                    }
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-4xl relative"
                  >
                    <FaStar
                      className={
                        (hoveredStar || feedback.rating) >= star
                          ? "text-amber-400"
                          : "text-white/10"
                      }
                    />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-400">
                <MessageSquare size={14} /> Encrypted Message
              </label>
              <textarea
                rows="4"
                placeholder="Initiate transmission..."
                value={feedback.comment}
                onChange={(e) =>
                  setFeedback({ ...feedback, comment: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-white/20 focus:border-amber-500/50 outline-none resize-none"
                required
              />
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full bg-white text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2"
            >
              {isSubmitting ? "Transmitting..." : <>Send Data <Send size={18} /></>}
            </motion.button>

          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Feedback;
