// src/components/Loading.jsx or AbhaLoader.jsx

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function AbhaLoader() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-[#1e2425] flex items-center justify-center z-[9999]">
      <Particles
        init={particlesInit}
        options={{
          fullScreen: false,
          background: {
            color: {
              value: "#1e2425",
            },
          },
          fpsLimit: 60,
          particles: {
            number: {
              value: 100,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: ["#FFD700", "#FF8C00", "#FF4500"],
            },
            shape: {
              type: "circle",
            },
            opacity: {
              value: 0.7,
              random: true,
            },
            size: {
              value: 3,
              random: true,
            },
            move: {
              enable: true,
              speed: 2,
              direction: "none",
              outModes: {
                default: "out",
              },
            },
          },
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "repulse",
              },
            },
            modes: {
              repulse: {
                distance: 100,
                duration: 0.4,
              },
            },
          },
        }}
        className="absolute top-0 left-0 w-full h-full"
      />

      <h1 className="text-white text-5xl font-bold font-bloomsburg animate-pulse z-10">
        Loading Abha...
      </h1>
    </div>
  );
}
