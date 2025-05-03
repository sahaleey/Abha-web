import React, { useEffect } from "react";
import { motion } from "framer-motion";

const QuantumParticles = () => {
  const particles = Array(20).fill(0);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {particles.map((_, i) => {
        const size = Math.random() * 5 + 2;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 10;
        const x = Math.random() * 100;
        const y = Math.random() * 100;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${x}%`,
              top: `${y}%`,
              opacity: 0.3,
            }}
            animate={{
              y: [0, -100, -200, -300],
              x: [0, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 150],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: duration,
              delay: delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        );
      })}
    </div>
  );
};

export default QuantumParticles;
