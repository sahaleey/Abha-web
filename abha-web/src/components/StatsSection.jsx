import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useState } from "react";
import { useInView } from "react-intersection-observer";

const StatsSection = () => {
  const stats = [
    { count: 250, suffix: "+", label: "Programmes", delay: 0.2 },
    { count: 250, suffix: "+", label: "Upcoming Events", delay: 0.4 },
    { count: 26, suffix: "+", label: "Members", delay: 0.6 },
    { count: 20, suffix: "+", label: "Projects", delay: 0.8 },
  ];

  const { ref, inView } = useInView({ triggerOnce: true }); // triggerOnce = true (important!)
  const [startCount, setStartCount] = useState(false);

  if (inView && !startCount) {
    setStartCount(true);
  }

  return (
    <div
      ref={ref}
      className="mt-32 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10 w-full max-w-6xl mx-auto px-6"
    >
      {stats.map((item, index) => (
        <motion.div
          key={index}
          className="bg-gradient-to-br from-[#1c1c1c] via-[#111] to-[#1c1c1c] backdrop-blur-xl rounded-2xl p-10 shadow-2xl border border-amber-400/30 hover:border-amber-400 transform hover:scale-110 transition-all duration-500 group"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: item.delay }}
        >
          <motion.h2 className="text-5xl font-bold text-white text-center group-hover:text-amber-400 transition-colors duration-300">
            {startCount ? (
              <CountUp
                start={0}
                end={item.count}
                duration={2}
                suffix={item.suffix}
              />
            ) : (
              "0" // before counting starts
            )}
          </motion.h2>

          <p className="text-lg mt-4 text-gray-400 text-center group-hover:text-white tracking-wider font-medium">
            {item.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsSection;
