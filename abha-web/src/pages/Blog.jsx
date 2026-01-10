import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Hash, Clock, User, ArrowRight } from "lucide-react";
import blogData from "../data/blogData";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(blogData);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    const results = blogData.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.excerpt && post.excerpt.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(results);
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-amber-500/30 pt-24 pb-20 px-4 md:px-8 relative overflow-hidden">
      
      {/* --- Ambient Background --- */}
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-amber-900/10 rounded-full blur-[120px]" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px]" />
         <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* --- Header Section --- */}
        <div className="text-center mb-16 space-y-6">
          <motion.div
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-amber-400 font-mono tracking-widest uppercase"
          >
             <Hash size={12} /> Knowledge Base
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-amber-100 to-amber-600 tracking-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            Digital Chronicles
          </motion.h1>

          {/* Search Bar */}
          <motion.div 
            className="max-w-2xl mx-auto relative group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
             <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 opacity-20 group-hover:opacity-40 blur transition duration-500 ${isSearchFocused ? 'opacity-60' : ''}`} />
             <div className="relative bg-[#0f0f13] rounded-xl flex items-center px-6 py-4 border border-white/10 shadow-2xl">
                <Search className="text-gray-400 mr-4" />
                <input 
                  type="text" 
                  placeholder="Search titles, authors, or topics..." 
                  className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none text-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
             </div>
          </motion.div>
        </div>

        {/* --- Masonry Grid --- */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, idx) => (
                <motion.div
                  layout
                  key={post.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: idx * 0.05, duration: 0.5 }}
                  className="break-inside-avoid"
                >
                  <Link to={`/blog/${post.id}`} className="group block relative bg-[#0f0f13] border border-white/10 rounded-2xl overflow-hidden hover:border-amber-500/30 transition-colors duration-500">
                    
                    {/* Image */}
                    <div className="relative overflow-hidden aspect-video md:aspect-[4/3] lg:aspect-video">
                       <img 
                         src={post.image || "/default-blog.jpg"} 
                         alt={post.title} 
                         className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f13] via-transparent to-transparent opacity-80" />
                       
                       {/* Date Badge */}
                       <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg text-xs font-mono text-white/80 border border-white/10">
                          {post.date}
                       </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 relative">
                       <h3 className="text-2xl font-bold text-white mb-3 leading-tight group-hover:text-amber-400 transition-colors">
                          {post.title}
                       </h3>
                       
                       <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                          <User size={14} className="text-amber-500" />
                          <span>{post.author}</span>
                       </div>

                       <p className="text-gray-400 text-sm line-clamp-3 mb-6 leading-relaxed">
                          {Array.isArray(post.excerpt) ? post.excerpt.join(' ') : post.excerpt}
                       </p>

                       <div className="flex items-center text-amber-500 text-sm font-bold uppercase tracking-wider gap-2 group-hover:gap-3 transition-all">
                          Read Article <ArrowRight size={16} />
                       </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-gray-500 text-xl">No transmissions found matching your query.</p>
                <button 
                  onClick={() => setSearchTerm("")}
                  className="mt-4 text-amber-400 hover:text-amber-300 underline underline-offset-4"
                >
                  Reset Signal
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default Blog;