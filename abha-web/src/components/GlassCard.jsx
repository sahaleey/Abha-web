import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const GlassCard = ({ title, description, link, gradient, hover, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -10 }}
      className={`relative overflow-hidden rounded-2xl backdrop-blur-sm border border-white/10 ${hover} transition-all duration-300`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20`}
      />
      <div className="relative z-10 p-8 h-full flex flex-col">
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="text-gray-300 mb-6">{description}</p>
        <Link
          to={link}
          className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-white group"
        >
          Explore more
          <span className="group-hover:translate-x-1 transition-transform">
            →
          </span>
        </Link>
      </div>
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 pointer-events-none" />
    </motion.div>
  );
};

export default GlassCard;
