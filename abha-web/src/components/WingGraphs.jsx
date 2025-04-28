// src/components/WingGraphs.jsx
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const WingGraphs = () => {
  const [isInView, setIsInView] = useState(false);

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

    const chartElement = document.getElementById("pieChart");
    if (chartElement) {
      observer.observe(chartElement);
    }

    return () => {
      if (chartElement) {
        observer.unobserve(chartElement);
      }
    };
  }, []);

  const wingsData = {
    labels: ["Wing 1", "Wing 2", "Wing 3", "Wing 4"],
    datasets: [
      {
        label: "Points",
        data: isInView ? [80, 95, 75, 90] : [0, 0, 0, 0],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Important for responsiveness
    animation: {
      duration: 1500,
      easing: "easeOutBounce",
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "white",
        },
      },
      title: {
        display: true,
        text: "Points Distribution Among Wings",
        color: "white",
        font: {
          size: 18,
        },
      },
    },
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 max-w-5xl mx-auto mt-12">
      <div className="bg-[#2a2a2a] p-4 sm:p-6 md:p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6">
          Wings Points
        </h2>
        <div
          id="pieChart"
          className={`relative h-[300px] sm:h-[350px] md:h-[400px] transition-all duration-1000 ease-in-out ${
            isInView ? "opacity-100" : "opacity-0"
          }`}
        >
          <Pie data={wingsData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default WingGraphs;
