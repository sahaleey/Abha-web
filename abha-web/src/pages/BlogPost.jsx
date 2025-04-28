import React from "react";
import { useParams, Link } from "react-router-dom";
import blogData from "../data/blogData";
import { motion } from "framer-motion";

const BlogPost = () => {
  const { id } = useParams();
  const post = blogData.find((item) => item.id.toString() === id);

  if (!post) {
    return (
      <div className="text-center text-white py-20 font-bloomsburg">
        <h2 className="text-3xl font-bold text-red-400 mb-4">Blog Not Found</h2>
        <Link to="/blog" className="text-amber-400 underline hover:text-amber-300 transition">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-24 py-16 mt-10 font-bloomsburg bg-gradient-to-br from-black via-zinc-900 to-gray-900 text-white min-h-screen">
      {/* Title */}
      <motion.h1
        className="text-5xl font-bold text-amber-400 mb-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {post.title}
      </motion.h1>

      {/* Author and Date */}
      <motion.div
        className="mb-6 text-gray-400 flex items-center justify-between text-sm md:text-base"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <span>📅 {post.date}</span>
        <span>✍️ By {post.author}</span>
      </motion.div>

      {/* Image */}
      <motion.img
        src={post.image || "/default.jpg"}
        alt={post.title}
        className="w-full h-80 object-cover rounded-2xl shadow-lg mb-10 hover:scale-105 transition-transform duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />

      {/* Content */}
      <motion.div
        className="text-lg text-gray-300 leading-relaxed mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {post.content}
      </motion.div>

      {/* Back Link */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Link
          to="/blog"
          className="inline-block text-amber-400 underline hover:text-amber-300 transition font-semibold"
        >
          ← Back to Blog
        </Link>
      </motion.div>
    </div>
  );
};

export default BlogPost;
