import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="flex-grow bg-black mt-10 text-white px-6 md:px-20 py-16">
      {/* Hero */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl font-bold text-amber-400 font-bloomsburg tracking-wider hover:text-amber-500 transform transition duration-500 ease-in-out hover:scale-110">
          About ABHA
        </h1>
        <p className="text-gray-300 mt-4 font-bloomsburg text-lg max-w-2xl mx-auto">
          A community that breathes creativity, collaboration, and celebration.
        </p>
      </motion.div>

      {/* About Section */}
      <motion.section
        className="mb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
      >
        <h2 className="text-3xl font-semibold text-amber-300 font-bloomsburg mb-4 hover:text-amber-400">
          Who We Are
        </h2>
        <p className="text-gray-300 leading-relaxed font-bloomsburg text-lg">
          Abha is a vibrant student-led community that believes in the power of
          connection, creativity, and contribution. We unite individuals with
          diverse skills and passions to create impact-driven experiences.
        </p>
      </motion.section>

      {/* Sub Wings Section */}
      <motion.section
        className="mb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
      >
        <h2 className="text-3xl font-semibold text-amber-300 mb-6 font-bloomsburg hover:text-amber-400">
          Our Wings
        </h2>
        <div className="grid grid-cols-1 font-bloomsburg md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: "Academic", desc: "Maintains the Academic sessions" },
            { name: "Arabic", desc: "Creative UI/UX and branding heroes" },
            { name: "English", desc: "Storytellers and wordsmiths" },
            { name: "Urdu", desc: "Photo & video creators" },
            { name: "Malayalam", desc: "Organizing every moment" },
            { name: "Social Affairs", desc: "Outreach & internal bonding" },
            { name: "G.K", desc: "Outreach & internal bonding" },
          ].map((wing, idx) => (
            <motion.div
              key={idx}
              className="bg-neutral-900 p-6 rounded-2xl shadow-md hover:scale-105 transition-transform duration-500 hover:bg-amber-600 hover:text-white transform hover:shadow-lg hover:shadow-amber-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 + idx * 0.2, duration: 0.8 }}
            >
              <h3 className="text-xl font-bold text-emerald-400 mb-2">
                {wing.name}
              </h3>
              <p className="text-gray-400 text-sm">{wing.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* What We Do */}
      <motion.section
        className="mb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        <h2 className="text-3xl font-semibold font-bloomsburg text-amber-300 mb-4 hover:text-amber-400">
          What We Do
        </h2>
        <ul className="list-disc list-inside font-bloomsburg text-gray-300 leading-loose space-y-3">
          <li>Organize creative and technical workshops</li>
          <li>Build community-led digital products</li>
          <li>Publish blogs, stories, and design portfolios</li>
          <li>Host cultural and tech events</li>
          <li>Celebrate every member’s journey</li>
        </ul>
      </motion.section>

      {/* Timeline (Optional placeholder) */}
      <motion.section
        className="mb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        <h2 className="text-3xl font-semibold font-bloomsburg text-amber-300 mb-6 hover:text-amber-400">
          Our Journey
        </h2>
        <p className="text-gray-400 font-bloomsburg italic">
          From small steps to big dreams, we’ve grown together.
        </p>
        {/* Add Timeline component here */}
      </motion.section>

      {/* Call to Action */}
      <motion.div
        className="text-center mt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 1 }}
      >
        <p className="text-xl text-gray-300 font-bloomsburg mb-6">
          Want to Connect with ABHA?
        </p>
        <Link to="/get-in-touch">
          <button className="mt-8 px-6 py-3 font-bloomsburg bg-amber-400 text-black font-bold rounded-xl hover:bg-gray-800 hover:border-2 hover:bg-gradient-to-tr from-cyan-200 via-cyan-400 to-cyan-700 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-cyan-300 hover:shadow-2xl">
            Get in Touch
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default About;
