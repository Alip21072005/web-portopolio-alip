import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, MonitorSmartphone, Rocket, Sparkles } from 'lucide-react';

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const services = [
    {
      icon: <Code size={24} />,
      title: 'Web Development',
      description: 'Building responsive, accessible, and performant websites using modern frameworks like React.',
    },
    {
      icon: <MonitorSmartphone size={24} />,
      title: 'Responsive Design',
      description: 'Creating websites that work flawlessly across all devices and screen sizes.',
    },
    {
      icon: <Rocket size={24} />,
      title: 'Performance Optimization',
      description: 'Optimizing web applications for speed, SEO, and user experience.',
    },
    {
      icon: <Sparkles size={24} />,
      title: 'UI/UX Design',
      description: 'Designing intuitive user interfaces and enjoyable user experiences.',
    },
  ];

  return (
    <section className="section bg-gray-50 dark:bg-gray-800/50" id="about" ref={ref}>
      <div className="container">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2>About Me</h2>
          <div className="w-24 h-1 bg-indigo-600 dark:bg-indigo-400 mx-auto mt-4"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* About Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-4">Web Developer with a passion for creating beautiful user experiences</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              I'm a Web Developer with 2.5 years of experience specializing in building exceptional digital experiences. My main focus is creating intuitive, responsive, and performant web applications that deliver real value to users.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              I have a strong foundation in HTML, CSS, and JavaScript, along with expertise in modern frameworks like React. I'm passionate about clean code, accessibility, and user-centered design principles.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge through blog posts and community engagement.
            </p>
            <a 
            href="https://drive.google.com/file/d/1AdwB5IYsYm0T_0SJO9mQ4C7ex3FLvYQu/view?usp=drive_link"
            className="btn btn-primary">
            View Resume
            </a>
          </motion.div>

          {/* Services */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="card p-6"
              >
                <div className="text-indigo-600 dark:text-indigo-400 mb-4 p-3 inline-block bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
