import React from "react";
import { motion } from "framer-motion";

const NebulaBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base Nebula */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0723] via-[#1a0933] to-[#2a0b4a]"></div>

      {/* Animated Nebula Clouds */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-[url('/nebula.png')] bg-cover opacity-20"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.2, 0.25, 0.2],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Stars */}
      <div className="absolute inset-0 bg-[url('/stars.png')] opacity-80"></div>

      {/* Glowing Particles */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-cyan-400/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 10,
        }}
      />
    </div>
  );
};

export default NebulaBackground;
