import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route, Link } from "react-router-dom";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Programmes from "./pages/Programmes";
import AbhaLogo from "./assets/logo.png";
import { Timeline } from "./components/Ui/Timeline";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ParticlesBackground from "./components/ParticlesBackground";
import CommunitySlider from "./components/CommunitySlider";
import CustomCursor from "./components/CustomCursor";
import { Typewriter } from "react-simple-typewriter";
import Footer from "./components/Footer";
import BlogPost from "./pages/BlogPost";
import ErrorBoundary from "./components/ErrorBoundary";
import GetInTouch from "../src/pages/GetInTouch";
import CoreTeam from "./components/CoreTeam";
import Gallery from "./pages/Gallery";
import Poll from "./components/Poll";
import { FlipWord } from "../src/components/Ui/flip-words";
import EventCountdownTimer from "./components/EventCountdownTimer";
import Podcast from "./pages/Podcast";
import MemberBio from "./components/MemberBio";
import StatsSection from "./components/StatsSection";
import AdminUpload from "./pages/AdminUpload";

function App() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    } else {
      controls.start({ opacity: 0, y: 40 });
    }
  }, [inView, controls]);

  // Timeline Data
  const timelineData = [
    {
      title: "2022 Last Month",
      content: (
        <p className="text-white font-bloomsburg text-2xl">
          We kicked off our journey to empower communities through creativity
          and collaboration.
        </p>
      ),
    },
    {
      title: "2023",
      content: (
        <p className="text-white font-bloomsburg text-2xl">
          We kicked off our journey to empower communities through creativity
          and collaboration.
        </p>
      ),
    },
    {
      title: "2024",
      content: (
        <p className="text-white font-bloomsburg text-2xl">
          Hosted our very first creative program, with over 100+ participants!
        </p>
      ),
    },
    {
      title: "2025",
      content: (
        <p className="text-white font-bloomsburg text-2xl">
          Grew our network, launched new initiatives, and reached over 500
          members.
        </p>
      ),
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#1e2425] h-auto w-full overflow-x-hidden">
      <div className="hidden lg:block">
        <CustomCursor />
      </div>
      <div className="particles-container fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
        <ParticlesBackground id="tsparticles" />
      </div>

      <div className="relative z-10">
        <Navbar />

        <ErrorBoundary>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {/* Hero Section with Particles Background */}
                  <div className="relative flex justify-center mt-23 ">
                    <div className="relative z-20 flex flex-col md:flex-row items-center justify-between w-full max-w-9xl shadow-2xl rounded-4xl bg-[#292C35] gap-10 min-h-[83vh] md  :mt-27">
                      {/* Text Section */}
                      <motion.div
                        className="flex-1 text-center md:text-left m-[10px] "
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 1.5,
                          delay: 0.3,
                          ease: "easeOut",
                        }}
                      >
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-bloomsburg  mb-6 text-center md:text-left md:ml-10 ">
                          Welcome to{" "}
                          <span>
                            <FlipWord
                              words={["ABHA", "OUR COMMUNITY", "OUR VISIONS"]}
                              duration={2500}
                              className="text-[#ce9206]"
                            />
                          </span>
                        </h1>

                        <p className="text-gray-300 text-l font text-left m-[40px] lg:mr-60   leading-relaxed font-bloomsburg">
                          <Typewriter
                            words={[
                              "Discover a world of inspiration and opportunity.  Abha brings together creativity, passion, and community in one powerful space. Dive into our programs, read our blog, and learn more about our mission to empower and uplift.",
                            ]}
                            typeSpeed={15}
                          />
                        </p>
                      </motion.div>

                      {/* Logo  */}
                      <div className="relative group w-80 h-100  flex-shrink-0 m-[15px]">
                        <img
                          src={AbhaLogo}
                          alt="Abha"
                          className="relative z-10  object-contain rounded-full transition-transform duration-300 hover:scale-110 "
                        />
                      </div>
                    </div>
                  </div>

                  {/* Highlight Section */}
                  <div ref={ref} className="mt-32 flex justify-center">
                    <motion.div
                      className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl l  p-10 rounded-3xl"
                      initial={{ opacity: 0, y: 40 }}
                      animate={controls}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    >
                      <div className="relative group">
                        <div
                          className="relative bg-gradient-to-br from-gray-800 via-violet-400 to-violet-800 backdrop-blur-xl border border-white/10
rounded-3xl px-15 py-14 shadow-xl transition-transform duration-300 transform hover:scale-105 text-center "
                        >
                          <h4 className="text-xl md:text-2xl font-bold text-white font-bloomsburg">
                            Hold up by our great Leaders We are moving through
                            the path of success. Just click on to see our{" "}
                            <Link
                              to="/core-team"
                              className="text-blue-700 p-1 transition-colors hover:text-orange-300"
                            >
                              leaders.
                            </Link>
                          </h4>
                        </div>
                      </div>

                      <div
                        className="bg-gradient-to-br from-orange-300 via-orange-400 to-orange-500 
rounded-3xl  shadow-xl transition-transform duration-300 transform hover:scale-105 px-12 py-10"
                      >
                        <h4 className="text-xl md:text-2xl text-center font-bold text-white font-bloomsburg">
                          Hold on! lots some fantastic unforgettable moments,
                          created unity and jokes between our relation. whole
                          some moments we sharing{" "}
                          <Link
                            to="/event-gallery"
                            className="text-teal-600  p-1  transition-colors hover:text-gray-400 "
                          >
                            {" "}
                            with you.
                          </Link>
                        </h4>
                      </div>
                      <div
                        className="bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-500
rounded-3xl  shadow-xl transition-transform duration-300 transform hover:scale-105 px-23 py-10 text-center"
                      >
                        <h4 className="text-xl md:text-2xl font-bold text-white font-bloomsburg">
                          After knowing about us, how you feel that?!, we are
                          curios to know that just share you're thought about
                          this web through <br />
                          <Link
                            to="/poll"
                            className="text-red-400  p-1  transition-colors hover:text-green-300 "
                          >
                            {" "}
                            this way.
                          </Link>
                        </h4>
                      </div>
                      <div
                        className="bg-gradient-to-br from-purple-500 via-fuchsia-500 to-pink-500
rounded-3xl p-6 shadow-xl transition-transform duration-300 transform hover:scale-105 px-12 py-10 text-center"
                      >
                        <h4 className="text-xl md:text-2xl font-bold text-white font-bloomsburg">
                          Don't miss out on the action! The countdown has begun,
                          and we're just days away from an unforgettable
                          experience. Whether it's a groundbreaking conference,
                          a fun-filled meetup, or an exciting celebration,{" "}
                          <br />
                          <Link
                            to="/event-countdown"
                            className="text-amber-300  p-1  transition-colors hover:text-emerald-700"
                          >
                            {" "}
                            the clock is ticking!
                          </Link>
                        </h4>
                      </div>
                    </motion.div>
                  </div>

                  {/* Counters */}
                  {/* <div className="mt-50 flex flex-col sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-2xl mx-auto ">
                    {[
                      {
                        count: 250,
                        suffix: "+",
                        label: "Programmes",
                        delay: 0.2,
                      },
                      {
                        count: 250,
                        suffix: "+",
                        label: "Upcoming Events",
                        delay: 0.2,
                      },
                      { count: 26, suffix: "+", label: "Members", delay: 0.4 },
                      {
                        count: 20,
                        suffix: "+",
                        label: "Projects",
                        delay: 0.7,
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="bg-[#131313] backdrop-blur-lg rounded-xl p-8 shadow-xl transform transition-all duration-300 hover:scale-105"
                      >
                        <motion.h2
                          className="text-4xl font-bold text-white font-bloomsburg"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 1, delay: item.delay }}
                        >
                          <CountUp
                            start={0}
                            end={item.count}
                            duration={2}
                            suffix={item.suffix}
                          />
                        </motion.h2>
                        <p className="text-xl font-bloomsburg text-gray-300 mt-2">
                          {item.label}
                        </p>
                      </div>
                    ))}
                  </div> */}
                  <StatsSection />

                  {/* Timeline Section */}
                  <div className="mt-40">
                    <Timeline data={timelineData} />
                  </div>
                  <CommunitySlider />
                </>
              }
            />

            {/* Other Pages */}
            <Route path="/about" element={<About />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/programmes" element={<Programmes />} />
            <Route path="/get-in-touch" element={<GetInTouch />} />
            <Route path="/core-team" element={<CoreTeam />} />
            <Route path="/event-gallery" element={<Gallery />} />
            <Route path="/poll" element={<Poll />} />
            <Route path="/event-countdown" element={<EventCountdownTimer />} />
            <Route path="/podcast" element={<Podcast />} />
            <Route path="/community/:slug" element={<MemberBio />} />
            <Route path="/admin-upload" element={<AdminUpload />} />
          </Routes>
        </ErrorBoundary>
        <Footer />
      </div>
    </div>
  );
}

export default App;
