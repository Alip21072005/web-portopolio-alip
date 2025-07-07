import React, { useState, useEffect, useCallback } from "react";
import { useTheme } from "../../context/ThemeContext";
import { Link } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion"; // Impor AnimatePresence
import { Sun, Moon, Menu, X } from "lucide-react";

const navItems = [
  { title: "Home", id: "home" },
  { title: "About", id: "about" },
  { title: "Projects", id: "projects" },
  { title: "Skills", id: "skills" },
  { title: "Contact", id: "contact" },
];

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Menggunakan useCallback untuk fungsi toggle, menghindari re-render yang tidak perlu
  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Efek untuk mengelola scroll body dan menutup menu dengan tombol ESC
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"; // Mencegah scroll body
      const handleEscapeKey = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          toggleMobileMenu();
        }
      };
      document.addEventListener("keydown", handleEscapeKey);
      return () => {
        document.removeEventListener("keydown", handleEscapeKey);
        document.body.style.overflow = ""; // Mengembalikan scroll body saat komponen unmount atau menu tertutup
      };
    } else {
      document.body.style.overflow = ""; // Mengembalikan scroll body saat menu tertutup
    }
  }, [mobileMenuOpen, toggleMobileMenu]); // Tambahkan toggleMobileMenu sebagai dependensi

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white dark:bg-gray-900 shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {" "}
        {/* Tambahkan mx-auto px-4 untuk container */}
        {/* Logo */}
        <motion.div
          className="flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="home"
            spy={true}
            smooth={true}
            duration={500}
            className="focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md" // Tambahkan gaya fokus
          >
            <span className="text-xl font-bold cursor-pointer">
              <span className="text-indigo-600 dark:text-indigo-400">Alip</span>
              <span className="text-gray-900 dark:text-white">.Code</span>
            </span>
          </Link>
        </motion.div>
        {/* Desktop Navigation */}
        <motion.nav
          className="hidden md:flex items-center space-x-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.id}
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md" // Tambahkan gaya fokus
              activeClass="text-indigo-600 dark:text-indigo-400 font-semibold"
            >
              {item.title}
            </Link>
          ))}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" // Tambahkan gaya fokus
            aria-label={
              theme === "dark"
                ? "Beralih ke mode terang"
                : "Beralih ke mode gelap" // Terjemahkan aria-label
            }
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </motion.nav>
        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" // Tambahkan gaya fokus
            aria-label={
              theme === "dark"
                ? "Beralih ke mode terang"
                : "Beralih ke mode gelap" // Terjemahkan aria-label
            }
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" // Tambahkan gaya fokus
            aria-label="Alihkan menu seluler" // Terjemahkan aria-label
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu dengan AnimatePresence */}
      <AnimatePresence>
        {" "}
        {/* Bungkus dengan AnimatePresence */}
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-white dark:bg-gray-900 md:hidden flex flex-col items-center justify-center" // Tambahkan flexbox untuk centering
            initial={{ opacity: 0, y: -50 }} // Sesuaikan animasi awal
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }} // Animasi keluar
            transition={{ duration: 0.3 }}
          >
            <div className="relative w-full h-full flex flex-col items-center justify-center space-y-8 text-xl">
              {/* Tombol tutup di dalam menu mobile */}
              <button
                onClick={toggleMobileMenu}
                className="absolute top-4 right-4 p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Tutup menu"
              >
                <X size={24} />
              </button>

              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.id}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md"
                  activeClass="text-indigo-600 dark:text-indigo-400 font-semibold"
                  onClick={toggleMobileMenu} // Menutup menu setelah navigasi
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
