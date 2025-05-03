import React, { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      setPosition({ x, y });

      const target = e.target;
      const isInteractive =
        target.closest("a") ||
        target.closest("button") ||
        target.closest("input") ||
        target.closest('[role="button"]');

      setIsHovering(isInteractive);
    };

    if (isDesktop) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("resize", checkScreenSize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  // Calculate transform strings
  const cursorTransform = `translate(calc(${position.x}px - 50%), calc(${position.y}px - 50%))`;
  const followerTransform = `translate(calc(${position.x}px - 50%), calc(${
    position.y
  }px - 50%)) ${isHovering ? "scale(1.2)" : "scale(1)"}`;

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none w-4 h-4 rounded-full transition-all duration-100 ease-out"
        style={{
          transform: cursorTransform,
          backgroundColor: isHovering
            ? "rgba(239, 68, 68, 0.9)"
            : "rgba(59, 130, 246, 0.9)",
          boxShadow: isHovering
            ? "0 0 0 2px rgba(239, 68, 68, 0.5)"
            : "0 0 0 2px rgba(59, 130, 246, 0.5)",
        }}
      />

      {/* Follower ring */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none w-8 h-8 rounded-full transition-all duration-300 ease-out"
        style={{
          transform: followerTransform,
          border: isHovering
            ? "2px solid rgba(239, 68, 68, 0.7)"
            : "2px solid rgba(59, 130, 246, 0.7)",
          opacity: isHovering ? 0.8 : 0.6,
          boxShadow: isHovering
            ? "0 0 10px rgba(239, 68, 68, 0.4)"
            : "0 0 10px rgba(59, 130, 246, 0.4)",
        }}
      />
    </>
  );
};

export default CustomCursor;
