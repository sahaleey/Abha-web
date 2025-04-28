import React, { useEffect, useRef } from "react";

const CustomCursor = () => {
  const outlineRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      const { clientX: x, clientY: y } = e;

      if (outlineRef.current && dotRef.current) {
        outlineRef.current.style.transform = `translate(${x}px, ${y}px)`;
        dotRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <>
      {/* Outer glowing outline */}
      <div
        ref={outlineRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none w-10 h-10 border-2 border-gradient-to-r from-pink-500 via-purple-600 to-blue-500 rounded-full mix-blend-difference shadow-lg transition-transform duration-200 ease-out -translate-x-1/2 -translate-y-1/2 backdrop-invert animate-pulse"
      ></div>

      {/* Inner solid dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none w-3 h-3 bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 rounded-full mix-blend-difference shadow-lg transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2 transform scale-0 hover:scale-100"
      ></div>
    </>
  );
};

export default CustomCursor;
