import React, { useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import blogData from "../data/blogData";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
} from "lucide-react";

const BlogPost = () => {
  const { id } = useParams();
  const post = useMemo(
    () => blogData.find((item) => item.id.toString() === id),
    [id]
  );

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  });

  // Scroll to top on post change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white text-center px-6">
        <h2 className="text-4xl font-bold text-amber-500 mb-4">
          404 // Post Not Found
        </h2>
        <p className="text-gray-400 mb-8">
          This article doesn’t exist or was removed.
        </p>
        <Link
          to="/blog"
          className="px-6 py-3 bg-white/10 rounded-full hover:bg-white/20 transition"
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  // Reading time
  const readingTime = Math.max(
    1,
    Math.ceil(
      post.content.join(" ").split(/\s+/).length / 200
    )
  );

  // Share handler
  const handleShare = async () => {
    const shareData = {
      title: post.title,
      text: post.title,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        alert("Link copied to clipboard");
      }
    } catch {
      // silent fail
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pb-24">

      {/* Reading progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-amber-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Back button */}
      <div className="fixed top-6 left-6 z-40">
        <Link to="/blog">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-black/50 backdrop-blur-md border border-white/10 rounded-full hover:bg-white/10 transition"
          >
            <ArrowLeft size={20} />
          </motion.button>
        </Link>
      </div>

      {/* Hero */}
      <div className="relative h-[65vh] w-full overflow-hidden">
        <motion.img
          src={post.image}
          alt={post.title}
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/60 to-transparent" />

        <div className="absolute bottom-0 left-0 w-full px-6 pb-10 max-w-5xl mx-auto">
          <div className="flex items-center gap-4 text-sm text-gray-300 font-mono mb-6">
            <span className="flex items-center gap-2">
              <Calendar size={14} className="text-amber-500" />
              {post.date}
            </span>
            <span className="text-gray-600">|</span>
            <span className="flex items-center gap-2">
              <Clock size={14} className="text-amber-500" />
              {readingTime} min read
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {post.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-6 mt-16">

        {/* Author + Share */}
        <div className="flex items-center justify-between border-b border-white/10 pb-8 mb-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-black font-bold text-xl">
              {post.author?.[0] || "A"}
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400">
                Written by
              </p>
              <p className="font-semibold">{post.author}</p>
            </div>
          </div>

          <button
            onClick={handleShare}
            className="p-2 text-gray-400 hover:text-amber-400 transition"
            aria-label="Share post"
          >
            <Share2 size={20} />
          </button>
        </div>

        {/* Text */}
        <div className="space-y-10 text-lg md:text-xl leading-relaxed text-gray-300">
          {post.content.map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45 }}
              className="first-letter:text-5xl first-letter:font-bold first-letter:text-amber-500 first-letter:float-left first-letter:mr-3"
            >
              {para}
            </motion.p>
          ))}
        </div>

        {/* End */}
        <div className="mt-24 text-center border-t border-white/10 pt-12">
          <p className="text-gray-500 italic mb-8">
            You reached the end. Respect.
          </p>
          <Link to="/blog">
            <button className="px-8 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-105 transition">
              Read More Articles
            </button>
          </Link>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
