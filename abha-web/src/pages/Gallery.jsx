import React, { useState, useMemo } from "react";
import galleryData from "../data/galleryData";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Image as ImageIcon, ZoomIn, Layers } from "lucide-react";

const Gallery = () => {
  const [selectedEvent, setSelectedEvent] = useState("All");

  // 1. Pro Logic: Flatten data but keep the 'category' info for every single image
  const allImages = useMemo(() => {
    return galleryData.flatMap((event) =>
      event.images.map((img) => ({
        src: img,
        category: event.event,
        id: Math.random().toString(36).substr(2, 9), // unique ID for animations
      }))
    );
  }, []);

  // 2. Filter Logic
  const filteredImages = useMemo(() => {
    if (selectedEvent === "All") return allImages;
    return allImages.filter((img) => img.category === selectedEvent);
  }, [selectedEvent, allImages]);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30">
      
      {/* --- Ambient Background --- */}
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-cyan-900/10 to-transparent opacity-50" />
         <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 md:px-8 py-20 md:py-24">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500 tracking-tight">
              Visuals
            </h1>
            <p className="mt-2 text-gray-400 flex items-center gap-2">
              <Layers size={16} className="text-cyan-400"/>
              Curated moments from our journey
            </p>
          </motion.div>

          {/* --- Stat Badge --- */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-3"
          >
            <ImageIcon size={18} className="text-cyan-400" />
            <span className="text-xl font-bold text-white">{filteredImages.length}</span>
            <span className="text-sm text-gray-500 uppercase tracking-wider">Shots</span>
          </motion.div>
        </div>

        {/* --- Sticky Filter Bar --- */}
        <div className="sticky top-24 z-40 mb-12 -mx-4 md:mx-0 overflow-x-auto no-scrollbar pb-4 md:pb-0">
          <motion.div 
             className="flex md:flex-wrap gap-2 px-4 md:px-0 min-w-max"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
          >
            <FilterButton 
              label="All Moments" 
              active={selectedEvent === "All"} 
              onClick={() => setSelectedEvent("All")} 
            />
            {galleryData.map((event, i) => (
              <FilterButton
                key={i}
                label={event.event}
                active={selectedEvent === event.event}
                onClick={() => setSelectedEvent(event.event)}
              />
            ))}
          </motion.div>
        </div>

        {/* --- MASONRY GRID (Pinterest Style) --- */}
        <motion.div 
           layout 
           className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image) => (
              <motion.div
                layout
                key={image.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="break-inside-avoid relative group rounded-2xl overflow-hidden cursor-zoom-in bg-gray-900 mb-4"
              >
                {/* Image */}
                <img
                  src={image.src}
                  alt={image.category}
                  className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110 will-change-transform"
                  loading="lazy"
                />

                {/* Overlay (Pinterest style hover) */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                   <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="inline-block px-2 py-1 bg-cyan-500/20 text-cyan-300 text-[10px] font-bold uppercase tracking-wider rounded mb-2 border border-cyan-500/20">
                        {image.category}
                      </span>
                      <div className="flex justify-between items-center">
                        <span className="text-white text-sm font-medium">View Full</span>
                        <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm text-white hover:bg-white hover:text-black transition-colors">
                          <ZoomIn size={16} />
                        </div>
                      </div>
                   </div>
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-32 text-gray-500">
            <p>No images found for this category.</p>
          </div>
        )}

      </div>
    </div>
  );
};

// --- Sub-Component: Filter Button ---
const FilterButton = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
      active
        ? "text-black bg-white shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105"
        : "text-gray-400 bg-white/5 hover:bg-white/10 hover:text-white border border-white/5"
    }`}
  >
    {label}
  </button>
);

export default Gallery;