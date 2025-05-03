import React from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import { RiTeamFill } from "react-icons/ri";
import { IoMdPaper } from "react-icons/io";
import { MdOutlineEventNote } from "react-icons/md";

const Footer = () => {
  const socialLinks = [
    { icon: <FaInstagram />, url: "https://www.instagram.com/_abha_nric/" },
    {
      icon: <FaFacebookF />,
      url: "https://www.facebook.com/profile.php?id=61575696666536",
    },
    { icon: <FaTwitter />, url: "https://x.com/abhamates14th" },
    {
      icon: <FaYoutube />,
      url: "https://youtube.com/@abhamates?si=bH6gD-VnUm-nQz8W",
    },
  ];

  const quickLinks = [
    { name: "Home", path: "/", icon: <RiTeamFill /> },
    { name: "About", path: "/about", icon: <IoMdPaper /> },
    { name: "Blog", path: "/blog", icon: <MdOutlineEventNote /> },
    { name: "Programs", path: "/programmes", icon: <RiTeamFill /> },
  ];

  return (
    <footer className="relative mt-40 bg-gradient-to-b from-[#0a0a0f] to-[#1a1a25] text-white border-t border-white/10 overflow-hidden">
      {/* Floating particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/5"
            style={{
              width: Math.random() * 5 + 1 + "px",
              height: Math.random() * 5 + 1 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
            animate={{
              y: [0, -100],
              x: [0, (Math.random() - 0.5) * 50],
              opacity: [0.2, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Glowing elements */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
        {/* About Abha */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500 mb-6">
            Abha Collective
          </h3>
          <p className="text-gray-300 leading-relaxed mb-6">
            Empowering creativity, passion, and purpose through innovative
            programs and a vibrant community.
          </p>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-amber-400 animate-pulse"></div>
            <span className="text-sm text-amber-400">Active now</span>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <div>
            <h4 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Navigation
              </span>
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a
                    href={link.path}
                    className="flex items-center gap-3 text-gray-300 hover:text-amber-400 transition-colors group"
                  >
                    <span className="text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      {link.icon}
                    </span>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Social Media */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex justify-end"
        >
          <div>
            <h4 className="text-xl font-semibold text-white mb-6">
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Connect With Us
              </span>
            </h4>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-xl hover:bg-amber-400/10 hover:border-amber-400/30 transition-all relative overflow-hidden group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="relative z-10 text-gray-300 group-hover:text-amber-400 transition-colors">
                    {social.icon}
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Copyright */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center text-sm text-gray-400 py-8 border-t border-white/10 relative z-10"
      >
        <div className="max-w-7xl mx-auto px-6">
          <p>
            © {new Date().getFullYear()} Abha Collective. All rights reserved.
          </p>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
