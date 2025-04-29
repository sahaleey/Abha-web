import React, { useState } from "react";
import { motion } from "framer-motion";
import "../styles/GetInTouch.css";

const GetInTouch = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [emailError, setEmailError] = useState(""); // NEW

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Email validation while typing
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setEmailError("Please enter a valid email address.");
      } else {
        setEmailError("");
      }
    }

    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final email validation on submit
    if (emailError || !formData.email) {
      setStatus("⚠️ Please enter a valid email before submitting.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/contact/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        setStatus("✅ Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("❌ Failed to send message.");
      }
    } catch (error) {
      setStatus("⚠️ Error sending message.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-gray-900 text-white py-20 px-6 md:px-20">
      <motion.div
        className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold text-amber-400 text-center mb-10 font-bloomsburg">
          Get in Touch
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6 font-bloomsburg">
          <div>
            <label htmlFor="name" className="block mb-2 text-gray-300">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-xl bg-zinc-800 text-white border border-gray-700 focus:border-amber-400 outline-none transition"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-xl bg-zinc-800 text-white border border-gray-700 focus:border-amber-400 outline-none transition"
            />
            {/* Show email error message below */}
            {emailError && (
              <p className="text-red-400 mt-2 text-sm">{emailError}</p>
            )}
          </div>
          <div>
            <label htmlFor="message" className="block mb-2 text-gray-300">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full px-4 py-2 rounded-xl bg-zinc-800 text-white border border-gray-700 focus:border-amber-400 outline-none transition"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-amber-400 hover:bg-amber-300 text-black font-bold py-3 rounded-xl transition"
          >
            Send Message
          </motion.button>
        </form>

        {/* Form submit status */}
        {status && (
          <p className="mt-6 text-center text-lg text-emerald-300">{status}</p>
        )}
      </motion.div>
    </div>
  );
};

export default GetInTouch;
