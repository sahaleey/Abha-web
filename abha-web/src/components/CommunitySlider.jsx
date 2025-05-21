import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import communityMembers from "../data/communityBio";

const CommunitySlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);

  const classTeacher = communityMembers.find((m) => m.isClassTeacher);
  const sliderMembers = communityMembers.filter((m) => !m.isClassTeacher);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === sliderMembers.length - 1 ? 0 : prev + 1
      );
    }, 3000);
    return () => clearInterval(intervalRef.current);
  }, [sliderMembers.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const getCardStyle = (index) => {
    const distance = index - currentIndex;
    const absDistance = Math.abs(distance);

    if (distance === 0) {
      return {
        scale: 1,
        opacity: 1,
        zIndex: 10,
        x: "0%",
        filter: "none",
        transition: { type: "spring", damping: 25, stiffness: 200 },
      };
    } else if (absDistance === 1) {
      const direction = distance > 0 ? 1 : -1;
      return {
        scale: 0.9,
        opacity: 0.8,
        zIndex: 5,
        x: `${direction * 120}%`,
        filter: "blur(1px)",
        transition: { type: "spring", damping: 25, stiffness: 200 },
      };
    } else if (absDistance === 2) {
      const direction = distance > 0 ? 1 : -1;
      return {
        scale: 0.8,
        opacity: 0.6,
        zIndex: 1,
        x: `${direction * 180}%`,
        filter: "blur(2px)",
        transition: { type: "spring", damping: 25, stiffness: 200 },
      };
    } else {
      return {
        scale: 0.7,
        opacity: 0,
        zIndex: 0,
        x: "0%",
        filter: "blur(4px)",
        transition: { type: "spring", damping: 25, stiffness: 200 },
      };
    }
  };

  return (
    <div className="relative max-w-7xl mx-auto py-20 px-4 overflow-hidden">
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10"></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600 mb-4">
          Our Community Team
        </h2>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          The brilliant minds behind our community's success
        </p>
      </motion.div>

      {/* Class Teacher Card (unchanged) */}
      {classTeacher && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 w-full max-w-md"
        >
          <Link to={`/community/${classTeacher.slug}`}>
            <div className="relative bg-gradient-to-br from-white/5 to-white/10 rounded-2xl p-8 backdrop-blur-sm border border-cyan-400/50 shadow-lg shadow-cyan-500/20 overflow-hidden hover:scale-105 transition">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-2xl" />

              <div className="relative w-40 h-40 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full border-2 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]"></div>
                <img
                  rel="preload"
                  src={classTeacher.image}
                  alt={classTeacher.name}
                  className="relative z-10 w-full h-full rounded-full object-cover"
                />
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {classTeacher.name}
                </h3>
                <p className="text-cyan-300 font-mono mb-4">
                  {classTeacher.role}
                </p>
                <p className="text-gray-400 text-sm mb-6">{classTeacher.bio}</p>

                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {classTeacher.skill?.split(",").map((skill, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 rounded-full text-xs bg-cyan-900/30 text-cyan-300 border border-cyan-400/20"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>

                <div className="flex justify-center">
                  <button className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-700 rounded-full text-sm font-medium shadow-lg">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      )}

      {/* New Stunning Slider */}
      <div className="relative h-[500px] w-full" ref={sliderRef}>
        <div className="absolute inset-0 flex items-center justify-center">
          {sliderMembers.map((member, index) => (
            <motion.div
              key={index}
              className={`absolute w-full max-w-xs ${
                index === currentIndex ? "cursor-default" : "cursor-pointer"
              }`}
              style={{
                ...getCardStyle(index),
              }}
              animate={getCardStyle(index)}
              onClick={() => goToSlide(index)}
            >
              <Link to={`/community/${member.slug}`}>
                <motion.div
                  whileHover={{
                    scale: index === currentIndex ? 1.02 : 1.05,
                    boxShadow:
                      index === currentIndex
                        ? "0 10px 30px -10px rgba(34, 211, 238, 0.5)"
                        : "0 5px 15px -5px rgba(34, 211, 238, 0.3)",
                  }}
                  className={`relative h-full bg-gradient-to-br from-white/5 to-white/10 rounded-2xl p-8 backdrop-blur-sm border overflow-hidden ${
                    index === currentIndex
                      ? "border-cyan-400/50 shadow-lg shadow-cyan-500/20"
                      : "border-white/10"
                  }`}
                >
                  {index === currentIndex && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-2xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}

                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <motion.div
                      className={`absolute inset-0 rounded-full border-2 ${
                        index === currentIndex
                          ? "border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                          : "border-cyan-400/50"
                      }`}
                      animate={{
                        rotate: index === currentIndex ? 360 : 0,
                        transition: {
                          duration: 10,
                          repeat: Infinity,
                          ease: "linear",
                        },
                      }}
                    />
                    <motion.img
                      rel="preload"
                      src={member.image}
                      alt={member.name}
                      className="relative z-10 w-full h-full rounded-full object-cover"
                      whileHover={{ scale: 1.05 }}
                    />
                  </div>

                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-cyan-300 text-sm mb-2">{member.role}</p>
                    <p
                      className={`text-gray-400 text-xs mb-4 ${
                        index === currentIndex ? "line-clamp-4" : "line-clamp-2"
                      }`}
                    >
                      {member.bio || member.quote || `${member.name}'s profile`}
                    </p>

                    <div className="flex flex-wrap justify-center gap-1 mb-4">
                      {member.skill
                        ?.split(",")
                        .slice(0, index === currentIndex ? 3 : 2)
                        .map((skill, i) => (
                          <motion.span
                            key={i}
                            className={`px-2 py-0.5 rounded-full text-xs ${
                              index === currentIndex
                                ? "bg-cyan-900/30 text-cyan-300 border border-cyan-400/20"
                                : "bg-gray-800/50 text-gray-400"
                            }`}
                            whileHover={{ scale: 1.1 }}
                          >
                            {skill.trim()}
                          </motion.span>
                        ))}
                    </div>

                    <motion.div
                      className="flex justify-center"
                      animate={{
                        opacity: index === currentIndex ? 1 : 0,
                        y: index === currentIndex ? 0 : 10,
                      }}
                    >
                      <button className="px-4 py-1.5 bg-gradient-to-r from-cyan-600 to-blue-700 rounded-full text-xs font-medium shadow-lg hover:shadow-cyan-500/40 transition-all">
                        View Profile
                      </button>
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunitySlider;
