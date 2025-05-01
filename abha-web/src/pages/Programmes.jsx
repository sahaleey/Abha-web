import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import WingGraphs from "../components/WingGraphs";

// ProgrammeCard Component
const ProgrammeCard = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    return `${hour > 12 ? hour - 12 : hour}:${minutes} ${
      hour >= 12 ? "PM" : "AM"
    }`;
  };

  return (
    <motion.div
      onClick={() => setExpanded(!expanded)}
      className="bg-[#1f1f1f] border border-gray-700 rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-200 ease-out"
      whileHover={{ scale: 1.03 }}
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {item.image?.url && (
        <motion.img
          src={item.image.url}
          alt={item.name}
          className="w-full h-48 object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      )}
      <div className="p-4">
        <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
        <p className="text-sm text-gray-400 mb-1">
          <span className="font-medium">Host:</span> {item.host}
        </p>
        <p className="text-sm text-gray-400 mb-1">
          <span className="font-medium">Date:</span> {formatDate(item.date)}
        </p>
        <p className="text-sm text-gray-400">
          <span className="font-medium">Time:</span>{" "}
          {formatTime(item.startTime)}
        </p>

        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-3"
          >
            <p className="text-sm text-gray-400 mb-1">
              <span className="font-medium">Stage:</span> {item.stage}
            </p>
            <p className="text-sm text-white mt-2">{item.description}</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

// ProgrammeBox Component
const ProgrammeBox = ({ title, programmes }) => {
  if (programmes.length === 0) return null;

  return (
    <motion.div
      className="bg-[#2a2a2a] w-full max-w-[800px] rounded-xl p-5 shadow-lg hover:shadow-2xl transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold text-white text-center mb-6">
        {title}
      </h2>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        {programmes.map((item) => (
          <ProgrammeCard key={item._id} item={item} />
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
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProgrammes = async () => {
      try {
        const response = await axios.get(
          "https://abha-web-1.onrender.com/api/programmes"
        );
        const programmes = response.data;

        setUploadedProgrammes(
          programmes.filter((p) => p.category === "already_done")
        );
        setWantToDoProgrammes(
          programmes.filter((p) => p.category === "want_to_do")
        );
      } catch (err) {
        console.error("Error fetching programmes:", err);
        setError("Failed to load programmes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProgrammes();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-tr from-[#0f0c29] via-[#302b63] to-[#24243e]">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-tr from-[#0f0c29] via-[#302b63] to-[#24243e]">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-17 p-4 sm:p-6 md:p-8 bg-gradient-to-tr from-[#0f0c29] via-[#302b63] to-[#24243e]">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-white text-center mb-8 md:mb-12"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Programmes
        </motion.h1>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start justify-center">
          {wantToDoProgrammes.length > 0 && (
            <ProgrammeBox
              title="Upcoming Events"
              programmes={wantToDoProgrammes}
            />
          )}

          {uploadedProgrammes.length > 0 && (
            <ProgrammeBox title="Past Events" programmes={uploadedProgrammes} />
          )}
        </div>

        {wantToDoProgrammes.length === 0 && uploadedProgrammes.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">No programmes available yet</p>
          </div>
        )}

        <WingGraphs />
      </motion.div>
    </div>
  );
};

export default Programmes;
