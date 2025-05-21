import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "../assets/abha.png";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const routes = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/blog", label: "Blog" },
    { path: "/programmes", label: "Programs" },
    { path: "/podcast", label: "Podcast" },
    { path: "/radio", label: "Radio" },
    { path: "/abha-ai", label: "ABHA AI" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`w-full px-6 py-3 fixed top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0f]/90 backdrop-blur-lg shadow-xl border-b border-white/10"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center z-50">
          <motion.img
            rel="preload"
            src={Logo}
            alt="Abha Logo"
            className="h-12 w-auto rounded-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400 }}
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8 items-center">
          {routes.map(({ path, label }) => {
            const isActive = location.pathname === path;
            return (
              <li key={path} className="relative">
                <Link
                  to={path}
                  className={`px-3 py-2 text-lg font-medium transition-all duration-300 ${
                    isActive
                      ? "text-amber-400"
                      : "text-gray-300 hover:text-amber-300"
                  }`}
                >
                  {label}
                  {isActive && (
                    <motion.span
                      className="absolute left-0 bottom-0 w-full h-0.5 bg-amber-400"
                      layoutId="navUnderline"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden z-50 p-2"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <X className="text-white" size={28} />
          ) : (
            <Menu className="text-white" size={28} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 bg-[#0a0a0f]/95 backdrop-blur-lg pt-24 px-6 z-40"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <motion.ul
              className="space-y-8 text-white text-xl font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {routes.map((route) => (
                <motion.li
                  key={route.path}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                >
                  <Link
                    to={route.path}
                    onClick={() => setMenuOpen(false)}
                    className={`block py-3 transition-colors ${
                      location.pathname === route.path
                        ? "text-amber-400"
                        : "hover:text-amber-400"
                    }`}
                  >
                    {route.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Password Input Modal */}
    </motion.nav>
  );
}

export default Navbar;
