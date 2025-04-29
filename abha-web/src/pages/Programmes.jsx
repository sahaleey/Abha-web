// src/pages/Programmes.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import WingGraphs from "../components/WingGraphs";

// ProgrammeCard Component
// ProgrammeCard Component
const ProgrammeCard = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  // Handle image URL logic
  const imageUrl = item.image
    ? item.image.startsWith("http")
      ? item.image // Remote image URL
      : `http://localhost:5000/uploads/${item.image}` // Ensure this matches your backend file path
    : null;

  return (
    <motion.div
      onClick={() => setExpanded(!expanded)}
      className="bg-[#1f1f1f] border border-gray-700 rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-200 ease-out"
      whileHover={{ scale: 1.05 }}
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.7 }}
    >
      {imageUrl && (
        <motion.img
          src={imageUrl}
          alt={item.name || item.programmeName}
          className="w-full h-40 object-cover transition-all duration-200"
          whileHover={{
            scale: 1.1,
            boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.4)",
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        />
      )}
      <motion.div
        layout
        className={`transition-all duration-300 px-4 pt-3 pb-4 ${
          expanded ? "block opacity-100" : "hidden opacity-0"
        }`}
      >
        <h3 className="text-lg font-bold text-white">
          {item.name || item.programmeName}
        </h3>
        <p className="text-sm text-gray-400">
          Stage: {item.stage || item.programmeStage}
        </p>
        <p className="text-sm text-gray-400">
          Date: {item.date || item.programmeDate}
        </p>
        <p className="text-sm text-gray-400">
          Lead by: {item.host || item.hoster}
        </p>
        <p className="text-sm text-white mt-2">{item.description}</p>
      </motion.div>
    </motion.div>
  );
};

// ProgrammeBox Component
const ProgrammeBox = ({ title, programmes }) => {
  return (
    <motion.div
      className="bg-[#2a2a2a] w-full max-w-[800px] rounded-xl p-5 shadow-lg hover:shadow-2xl transition-shadow duration-500 ease-in"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 1 }}
    >
      <h2 className="text-xl font-semibold text-white text-center mb-4 transform transition-all duration-200 hover:scale-105">
        {title}
      </h2>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        {programmes.map((item, idx) => (
          <ProgrammeCard key={item._id || item.id || idx} item={item} />
        ))}
      </div>
    </motion.div>
  );
};

// Programmes Page
const Programmes = () => {
  const [uploadedProgrammes, setUploadedProgrammes] = useState([]);
  const [wantToDoProgrammes, setWantToDoProgrammes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUploadedProgrammes();
  }, []);

  const fetchUploadedProgrammes = async () => {
    try {
      const response = await axios.get(
        "https://abha-web-1.onrender.com/api/programmes"
      );
      const programmes = response.data;

      const doneProgrammes = programmes.filter(
        (programme) => programme.category === "already_done"
      );
      const wantToDo = programmes.filter(
        (programme) => programme.category === "want_to_do"
      );

      setUploadedProgrammes(doneProgrammes);
      setWantToDoProgrammes(wantToDo);
    } catch (err) {
      console.error("Error fetching uploaded programmes:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-black">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-17 font-bloomsburg p-4 sm:p-6 md:p-10 flex flex-col items-center gap-10 relative">
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-black to-transparent opacity-50 -z-20"></div>

      <motion.h1
        className="text-4xl font-bold text-white text-center mb-6 z-10 relative transition-all duration-100 ease-in-out transform hover:scale-105"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Programmes
      </motion.h1>

      <div className="flex flex-col xl:flex-row gap-10 items-center xl:items-start w-full justify-center relative z-10">
        <ProgrammeBox title="Already Done" programmes={uploadedProgrammes} />
        <ProgrammeBox title="Want To Do" programmes={wantToDoProgrammes} />
      </div>

      <WingGraphs />

      {/* Decorative bouncing and pulsing balls */}
      <div className="absolute top-20 left-10 w-10 h-10 bg-purple-500 rounded-full animate-bounce"></div>
      <div className="absolute bottom-20 right-10 w-12 h-12 bg-yellow-500 rounded-full animate-pulse"></div>
    </div>
  );
};

export default Programmes;
