import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import communityMembers from "../data/communityBio"; // Import your data

const CommunityBio = () => {
  const { slug } = useParams();

  // Find the member in your data
  const member = communityMembers.find((member) => member.slug === slug);

  if (!member) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-white text-2xl">Member not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        {/* Back Button */}
        <motion.div whileHover={{ x: -5 }} className="mb-8 inline-block">
          <a
            href="/community"
            className="flex items-center text-cyan-400 hover:text-cyan-300 transition"
          >
            ← Back to Community
          </a>
        </motion.div>

        {/* Member Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Image */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-3xl p-1">
              <img
                rel="preload"
                src={member.image}
                alt={member.name}
                className="w-full h-auto rounded-3xl object-cover border border-white/10"
              />
            </div>
          </motion.div>

          {/* Right Column - Details */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              {member.name}
            </h1>

            <div className="mb-6">
              <span className="px-4 py-2 bg-white/5 rounded-full text-lg font-medium mb-4 inline-block">
                {member.role}
              </span>

              <div className="space-y-4">
                {member.add && (
                  <div className="flex items-start">
                    <span className="text-cyan-400 w-24">Add.No:</span>
                    <span>{member.add}</span>
                  </div>
                )}

                {member.address && (
                  <div className="flex items-start">
                    <span className="text-cyan-400 w-24">Address:</span>
                    <span>{member.address}</span>
                  </div>
                )}

                {member.DOB && (
                  <div className="flex items-start">
                    <span className="text-cyan-400 w-24">DOB:</span>
                    <span>{member.DOB}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Skills */}
            {member.skill && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3 text-cyan-400">
                  Skill
                </h3>
                <div className="flex flex-wrap gap-2">
                  {member.skill.split(",").map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default CommunityBio;
