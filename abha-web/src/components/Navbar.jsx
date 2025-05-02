import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "../assets/logo print.jpg";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();

  const routes = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/blog", label: "Blog" },
    { path: "/programmes", label: "Programmes" },
    { path: "/podcast", label: "Podcast" },
  ];

  return (
    <nav className="w-full shadow-md px-6 py-4 backdrop-blur-md bg-[#292C35] fixed top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <X className="text-white" size={28} />
            ) : (
              <Menu className="text-white" size={28} />
            )}
          </button>
        </div>

        {/* Logo */}
        <Link to="/" className="flex items-center justify-center">
          <img
            src={Logo}
            alt="Abha Logo"
            className="h-10 w-auto hover:scale-105 rounded-4xl transition-transform duration-300"
          />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-12 text-gray-300 font-medium text-lg font-bloomsburg items-center">
          {routes.map(({ path, label }) => {
            const isActive = location.pathname === path;
            return (
              <li key={path} className="relative group cursor-pointer">
                <Link
                  to={path}
                  className={`transition-colors duration-300 ${
                    isActive ? "text-amber-400" : "group-hover:text-amber-400"
                  }`}
                >
                  {label}
                </Link>
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] transition-all duration-300 ${
                    isActive
                      ? "w-full bg-amber-400"
                      : "w-0 group-hover:w-full bg-amber-400"
                  }`}
                ></span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 px-4">
          <ul className="space-y-4 text-white text-lg font-medium">
            {routes.map((route) => (
              <li key={route.path}>
                <Link
                  to={route.path}
                  onClick={() => setMenuOpen(false)}
                  className={`block transition-colors ${
                    location.pathname === route.path
                      ? "text-amber-400"
                      : "hover:text-amber-400"
                  }`}
                >
                  {route.label}
                </Link>
              </li>
            ))}
            {/* Mobile Administrative Button - Hidden on /admin-upload */}
            {location.pathname !== "/admin-upload" && (
              <li>
                <button
                  onClick={handleAdminClick}
                  className="text-white bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 px-5 py-2 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 hover:shadow-pink-500/40"
                >
                  Admin
                </button>
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Password Input Popup */}
      {showPasswordInput && (
        <div className="fixed inset-0 flex items-center mt-87 justify-center z-50">
          {/* Backdrop overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-60 z-40"></div>

          {/* Modal content mt-87*/}
          <div className="bg-white p-8 rounded-xl shadow-2xl flex flex-col items-center space-y-6 w-96 max-w-sm transform scale-90 opacity-100 animate-fade-in z-50">
            <h2 className="text-2xl font-semibold text-gray-800 transition-all duration-300 ease-in-out transform hover:text-amber-400">
              Enter Admin Password
            </h2>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 border-gray-300 rounded-lg px-6 py-3 w-full text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all duration-300 ease-in-out transform hover:scale-105 focus:shadow-xl"
              placeholder="Password"
            />
            {error && (
              <p className="text-red-500 text-sm animate-shake">{error}</p>
            )}
            <div className="flex space-x-4">
              <button
                onClick={handlePasswordSubmit}
                className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white font-semibold py-3 px-6 rounded-md transition-all duration-300 ease-in-out transform hover:bg-green-700 hover:scale-105 shadow-lg"
              >
                Enter
              </button>
              <button
                onClick={() => {
                  setShowPasswordInput(false);
                  setPassword("");
                  setError("");
                }}
                className="bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-md transition-all duration-300 ease-in-out transform hover:bg-gray-500 hover:scale-105 shadow-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
