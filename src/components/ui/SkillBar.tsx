// src/components/ui/SkillBar.tsx
import React from "react";
import { motion } from "framer-motion";

interface SkillBarProps {
  name: string;
  level: number; // Tetap number untuk progress bar
  durationText?: string; // Prop baru untuk teks durasi, opsional
  delay?: number;
}

const SkillBar: React.FC<SkillBarProps> = ({
  name,
  level,
  durationText,
  delay = 0,
}) => {
  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay } },
  };

  return (
    <motion.div variants={itemVariants} className="flex flex-col gap-2">
      <div className="flex justify-between items-center text-gray-800 dark:text-gray-200">
        <span className="font-medium text-lg">{name}</span>
        {/* Mengelompokkan persentase dan durasi teks */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
            {level}%
          </span>
          {durationText && ( // Tampilkan durasi jika properti durationText ada
            <span className="text-xs text-gray-500 dark:text-gray-400">
              ({durationText})
            </span>
          )}
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <motion.div
          className="bg-indigo-600 h-2.5 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 1, delay: delay + 0.1 }} // Menambahkan delay untuk animasi bar
        ></motion.div>
      </div>
    </motion.div>
  );
};

export default SkillBar;
