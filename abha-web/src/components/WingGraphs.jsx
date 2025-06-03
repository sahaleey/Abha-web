import React, { useEffect, useState, useRef } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { motion } from "framer-motion";

import { alreadyDoneProgrammes } from "../data/programmeData";

ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

const WingGraphs = () => {
  const [isInView, setIsInView] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);

  // Group programmes by wing, count points (1 per programme)
  const wingPointsMap = {};
  alreadyDoneProgrammes.forEach((program) => {
    const wing = program.wing || "General";
    if (!wingPointsMap[wing]) wingPointsMap[wing] = 0;
    wingPointsMap[wing] += 1;
  });

  const wings = Object.keys(wingPointsMap);
  const pointsByWing = Object.values(wingPointsMap);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (chartContainerRef.current) {
      observer.observe(chartContainerRef.current);
    }

    return () => {
      if (chartContainerRef.current) {
        observer.unobserve(chartContainerRef.current);
      }
    };
  }, []);

  const handleMouseMove = (e) => {
    if (chartContainerRef.current) {
      const rect = chartContainerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate position relative to center (-1 to 1 range)
      const relX = (x - centerX) / centerX;
      const relY = (y - centerY) / centerY;

      setMousePosition({ x: relX, y: relY });
    }
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  // Define color palettes for up to 10 wings (expand as needed)
  const backgroundColors = [
    "rgba(255, 99, 132, 0.8)", // red
    "rgba(54, 162, 235, 0.8)", // blue
    "rgba(255, 206, 86, 0.8)", // yellow
    "rgba(75, 192, 192, 0.8)", // teal
    "rgba(6, 226, 35, 0.8)", // green
    "rgba(6, 145, 226, 0.8)", // dark blue
    "rgba(45, 50, 126, 0.8)", // navy
    "rgba(255, 159, 64, 0.8)", // orange
    "rgba(153, 102, 255, 0.8)", // purple
    "rgba(255, 99, 255, 0.8)", // pink
  ];

  const borderColors = backgroundColors.map((color) =>
    color.replace("0.8", "1")
  );

  const wingsData = {
    labels: wings,
    datasets: [
      {
        label: "Points",
        data: isInView ? pointsByWing : Array(wings.length).fill(0),
        backgroundColor: backgroundColors.slice(0, wings.length),
        borderColor: borderColors.slice(0, wings.length),
        borderWidth: 2,
        borderRadius: 6,
        hoverBorderWidth: 3,
        hoverBackgroundColor: borderColors.slice(0, wings.length),
        weight: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: "easeOutElastic",
      animateScale: true,
      animateRotate: true,
    },
    layout: {
      padding: {
        top: 30,
        bottom: 30,
        left: 20,
        right: 20,
      },
    },
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "white",
          font: {
            size: 14,
            family: "'Inter', sans-serif",
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      title: {
        display: true,
        text: "Points Distribution Among Wings",
        color: "white",
        font: {
          size: 20,
          weight: "bold",
          family: "'Inter', sans-serif",
        },
        padding: {
          top: 20,
          bottom: 30,
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(0,0,0,0.8)",
        titleColor: "#fbbf24",
        bodyColor: "white",
        borderColor: "#fbbf24",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        usePointStyle: true,
      },
      datalabels: {
        display: true,
        color: "white",
        font: {
          weight: "bold",
          size: 14,
        },
        formatter: (value) => (value > 0 ? `${value} pts` : ""),
      },
    },
    cutout: "60%",
    rotation: -30 + mousePosition.x * 15, // Tilt based on mouse X position
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="w-full px-4 sm:px-6 md:px-8 lg:px-10 max-w-6xl mx-auto my-16"
    >
      <div
        ref={chartContainerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl border border-gray-700"
      >
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl sm:text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-600"
        >
          Wings Points Distribution
        </motion.h2>

        <div
          className={`relative h-[400px] sm:h-[450px] md:h-[500px] transition-all duration-1000 ease-out ${
            isInView ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transform: `perspective(1000px) rotateX(${
              mousePosition.y * -5
            }deg) rotateY(${mousePosition.x * 5}deg)`,
            transition: "transform 0.2s ease-out",
          }}
        >
          <Pie
            ref={chartRef}
            data={wingsData}
            options={options}
            plugins={[ChartDataLabels]}
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center text-gray-300 text-sm"
        >
          <p>
            Hover over segments for details • Click legend items to toggle
            visibility
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WingGraphs;
