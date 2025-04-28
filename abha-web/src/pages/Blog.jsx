import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import blogData from "../data/blogData"; // Make sure blogData is correct

const Blog = () => {
  if (!blogData || blogData.length === 0) {
    return (
      <div className="text-center font-bloomsburg text-white py-20">
        <h2 className="text-3xl font-bold text-red-400 mb-4">No Blogs Found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4 md:px-12 bg-gradient-to-br from-black via-gray-900 to-gray-800 font-bloomsburg text-white">
      {/* Hero Title */}
      <motion.h2
        className="text-5xl font-bold text-center mb-16 text-amber-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Abha Blog
      </motion.h2>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {blogData.map((post, idx) => (
          <motion.div
            key={post.id}
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-2xl hover:shadow-amber-400/20 transition-transform duration-300 hover:-translate-y-2"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
          >
            <img
              src={post.image || "default-image.jpg"}
              alt={post.title}
              className="rounded-xl w-full h-48 object-cover mb-4 hover:brightness-110 transition"
            />
            <h3 className="text-2xl font-bold text-amber-300 mb-2">{post.title}</h3>
            <p className="text-sm text-gray-400 mb-1">{post.date}</p>
            <p className="text-sm text-gray-500 mb-2 italic">By {post.author}</p>
            <p className="text-gray-200 line-clamp-3 mb-4">{post.excerpt}</p>
            <Link to={`/blog/${post.id}`}>
              <button className="text-amber-400 hover:text-amber-300 font-medium transition duration-200">
                Read More →
              </button>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
