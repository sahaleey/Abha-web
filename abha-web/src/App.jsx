import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route, Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Typewriter } from "react-simple-typewriter";
import { FlipWord } from "./components/Ui/flip-words";
import AbhaLoader from "./components/Loading";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import FloatingIslands from "./components/FloatingIslands";
import GlassCard from "./components/GlassCard";
import HolographicTimeline from "./components/HolographicTimeline";
import NebulaBackground from "./components/NebulaBackground";
import QuantumParticles from "./components/QuantumParticles";
import DigitalRain from "./components/DigitalRain";
import Programmes from "./pages/Programmes";
import About from "./pages/About";
import CoreTeam from "./components/CoreTeam";
import Gallery from "./pages/Gallery";
import Poll from "./components/Poll";
import EventCountdownTimer from "./components/EventCountdownTimer";
import CustomCursor from "./components/CustomCursor";
import logo from "./assets/logo.png";
import CommunitySlider from "./components/CommunitySlider";
import CommunityBio from "./components/CommunityBio";
import GetInTouch from "./pages/GetInTouch";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Podcast from "./pages/Podcast";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.2 });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (inView) controls.start({ opacity: 1, y: 0 });
    else controls.start({ opacity: 0, y: 40 });
  }, [inView, controls]);

  if (isLoading) return <AbhaLoader />;

  const highlightCards = [
    {
      title: "Meet Our Leaders",
      description: "The visionary minds guiding our community forward",
      link: "/core-team",
      gradient: "from-emerald-500 to-teal-700",
      hover: "hover:shadow-emerald-500/30",
    },
    {
      title: "Shared Moments",
      description: "Relive our unforgettable experiences together",
      link: "/event-gallery",
      gradient: "from-amber-500 to-orange-700",
      hover: "hover:shadow-amber-500/30",
    },
    {
      title: "Share Your Thoughts",
      description: "We value your perspective on our community",
      link: "/poll",
      gradient: "from-blue-500 to-indigo-700",
      hover: "hover:shadow-blue-500/30",
    },
    {
      title: "Upcoming Events",
      description: "Countdown to our next groundbreaking experience",
      link: "/event-countdown",
      gradient: "from-purple-500 to-fuchsia-700",
      hover: "hover:shadow-purple-500/30",
    },
  ];

  const timelineData = [
    {
      year: "2022 Last month",
      title: "Foundation",
      description:
        "We kicked off our journey to empower communities through technology and creativity.",
      icon: "🚀",
    },
    {
      year: "2023",
      title: "First Milestone",
      description:
        "Launched our first community program with overwhelming response.",
      icon: "🎯",
    },
    {
      year: "2024",
      title: "Academic Excellence",
      description:
        "we held several creative programs, highlighted by a college academic conference on Quran translation among our students.",
      icon: "📜",
    },
    {
      year: "2025",
      title: "Innovation",
      description:
        "We are moving forward with successful creative program planning while strengthening our unity.",
      icon: "💡",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      <NebulaBackground />
      <DigitalRain />
      <QuantumParticles />
      <CustomCursor />

      <div className="relative z-30">
        <Navbar />

        <ErrorBoundary>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {/* Futuristic Hero Section */}
                  <section className="relative h-screen flex items-center justify-center overflow-hidden">
                    <FloatingIslands />

                    <div className="relative z-20 container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
                      <motion.div
                        className="flex-1 space-y-8"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      >
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                          Welcome to{" "}
                          <span>
                            <FlipWord
                              className="text-amber-400"
                              words={["ABHA", "THE FUTURE", "INNOVATION"]}
                              duration={3000}
                            />
                          </span>
                        </h1>

                        <div className="text-xl md:text-2xl text-gray-300 max-w-3xl leading-relaxed">
                          <Typewriter
                            words={[
                              "Where technology meets creativity. ABHA is redefining community engagement through cutting-edge programs and immersive experiences.",
                              "Pushing boundaries since 2022. Our ecosystem blends innovation with human connection to build tomorrow's solutions today.",
                            ]}
                            loop={true}
                            cursor
                            cursorStyle="|"
                            typeSpeed={30}
                            deleteSpeed={20}
                            delaySpeed={3000}
                          />
                        </div>

                        <div className="flex gap-4">
                          <Link to="/programmes">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-medium shadow-lg"
                            >
                              Explore Programs
                            </motion.button>{" "}
                          </Link>
                          <Link to="/about">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-8 py-3 bg-transparent border-2 border-white/20 rounded-full font-medium hover:bg-white/10 transition-all"
                            >
                              Know about us
                            </motion.button>{" "}
                          </Link>
                        </div>
                      </motion.div>

                      <motion.div
                        className="relative"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                      >
                        <div className="relative w-64 h-64 md:w-80 md:h-80 group">
                          {/* Glowing outer ring */}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/30 via-blue-500/20 to-purple-600/10 opacity-70 group-hover:opacity-100 transition-all duration-500 blur-[2px] group-hover:blur-[4px] animate-pulse-slow" />

                          {/* Main logo container */}
                          <div className="relative w-full h-full rounded-full bg-[#0a0a0f] border border-white/10 overflow-hidden p-4 transition-all duration-500 group-hover:scale-105 group-hover:border-cyan-400/30">
                            {/* Inner glow effect */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/10 to-blue-600/5  opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                            {/* Animated floating logo */}
                            <img
                              src={logo}
                              alt="ABHA Logo"
                              className="w-full scale-160 h-full object-contain transition-transform duration-700 ease-in-out group-hover:scale-130 animate-float"
                              style={{
                                animation: "float 6s ease-in-out infinite",
                                filter:
                                  "drop-shadow(0 0 8px rgba(34, 211, 238, 0.3))",
                              }}
                            />

                            {/* Hover spotlight effect */}
                            <div className="absolute inset-0 rounded-full pointer-events-none opacity-0 group-hover:opacity-50 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.5)_0%,transparent_70%)]" />
                          </div>

                          {/* Reflection effect */}
                          <div className="absolute bottom-0 left-1/2 w-3/4 h-8 -translate-x-1/2 bg-gradient-to-t from-cyan-400/20 to-transparent opacity-30 blur-[6px] rounded-full" />
                        </div>
                      </motion.div>
                    </div>
                  </section>

                  {/* Holographic Feature Cards */}
                  <section ref={ref} className="relative py-20">
                    <div className="container mx-auto px-6">
                      <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                        initial={{ opacity: 0, y: 40 }}
                        animate={controls}
                        transition={{ duration: 0.8, staggerChildren: 0.1 }}
                      >
                        {highlightCards.map((card, index) => (
                          <GlassCard key={index} {...card} index={index} />
                        ))}
                      </motion.div>
                    </div>
                  </section>

                  {/* Stats Section */}
                  <section className="py-20 bg-gradient-to-b from-black/50 to-transparent">
                    <div className="container mx-auto px-6">
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-8"
                      >
                        {[
                          { value: "26", label: "Community Members" },
                          { value: "50+", label: "Events Hosted" },
                          { value: "06", label: "Core Team" },
                          { value: "∞", label: "Possibilities" },
                        ].map((stat, index) => (
                          <motion.div
                            key={index}
                            whileHover={{ y: -5 }}
                            className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
                          >
                            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                              {stat.value}
                            </div>
                            <div className="mt-2 text-gray-300">
                              {stat.label}
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </section>

                  {/* Interactive Timeline */}
                  <section className="py-32 relative">
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
                    <div className="container mx-auto px-6 relative">
                      <h2 className="text-4xl font-bold text-center mb-20">
                        Our <span className="text-cyan-400">Journey</span>
                      </h2>
                      <HolographicTimeline data={timelineData} />
                    </div>
                  </section>
                  <CommunitySlider />
                </>
              }
            />

            {/* Other Routes */}
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/programmes" element={<Programmes />} />
            <Route path="/core-team" element={<CoreTeam />} />
            <Route path="/event-gallery" element={<Gallery />} />
            <Route path="/poll" element={<Poll />} />
            <Route path="/event-countdown" element={<EventCountdownTimer />} />
            <Route path="/community" element={<CommunitySlider />} />
            <Route path="/community/:slug" element={<CommunityBio />} />
            <Route path="/get-in-touch" element={<GetInTouch />} />
            <Route path="/podcast" element={<Podcast />} />
          </Routes>
        </ErrorBoundary>

        <Footer />
      </div>
    </div>
  );
}

export default App;
