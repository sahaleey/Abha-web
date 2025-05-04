import React, { useState, useRef, useEffect } from "react";
import {
  FiPlay,
  FiPause,
  FiSkipForward,
  FiSkipBack,
  FiVolume2,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import RadioImg from "../assets/radio/pngtree-old-radio-vector-png-image_10028968.png";
import Radio1 from "../assets/radio/radio 1 final.mp3";

const RadioStation = () => {
  // State for radio stations and player
  const [stations] = useState([
    {
      id: 1,
      name: "ABHA FM",
      frequency: "98.5",
      cover: RadioImg,
      audio: Radio1,
      genre: "For our new Brothers",
    },
  ]);

  const [currentStation, setCurrentStation] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const [volumeTimeout, setVolumeTimeout] = useState(null);
  const audioRef = useRef(null);

  // Update time and duration
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("durationchange", updateDuration);
    audio.addEventListener("loadedmetadata", updateDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("durationchange", updateDuration);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, [currentStation]);

  // Handle volume control visibility
  const handleVolumeMouseEnter = () => {
    setShowVolumeControl(true);
    // Clear any existing timeout
    if (volumeTimeout) clearTimeout(volumeTimeout);
    // Set new timeout to hide after 5 seconds
    setVolumeTimeout(
      setTimeout(() => {
        setShowVolumeControl(false);
      }, 2000)
    );
  };

  const handleVolumeMouseLeave = () => {
    // Don't hide immediately on mouse leave - let timeout handle it
  };

  // Player controls
  const togglePlay = () => {
    if (currentStation) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume / 100;
    // Reset the hide timeout when adjusting volume
    if (volumeTimeout) clearTimeout(volumeTimeout);
    setVolumeTimeout(
      setTimeout(() => {
        setShowVolumeControl(false);
      }, 5000)
    );
  };

  const handleSeekChange = (e) => {
    const newTime = e.target.value;
    setCurrentTime(newTime);
    if (!isSeeking) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleSeekMouseDown = () => {
    setIsSeeking(true);
  };

  const handleSeekMouseUp = () => {
    setIsSeeking(false);
    audioRef.current.currentTime = currentTime;
  };

  const formatTime = (time) => {
    if (!time) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const playStation = (station) => {
    setCurrentStation(station);
    setIsPlaying(true);
    setTimeout(() => audioRef.current.play(), 0);
  };

  // Visualizer animation
  const Visualizer = () => (
    <div className="flex items-end gap-1 h-12">
      {[1, 2, 3, 2, 3, 4, 3, 2].map((height, i) => (
        <motion.div
          key={i}
          className="w-1 bg-cyan-400 rounded-t-sm"
          initial={{ height: `${height * 5}px` }}
          animate={{
            height: `${(isPlaying ? Math.random() * 8 + 2 : height) * 5}px`,
          }}
          transition={{
            duration: 0.3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen mt-17 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6 overflow-hidden">
      {/* Audio element (hidden) */}
      <audio
        ref={audioRef}
        src={currentStation?.audio}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Floating background elements */}
      <div className="fixed -top-1/4 -left-1/4 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.1)_0%,transparent_50%)] animate-spin-slow -z-10"></div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-4"
            whileHover={{ scale: 1.02 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
              ABHA Radio Network
            </span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Broadcasting our culture, heritage, and community voices
          </motion.p>
        </motion.div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Radio stations list */}
          <div className="lg:col-span-2">
            <motion.div
              className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl border border-white/10 p-8 shadow-2xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Stations list */}
              <div className="space-y-4">
                {stations.map((station) => (
                  <motion.div
                    key={station.id}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <div
                      className={`p-5 rounded-xl flex items-center gap-5 cursor-pointer transition-all duration-300 ${
                        currentStation?.id === station.id
                          ? "bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border border-cyan-400/50 shadow-lg shadow-cyan-500/20"
                          : "bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10"
                      }`}
                      onClick={() => playStation(station)}
                    >
                      <motion.div
                        className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0"
                        whileHover={{ scale: 1.05 }}
                      >
                        <img
                          src={station.cover}
                          alt={station.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 opacity-0 hover:opacity-100 transition-opacity"></div>
                      </motion.div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg truncate">
                          {station.name}
                        </h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-cyan-400 text-sm font-mono">
                            {station.frequency} FM
                          </span>
                          <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full">
                            {station.genre}
                          </span>
                        </div>
                      </div>

                      {currentStation?.id === station.id && (
                        <AnimatePresence>
                          {isPlaying ? (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="flex gap-1 h-8 items-end"
                            >
                              {[1, 2, 3, 2].map((h, i) => (
                                <motion.div
                                  key={i}
                                  className="w-1 bg-cyan-400 rounded-t-sm"
                                  animate={{
                                    height: `${(Math.random() * 4 + 2) * 5}px`,
                                  }}
                                  transition={{
                                    duration: 0.3,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                  }}
                                />
                              ))}
                            </motion.div>
                          ) : (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-3 h-3 rounded-full bg-cyan-400"
                            />
                          )}
                        </AnimatePresence>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Now playing */}
          <motion.div
            className="sticky top-6 h-fit"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl border border-white/10 p-8 shadow-2xl">
              <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                Now Playing
              </h2>

              {currentStation ? (
                <div className="space-y-8">
                  <motion.div
                    className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg"
                    whileHover={{ scale: 1.02 }}
                  >
                    <img
                      src={currentStation.cover}
                      alt={currentStation.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <Visualizer />
                    </div>
                  </motion.div>

                  <div className="text-center">
                    <motion.h3
                      className="text-2xl font-bold mb-1"
                      whileHover={{ color: "#22d3ee" }}
                    >
                      {currentStation.name}
                    </motion.h3>
                    <p className="text-cyan-400 font-mono">
                      {currentStation.frequency} FM
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      {currentStation.genre}
                    </p>
                  </div>

                  {/* Volume control positioned above seeker */}
                  <div className="relative">
                    <div
                      className="absolute bottom-full left-0 mb-2 w-full flex justify-center"
                      onMouseEnter={handleVolumeMouseEnter}
                      onMouseLeave={handleVolumeMouseLeave}
                    >
                      <AnimatePresence>
                        {showVolumeControl && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center gap-2 bg-gray-800/90 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg"
                          >
                            <FiVolume2 className="text-gray-300" />
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={volume}
                              onChange={handleVolumeChange}
                              className="w-24 accent-cyan-500"
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Default volume icon trigger */}
                    <div
                      className="absolute bottom-full left-2 transform -translate-x-1/2 mb-2 cursor-pointer"
                      onMouseEnter={handleVolumeMouseEnter}
                    >
                      <FiVolume2 className="text-gray-300 hover:text-cyan-400 transition-colors" />
                    </div>

                    {/* Seek bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max={duration || 0}
                        value={currentTime}
                        onChange={handleSeekChange}
                        onMouseDown={handleSeekMouseDown}
                        onMouseUp={handleSeekMouseUp}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                      />
                    </div>
                  </div>

                  {/* Player controls */}
                  <div className="space-y-4">
                    <div className="flex justify-center gap-4">
                      <motion.button
                        className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors shadow-md"
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          playStation(
                            stations[
                              (stations.findIndex(
                                (s) => s.id === currentStation.id
                              ) -
                                1 +
                                stations.length) %
                                stations.length
                            ]
                          )
                        }
                      >
                        <FiSkipBack className="text-xl" />
                      </motion.button>

                      <motion.button
                        className="p-5 rounded-full bg-gradient-to-r from-cyan-600 to-blue-700 shadow-lg hover:shadow-cyan-500/40 transition-all"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={togglePlay}
                      >
                        {isPlaying ? (
                          <FiPause size={28} />
                        ) : (
                          <FiPlay size={28} />
                        )}
                      </motion.button>

                      <motion.button
                        className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors shadow-md"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          playStation(
                            stations[
                              stations.findIndex(
                                (s) => s.id === currentStation.id
                              ) +
                                (1 % stations.length)
                            ]
                          )
                        }
                      >
                        <FiSkipForward className="text-xl" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              ) : (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/5 border-2 border-dashed border-white/20 flex items-center justify-center">
                    <FiPlay className="text-3xl text-white/30" />
                  </div>
                  <p className="text-gray-400">
                    Select a station to start listening
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RadioStation;
