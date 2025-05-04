import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiCalendar, FiClock, FiGift } from "react-icons/fi";

const CountdownPage = () => {
  const eventDate = new Date("0-0-0T00:00:00");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isEventStarted, setIsEventStarted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const distance = eventDate - now;

      if (distance <= 0) {
        clearInterval(interval);
        setIsEventStarted(true);
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
    <div className="relative min-h-screen bg-gradient-to-br from-[#0a0a0f] to-[#1a1a25] text-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 -z-10"></div>
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/3 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>

      <div className="container mx-auto px-6 py-24 flex flex-col items-center justify-center">
        {isEventStarted ? (
          <motion.div
            className="text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring" }}
          >
            <motion.div
              className="text-8xl mb-6"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              🎉
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500 mb-6">
              The Event Has Begun!
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join us now for an unforgettable experience.
            </p>
            <motion.button
              className="mt-8 px-8 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-black font-bold rounded-xl hover:shadow-lg hover:shadow-amber-400/30 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Event
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            className="w-full max-w-4xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Header */}
            <motion.div
              className="text-center mb-16"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-center mb-4">
                <motion.div
                  className="p-4 bg-amber-400/10 rounded-full border border-amber-400/30"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <FiCalendar className="text-3xl text-amber-400" />
                </motion.div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500 mb-4">
                Countdown to Our Grand Event
              </h1>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Mark your calendars {/*for May 10, 2025*/}
              </p>
            </motion.div>

            {/* Countdown */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {[
                { label: "Days", value: timeLeft.days, icon: <FiCalendar /> },
                { label: "Hours", value: timeLeft.hours, icon: <FiClock /> },
                {
                  label: "Minutes",
                  value: timeLeft.minutes,
                  icon: <FiClock />,
                },
                { label: "Seconds", value: timeLeft.seconds, icon: <FiGift /> },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="text-amber-400 mb-2 flex justify-center">
                    {item.icon}
                  </div>
                  <div className="text-5xl font-mono font-bold text-white mb-2">
                    {item.value !== undefined ? item.value : "00"}
                  </div>
                  <div className="text-sm uppercase tracking-wider text-gray-400">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              className="mb-12"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1 }}
            >
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-400 to-orange-500"
                  initial={{ width: "0%" }}
                  animate={{
                    width: `${100 - (timeLeft.days / 365) * 100}%`,
                  }}
                  transition={{ duration: 1 }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>Today</span>
                {/* <span>May 10, 2025</span> */}
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <p className="text-gray-300 mb-6">
                Get ready for an unforgettable experience
              </p>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CountdownPage;
