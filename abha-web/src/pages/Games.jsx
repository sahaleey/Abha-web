import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Gamepad2, Trophy, Brain, Sparkles, Zap } from "lucide-react";
import mcqData from "../data/mcqData";

const Games = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredGames, setFilteredGames] = useState(mcqData);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading sequence
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter Logic
  useEffect(() => {
    const results = mcqData.filter(
      (game) =>
        game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredGames(results);
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30 pt-24 pb-20 px-4 md:px-8 relative overflow-hidden">
      
      {/* --- Ambient Background --- */}
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px]" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[120px]" />
         <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* --- Header --- */}
        <div className="text-center mb-16 space-y-6">
          <motion.div
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-cyan-400 font-mono tracking-widest uppercase"
          >
             <Gamepad2 size={12} /> Arcade Zone
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-cyan-600 tracking-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            Skill Challenges
          </motion.h1>

          <motion.p 
            className="text-gray-400 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Select a simulation module to test your knowledge. Compete solo or challenge a team.
          </motion.p>
        </div>

        {/* --- Search Bar --- */}
        <motion.div 
            className="max-w-2xl mx-auto mb-16 relative group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
             <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 opacity-20 group-hover:opacity-40 blur transition duration-500 ${isSearchFocused ? 'opacity-60' : ''}`} />
             <div className="relative bg-[#0f0f13] rounded-xl flex items-center px-6 py-4 border border-white/10 shadow-2xl">
                <Search className="text-gray-400 mr-4" />
                <input 
                  type="text" 
                  placeholder="Search modules..." 
                  className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none text-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
             </div>
        </motion.div>

        {/* --- Game Grid --- */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            <AnimatePresence>
              {filteredGames.length > 0 ? (
                filteredGames.map((game) => (
                  <motion.div
                    key={game.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    whileHover={{ y: -10 }}
                    className="group relative bg-[#0f0f13] border border-white/10 rounded-3xl overflow-hidden hover:border-cyan-500/50 transition-all duration-500 shadow-2xl"
                  >
                    <Link to={`/games/${game.id}`} className="block h-full">
                      
                      {/* Image Area */}
                      <div className="relative h-64 overflow-hidden">
                        <img 
                          src={game.image || "/default-quiz.jpg"} 
                          alt={game.title} 
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f13] via-transparent to-transparent" />
                        
                        {/* Badges */}
                        <div className="absolute top-4 left-4 flex gap-2">
                           <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-xs font-bold text-white flex items-center gap-1">
                             <Brain size={12} className="text-cyan-400"/> {game.questions?.length || 10} Qs
                           </span>
                        </div>
                        <div className="absolute top-4 right-4">
                           <span className={`px-3 py-1 backdrop-blur-md rounded-full text-xs font-bold border ${
                              game.difficulty === "Easy" ? "bg-green-500/20 border-green-500/30 text-green-400" :
                              game.difficulty === "Medium" ? "bg-amber-500/20 border-amber-500/30 text-amber-400" :
                              "bg-red-500/20 border-red-500/30 text-red-400"
                           }`}>
                              {game.difficulty || "Medium"}
                           </span>
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="p-6 relative">
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                          {game.title}
                        </h3>
                        
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-4 font-mono">
                           <span>AUTHOR: {game.author.toUpperCase()}</span>
                           <span>//</span>
                           <span>{game.date}</span>
                        </div>

                        <p className="text-gray-400 text-sm line-clamp-2 mb-6">
                           {game.description}
                        </p>

                        <div className="flex items-center justify-between mt-auto">
                           <div className="flex items-center gap-2 text-cyan-400 text-sm font-bold uppercase tracking-wider group-hover:gap-3 transition-all">
                              <Zap size={16} /> Initializing
                           </div>
                           <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-black transition-colors">
                              <Trophy size={14} />
                           </div>
                        </div>

                        {/* Hover Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      </div>
                    </Link>
                  </motion.div>
                ))
              ) : (
                 <div className="col-span-full text-center py-20 text-gray-500">
                    No modules found. System offline.
                 </div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Games;