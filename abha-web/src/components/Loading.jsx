import { motion } from "framer-motion";

// You can move this to a separate file if needed
export default AbhaLoader = () => {
  const letters = ["A", "B", "H", "A"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1e2425]">
      <div className="flex space-x-4">
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            className="text-6xl font-extrabold text-[#ce9206] font-bloomsburg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.2,
              duration: 0.6,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
    </div>
  );
};
