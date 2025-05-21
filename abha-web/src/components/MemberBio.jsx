import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import communityMembers from "../data/communityBio";

const MemberBio = () => {
  const { slug } = useParams();
  const member = communityMembers.find((m) => m.slug === slug);

  if (!member) {
    return (
      <div className="text-center mt-24 text-white p-10">Member not found</div>
    );
  }

  return (
    <motion.div
      className="max-w-3xl mx-auto mt-24 px-6 py-12 backdrop-blur-md bg-white/5 rounded-3xl shadow-2xl border border-amber-300 text-white"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Image */}
      <motion.img
        rel="preload"
        src={member.image}
        alt={member.name}
        className="w-40 h-40 rounded-full object-cover mx-auto mb-6 border-4 border-amber-400 shadow-lg hover:scale-110 transition-transform duration-500"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      />

      {/* Name */}
      <h1 className="text-4xl font-bold text-center text-amber-400 mb-2 hover:scale-105 transition-transform duration-300">
        {member.name}
      </h1>

      {/* Role */}
      <p className="text-emerald-300 text-center mb-1 font-semibold tracking-wide">
        {member.role}
      </p>

      {/* DOB */}
      <p className="text-gray-400 text-center mb-1 italic">
        Ad.NO: {member.add}
      </p>
      <p className="text-gray-400 text-center mb-1 italic">
        Address: {member.address}
      </p>
      <p className="text-gray-400 text-center mb-1 italic">DOB: {member.DOB}</p>

      {/* Skill */}
      <p className="text-cyan-300 text-center mb-6">🛠 Skill: {member.skill}</p>

      {/* Bio */}
      <motion.p
        className="text-center text-lg text-gray-300 leading-relaxed hover:text-gray-100 transition-colors duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        {member.bio}
      </motion.p>
    </motion.div>
  );
};

export default MemberBio;
