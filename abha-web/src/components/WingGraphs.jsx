import React, { useEffect, useState, useRef } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { motion } from "framer-motion";

ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

const WingGraphs = () => {
  const [isInView, setIsInView] = useState(false);
  const chartRef = useRef(null);

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

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    return () => {
      if (chartRef.current) {
        observer.unobserve(chartRef.current);
      }
    };
  }, []);

  const wingsData = {
    labels: [
      "Academic",
      "Urdu",
      "English",
      "Malayalam",
      "Arabic",
      "Social Affairs",
    ],
    datasets: [
      {
        label: "Points",
        data: isInView ? [0, 0, 0, 5, 10, 0] : [0, 0, 0, 0],
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(6, 226, 35, 0.8)",
          "rgba(6, 145, 226, 0.8)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(6, 226, 35, 1)",
          "rgba(6, 145, 226, 1)",
        ],
        borderWidth: 2,
        borderRadius: 6,
        hoverBorderWidth: 3,
        hoverBackgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(6, 226, 35, 1)",
          "rgba(6, 145, 226, 1)",
        ],
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
        formatter: (value) => {
          return value > 0 ? `${value} pts` : "";
        },
      },
    },
    cutout: "60%",
    rotation: -30,
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
        ref={chartRef}
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
        >
          <Pie data={wingsData} options={options} plugins={[ChartDataLabels]} />
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
