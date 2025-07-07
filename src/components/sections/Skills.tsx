import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SkillBar from '../ui/SkillBar';

const Skills: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const frontendSkills = [
    { name: 'HTML/CSS', level: 95 },
    { name: 'JavaScript', level: 80 },
    { name: 'TypeScript', level: 75 },
    { name: 'React', level: 70 },
    { name: 'Tailwind CSS', level: 68 },
  ];

  const otherSkills = [
    { name: 'Node.js', level: 65 },
    { name: 'GraphQL', level: 60 },
    { name: 'UI/UX Design', level: 80 },
    { name: 'Git', level: 85 },
    { name: 'Testing (Jest, RTL)', level: 78 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className="section bg-gray-50 dark:bg-gray-800/50" id="skills" ref={ref}>
      <div className="container">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2>My Skills</h2>
          <div className="w-24 h-1 bg-indigo-600 dark:bg-indigo-400 mx-auto mt-4"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Frontend Skills */}
          <div>
            <motion.h3 
              className="text-2xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
             Web Development
            </motion.h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="space-y-5"
            >
              {frontendSkills.map((skill, index) => (
                <SkillBar 
                  key={index} 
                  name={skill.name} 
                  level={skill.level} 
                  delay={index * 0.1}
                />
              ))}
            </motion.div>
          </div>

          {/* Other Skills */}
          <div>
            <motion.h3 
              className="text-2xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Other Skills
            </motion.h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="space-y-5"
            >
              {otherSkills.map((skill, index) => (
                <SkillBar 
                  key={index} 
                  name={skill.name} 
                  level={skill.level} 
                  delay={(index + 5) * 0.1}
                />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Tech Stack Logos */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold mb-8 text-center">Technologies I Work With</h3>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {/* These would typically be replaced with actual logos */}
            {['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind', 'Node.js', 'Git'].map((tech, index) => (
              <motion.div
                key={index}
                className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md w-24 h-24 flex items-center justify-center"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <span className="font-medium text-gray-800 dark:text-gray-200">{tech}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;