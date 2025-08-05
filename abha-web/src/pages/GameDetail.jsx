import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import mcqData from "../data/mcqData";
import { Howl } from "howler";

// Sound effects
const sounds = {
  correct: new Howl({ src: ["../assets/sounds/correct.mp3"] }),
  wrong: new Howl({ src: ["../assets/sounds/wrong.mp3"] }),
  powerup: new Howl({ src: ["../assets/sounds/powerup.mp3"] }),
  timer: new Howl({ src: ["../assets/sounds/timer.mp3"] }),
  victory: new Howl({ src: ["../assets/sounds/victory.mp3"] }),
};

const GameDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { width, height } = useWindowSize();
  const quiz = mcqData.find((q) => q.id === id);

  // Game state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isExploding, setIsExploding] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [activeTeam, setActiveTeam] = useState("Team A");
  const [teamScores, setTeamScores] = useState({
    "Team A": 0,
    "Team B": 0,
  });
  const [powerUps, setPowerUps] = useState({
    "Team A": { doublePoints: 1, skipQuestion: 1 },
    "Team B": { doublePoints: 1, skipQuestion: 1 },
  });
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameMode, setGameMode] = useState("competitive"); // competitive/collaborative
  const [usedPowerUps, setUsedPowerUps] = useState([]);
  const [streak, setStreak] = useState(0);
  const [showStreak, setShowStreak] = useState(false);

  // Initialize game
  useEffect(() => {
    if (quiz) {
      const shuffled = shuffleArray([...quiz.questions]).map((q) => ({
        ...q,
        options: shuffleArray([...q.options]),
      }));
      setShuffledQuestions(shuffled);

      // Set question timer based on difficulty
      const currentQ = shuffled[0];
      setTimeLeft(
        currentQ.difficulty === "Easy"
          ? 20
          : currentQ.difficulty === "Medium"
          ? 30
          : 45
      );
    }

    window.scrollTo({ top: 0, behavior: "smooth" });

    const gameTimer = setInterval(() => {
      setTimeSpent((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(gameTimer);
  }, [quiz]);

  // Question timer
  useEffect(() => {
    if (showResult || !quiz) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });

      // Play warning sound when time is running low
      if (timeLeft === 5 && !hasAnswered) {
        sounds.timer.play();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion, showResult, hasAnswered, timeLeft]);

  // Handle confetti and sounds for high scores
  useEffect(() => {
    if (showResult) {
      if (score >= quiz.questions.length * 0.8) {
        setIsExploding(true);
        sounds.victory.play();
        const timer = setTimeout(() => setIsExploding(false), 5000);
        return () => clearTimeout(timer);
      }

      // Play appropriate end game sound
      const winningTeam =
        teamScores["Team A"] > teamScores["Team B"]
          ? "Team A"
          : teamScores["Team B"] > teamScores["Team A"]
          ? "Team B"
          : null;
      if (winningTeam) {
        sounds.victory.play();
      }
    }
  }, [showResult, score, quiz?.questions.length, teamScores]);

  // Shuffle array helper
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Move to next question
  const handleNext = useCallback(() => {
    setHasAnswered(false);
    setSelectedOption(null);

    if (currentQuestion + 1 < shuffledQuestions.length) {
      setCurrentQuestion((prev) => prev + 1);
      setActiveTeam((prev) => (prev === "Team A" ? "Team B" : "Team A"));

      // Reset timer for next question based on difficulty
      const nextQ = shuffledQuestions[currentQuestion + 1];
      setTimeLeft(
        nextQ.difficulty === "Easy"
          ? 20
          : nextQ.difficulty === "Medium"
          ? 30
          : 45
      );
    } else {
      setShowResult(true);
    }
  }, [currentQuestion, shuffledQuestions.length]);
  // Handle option selection
  const handleOptionClick = useCallback(
    (option) => {
      if (hasAnswered) return;

      setSelectedOption(option);
      setHasAnswered(true);

      const correct = shuffledQuestions[currentQuestion].correctAnswer;
      const isCorrect = option === correct;
      const pointsToAdd =
        powerUps[activeTeam].doublePoints > 0 && isCorrect ? 2 : 1;

      // Update scores
      if (isCorrect) {
        sounds.correct.play();
        setScore((prev) => prev + pointsToAdd);
        setTeamScores((prev) => ({
          ...prev,
          [activeTeam]: prev[activeTeam] + pointsToAdd,
        }));
        setStreak((prev) => {
          const newStreak = prev + 1;
          if (newStreak >= 3) {
            setShowStreak(true);
            setTimeout(() => setShowStreak(false), 2000);
          }
          return newStreak;
        });
      } else {
        sounds.wrong.play();
        setStreak(0);
      }

      // Auto-advance after delay
      setTimeout(() => {
        handleNext();
      }, 1500);
    },
    [currentQuestion, shuffledQuestions, hasAnswered, activeTeam, powerUps]
  );

  // Handle time running out
  const handleTimeUp = useCallback(() => {
    setHasAnswered(true);
    sounds.wrong.play();

    setTimeout(() => {
      handleNext();
    }, 1500);
  }, [handleNext]);

  // Use power-up
  const handlePowerUp = (powerUpType) => {
    if (powerUps[activeTeam][powerUpType] > 0) {
      sounds.powerup.play();
      setPowerUps((prev) => ({
        ...prev,
        [activeTeam]: {
          ...prev[activeTeam],
          [powerUpType]: prev[activeTeam][powerUpType] - 1,
        },
      }));
      setUsedPowerUps((prev) => [
        ...prev,
        { team: activeTeam, type: powerUpType },
      ]);

      if (powerUpType === "skipQuestion") {
        handleNext();
      }
    }
  };

  // Restart game
  const handleRestart = () => {
    const shuffled = shuffleArray([...quiz.questions]).map((q) => ({
      ...q,
      options: shuffleArray([...q.options]),
    }));

    setShuffledQuestions(shuffled);
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
    setTimeSpent(0);
    setHasAnswered(false);
    setTeamScores({ "Team A": 0, "Team B": 0 });
    setActiveTeam("Team A");
    setPowerUps({
      "Team A": { doublePoints: 1, skipQuestion: 1 },
      "Team B": { doublePoints: 1, skipQuestion: 1 },
    });
    setUsedPowerUps([]);
    setStreak(0);

    // Set timer for first question
    setTimeLeft(
      shuffled[0].difficulty === "Easy"
        ? 20
        : shuffled[0].difficulty === "Medium"
        ? 30
        : 45
    );
  };

  // Toggle game mode
  const toggleGameMode = () => {
    setGameMode((prev) =>
      prev === "competitive" ? "collaborative" : "competitive"
    );
    handleRestart();
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  const optionVariants = {
    hover: {
      scale: 1.03,
      boxShadow: "0 5px 15px rgba(245, 158, 11, 0.3)",
    },
    tap: { scale: 0.98 },
  };

  const streakVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 500 },
    },
    exit: { scale: 0, opacity: 0 },
  };

  if (!quiz) {
    return (
      <motion.div
        className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center p-8 max-w-md bg-gray-800/70 backdrop-blur-md rounded-2xl border border-gray-700 shadow-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-red-500 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h1 className="text-3xl font-bold mb-4">Quiz Not Found</h1>
          <p className="text-gray-300 mb-6">
            The requested quiz could not be found.
          </p>
          <Link
            to="/games"
            className="px-6 py-3 bg-amber-600 hover:bg-amber-700 rounded-xl font-medium transition-colors inline-flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Games
          </Link>
        </div>
      </motion.div>
    );
  }

  if (shuffledQuestions.length === 0) return null;

  const question = shuffledQuestions[currentQuestion];
  const progress =
    ((currentQuestion + (hasAnswered ? 1 : 0)) / shuffledQuestions.length) *
    100;

  const formattedTime = `${Math.floor(timeSpent / 60)}m ${timeSpent % 60}s`;

  return (
    <div className="min-h-screen mt-10 bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white py-12 px-4 md:px-8">
      {isExploding && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
        />
      )}

      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Game Mode Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-gray-800 rounded-full p-1 inline-flex">
            <button
              onClick={toggleGameMode}
              className={`px-4 py-2 rounded-full transition-colors ${
                gameMode === "competitive"
                  ? "bg-amber-600 text-white"
                  : "bg-transparent text-gray-400 hover:text-white"
              }`}
            >
              Competitive
            </button>
            <button
              onClick={toggleGameMode}
              className={`px-4 py-2 rounded-full transition-colors ${
                gameMode === "collaborative"
                  ? "bg-amber-600 text-white"
                  : "bg-transparent text-gray-400 hover:text-white"
              }`}
            >
              Collaborative
            </button>
          </div>
        </div>

        {/* Quiz Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">
              {quiz.title}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-gray-400">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">
                  Current Turn:{" "}
                  <span className="font-bold text-amber-400">{activeTeam}</span>
                </span>
                {gameMode === "competitive" && (
                  <div className="flex space-x-2">
                    <span className="text-sm bg-blue-900/50 px-2 py-1 rounded-full">
                      Team A: {teamScores["Team A"]}
                    </span>
                    <span className="text-sm bg-purple-900/50 px-2 py-1 rounded-full">
                      Team B: {teamScores["Team B"]}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <svg
                    className="h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {formattedTime}
                </span>
                <span className="flex items-center">
                  <svg
                    className="h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {score} correct
                </span>
              </div>
            </div>
          </div>
          <Link
            to="/games"
            className="mt-4 md:mt-0 flex items-center text-amber-400 hover:text-amber-300 transition-colors"
          >
            <svg
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to quizzes
          </Link>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="h-2 bg-gray-700 rounded-full mb-8 overflow-hidden relative"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="h-full bg-amber-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <div
            className="absolute top-0 right-0 h-full bg-red-500 rounded-full transition-all duration-1000 ease-linear"
            style={{
              width: `${
                (timeLeft /
                  (question.difficulty === "Easy"
                    ? 20
                    : question.difficulty === "Medium"
                    ? 30
                    : 45)) *
                100
              }%`,
            }}
          />
        </motion.div>

        {/* Power Ups */}
        {gameMode === "competitive" && (
          <div className="flex flex-col md:flex-row justify-between gap-6 mb-6">
            {["Team A", "Team B"].map((team) => (
              <div
                key={team}
                className="bg-gray-800/50 p-3 rounded-xl border border-gray-700 flex-1"
              >
                <h4
                  className={`text-xs font-bold mb-2 ${
                    team === "Team A" ? "text-blue-400" : "text-purple-400"
                  }`}
                >
                  {team.toUpperCase()} POWER-UPS
                </h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handlePowerUp("doublePoints")}
                    disabled={powerUps[team].doublePoints === 0}
                    className={`px-3 py-1 text-xs rounded-lg flex items-center ${
                      powerUps[team].doublePoints > 0
                        ? team === "Team A"
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-purple-600 hover:bg-purple-700"
                        : "bg-gray-700 cursor-not-allowed"
                    }`}
                  >
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                    Double Points ({powerUps[team].doublePoints})
                  </button>

                  <button
                    onClick={() => handlePowerUp("skipQuestion")}
                    disabled={powerUps[team].skipQuestion === 0}
                    className={`px-3 py-1 text-xs rounded-lg flex items-center ${
                      powerUps[team].skipQuestion > 0
                        ? team === "Team A"
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-purple-600 hover:bg-purple-700"
                        : "bg-gray-700 cursor-not-allowed"
                    }`}
                  >
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 12h14M12 5l7 7-7 7"
                      />
                    </svg>
                    Skip ({powerUps[team].skipQuestion})
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Streak Notification */}
        <AnimatePresence>
          {showStreak && streak >= 3 && (
            <motion.div
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 text-center"
              variants={streakVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="bg-gradient-to-r from-amber-500 to-pink-500 text-white text-4xl font-bold px-8 py-4 rounded-xl shadow-2xl">
                {streak} IN A ROW! 🔥
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quiz Content */}
        <motion.div
          className="bg-gray-800/50 p-6 md:p-8 rounded-2xl border border-gray-700 shadow-2xl backdrop-blur-md relative"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Timer Badge */}
          <div className="absolute -top-3 -right-3 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {timeLeft}s
          </div>

          {showResult ? (
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-8">
                <h3 className="text-3xl font-bold mb-4">
                  {gameMode === "competitive" ? (
                    teamScores["Team A"] > teamScores["Team B"] ? (
                      <span className="text-blue-400">🎉 Team A Wins!</span>
                    ) : teamScores["Team B"] > teamScores["Team A"] ? (
                      <span className="text-purple-400">🎉 Team B Wins!</span>
                    ) : (
                      <span className="text-amber-400">🤝 It's a Draw!</span>
                    )
                  ) : (
                    <span className="text-green-400">🎉 Quiz Completed!</span>
                  )}
                </h3>

                {gameMode === "competitive" ? (
                  <>
                    <div className="flex justify-center space-x-8 mb-6">
                      <div className="bg-blue-900/30 p-4 rounded-xl border border-blue-700">
                        <h4 className="text-xl font-bold text-blue-300">
                          Team A
                        </h4>
                        <p className="text-2xl">{teamScores["Team A"]}</p>
                      </div>
                      <div className="bg-purple-900/30 p-4 rounded-xl border border-purple-700">
                        <h4 className="text-xl font-bold text-purple-300">
                          Team B
                        </h4>
                        <p className="text-2xl">{teamScores["Team B"]}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-2xl mb-2">
                    Final Score: <span className="font-bold">{score}</span> /{" "}
                    {quiz.questions.length}
                  </p>
                )}

                <p className="text-gray-400 mb-6">Time: {formattedTime}</p>

                <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600 text-left max-w-2xl mx-auto">
                  <h4 className="font-bold text-amber-400 mb-2">
                    Performance Summary
                  </h4>
                  <p>
                    {score >= quiz.questions.length * 0.8
                      ? "Outstanding performance! You've mastered this topic."
                      : score >= quiz.questions.length * 0.5
                      ? "Good job! You've got a solid understanding."
                      : "Keep practicing! Review the material and try again."}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <motion.button
                  onClick={handleRestart}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-amber-600 hover:bg-amber-700 rounded-xl font-medium transition-colors"
                >
                  Play Again
                </motion.button>
                <Link
                  to="/games"
                  className="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl font-medium transition-colors text-center"
                >
                  Browse More Quizzes
                </Link>
              </div>
            </motion.div>
          ) : (
            <>
              <motion.div variants={itemVariants}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-amber-400">
                    Question {currentQuestion + 1} of {quiz.questions.length}
                  </span>
                  {question.difficulty && (
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        question.difficulty === "Easy"
                          ? "bg-green-900/50 text-green-300"
                          : question.difficulty === "Medium"
                          ? "bg-yellow-900/50 text-yellow-300"
                          : "bg-red-900/50 text-red-300"
                      }`}
                    >
                      {question.difficulty}
                    </span>
                  )}
                </div>
                <h3 className="text-xl md:text-2xl font-medium mb-6 leading-relaxed">
                  {question.question}
                </h3>
                {question.image && (
                  <div className="mb-6">
                    <img
                      src={question.image}
                      alt="Question illustration"
                      className="max-h-60 mx-auto rounded-lg border border-gray-700"
                    />
                  </div>
                )}
              </motion.div>

              <motion.div
                className="grid grid-cols-1 gap-3"
                variants={containerVariants}
              >
                {question.options.map((option, idx) => (
                  <motion.button
                    key={idx}
                    variants={itemVariants}
                    whileHover={!hasAnswered ? optionVariants.hover : {}}
                    whileTap={!hasAnswered ? optionVariants.tap : {}}
                    onClick={() => handleOptionClick(option)}
                    disabled={hasAnswered}
                    className={`w-full py-3 px-4 rounded-xl text-left transition-all font-medium border relative overflow-hidden ${
                      hasAnswered
                        ? option === question.correctAnswer
                          ? "bg-green-900/30 border-green-600"
                          : selectedOption === option
                          ? "bg-red-900/30 border-red-600"
                          : "bg-gray-700/30 border-gray-600"
                        : "bg-gray-700/30 border-gray-600 hover:bg-gray-600/30"
                    } ${
                      hasAnswered && option === question.correctAnswer
                        ? "ring-2 ring-green-400"
                        : ""
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="mr-3 font-bold text-gray-400">
                        {String.fromCharCode(65 + idx)}.
                      </span>
                      <span>{option}</span>
                      {hasAnswered && option === question.correctAnswer && (
                        <svg
                          className="h-5 w-5 ml-auto text-green-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                      {hasAnswered &&
                        selectedOption === option &&
                        option !== question.correctAnswer && (
                          <svg
                            className="h-5 w-5 ml-auto text-red-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        )}
                    </div>
                  </motion.button>
                ))}
              </motion.div>

              {question.explanation && hasAnswered && (
                <motion.div
                  className="mt-6 p-4 bg-gray-700/50 rounded-lg border border-gray-600"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h4 className="font-bold text-amber-400 mb-2">
                    Explanation:
                  </h4>
                  <p>{question.explanation}</p>
                </motion.div>
              )}

              {hasAnswered && (
                <motion.div
                  className="mt-6 flex justify-end"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.button
                    onClick={handleNext}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 bg-amber-600 hover:bg-amber-700 rounded-xl font-medium transition-colors inline-flex items-center"
                  >
                    {currentQuestion + 1 < quiz.questions.length ? (
                      <>
                        Next Question
                        <svg
                          className="h-5 w-5 ml-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </>
                    ) : (
                      <>
                        See Results
                        <svg
                          className="h-5 w-5 ml-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          />
                        </svg>
                      </>
                    )}
                  </motion.button>
                </motion.div>
              )}
            </>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default GameDetail;
