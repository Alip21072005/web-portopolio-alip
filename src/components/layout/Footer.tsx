import React from "react";
import { motion } from "framer-motion";
import { Github as GitHub, Linkedin, Instagram, Mail } from "lucide-react";
import { Link } from "react-scroll"; // Import Link dari react-scroll

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <GitHub size={20} />,
      url: "https://github.com/Alip21072005",
      label: "GitHub Alip Maulana",
    },
    {
      icon: <Linkedin size={20} />,
      url: "https://www.linkedin.com/in/alipmaulana21?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      label: "LinkedIn Alip Maulana",
    },
    {
      icon: <Instagram size={20} />,
      url: "https://www.instagram.com/_alip.pppp?igsh=M3F5Z2NyZ3dlZXVj",
      label: "Instagram Alip Maulana",
    },
    {
      icon: <Mail size={20} />,
      url: "mailto:muhamadalipmaulana3@gmail.com", // Menggunakan mailto: untuk email
      label: "Kirim Email ke Alip Maulana",
    },
  ];

  // Definisi tautan cepat yang sama dengan Header untuk konsistensi
  const quickLinks = [
    { title: "Home", id: "home" },
    { title: "About", id: "about" },
    { title: "Projects", id: "projects" },
    { title: "Skills", id: "skills" },
    { title: "Contact", id: "contact" },
  ];

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-10">
      <div className="container mx-auto px-4">
        {" "}
        {/* Tambahkan mx-auto px-4 untuk centering */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo and About */}
          <div className="col-span-1">
            <div className="mb-4">
              <span className="text-xl font-bold">
                <span className="text-indigo-600 dark:text-indigo-400">
                  Alip
                </span>
                <span className="text-gray-900 dark:text-white">.dev</span>
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Web Developer yang bersemangat menciptakan situs web yang indah,
              responsif, dan memberikan pengalaman pengguna yang menarik.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Tautan Cepat
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.id}
                    spy={true}
                    smooth={true}
                    offset={-70} // Sesuaikan offset jika ada header tetap
                    duration={500}
                    className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Terhubung
            </h3>
            <div className="flex items-center space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  // Hapus rel="noopener noreferrer" untuk mailto links, pertahankan untuk http/https
                  rel={
                    link.url.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  aria-label={link.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            &copy; {currentYear} Alip.dev. Semua hak dilindungi undang-undang.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
