import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/effect-coverflow";
import communityMembers from "../data/communityBio";

const CommunitySlider = () => {
  return (
    <div className="relative max-w-5xl mx-auto py-28 px-4 overflow-hidden">
      {/* Background glows */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10"></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600 mb-4">
          Our Core Team
        </h2>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          The brilliant minds behind our community's success
        </p>
      </motion.div>

      <div className="relative">
        {/* Swiper frame */}
        <div className="absolute inset-0 rounded-3xl border-2 border-cyan-400/30 pointer-events-none -mx-4 -my-10 z-10"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 rounded-3xl -mx-4 -my-10"></div>

        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1}
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop={true}
          modules={[EffectCoverflow, Autoplay]}
          className="w-full max-w-md md:max-w-xl lg:max-w-3xl h-[550px]"
        >
          {communityMembers.map((member, index) => (
            <SwiperSlide key={index}>
              <Link to={`/community/${member.slug}`}>
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(34,211,238,0.4)",
                  }}
                  className="relative h-full bg-gradient-to-br from-white/10 to-white/20 rounded-2xl p-8 backdrop-blur-md border border-cyan-400/20 transition-all duration-300 ease-in-out"
                >
                  {/* Profile Image */}
                  <div className="relative w-36 h-36 mx-auto mb-6">
                    <div className="absolute inset-0 rounded-full border-4 border-cyan-400/50 animate-pulse-slow"></div>
                    <div className="absolute inset-2 rounded-full border-2 border-white/30"></div>
                    <img
                      src={member.image}
                      alt={member.name}
                      className="relative z-10 w-full h-full rounded-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Member Info */}
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-cyan-300 font-mono mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                      {member.bio || member.quote || `${member.name}'s profile`}
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                      {member.skill
                        ?.split(",")
                        .slice(0, 3)
                        .map((skill, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-cyan-900/40 text-cyan-200 text-xs rounded-full border border-cyan-400/20"
                          >
                            {skill.trim()}
                          </span>
                        ))}
                    </div>

                    {/* Room / DOB */}
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-400 mb-4">
                      {member.add && (
                        <div className="bg-white/5 p-2 rounded">
                          <span className="block text-cyan-400">Room</span>
                          {member.add}
                        </div>
                      )}
                      {member.DOB && (
                        <div className="bg-white/5 p-2 rounded">
                          <span className="block text-cyan-400">DOB</span>
                          {member.DOB}
                        </div>
                      )}
                    </div>

                    {/* View Button */}
                    <button className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-700 rounded-full text-sm font-medium shadow-lg hover:shadow-cyan-500/40 transition-all">
                      View Profile
                    </button>
                  </div>
                </motion.div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <motion.div
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-center text-gray-500 mt-8 text-sm"
      >
        ← Swipe or drag to explore →
      </motion.div>
    </div>
  );
};

export default CommunitySlider;
