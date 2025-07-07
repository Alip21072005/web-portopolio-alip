import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-scroll';

const Home: React.FC = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden" id="home">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
      </div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="mb-6 leading-tight text-gray-900 dark:text-white">
              Hi, I'm <span className="text-indigo-600 dark:text-indigo-400">Vikas</span>
              <br />Web Developer
            </h1>
          </motion.div>

          <motion.p
            className="mb-8 text-xl md:text-2xl text-gray-700 dark:text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            I build beautiful, responsive, and user-friendly web applications with modern technologies.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link to="projects" spy={true} smooth={true} offset={-70} duration={500}>
              <button className="btn btn-primary">View My Work</button>
            </Link>
            <Link to="contact" spy={true} smooth={true} offset={-70} duration={500}>
              <button className="btn btn-outline">Contact Me</button>
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6, 
            delay: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 0.5
          }}
        >
          <Link to="about" spy={true} smooth={true} offset={-70} duration={500}>
            <ChevronDown size={32} className="text-gray-600 dark:text-gray-400 cursor-pointer" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;