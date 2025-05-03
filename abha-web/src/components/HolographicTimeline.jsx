import React from "react";
import { motion } from "framer-motion";

const HolographicTimeline = ({ data }) => {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-1/2 h-full w-0.5 bg-gradient-to-b from-cyan-400/30 to-transparent -translate-x-1/2"></div>

      <div className="space-y-32">
        {data.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`relative flex ${
              index % 2 === 0 ? "flex-row" : "flex-row-reverse"
            } items-center justify-between gap-8`}
          >
            {/* Year */}
            <div className="flex-1 text-right">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-full text-xl font-bold shadow-lg"
              >
                {item.year}
              </motion.div>
            </div>

            {/* Timeline node */}
            <div className="relative w-16 h-16 flex-shrink-0 flex items-center justify-center">
              <div className="absolute w-8 h-8 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/30"></div>
              <div className="absolute w-8 h-8 bg-cyan-400 rounded-full animate-ping opacity-20"></div>
              <div className="text-2xl z-10">{item.icon}</div>
            </div>

            {/* Content */}
            <motion.div
              whileHover={{ x: index % 2 === 0 ? 5 : -5 }}
              className={`flex-1 ${
                index % 2 === 0 ? "text-left" : "text-right"
              } bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10`}
            >
              <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-300">{item.description}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HolographicTimeline;
