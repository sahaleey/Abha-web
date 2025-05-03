import React from "react";
import { motion } from "framer-motion";

const FloatingIslands = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Background Islands */}
      <motion.div
        className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-600/10 blur-xl"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-1/3 right-[10%] w-[200px] h-[200px] rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-xl"
        animate={{
          y: [0, -30, 0],
          x: [0, -15, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />

      <motion.div
        className="absolute bottom-[20%] right-[15%] w-[250px] h-[250px] rounded-full bg-gradient-to-br from-emerald-500/10 to-teal-700/10 blur-xl"
        animate={{
          y: [0, -25, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      />
    </div>
  );
};

export default FloatingIslands;
