import React, { useState } from "react";
import teamMembers from "../data/teamData";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, 
  Zap, 
  Target, 
  Users, 
  BarChart3, 
  Globe, 
  ChevronRight, 
  X 
} from "lucide-react";

// Helper to get stats based on role (Simulation)
const getStatsForRole = (role) => {
  const normalizedRole = role.toLowerCase();
  if (normalizedRole.includes("president") && !normalizedRole.includes("vice")) {
    return [
      { label: "Leadership", value: 98, color: "bg-amber-500" },
      { label: "Vision", value: 95, color: "bg-purple-500" },
      { label: "Decision Making", value: 92, color: "bg-blue-500" },
    ];
  } else if (normalizedRole.includes("vice president")) {
    return [
      { label: "Strategy", value: 92, color: "bg-emerald-500" },
      { label: "Management", value: 90, color: "bg-cyan-500" },
      { label: "Support", value: 95, color: "bg-rose-500" },
    ];
  } else if (normalizedRole.includes("secretary")) {
    return [
      { label: "Coordination", value: 96, color: "bg-indigo-500" },
      { label: "Communication", value: 94, color: "bg-pink-500" },
      { label: "Efficiency", value: 90, color: "bg-teal-500" },
    ];
  } else if (normalizedRole.includes("treasurer")) {
    return [
      { label: "Finance", value: 99, color: "bg-green-500" },
      { label: "Integrity", value: 100, color: "bg-yellow-500" },
      { label: "Analysis", value: 92, color: "bg-blue-500" },
    ];
  } else if (normalizedRole.includes("p.r.o")) {
    return [
      { label: "Charisma", value: 98, color: "bg-orange-500" },
      { label: "Networking", value: 95, color: "bg-cyan-500" },
      { label: "Creativity", value: 90, color: "bg-purple-500" },
    ];
  }
  // Default
  return [
    { label: "Dedication", value: 90, color: "bg-gray-500" },
    { label: "Teamwork", value: 95, color: "bg-gray-500" },
    { label: "Skill", value: 85, color: "bg-gray-500" },
  ];
};

const CoreTeam = () => {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div className="relative min-h-screen py-24 px-4 md:px-20 overflow-hidden bg-[#050505] text-white">
      
      {/* Ambient Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-amber-900/10 rounded-full blur-[120px]" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-[120px]" />
         <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-amber-400 font-mono tracking-widest uppercase"
          >
             <Shield size={12} /> Command Structure
          </motion.div>
          <motion.h2 
            className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-amber-400 to-orange-600"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            Core Leadership
          </motion.h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            The architects behind our vision, driving innovation and unity.
          </p>
        </div>

        {/* --- GRID LAYOUT --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <TeamCard 
              key={member.id} 
              member={member} 
              isSelected={selectedId === member.id}
              onClick={() => setSelectedId(selectedId === member.id ? null : member.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// --- SUB-COMPONENT: The Interactive Card ---
const TeamCard = ({ member, isSelected, onClick }) => {
  const stats = getStatsForRole(member.role);

  return (
    <motion.div
      layout
      onClick={onClick}
      className={`relative group rounded-2xl border border-white/10 bg-[#0f0f13] overflow-hidden cursor-pointer transition-colors duration-500 ${
        isSelected ? "col-span-1 sm:col-span-2 lg:col-span-3 border-amber-500/30 bg-white/[0.02]" : "hover:border-white/20 hover:bg-white/[0.02]"
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, layout: { duration: 0.4, type: "spring", stiffness: 300, damping: 30 } }}
    >
      <div className={`flex flex-col ${isSelected ? "lg:flex-row" : ""} h-full`}>
        
        {/* IMAGE SECTION */}
        <motion.div 
          layout 
          className={`relative overflow-hidden ${isSelected ? "lg:w-1/3 h-64 lg:h-auto" : "h-80 w-full"}`}
        >
          <motion.img
            layoutId={`img-${member.id}`}
            src={member.photo}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f13] via-transparent to-transparent opacity-90" />
          
          {/* Overlay Info (Collapsed state) */}
          {!isSelected && (
            <div className="absolute bottom-0 left-0 w-full p-6">
              <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
              <p className="text-amber-400 font-mono text-sm">{member.role}</p>
              <div className="absolute right-4 bottom-6 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 p-2 rounded-full backdrop-blur-md">
                 <ChevronRight size={20} />
              </div>
            </div>
          )}
        </motion.div>

        {/* CONTENT SECTION (Expanded state) */}
        <AnimatePresence>
          {isSelected && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 p-8 flex flex-col justify-center relative"
            >
              {/* Close Button */}
              <button className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors">
                <X size={24} />
              </button>

              <div className="mb-6">
                <motion.h3 
                  layoutId={`title-${member.id}`}
                  className="text-4xl font-bold text-white mb-2"
                >
                  {member.name}
                </motion.h3>
                <motion.p 
                  layoutId={`role-${member.id}`}
                  className="text-amber-400 font-mono text-lg flex items-center gap-2"
                >
                  <Zap size={16} /> {member.role}
                </motion.p>
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                {/* Bio */}
                <div>
                  <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Users size={14} /> Profile
                  </h4>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {member.bio}
                  </p>
                </div>

                {/* Power Stats */}
                <div>
                   <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <BarChart3 size={14} /> Abilities
                  </h4>
                  <div className="space-y-4">
                    {stats.map((stat, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-300">{stat.label}</span>
                          <span className="font-mono text-amber-400">{stat.value}%</span>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${stat.value}%` }}
                            transition={{ delay: 0.2 + (idx * 0.1), duration: 1, ease: "easeOut" }}
                            className={`h-full rounded-full ${stat.color}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
};

export default CoreTeam;