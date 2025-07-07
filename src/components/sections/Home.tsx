import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Link } from "react-scroll";
import { FaLinkedin } from "react-icons/fa"; // Import ikon LinkedIn

const Home: React.FC = () => {
  return (
    <section
      className="relative h-screen flex items-center justify-center overflow-hidden"
      id="home"
    >
      {/* Elemen Latar Belakang (efek blob/cahaya) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {" "}
        {/* Tambahkan mx-auto px-4 */}
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="mb-6 leading-tight text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
              {" "}
              {/* Ukuran font yang lebih dinamis */}
              Halo Bre
              <br />
              Saya Alip{" "}
              <span className="text-indigo-600 dark:text-indigo-400">
                Maulana
              </span>
            </h1>
          </motion.div>

          <motion.p
            className="mb-8 text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto" // Ukuran font dan lebar yang lebih baik
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Seorang{" "}
            <span className="text-indigo-600 dark:text-indigo-400 font-bold">
              Web Developer{" "}
            </span>
            yang berfokus pada pengembangan website modern dan
            <span className="text-indigo-600 dark:text-indigo-400 font-bold">
              {" "}
              Interaktif
            </span>
            . Saya menciptakan pengalaman digital yang menarik dan fungsional.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Tombol Download CV */}
            <a
              href="/path/to/your/cv_alip_maulana.pdf" // Ganti dengan path CV Anda yang sebenarnya
              download="cv_alip_maulana.pdf" // Nama file saat diunduh
              className="focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md"
            >
              <button className="btn bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-300">
                Download CV
              </button>
            </a>

            {/* Tombol LinkedIn dengan Ikon */}
            <a
              href="https://www.linkedin.com/in/alipmaulana21"
              target="_blank" // Membuka di tab baru
              rel="noopener noreferrer" // Praktik keamanan untuk target="_blank"
              className="focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md"
            >
              <button className="btn bg-transparent text-indigo-600 border border-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors duration-300 flex items-center justify-center gap-2">
                <FaLinkedin size={20} /> {/* Ikon LinkedIn */}
                LinkedIn
              </button>
            </a>
          </motion.div>
        </div>
        {/* Indikator Gulir */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 0.5,
          }}
        >
          <Link
            to="about"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full cursor-pointer" // Gaya fokus dan cursor pointer
          >
            <ChevronDown
              size={32}
              className="text-gray-600 dark:text-gray-400"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;
