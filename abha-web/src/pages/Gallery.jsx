import React, { useState } from "react";
import galleryData from "../data/galleryData";
import { motion } from "framer-motion";
import "../styles/Gallery.css"; // for custom CSS

const Gallery = () => {
  const [selectedEvent, setSelectedEvent] = useState("All");

  const filteredGallery = selectedEvent === "All"
    ? galleryData.flatMap(event => event.images)
    : galleryData.find(e => e.event === selectedEvent)?.images || [];

  return (
    <div className="bg-gradient-to-br mt-10 from-black via-gray-900 to-black min-h-screen px-4 md:px-20 py-16 text-white font-bloomsburg">
      <motion.h1
        className="text-5xl font-bold text-amber-400 text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Gallery
      </motion.h1>

      <div className="flex flex-wrap justify-center gap-4 mb-10">
        <button
          onClick={() => setSelectedEvent("All")}
          className={`filter-button ${selectedEvent === "All" ? "active" : ""}`}
        >
          All Events
        </button>
        {galleryData.map((event, i) => (
          <button
            key={i}
            onClick={() => setSelectedEvent(event.event)}
            className={`filter-button ${selectedEvent === event.event ? "active" : ""}`}
          >
            {event.event}
          </button>
        ))}
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: { staggerChildren: 0.1 }
          }
        }}
      >
        {filteredGallery.map((image, idx) => (
          <motion.div
            key={idx}
            className="gallery-card"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img src={image} alt="Gallery" className="gallery-image" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Gallery;
