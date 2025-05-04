import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import blogData from "../data/blogData";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(blogData);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    const results = blogData.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags?.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
    setFilteredPosts(results);
  }, [searchTerm]);

  if (!blogData || blogData.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white font-bloomsburg"
      >
        <h2 className="text-4xl font-bold text-amber-400 mb-6">
          No Blogs Found
        </h2>
        <Link
          to="/"
          className="px-8 py-3 bg-amber-500 hover:bg-amber-600 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-500/20"
        >
          Return Home
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 md:px-12 bg-gradient-to-br from-black via-gray-900 to-gray-800 font-bloomsburg text-white">
      {/* Hero Title */}
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="text-5xl md:text-6xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-600"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.6, -0.05, 0.01, 0.99],
          }}
        >
          Abha Blog
        </motion.h2>

        {/* Search Bar */}
        <motion.div
          className="relative max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full py-4 px-6 pr-12 rounded-xl bg-gray-800/70 backdrop-blur-md border border-gray-700 focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20 text-white placeholder-gray-400 transition-all duration-300 shadow-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
            <motion.div
              className="absolute right-4 top-1/2 -translate-y-1/2"
              animate={{
                scale: isSearchFocused || searchTerm ? 1.1 : 1,
                rotate: isSearchFocused ? 10 : 0,
              }}
              transition={{ type: "spring", stiffness: 500 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </motion.div>
          </div>

          {/* Animated underline */}
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600"
            initial={{ width: 0 }}
            animate={{
              width: isSearchFocused ? "100%" : searchTerm ? "100%" : "0%",
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </motion.div>

        {/* Results count */}
        {searchTerm && (
          <motion.p
            className="text-center text-gray-400 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Found {filteredPosts.length}{" "}
            {filteredPosts.length === 1 ? "article" : "articles"} for "
            {searchTerm}"
          </motion.p>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, idx) => (
              <motion.div
                key={post.id}
                className="group relative overflow-hidden bg-gray-800/40 backdrop-blur-lg rounded-2xl border border-gray-700 hover:border-amber-400/50 transition-all duration-500 shadow-2xl hover:shadow-amber-400/20"
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: idx * 0.1,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 25px -5px rgba(251, 191, 36, 0.1)",
                }}
                layout
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <Link to={`/blog/${post.id}`} className="block h-full">
                  <figure className="relative h-60 overflow-hidden">
                    <img
                      src={post.image || "/default-blog.jpg"}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  </figure>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors duration-300">
                      {post.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-400 mb-4 space-x-3">
                      <span>{post.date}</span>
                      <span className="text-amber-400/50">•</span>
                      <span className="italic">By {post.author}</span>
                    </div>
                    <p className="text-gray-300 line-clamp-3 mb-6">
                      {post.excerpt}
                    </p>
                    <div className="inline-flex items-center text-amber-400 group-hover:text-amber-300 font-medium transition-all duration-300">
                      Read More
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <motion.div
              className="col-span-full text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h3 className="text-2xl font-bold text-amber-400 mb-4">
                No articles found
              </h3>
              <p className="text-gray-400 mb-6">
                Try a different search term or browse all articles
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="px-6 py-2 bg-amber-500 hover:bg-amber-600 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-500/20"
              >
                Clear Search
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Blog;
