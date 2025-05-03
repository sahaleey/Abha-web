import React from "react";
import { motion } from "framer-motion";

const AbhaLoader = () => {
  const letters = ["A", "B", "H", "A"];
  const colors = ["#FFD700", "#FFA500", "#FF8C00", "#FF6347"]; // Gold to orange gradient

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0f] backdrop-blur-sm">
      {/* Glowing background effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#ce9206]/10 via-[#ce9206]/5 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Main loader container */}
      <div className="relative flex space-x-1 sm:space-x-3">
        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-2 h-2 rounded-full bg-[#ce9206]"
            initial={{
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              opacity: 0,
            }}
            animate={{
              x: Math.random() * 200 - 100,
              y: Math.random() * 200 - 100,
              opacity: [0, 0.6, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "loop",
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Animated letters */}
        {letters.map((letter, index) => (
          <motion.div
            key={index}
            className="relative"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: index * 0.15,
              duration: 0.6,
              repeat: Infinity,
              repeatType: "mirror",
              repeatDelay: letters.length * 0.15,
            }}
          >
            <motion.span
              className="text-5xl sm:text-7xl md:text-8xl font-extrabold font-bloomsburg block"
              style={{
                color: colors[index],
                textShadow: `0 0 10px ${colors[index]}, 0 0 20px ${colors[index]}`,
              }}
              animate={{
                y: [0, -15, 0],
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.1,
              }}
            >
              {letter}
            </motion.span>

            {/* Letter shadow */}
            <motion.div
              className="absolute bottom-0 left-0 w-full h-2 bg-[#ce9206] rounded-full opacity-70 blur-sm"
              animate={{
                width: ["0%", "100%", "0%"],
                opacity: [0, 0.7, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.1,
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Loading text */}
      <motion.div
        className="absolute bottom-20 text-[#ce9206] text-lg sm:text-xl tracking-widest"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Loading...
      </motion.div>
    </div>
  );
};

export default AbhaLoader;
