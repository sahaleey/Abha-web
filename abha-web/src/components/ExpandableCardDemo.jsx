import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import episode1 from "@/assets/Podcast/thumb ep 1.jpg";
import episode2 from "@/assets/Podcast/thumb ep 2.jpg";
import kattan from "../assets/Podcast/kattancast.svg";

export function ExpandableCardDemo() {
  const [active, setActive] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const ref = useRef(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    function onMouseMove(e) {
      setCursorPos({ x: e.clientX, y: e.clientY });
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
      document.addEventListener("mousemove", onMouseMove);
    } else {
      document.body.style.overflow = "auto";
      document.removeEventListener("mousemove", onMouseMove);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-neutral-100 to-neutral-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Custom cursor effect for active card */}
      <AnimatePresence>
        {active && typeof active === "object" && (
          <>
            <motion.div
              className="fixed z-[9999] pointer-events-none"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: cursorPos.x - 20,
                y: cursorPos.y - 20,
                transition: { type: "spring", damping: 20, stiffness: 300 },
              }}
              exit={{ opacity: 0, scale: 0.5 }}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(74,222,128,0.3) 0%, rgba(74,222,128,0) 70%)",
                filter: "blur(1px)",
              }}
            />
            <motion.div
              className="fixed z-[9998] pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 0.2,
                x: cursorPos.x - 100,
                y: cursorPos.y - 100,
                transition: { type: "spring", damping: 30, stiffness: 200 },
              }}
              exit={{ opacity: 0 }}
              style={{
                width: 200,
                height: 200,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(74,222,128,0.4) 0%, rgba(74,222,128,0) 70%)",
                filter: "blur(10px)",
              }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Overlay with animated noise texture */}
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.03 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-10 pointer-events-none"
            style={{
              backgroundImage:
                "url('data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E')",
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-gradient-to-br from-black/80 via-black/50 to-black/80 backdrop-blur-md h-full w-full z-10"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100] p-4">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{ opacity: 0, y: -20, rotate: 180 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, y: -20, rotate: 180 }}
              transition={{
                type: "spring",
                damping: 15,
                stiffness: 300,
                delay: 0.3,
              }}
              whileHover={{
                scale: 1.1,
                rotate: 90,
                backgroundColor: "rgba(255,255,255,0.2)",
              }}
              whileTap={{ scale: 0.9 }}
              className="flex absolute top-8 right-8 items-center justify-center bg-white/10 backdrop-blur-sm rounded-full h-12 w-12 shadow-xl z-50 border border-white/20"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>

            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              initial={{ scale: 0.95, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 50 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
                mass: 0.5,
              }}
              className="w-full max-w-4xl h-full md:h-[85vh] flex flex-col bg-gradient-to-br from-white to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 rounded-3xl overflow-hidden shadow-2xl relative border border-white/20"
            >
              {/* Animated border gradient */}
              <motion.div
                className="absolute inset-0 rounded-3xl p-[1px] pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  background:
                    "linear-gradient(135deg, rgba(74,222,128,0.5) 0%, rgba(34,197,94,0.2) 50%, rgba(74,222,128,0.5) 100%)",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              />

              <motion.div
                layoutId={`image-${active.title}-${id}`}
                className="relative overflow-hidden group"
                initial={{ borderRadius: 12 }}
              >
                <img
                  rel="preload"
                  width={1200}
                  height={675}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 lg:h-[20rem] object-fit object-top transform transition-transform duration-700 group-hover:scale-105"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-black/10 to-black/30"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.div>

              <div className="flex-1  overflow-y-auto  custom-scrollbar">
                <div className="flex flex-col  sm:flex-row justify-between items-start p-8 gap-6">
                  <div className="space-y-3">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="text-3xl font-bold text-neutral-800 dark:text-white"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-lg text-neutral-600 dark:text-neutral-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 }}
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.a
                    layoutId={`button-${active.title}-${id}`}
                    href={active.ctaLink}
                    target="_blank"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 5px 25px rgba(74, 222, 128, 0.5)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="relative px-8 py-4 rounded-full font-bold bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg hover:shadow-green-500/40 transition-all overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <PlayIcon />
                      {active.ctaText}
                    </span>
                    <motion.span className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.a>
                </div>

                <div className="px-8 pb-12 ">
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.35 }}
                    className="prose prose-lg prose-neutral dark:prose-invert max-w-none"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, type: "spring" }}
          className="text-center mb-16"
        >
          <motion.div className="relative w-[140px] h-[140px] mx-auto mb-12  rounded-full p-[2px]">
            {/* Spinning gradient border */}
            <div className="absolute inset-0 animate-spin-slow bg-gradient-to-tr from-amber-300 via-amber-500 to-amber-700 rounded-full blur-sm"></div>

            {/* Vapor animation */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full">
              <div className="vapor h-16 w-38"></div>
            </div>

            {/* Image layer */}
            <div className="relative w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center">
              <img
                src={kattan}
                alt="Kattan Cast Logo"
                className="rounded-full h-full w-full object-cover"
              />
            </div>
          </motion.div>

          <motion.h2
            className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            KATTAN CAST.
          </motion.h2>
          <motion.p
            className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Dive into our premium podcast content with immersive visuals and
            seamless interactions
          </motion.p>
        </motion.div>

        <motion.ul
          className="grid gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {cards.map((card, index) => (
            <motion.li
              key={`card-${card.title}-${id}`}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="relative"
            >
              <motion.div
                layoutId={`card-${card.title}-${id}`}
                onClick={() => setActive(card)}
                className="relative p-1 rounded-2xl overflow-hidden group cursor-pointer"
                whileHover={{ y: -8 }}
                initial={{ borderRadius: 16 }}
              >
                {/* Animated gradient border */}
                <motion.div
                  className="absolute inset-0 rounded-xl pointer-events-none z-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0.5 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    background:
                      "linear-gradient(45deg, rgba(74,222,128,0.3) 0%, rgba(34,197,94,0.15) 50%, rgba(74,222,128,0.3) 100%)",
                  }}
                />

                {/* Main Card Container */}
                <div className="relative bg-white dark:bg-neutral-800 rounded-xl p-6 flex flex-col md:flex-row items-center md:items-start gap-6 shadow-sm group-hover:shadow-md transition-all">
                  {/* Glow Effect */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: hoveredIndex === index ? 0.6 : 0,
                      background: `radial-gradient(circle at ${
                        hoveredIndex === index ? "60% 50%" : "50% 50%"
                      }, rgba(74, 222, 128, 0.3), transparent 70%)`,
                    }}
                    transition={{ duration: 0.5 }}
                  />

                  {/* Responsive Image */}
                  <motion.div
                    layoutId={`image-${card.title}-${id}`}
                    className={`relative overflow-hidden rounded-lg flex-shrink-0 
              w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48
              max-w-full
              ${
                active?.title === card.title
                  ? "w-full max-w-md max-h-[300px]"
                  : ""
              }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.img
                      src={card.src}
                      alt={card.title}
                      className={`w-full h-full rounded-lg shadow-md transition-all duration-500
                ${
                  active?.title === card.title
                    ? "object-contain max-h-[300px]"
                    : "object-cover"
                }`}
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                    />
                    <motion.div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                    <motion.div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </motion.div>

                  {/* Text & Button Block */}
                  <div className="flex-1 min-w-0  text-center md:text-left overflow-hidden">
                    {/* Title */}
                    <motion.h3
                      layoutId={`title-${card.title}-${id}`}
                      className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-800 dark:text-white mb-2"
                      animate={{
                        color:
                          hoveredIndex === index
                            ? "rgb(34 197 94)"
                            : "rgb(38 38 38)",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {card.title}
                    </motion.h3>

                    {/* Description */}
                    <motion.p
                      layoutId={`description-${card.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base md:text-lg leading-snug md:leading-normal "
                    >
                      {card.description}
                    </motion.p>

                    {/* CTA Button */}
                    <motion.button
                      layoutId={`button-${card.title}-${id}`}
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgb(34 197 94)",
                        color: "white",
                        boxShadow: "0 4px 20px rgba(34, 197, 94, 0.3)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-4 px-6 py-3 rounded-full font-medium bg-neutral-100 dark:bg-neutral-700 text-neutral-800 dark:text-white shadow-sm hover:shadow-md transition-all flex items-center gap-2 justify-center md:justify-start"
                    >
                      <PlayIconSmall />
                      {card.ctaText}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
}

const CloseIcon = () => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 text-white dark:text-neutral-200"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const PlayIcon = () => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.2 }}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M7 4v16l13 -8z" />
    </motion.svg>
  );
};

const PlayIconSmall = () => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M7 4v16l13 -8z" />
    </motion.svg>
  );
};

const cards = [
  {
    description: "Yaseen PI - Anwar Sadath",
    title: "Chattanum Kuttichathanum",
    src: episode1,
    ctaText: "Play Now",
    ctaLink: "https://youtu.be/aCM5QAxpMHM?si=b5x6AcluIZBh9p56",
    content: () => {
      return (
        <div className="space-y-6">
          <p className="text-xl leading-relaxed">
            In this episode of{" "}
            <span className="font-semibold text-green-600 dark:text-green-400">
              Kattan.cast
            </span>
            , we explore the complex and escalating tensions between Iran and
            the United States, analyzing how decades of political rivalry, proxy
            wars, and economic sanctions have shaped the current global
            landscape.
          </p>
          <div className="relative p-6 rounded-xl bg-neutral-100 dark:bg-neutral-800/50 border-l-4 border-green-500">
            <p className="text-lg leading-relaxed italic">
              "We bring forward the voices and perspectives of Yaseen Pi and
              Anwar Sadath—two emerging leaders known for their unique insights
              and grounded understanding of Middle Eastern politics from a South
              Asian lens."
            </p>
          </div>
          <p className="text-xl leading-relaxed">
            The title{" "}
            <span className="font-medium">"Chathanum Kuttichattanum"</span>{" "}
            reflects the chaotic energy, misunderstood motives, and the dual
            nature of power struggles seen in today's geopolitical world.
          </p>
          <div className="flex justify-center mt-8"></div>
        </div>
      );
    },
  },
  {
    description: "Ma'Mooon - Muhammad",
    title: "Calender Stories",
    src: episode2,
    ctaText: "Play Now",
    ctaLink: "https://youtu.be/L_CXzRGjA4A?si=TJQJjzA-ekdyUsGc",
    content: () => {
      return (
        <div className="space-y-6">
          <p className="text-xl leading-relaxed">
            In this episode of{" "}
            <span className="font-semibold text-green-600 dark:text-green-400">
              Kattan.cast
            </span>
            , we dive into the cosmic chaos and cultural rhythms of time itself
            — decoding how humans have been chasing the sun, moon, and meaning
            through the Solar and Lunar calendars. And yeah, we end up right at
            the doors of Muharram — the sacred start of the Islamic year.
          </p>
          <div className="relative p-6 rounded-xl bg-neutral-100 dark:bg-neutral-800/50 border-l-4 border-green-500">
            <p className="text-lg leading-relaxed italic">
              "Whether you're vibing with sunrises or moon phases, this episode
              breaks down how different civilizations, from ancient Egypt to
              modern Muslims, literally see time differently. It’s more than
              just dates — it’s identity, ritual, and resistance."
            </p>
          </div>
          <p className="text-xl leading-relaxed">
            The Solar Calendar? It’s all about that sun life. Used by most of
            the world today — like in the Gregorian calendar — it tracks Earth's
            orbit around the sun. Perfect for planning your vacations. But the
            Lunar Calendar? That's moon-coded. It follows the moon's phases, so
            months slide around the seasons. Think Islamic Hijri calendar — the
            one that determines Ramadan, Eid, and yes... Muharram.
          </p>
          <p className="text-xl leading-relaxed">
            <span className="font-medium">Muharram</span> isn’t just “New Year’s
            Day” in the Islamic calendar. It’s one of the holiest months —
            especially for Shia Muslims who commemorate the tragedy of Karbala,
            the martyrdom of Imam Hussain, and a deep reflection on justice,
            sacrifice, and standing up against oppression. No fireworks. No
            countdowns. Just deep vibes and remembrance.
          </p>
          <div className="relative p-6 rounded-xl bg-yellow-100 dark:bg-yellow-800/40 border-l-4 border-yellow-500">
            <p className="text-lg leading-relaxed italic">
              "Muharram teaches us that not all beginnings are about celebration
              — sometimes they’re about resistance, legacy, and remembering who
              we are."
            </p>
          </div>
          <p className="text-xl leading-relaxed">
            So next time someone says “It’s just a calendar,” hit them with the
            real tea. Calendars shape history, culture, and the way we move
            through the world. And whether you're syncing with the sun or
            chilling under the moon, it's all written in the stars — literally.
          </p>
          <div className="flex justify-center mt-8"></div>
        </div>
      );
    },
  },
  // Add more cards as needed
];
