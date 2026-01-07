import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, MapPin, User, ChevronDown, Maximize2, X, Sparkles } from "lucide-react";
import { alreadyDoneProgrammes } from "../data/programmeData";
import WingGraphs from "../components/WingGraphs";

const Programmes = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 font-sans pt-24 pb-20 px-4 md:px-8 relative overflow-hidden">
      
      {/* --- Cyberpunk Background --- */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-20">
        
        {/* --- Header --- */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-purple-400 font-mono tracking-widest uppercase"
          >
             <Sparkles size={12} /> Event Archives
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500 tracking-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            Executed Programs
          </motion.h1>
          
          <motion.p 
            className="text-gray-400 text-lg md:text-xl leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            A showcase of the initiatives, workshops, and cultural events we've successfully delivered.
          </motion.p>
        </div>

        {/* --- The Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
           {alreadyDoneProgrammes.map((item, index) => (
              <ProgrammeCard key={item.id || index} item={item} index={index} />
           ))}
        </div>

        {/* --- Analytics Section --- */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl overflow-hidden"
        >
           <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent pointer-events-none" />
           <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                 <span className="w-1 h-8 bg-purple-500 rounded-full" />
                 Wing Performance Analytics
              </h3>
              <WingGraphs />
           </div>
        </motion.div>

      </div>
    </div>
  );
};

// --- Sub-Component: The Holographic Card ---
const ProgrammeCard = ({ item, index }) => {
  const [expanded, setExpanded] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        className={`group relative bg-[#0f0f13] rounded-2xl border border-white/10 overflow-hidden hover:border-purple-500/30 transition-all duration-500 ${expanded ? 'shadow-[0_0_30px_rgba(168,85,247,0.15)]' : 'hover:shadow-lg'}`}
      >
        
        {/* Image Section */}
        <div className="relative h-52 overflow-hidden cursor-pointer" onClick={() => setExpanded(!expanded)}>
           <motion.img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f13] via-[#0f0f13]/20 to-transparent opacity-90" />
           
           {/* Floating Badge (Stage) */}
           <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 rounded-lg text-xs font-bold text-white uppercase tracking-wider">
              {item.stage || "Main Stage"}
           </div>

           {/* Zoom Button */}
           <button 
              onClick={(e) => { e.stopPropagation(); setIsZoomed(true); }}
              className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-md rounded-full text-white/70 hover:text-white hover:bg-white/20 transition-all"
           >
              <Maximize2 size={16} />
           </button>

           {/* Title Overlay */}
           <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-xl font-bold text-white leading-tight mb-1 group-hover:text-purple-400 transition-colors">
                 {item.name}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                 <User size={14} className="text-purple-500" />
                 {item.host}
              </div>
           </div>
        </div>

        {/* Content Section */}
        <div className="p-5 pt-2">
           {/* Metadata Grid */}
           <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-2 text-xs text-gray-400 bg-white/5 p-2 rounded-lg border border-white/5">
                 <Calendar size={14} className="text-cyan-400" />
                 {item.date}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400 bg-white/5 p-2 rounded-lg border border-white/5">
                 <Clock size={14} className="text-amber-400" />
                 {item.time}
              </div>
           </div>

           {/* Expanded Description */}
           <motion.div
              initial={false}
              animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
              className="overflow-hidden"
           >
              <div className="pt-2 pb-4 border-t border-white/10">
                 <p className="text-sm text-gray-300 leading-relaxed">
                    {item.description}
                 </p>
              </div>
           </motion.div>

           {/* Expand Toggle */}
           <button 
              onClick={() => setExpanded(!expanded)}
              className="w-full py-2 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-all"
           >
              {expanded ? "Close Details" : "View Details"}
              <motion.div animate={{ rotate: expanded ? 180 : 0 }}>
                 <ChevronDown size={14} />
              </motion.div>
           </button>
        </div>
      </motion.div>

      {/* --- Lightbox Modal --- */}
      <AnimatePresence>
         {isZoomed && (
            <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }}
               className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
               onClick={() => setIsZoomed(false)}
            >
               <button className="absolute top-6 right-6 p-3 bg-white/10 rounded-full hover:bg-white/20 text-white transition-all">
                  <X size={24} />
               </button>
               <motion.img 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  src={item.image} 
                  alt={item.name} 
                  className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl border border-white/10"
                  onClick={(e) => e.stopPropagation()}
               />
            </motion.div>
         )}
      </AnimatePresence>
    </>
  );
};

export default Programmes;