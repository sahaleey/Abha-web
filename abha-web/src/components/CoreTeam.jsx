import React from "react";
import teamMembers from "../data/teamData";
import "../styles/CoreTeam.css"; // make sure to have basic flip styles

const CoreTeam = () => {
  return (
    <div className="core-team-flip-section py-24 px-6 md:px-20 text-white relative z-10">
      <h2 className="text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-600 mb-16 font-bloomsburg">
        Meet the Core Team
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {teamMembers.map((member) => (
          <div key={member.id} className="flip-card">
            <div className="flip-card-inner">
              {/* Front Side */}
              <div className="flip-card-front h-80 overflow-hidden rounded-xl">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
                <div className="p-4 text-center bg-black bg-opacity-50">
                  <h3 className="text-2xl font-bold text-emerald-400">
                    {member.name}
                  </h3>
                  <p className="text-amber-300 font-semibold">{member.role}</p>
                </div>
              </div>

              {/* Back Side */}
              <div className="flip-card-back p-6 rounded-xl">
                <h3 className="text-xl font-bold text-amber-400">
                  {member.name}
                </h3>
                <p className="text-cyan-400 mb-2">{member.role}</p>
                <p className="text-gray-200 text-sm">{member.bio}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoreTeam;
