import React, { useState } from 'react';
import Header from './components/layout/Header';
import Home from './components/sections/Home';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';
import Chatbot from './components/chatbot/Chatbot';
import { motion } from 'framer-motion';
import { Element } from 'react-scroll';

function App() {
  const [chatbotOpen, setChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setChatbotOpen(!chatbotOpen);
  };

  return (
    <div className="relative min-h-screen">
      <Header />
      
      <main>
        <Element name="home">
          <Home />
        </Element>
        
        <Element name="about">
          <About />
        </Element>
        
        <Element name="projects">
          <Projects />
        </Element>
        
        <Element name="skills">
          <Skills />
        </Element>
        
        <Element name="contact">
          <Contact />
        </Element>
      </main>
      
      <Footer />
      
      {/* Chatbot Button */}
      <motion.button
        className="fixed bottom-6 right-6 p-4 rounded-full bg-indigo-600 text-white shadow-lg z-50 hover:bg-indigo-700 transition-all duration-300"
        onClick={toggleChatbot}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Open chatbot"
      >
        {chatbotOpen ? (
          <span className="sr-only">Close chatbot</span>
        ) : (
          <span className="sr-only">Open chatbot</span>
        )}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
        </svg>
      </motion.button>
      
      {/* Chatbot Interface */}
      <Chatbot isOpen={chatbotOpen} onClose={toggleChatbot} />
    </div>
  );
}

export default App;