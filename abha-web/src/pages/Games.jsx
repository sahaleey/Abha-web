import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import mcqData from "../data/mcqData";

const Games = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredGames, setFilteredGames] = useState(mcqData);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulate data loading with error handling
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        // In a real app, this would be an API call
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load quizzes. Please try again later.");
        setIsLoading(false);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Filter games based on search term
  useEffect(() => {
    const results = mcqData.filter(
      (game) =>
        game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredGames(results);
  }, [searchTerm]);

  // Animation variants for cleaner code
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const hoverVariants = {
    hover: {
      y: -5,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen mt-10 py-12 px-4 md:px-12 bg-gradient-to-br from-black via-gray-900 to-gray-800 font-sans text-white">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header Section */}
        <header className="mb-12 text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-600"
            initial={{ y: -40 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            Play & Learn
          </motion.h1>
          <motion.p
            className="text-lg text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Test your knowledge with our interactive quizzes. Search below or
            browse our collection.
          </motion.p>
        </header>

        {/* Search Bar */}
        <motion.div
          className="relative max-w-2xl mx-auto mb-16"
          whileHover={{ scale: 1.01 }}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search by title, description or author..."
              className="w-full py-4 px-6 pr-12 rounded-xl bg-gray-800/70 backdrop-blur-md border border-gray-700 focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20 text-white placeholder-gray-400 shadow-lg transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              aria-label="Search quizzes"
            />
            <motion.div
              className="absolute right-4 top-1/2 -translate-y-1/2"
              animate={{
                scale: isSearchFocused ? 1.2 : 1,
                color: isSearchFocused ? "#f59e0b" : "#9ca3af",
              }}
              transition={{ type: "spring", stiffness: 500 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
          {searchTerm && (
            <motion.p
              className="text-sm text-gray-400 mt-2 ml-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {filteredGames.length}{" "}
              {filteredGames.length === 1 ? "quiz" : "quizzes"} found
            </motion.p>
          )}
        </motion.div>

        {/* Content Section */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        ) : error ? (
          <motion.div
            className="bg-red-900/30 border border-red-700 rounded-xl p-6 max-w-2xl mx-auto text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto text-red-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h3 className="text-xl font-bold mb-2">Loading Error</h3>
            <p className="text-gray-300">{error}</p>
            <button
              className="mt-4 px-6 py-2 bg-amber-600 hover:bg-amber-700 rounded-lg font-medium transition-colors"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {filteredGames.length > 0 ? (
                filteredGames.map((quiz) => (
                  <motion.div
                    key={quiz.id}
                    className="group relative bg-gray-800/40 border border-gray-700 hover:border-amber-400/50 rounded-2xl overflow-hidden shadow-2xl"
                    variants={itemVariants}
                    whileHover="hover"
                    layout
                  >
                    <Link
                      to={`/games/${quiz.id}`}
                      className="block h-full focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-2xl"
                      aria-label={`Play ${quiz.title} quiz`}
                    >
                      <motion.div variants={hoverVariants} className="h-full">
                        {/* Image Container */}
                        <div className="h-60 relative overflow-hidden">
                          <img
                            src={quiz.image || "/default-quiz.jpg"}
                            alt={quiz.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                          <div className="absolute top-4 right-4 bg-gray-900/80 px-3 py-1 rounded-full text-xs font-medium">
                            {quiz.questions?.length || 10} Qs
                          </div>
                        </div>

                        {/* Content Container */}
                        <div className="p-6">
                          <div className="flex items-start justify-between">
                            <h3 className="text-2xl font-bold group-hover:text-amber-400 transition-colors line-clamp-2">
                              {quiz.title}
                            </h3>
                            {quiz.difficulty && (
                              <span
                                className={`text-xs px-2 py-1 rounded-full ml-2 ${
                                  quiz.difficulty === "Easy"
                                    ? "bg-green-900/50 text-green-300"
                                    : quiz.difficulty === "Medium"
                                    ? "bg-yellow-900/50 text-yellow-300"
                                    : "bg-red-900/50 text-red-300"
                                }`}
                              >
                                {quiz.difficulty}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center mt-2 text-sm text-gray-400">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                            <span>{quiz.author}</span>
                            <span className="mx-2">•</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            <span>{quiz.date}</span>
                          </div>

                          <p className="text-gray-300 mt-3 mb-5 line-clamp-3">
                            {quiz.description}
                          </p>

                          <div className="inline-flex items-center space-x-2 text-amber-400 group-hover:text-amber-300 font-medium transition-colors">
                            <span>Start Quiz</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 transition-transform group-hover:translate-x-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                              />
                            </svg>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  className="col-span-full text-center py-16"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 mx-auto text-gray-500 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="text-xl font-bold text-gray-300 mb-2">
                    No quizzes found
                  </h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    We couldn't find any quizzes matching "{searchTerm}". Try a
                    different search term or check back later.
                  </p>
                  <button
                    className="mt-4 px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors"
                    onClick={() => setSearchTerm("")}
                  >
                    Clear search
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Games;
