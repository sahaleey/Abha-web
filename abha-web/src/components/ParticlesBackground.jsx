// import React, { useMemo, useState, useEffect } from "react";
// import Particles from "@tsparticles/react";
// import { loadSlim } from "@tsparticles/slim";
// import { tsParticles } from "@tsparticles/engine";

// const ParticlesComponent = ({ id }) => {
//   const [init, setInit] = useState(false);
//   const [particleCount, setParticleCount] = useState(150);

//   // Initialize tsparticles with the slim preset
//   useEffect(() => {
//     const initParticles = async () => {
//       try {
//         await loadSlim(tsParticles);
//         setInit(true);
//       } catch (error) {
//         console.error("Failed to initialize particles engine:", error);
//       }
//     };
//     initParticles();
//   }, []);

//   // Increase particles on click
//   useEffect(() => {
//     const handleClick = () => {
//       setParticleCount((prev) => prev + 50);
//     };
//     window.addEventListener("click", handleClick);
//     return () => window.removeEventListener("click", handleClick);
//   }, []);

//   const options = useMemo(
//     () => ({
//       background: {
//         color: {
//           value: "transparent",
//         },
//       },
//       fpsLimit: 60,
//       interactivity: {
//         events: {
//           onClick: {
//             enable: true,
//             mode: "grab",
//           },
//           onHover: {
//             enable: true,
//             mode: "repulse",
//           },
//         },
//         modes: {
//           grab: {
//             distance: 150,
//           },
//           repulse: {
//             distance: 100,
//           },
//         },
//       },
//       particles: {
//         color: {
//           value: ["#ff7eb3", "#ff758c", "#a18cd1", "#fbc2eb"],
//         },
//         links: {
//           color:  ["#ff7eb3", "#ff758c", "#a18cd1", "#fbc2eb"],
//           distance: 150,
//           enable: true,
//           opacity: 0.3,
//           width: 1,
//         },
//         move: {
//           direction: "none",
//           enable: true,
//           outModes: {
//             default: "bounce",
//           },
//           random: true,
//           speed: 1,
//           straight: false,
//         },
//         number: {
//           density: {
//             enable: true,
//             area: 800,
//           },
//           value: particleCount,
//         },
//         opacity: {
//           value: 1.0,
//         },
//         shape: {
//           type: "circle",
//         },
//         size: {
//           value: { min: 1, max: 3 },
//         },
//       },
//       detectRetina: true,
//     }),
//     [particleCount]
//   );

//   return init ? <Particles id={id} options={options} /> : <></>;
// };

// export default ParticlesComponent;
import React, { useMemo, useState, useEffect } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { tsParticles } from "@tsparticles/engine";

const ParticlesComponent = ({ id }) => {
  const [init, setInit] = useState(false);

  // Initialize tsparticles with the slim preset
  useEffect(() => {
    const initParticles = async () => {
      try {
        await loadSlim(tsParticles);
        setInit(true);
      } catch (error) {
        console.error("Failed to initialize particles engine:", error);
      }
    };
    initParticles();
  }, []);

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: {
            enable: false, // Disable particle increase on click
            mode: "grab",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          grab: {
            distance: 150,
          },
          repulse: {
            distance: 100,
          },
        },
      },
      particles: {
        color: {
          value: ["#ff7eb3", "#ff758c", "#a18cd1", "#fbc2eb"],
        },
        links: {
          color:  ["#ff7eb3", "#ff758c", "#a18cd1", "#fbc2eb"],
          distance: 150,
          enable: true,
          opacity: 0.3,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: true,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 150, // Set a fixed particle count
        },
        opacity: {
          value: 1.0,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    }),
    []
  );

  return init ? <Particles id={id} options={options} /> : <></>;
};

export default ParticlesComponent;
