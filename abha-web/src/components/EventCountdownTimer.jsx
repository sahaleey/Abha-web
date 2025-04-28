import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CountdownPage = () => {
  const eventDate = new Date("2025-05-10T00:00:00");
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const distance = eventDate - now;

      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] min-h-screen flex justify-center items-center text-white px-6 py-16">
      <motion.div
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-10 w-full max-w-5xl text-center shadow-2xl border border-amber-300/30"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold mb-10 text-amber-400 font-bloomsburg"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          The Countdown to Our Event Begins!
        </motion.h1>

        <div className="flex flex-wrap justify-center gap-8">
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.minutes },
            { label: "Seconds", value: timeLeft.seconds },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-amber-400/40 to-white/10 p-6 rounded-2xl shadow-md flex flex-col items-center w-32 md:w-36 hover:scale-110 transition-transform duration-300 backdrop-blur-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.2, duration: 0.6 }}
            >
              <div className="text-5xl md:text-6xl font-mono font-bold text-white drop-shadow-lg">
                {item.value !== undefined ? item.value : "0"}
              </div>
              <div className="uppercase tracking-wide mt-2 text-sm md:text-base text-amber-300 font-semibold">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default CountdownPage;
