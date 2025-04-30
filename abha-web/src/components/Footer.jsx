import React from "react";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-40 bg-white/5 backdrop-blur-md text-white border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* About Abha */}
        <div>
          <h3 className="text-2xl font-bold text-amber-400 mb-4 font-caudex">
            Abha
          </h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            Empowering creativity, passion, and purpose. Join our vibrant
            community and discover programs that inspire.
          </p>
        </div>

        {/* Quick Links */}
        <div className="">
          <h4 className="text-xl font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-300 gap-5 flex">
            <li>
              <a href="/" className="hover:text-amber-400 transition">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-amber-400 transition">
                About
              </a>
            </li>
            <li>
              <a href="/blog" className="hover:text-amber-400 transition">
                Blog
              </a>
            </li>
            <li>
              <a
                href="/programmes"
                className="hover:text-amber-400 transition "
              >
                Programs
              </a>
            </li>
          </ul>
        </div>
        {/* import { AiFillLike, AiFillDislike  } from "react-icons/ai";
import { GrFormView } from "react-icons/gr"; */}

        {/* Social Media */}
        <div>
          <h4 className="text-xl font-semibold text-white mb-4">Follow Us</h4>
          <div className="flex space-x-4 text-lg">
            <a
              href="https://www.instagram.com/_abha_nric/"
              className="text-blue-400 hover:text-white transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61575696666536"
              className="text-blue-400 hover:text-white transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://x.com/abhamates14th"
              className="text-blue-400 hover:text-white transition"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-400 py-6 border-t border-white/10">
        © {new Date().getFullYear()} Abha Community. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
