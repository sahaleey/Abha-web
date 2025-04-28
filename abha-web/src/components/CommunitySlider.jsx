import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";

import communityMembers from "../data/communityBio"; // ✅ make sure it matches the right file

const CommunitySlider = () => {
  return (
    <div className="max-w-6xl mx-auto py-20 px-4">
      <h2 className="text-center text-4xl font-bold text-white font-bloomsburg mb-10">
        Meet Our Community
      </h2>
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="w-full"
      >
        {communityMembers.map((member, index) => (
          <SwiperSlide key={index}>
            <Link to={`/community/${member.slug}`}>
              <div className="bg-white/10 gap-2 font-bloomsburg text-white rounded-2xl p-6 text-center shadow-xl backdrop-blur-md hover:scale-105 transition-transform">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-amber-400 shadow-md"
                />
                <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                <p className="text-amber-300 mb-2 font-semibold">
                  {member.role}
                </p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CommunitySlider;
