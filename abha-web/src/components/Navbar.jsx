import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  User,
  BookOpen,
  MonitorPlay,
  Mic,
  Radio,
  Gamepad2,
  Bot,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import Logo from "../assets/abha.png";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { path: "/", label: "Home", icon: <Home size={20} /> },
    { path: "/about", label: "About", icon: <User size={20} /> },
    { path: "/blog", label: "Blog", icon: <BookOpen size={20} /> },
    { path: "/programmes", label: "Programs", icon: <MonitorPlay size={20} /> },
    { path: "/podcast", label: "Podcast", icon: <Mic size={20} /> },
    { path: "/radio", label: "Radio", icon: <Radio size={20} /> },
    { path: "/games", label: "Games", icon: <Gamepad2 size={20} /> },
    { path: "/abha-ai", label: "ABHA AI", icon: <Bot size={20} /> },
  ];

  return (
    <>
      {/* --- STATIC LOGO (Top Left) --- */}
      <div className="fixed top-6 left-6 z-50">
        <Link to="/">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-50 blur-lg transition duration-500"></div>
            <img
              src={Logo}
              alt="Abha Logo"
              className="relative h-12 w-10 md:h-14 md:w-14 rounded-full border border-white/10 shadow-2xl transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>
      </div>

      {/* --- DESKTOP VERTICAL DOCK (Right Side) --- */}
      <motion.nav
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 z-50 flex-col gap-4"
      >
        <div className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-full py-6 px-3 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col items-center gap-5">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <div
                key={item.path}
                className="relative group flex items-center justify-end"
              >
                {/* Tooltip Label (Slides out on hover) */}
                <span className="absolute right-full mr-5 px-3 py-1.5 rounded-lg bg-white text-black text-xs font-bold tracking-wide opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                  {item.label}
                  {/* Arrow tip */}
                  <span className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-white rotate-45 rounded-[1px]"></span>
                </span>

                {/* Icon Button */}
                <Link to={item.path}>
                  <motion.div
                    className={`p-3.5 rounded-full transition-all duration-300 relative ${
                      isActive
                        ? "bg-gradient-to-br from-amber-400 to-orange-600 text-white shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                        : "text-gray-400 hover:text-white hover:bg-white/10"
                    }`}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {item.icon}
                    {isActive && (
                      <motion.div
                        layoutId="activeDot"
                        className="absolute -right-1 top-1 w-2 h-2 bg-white rounded-full shadow-[0_0_5px_white]"
                      />
                    )}
                  </motion.div>
                </Link>
              </div>
            );
          })}
        </div>
      </motion.nav>

      {/* --- MOBILE MENU TRIGGER (Top Right) --- */}
      <div className="md:hidden fixed top-6 right-6 z-50">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMobileMenuOpen(true)}
          className="bg-black/60 backdrop-blur-xl p-3 rounded-full text-white border border-white/10 shadow-lg"
        >
          <Menu size={24} className="text-amber-400" />
        </motion.button>
      </div>

      {/* --- MOBILE SIDE DRAWER (The "Pro" Update) --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm md:hidden"
            />

            {/* The Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-[300px] z-[70] bg-[#0f0f13] border-l border-white/10 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] flex flex-col md:hidden"
            >
              {/* Drawer Header */}
              <div className="p-6 flex justify-between items-center border-b border-white/5 bg-gradient-to-b from-white/5 to-transparent">
                <span className="text-sm font-mono text-gray-400 tracking-widest">MENU</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-gray-400 hover:text-white bg-white/5 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Items */}
              <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                {navItems.map((item, idx) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Link
                        to={item.path}
                        className={`group flex items-center gap-4 p-4 rounded-xl transition-all duration-200 ${
                          isActive
                            ? "bg-white/10 border border-amber-500/30 shadow-[inset_0_0_20px_rgba(245,158,11,0.1)]"
                            : "hover:bg-white/5 border border-transparent"
                        }`}
                      >
                        <div
                          className={`${
                            isActive ? "text-amber-400" : "text-gray-400 group-hover:text-white"
                          }`}
                        >
                          {item.icon}
                        </div>
                        <span
                          className={`font-medium text-lg ${
                            isActive ? "text-white" : "text-gray-400 group-hover:text-white"
                          }`}
                        >
                          {item.label}
                        </span>
                        
                        {/* Active Arrow Indicator */}
                        {isActive && (
                          <ChevronRight className="ml-auto text-amber-500" size={16} />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Drawer Footer */}
              <div className="p-6 border-t border-white/5">
                <p className="text-xs text-center text-gray-600 font-mono">
                  © 2024 ABHA UNION
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;