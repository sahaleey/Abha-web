import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "../styles/Poll.css";

const Feedback = () => {
  const [feedback, setFeedback] = useState({ rating: 0, comment: "" });
  const [feedbackSent, setFeedbackSent] = useState(false);

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://abha-web-1.onrender.com/api/feedback",
        feedback
      );
      setFeedbackSent(true);
      setFeedback({ rating: 0, comment: "" });
    } catch (error) {
      console.error("Feedback submission error:", error);
    }
  };

  return (
    <div className="poll-container font-bloomsburg bg-gradient-to-br from-black via-gray-900 to-black min-h-screen px-6 py-16 text-white">
      <motion.h1
        className="text-4xl md:text-5xl text-center font-bold text-amber-400 mb-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Your Feedback on the Website ✨
      </motion.h1>

      {feedbackSent ? (
        <p className="text-green-400 text-center font-semibold text-lg">
          Thank you for your feedback!
        </p>
      ) : (
        <form
          onSubmit={handleFeedbackSubmit}
          className="max-w-xl mx-auto space-y-6"
        >
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${feedback.rating >= star ? "filled" : ""}`}
                onClick={() => setFeedback({ ...feedback, rating: star })}
              >
                ★
              </span>
            ))}
          </div>
          <textarea
            rows="4"
            className="w-full bg-gray-800 text-white p-4 rounded-lg"
            placeholder="Write your feedback..."
            value={feedback.comment}
            onChange={(e) =>
              setFeedback({ ...feedback, comment: e.target.value })
            }
            required
          />
          <div className="text-center">
            <button type="submit" className="submit-feedback-button">
              Submit Feedback
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Feedback;
