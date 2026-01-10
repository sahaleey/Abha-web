import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Only run on desktop
    const checkScreenSize = () => {
      setIsDesktop(window.matchMedia("(min-width: 1024px)").matches);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      // Check for interactive elements
      const isInteractive =
        target.closest("a") ||
        target.closest("button") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest(".cursor-pointer") ||
        window.getComputedStyle(target).cursor === "pointer";

      setIsHovering(!!isInteractive);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    if (isDesktop) {
      window.addEventListener("mousemove", handleMouseMove);
      document.body.addEventListener("mouseleave", handleMouseLeave);
      document.body.addEventListener("mouseenter", handleMouseEnter);
      // Hide default cursor
      document.body.style.cursor = "none";
    }

    return () => {
      window.removeEventListener("resize", checkScreenSize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      document.body.style.cursor = "auto";
    };
  }, [isDesktop, isVisible]);

  if (!isDesktop) return null;

  return (
    <>
      {/* Main Pointer (Dot) */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full mix-blend-difference"
        style={{
          x: position.x - 4, // Center the 8px dot
          y: position.y - 4,
          backgroundColor: isHovering ? "#f59e0b" : "#22d3ee", // Amber on hover, Cyan default
        }}
        animate={{
          scale: isHovering ? 2 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.1 }}
      >
        <div className="w-2 h-2 rounded-full" />
      </motion.div>

      {/* Trailing Reticle (Ring) */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none border border-white mix-blend-difference rounded-full flex items-center justify-center"
        style={{
           x: position.x - 20, // Center the 40px ring
           y: position.y - 20,
        }}
        animate={{
          width: isHovering ? 60 : 40,
          height: isHovering ? 60 : 40,
          x: position.x - (isHovering ? 30 : 20),
          y: position.y - (isHovering ? 30 : 20),
          opacity: isVisible ? 1 : 0,
          borderColor: isHovering ? "#f59e0b" : "#ffffff",
          rotate: isHovering ? 45 : 0, // Diamond shape on hover
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.5,
        }}
      >
        {/* Optional: Crosshair lines inside the ring for that Sci-Fi feel */}
        {!isHovering && (
          <>
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-1 bg-white/50" />
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-1 bg-white/50" />
             <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-[1px] bg-white/50" />
             <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-[1px] bg-white/50" />
          </>
        )}
      </motion.div>
    </>
  );
};

export default CustomCursor;