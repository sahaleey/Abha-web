// components/Loading.jsx
import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[#1e2425] z-[9999] flex items-center justify-center">
      <motion.div
        className="w-24 h-24 border-4 border-t-[#ce9206] border-white rounded-full animate-spin"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};

export default Loading;
