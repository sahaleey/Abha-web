import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Wifi } from "lucide-react";
import communityMembers from "../data/communityBio";

const CommunitySlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const classTeacher = communityMembers.find((m) => m.isClassTeacher);
  const sliderMembers = communityMembers.filter((m) => !m.isClassTeacher);

  // Auto-rotate the slider (pauses on hover)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === sliderMembers.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, sliderMembers.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="relative py-24 px-4 min-h-[900px] overflow-hidden bg-[#050505] text-white perspective-1000">
      
      {/* --- Ambient Background --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        
        {/* --- Header --- */}
        <div className="text-center mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-sm text-cyan-400 font-mono tracking-wider"
          >
            <ShieldCheck size={14} /> UNION DATABASE // AUTH_REQ
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500"
          >
            Our Community
          </motion.h2>
        </div>

        {/* --- Class Teacher (Static - No Flip) --- */}
        {classTeacher && (
          <div className="flex justify-center mb-24">
             {/* Passed disableFlip={true} here */}
             <MembershipCard member={classTeacher} isLeader={true} disableFlip={true} />
          </div>
        )}

        {/* --- 3D Carousel --- */}
        <div 
          className="relative h-[500px] w-full flex items-center justify-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="popLayout">
            {sliderMembers.map((member, index) => {
              // Calculate position relative to current index
              let offset = index - currentIndex;
              
              // Handle infinite loop logic nicely
              if (offset < -2) offset += sliderMembers.length;
              if (offset > 2) offset -= sliderMembers.length;
              
              // Only render visible cards (optimization)
              if (Math.abs(offset) > 2) return null;

              return (
                <motion.div
                  key={member.slug || index}
                  className="absolute"
                  initial={false}
                  animate={{
                    x: offset * 320, // Spacing between cards
                    scale: offset === 0 ? 1 : 0.85,
                    opacity: offset === 0 ? 1 : Math.abs(offset) === 1 ? 0.6 : 0.3,
                    zIndex: offset === 0 ? 50 : 50 - Math.abs(offset),
                    rotateY: offset * -15, // Subtle 3D turn for side cards
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  style={{
                     perspective: "1500px",
                  }}
                  onClick={() => goToSlide(index)}
                >
                   {/* Students allow flip */}
                   <MembershipCard 
                      member={member} 
                      isActive={offset === 0}
                      disableFlip={false}
                   />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* --- Navigation Dots --- */}
        <div className="flex justify-center gap-3 mt-12">
          {sliderMembers.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`h-1 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "w-8 bg-cyan-400" : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

// --- SUB-COMPONENT: The Flip Card ---
const MembershipCard = ({ member, isLeader = false, isActive = true, disableFlip = false }) => {
  return (
    <div className={`group relative w-[320px] h-[480px] perspective-1000 ${isActive ? 'cursor-pointer' : 'pointer-events-none'}`}>
      
      {/* The Flipper Container */}
      <motion.div
        className={`relative w-full h-full transition-all duration-700 preserve-3d ${!disableFlip ? "group-hover:rotate-y-180" : ""}`}
        style={{ transformStyle: "preserve-3d" }}
      >
        
        {/* === FRONT SIDE (The Portrait) === */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden border border-white/10 bg-gray-900 shadow-2xl">
          {/* Image */}
          <div className="absolute inset-0">
             <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500" 
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
          </div>
          
          {/* Overlay Info */}
          <div className="absolute bottom-0 left-0 w-full p-6">
             <div className="flex items-center gap-2 mb-2">
                <div className={`w-2 h-2 rounded-full ${isLeader ? 'bg-amber-400' : 'bg-cyan-400'} animate-pulse`} />
                <span className="text-xs tracking-widest uppercase text-white/70">{isLeader ? 'Class Lead' : 'Union Member'}</span>
             </div>
             <h3 className="text-3xl font-bold text-white mb-1 leading-tight">{member.name}</h3>
             <p className="text-white/60 text-sm font-mono truncate">{member.role}</p>
          </div>
          
          {/* Decoration */}
          <div className="absolute top-4 right-4 text-white/30">
            <Wifi size={20} />
          </div>
        </div>


        {/* === BACK SIDE (The Membership Card Image) === */}
        {/* Only render back side if flipping is enabled */}
        {!disableFlip && (
            <div 
              className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl overflow-hidden border border-white/20 bg-black shadow-2xl"
            >
              {/* NOTE: Ensure your data objects have 'cardImage' property! */}
              {member.cardImage ? (
                  <img 
                    src={member.cardImage} 
                    alt={`${member.name} Membership Card`} 
                    className="w-full h-full object-contain bg-black" 
                  />
              ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center p-6 text-gray-500">
                      <p>Membership Card Image Not Found</p>
                      <p className="text-xs mt-2">(Add "cardImage" to your data)</p>
                  </div>
              )}
            </div>
        )}

      </motion.div>
    </div>
  );
};

export default CommunitySlider;