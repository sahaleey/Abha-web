import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  alreadyDoneProgrammes,
  wantToDoProgrammes,
} from "../data/programmeData";
import WingGraphs from "../components/WingGraphs";

// Glow gradient background component
const GradientBackground = () => (
  <div className="fixed inset-0 overflow-hidden -z-30">
    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-amber-900/20"></div>
    <div className="absolute top-0 left-1/4 w-1/3 h-1/3 bg-purple-600 rounded-full filter blur-[100px] opacity-10"></div>
    <div className="absolute bottom-0 right-1/4 w-1/3 h-1/3 bg-amber-600 rounded-full filter blur-[100px] opacity-10"></div>
  </div>
);

// Floating animated shapes
const FloatingShapes = () => (
  <>
    <motion.div
      className="absolute top-20 left-10 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full"
      animate={{
        y: [0, -20, 0],
        x: [0, 10, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    <motion.div
      className="absolute bottom-20 right-10 w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full"
      animate={{
        y: [0, 30, 0],
        x: [0, -15, 0],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1,
      }}
    />
    <motion.div
      className="absolute top-1/3 right-1/4 w-8 h-8 bg-cyan-400 rounded-full"
      animate={{
        y: [0, -15, 0],
        x: [0, 20, 0],
        opacity: [0.6, 1, 0.6],
      }}
      transition={{
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.5,
      }}
    />
  </>
);

const ProgrammeCard = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <>
      <motion.div
        onClick={() => setExpanded(!expanded)}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] border border-gray-800 rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all duration-200 ease-out group"
        whileHover={{
          scale: 1.02,
          boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.3)",
        }}
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          delay: 0.05,
        }}
      >
        {/* Glow effect */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-amber-500/10 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
            exit={{ opacity: 0 }}
          />
        )}

        {/* Image section with zoom button */}
        <motion.div className="relative overflow-hidden">
          <motion.img
            rel="preload"
            src={item.image}
            alt={item.name}
            className="w-full h-48 object-cover"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: 0.1,
            }}
          />

          {/* Zoom button */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation(); // Prevent card expansion on zoom button click
              setIsZoomed(true);
            }}
            className="absolute top-2 right-2 bg-white/10 backdrop-blur-sm p-2 rounded-full text-white border border-white/20 transition-transform duration-100 hover:scale-110 active:scale-95"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="Zoom Image"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zm-7-2v5m0 0H8m5 0h5"
              />
            </svg>
          </motion.button>

          {/* Always visible mini details */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-md font-semibold text-white truncate">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-300 truncate">{item.host}</p>
              </div>
              <button className="text-xs bg-white/10 backdrop-blur-sm px-2 py-1 rounded-full text-white border border-white/20 transition-transform duration-100 hover:scale-105 active:scale-95">
                {expanded ? "▲ Less" : "▼ More"}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Expanded details */}
        <motion.div
          layout
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: expanded ? 1 : 0,
            height: expanded ? "auto" : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
            duration: 0.3,
          }}
          className="overflow-hidden"
        >
          <div className="px-4 py-3">
            <div className="grid grid-cols-2 gap-3 mb-3">
              {/* Host */}
              <div className="flex items-start">
                <div className="w-6 h-6 bg-purple-500/20 rounded-full mr-2 flex-shrink-0 flex items-center justify-center mt-0.5">
                  <svg
                    className="w-3 h-3 text-purple-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Host</p>
                  <p className="text-sm font-medium text-white">{item.host}</p>
                </div>
              </div>

              {/* Time */}
              <div className="flex items-start">
                <div className="w-6 h-6 bg-blue-500/20 rounded-full mr-2 flex-shrink-0 flex items-center justify-center mt-0.5">
                  <svg
                    className="w-3 h-3 text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Time</p>
                  <p className="text-sm font-medium text-white">{item.time}</p>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-start">
                <div className="w-6 h-6 bg-green-500/20 rounded-full mr-2 flex-shrink-0 flex items-center justify-center mt-0.5">
                  <svg
                    className="w-3 h-3 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Date</p>
                  <p className="text-sm font-medium text-white">{item.date}</p>
                </div>
              </div>

              {/* Stage */}
              <div className="flex items-start">
                <div className="w-6 h-6 bg-amber-500/20 rounded-full mr-2 flex-shrink-0 flex items-center justify-center mt-0.5">
                  <svg
                    className="w-3 h-3 text-amber-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
                    <path d="M3.31 9.397L5 10.532v4.695c0 1.113.856 2.033 1.908 2.033h6.184c1.052 0 1.908-.92 1.908-2.033v-4.695l1.69-1.135a1 1 0 00.242-1.403l-7-9a1 1 0 00-1.45 0l-7 9a1 1 0 00.242 1.403z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Stage</p>
                  <p className="text-sm font-medium text-white">{item.stage}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-3 pt-3 border-t border-gray-800">
              <h4 className="text-xs font-semibold text-gray-300 mb-1">
                Description
              </h4>
              <p className="text-sm text-gray-300 leading-snug">
                {item.description}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Full-screen image zoom overlay */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsZoomed(false)}
          >
            <motion.div
              className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
            >
              <motion.img
                src={item.image}
                alt={item.name}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
              <motion.button
                onClick={() => setIsZoomed(false)}
                className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm p-2 rounded-full text-white border border-white/20 transition-transform duration-100 hover:scale-110 active:scale-95"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title="Close Zoom"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const ProgrammeBox = ({ title, programmes }) => {
  return (
    <motion.div
      className="bg-gradient-to-br from-[#1e1e1e] to-[#2a2a2a] w-full max-w-[850px] rounded-xl p-6 shadow-xl border border-gray-800 hover:border-gray-700 transition-all duration-500"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 10,
        delay: 0.3,
      }}
      whileHover={{
        boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.3)",
        y: -5,
      }}
    >
      <motion.h2
        className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: 0.5,
          type: "spring",
          stiffness: 150,
        }}
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.3 },
        }}
      >
        {title}
      </motion.h2>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        {programmes.map((item, index) => (
          <ProgrammeCard key={item.id} item={item} custom={index} />
        ))}
      </div>
    </motion.div>
  );
};

const Programmes = () => {
  return (
    <div className="min-h-screen mt-17 pt-20 font-sans p-4 sm:p-6 md:p-10 flex flex-col items-center gap-12 relative overflow-hidden">
      <GradientBackground />
      <FloatingShapes />

      <motion.div
        className="text-center max-w-4xl mx-auto relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <motion.h1
          className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-amber-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.4,
            type: "spring",
            stiffness: 100,
          }}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.3 },
          }}
        >
          Our Programs
        </motion.h1>
        <motion.p
          className="text-lg text-gray-300 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Explore our completed initiatives and upcoming projects that drive
          innovation and excellence.
        </motion.p>
      </motion.div>

      <div className="flex flex-col xl:flex-row gap-10 items-center xl:items-start w-full justify-center relative z-10">
        <ProgrammeBox
          title="Completed Programmes"
          programmes={alreadyDoneProgrammes}
        />
        <ProgrammeBox
          title="Upcoming Programmes"
          programmes={wantToDoProgrammes}
        />
      </div>

      <motion.div
        className="w-full max-w-6xl relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <WingGraphs />
      </motion.div>
    </div>
  );
};

export default Programmes;
