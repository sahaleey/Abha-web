import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaBookOpen,
  FaLanguage,
  FaPenAlt,
  FaHandshake,
  FaBrain,
  FaMicroscope,
  FaLightbulb,
} from "react-icons/fa";
import { GiSpellBook } from "react-icons/gi";
import { MdTranslate } from "react-icons/md";

const About = () => {
  const wings = [
    {
      name: "ABHA Academia",
      desc: "Spearheading knowledge acquisition through structured learning programs and research initiatives",
      icon: <FaBookOpen className="text-3xl text-purple-400" />,
      color: "from-purple-500/10 to-purple-600/10",
    },
    {
      name: "Arabic Wing",
      desc: "Mastering the language of the Quran through immersive study and cultural exchange",
      icon: <FaLanguage className="text-3xl text-blue-400" />,
      color: "from-blue-500/10 to-blue-600/10",
    },
    {
      name: "English Wing",
      desc: "Cultivating global communicators through language excellence and creative expression",
      icon: <GiSpellBook className="text-3xl text-amber-400" />,
      color: "from-amber-500/10 to-amber-600/10",
    },
    {
      name: "Urdu Wing",
      desc: "Preserving linguistic heritage through poetry, literature, and artistic expression",
      icon: <MdTranslate className="text-3xl text-emerald-400" />,
      color: "from-emerald-500/10 to-emerald-600/10",
    },
    {
      name: "Malayalam Wing",
      desc: "Celebrating regional identity through language, arts, and cultural preservation",
      icon: <FaPenAlt className="text-3xl text-rose-400" />,
      color: "from-rose-500/10 to-rose-600/10",
    },
    {
      name: "Social Affairs Wing",
      desc: "Building bridges through community engagement and interpersonal connections",
      icon: <FaHandshake className="text-3xl text-cyan-400" />,
      color: "from-cyan-500/10 to-cyan-600/10",
    },
    {
      name: "IQ Orbit Wing",
      desc: "Expanding intellectual horizons through critical thinking and knowledge exploration",
      icon: <FaBrain className="text-3xl text-indigo-400" />,
      color: "from-indigo-500/10 to-indigo-600/10",
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0a0a0f] to-[#1a1a25] text-white pt-24 pb-20 px-6 md:px-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-10">
        <div className="absolute inset-0 bg-[url('/grid.svg')]"></div>
      </div>
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/3 -right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -z-10"></div>

      {/* Hero Section */}
      <motion.div
        className="text-center mb-24"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500 mb-6"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          About ABHA
        </motion.h1>
        <motion.p
          className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Where{" "}
          <span className="text-amber-400">tradition meets innovation</span> - a
          dynamic ecosystem nurturing holistic development through specialized
          wings
        </motion.p>
      </motion.div>

      {/* Who We Are */}
      <motion.section
        className="mb-28 max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12"
          whileHover={{ y: -5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            Our Holistic Framework
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            ABHA operates through an{" "}
            <span className="text-amber-400">
              interconnected network of specialized wings
            </span>
            , each functioning as an autonomous yet collaborative unit. This
            modular structure allows us to maintain focus on specific domains
            while synergizing for larger initiatives. Our framework combines{" "}
            <span className="text-cyan-400">academic rigor</span>,{" "}
            <span className="text-purple-400">cultural preservation</span>, and{" "}
            <span className="text-emerald-400">innovative thinking</span> to
            create a comprehensive development ecosystem.
          </p>
        </motion.div>
      </motion.section>

      {/* Our Wings */}
      <motion.section
        className="mb-28"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
          Our Specialized Wings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wings.map((wing, idx) => (
            <motion.div
              key={idx}
              className="group relative overflow-hidden rounded-2xl border border-white/10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${wing.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              ></div>
              <div className="p-6 relative z-10 h-full flex flex-col">
                <div className="mb-4 flex justify-between items-start">
                  {wing.icon}
                  <span className="text-xs px-2 py-1 bg-white/10 rounded-full">
                    {idx + 1}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {wing.name}
                </h3>
                <p className="text-gray-400 flex-grow">{wing.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* What We Do */}
      <motion.section
        className="mb-28 max-w-5xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Integrated Wing Operations
          </h2>
          <ul className="space-y-6">
            {[
              "Cross-wing collaborative projects that leverage diverse expertise",
              "Monthly inter-wing knowledge exchange sessions",
              "Joint cultural festivals showcasing all linguistic traditions",
              "Integrated research initiatives combining multiple disciplines",
              "Coordinated community outreach programs",
              "Unified digital platform connecting all wing activities",
            ].map((item, idx) => (
              <motion.li
                key={idx}
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <span className="text-amber-400 mr-3 mt-1">▹</span>
                <span className="text-gray-300">{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.p
          className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
          whileHover={{ scale: 1.02 }}
        >
          Discover how our{" "}
          <span className="text-amber-400">wing ecosystem</span> can elevate
          your potential
        </motion.p>
        <Link to="/get-in-touch">
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-black font-bold rounded-xl relative overflow-hidden group"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgba(245, 158, 11, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Connect With Our Wings</span>
            <span className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default About;
