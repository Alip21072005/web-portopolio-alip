// src/components/sections/Skills.tsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SkillBar from "../ui/SkillBar";

const Skills: React.FC = () => {
  // State untuk memicu render ulang setiap detik
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Memperbarui waktu setiap detik
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Membersihkan timer saat komponen di-unmount
    return () => clearInterval(timer);
  }, []);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Tanggal lahir Anda sebagai patokan untuk total durasi hidup
  // Anda bisa mengubah tanggal dan waktu ini jika diperlukan
  const birthDate = new Date("2005-07-21T00:00:00");

  // Fungsi untuk menghitung durasi dari tanggal mulai dalam milidetik
  const calculateDurationInMilliseconds = (startDate: Date): number => {
    return Math.abs(currentTime.getTime() - startDate.getTime());
  };

  // Fungsi untuk menghitung durasi dari tanggal mulai dalam format teks (tahun, bulan, hari, jam, menit, detik)
  const calculateDurationText = (startDate: Date): string => {
    const diffMs = calculateDurationInMilliseconds(startDate);

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const years = Math.floor(days / 365.25); // Rata-rata tahun termasuk kabisat

    const remainingDays = days - years * 365.25;
    const remainingMonths = Math.floor(remainingDays / 30.44); // Rata-rata bulan

    const displayYears = years;
    const displayMonths = remainingMonths;
    const displayDays = Math.floor(remainingDays - remainingMonths * 30.44);
    const displayHours = hours % 24;
    const displayMinutes = minutes % 60;
    const displaySeconds = seconds % 60;

    let durationString = "";
    if (displayYears > 0) durationString += `${displayYears} th `;
    if (displayMonths > 0) durationString += `${displayMonths} bln `;
    if (displayDays > 0) durationString += `${displayDays} hr `;
    if (displayHours > 0) durationString += `${displayHours} jam `;
    if (displayMinutes > 0) durationString += `${displayMinutes} mnt `;
    durationString += `${displaySeconds} dtk`; // Detik selalu ditampilkan

    return durationString.trim();
  };

  // Total durasi hidup dalam milidetik (dihitung secara dinamis dari birthDate)
  const totalLifeDurationInMs = calculateDurationInMilliseconds(birthDate);

  // Fungsi untuk menghitung persentase penggunaan teknologi dari total durasi hidup
  const calculateUsagePercentage = (startDate: Date): number => {
    const usageMs = calculateDurationInMilliseconds(startDate);
    if (totalLifeDurationInMs === 0) return 0; // Menghindari pembagian nol
    const percentage = (usageMs / totalLifeDurationInMs) * 100;
    return parseFloat(percentage.toFixed(2)); // Pembulatan 2 angka di belakang koma
  };

  const webdevSkills = [
    // Ubah new Date(...) dengan tanggal spesifik Anda mulai menggunakan skill tersebut
    {
      name: "HTML",
      level: calculateUsagePercentage(new Date("2023-09-01T00:00:00")),
      durationText: calculateDurationText(new Date("2023-09-01T00:00:00")),
    },
    {
      name: "CSS",
      level: calculateUsagePercentage(new Date("2024-08-01T08:30:00")),
      durationText: calculateDurationText(new Date("2024-08-01T08:30:00")),
    },
    {
      name: "JavaScript",
      level: calculateUsagePercentage(new Date("2024-09-01T14:00:00")),
      durationText: calculateDurationText(new Date("2024-09-01T14:00:00")),
    },
    {
      name: "Bootstrap",
      level: calculateUsagePercentage(new Date("2024-08-20T11:00:00")),
      durationText: calculateDurationText(new Date("2024-08-20T11:00:00")),
    },
    {
      name: "Tailwind",
      level: calculateUsagePercentage(new Date("2024-12-18T16:00:00")),
      durationText: calculateDurationText(new Date("2024-12-18T16:00:00")),
    },
    {
      name: "Figma",
      level: calculateUsagePercentage(new Date("2024-12-06T19:00:00")),
      durationText: calculateDurationText(new Date("2024-12-06T19:00:00")),
    },
    {
      name: "PHP",
      level: calculateUsagePercentage(new Date("2024-08-20T11:00:00")),
      durationText: calculateDurationText(new Date("2024-08-20T11:00:00")),
    },
    {
      name: "Laravel",
      level: calculateUsagePercentage(new Date("2025-05-17T08:00:00")),
      durationText: calculateDurationText(new Date("2025-05-17T08:00:00")),
    },
    {
      name: "React",
      level: calculateUsagePercentage(new Date("2024-12-20T03:12:00")),
      durationText: calculateDurationText(new Date("2024-12-20T03:12:00")),
    },
    {
      name: "Node.js",
      level: calculateUsagePercentage(new Date("2024-12-19T23:12:00")),
      durationText: calculateDurationText(new Date("2024-12-19T23:12:00")),
    },
    {
      name: "Next.js",
      level: calculateUsagePercentage(new Date("2024-12-30T00:00:00")),
      durationText: calculateDurationText(new Date("2024-12-30T00:00:00")),
    },
    {
      name: "Git",
      level: calculateUsagePercentage(new Date("2025-02-01T00:00:00")),
      durationText: calculateDurationText(new Date("2025-02-01T00:00:00")),
    },
  ];

  const otherSkills = [
    // Dan di sini untuk skill lainnya
    {
      name: "Video Editing",
      level: calculateUsagePercentage(new Date("2019-02-01T08:00:00")),
      durationText: calculateDurationText(new Date("2019-02-01T08:00:00")),
    },
    {
      name: "Desain Grafis",
      level: calculateUsagePercentage(new Date("2020-07-01T13:00:00")),
      durationText: calculateDurationText(new Date("2020-07-01T13:00:00")),
    },
    {
      name: "Guitar",
      level: calculateUsagePercentage(new Date("2021-05-01T09:00:00")),
      durationText: calculateDurationText(new Date("2021-05-01T09:00:00")),
    },
    {
      name: "Public Speaking",
      level: calculateUsagePercentage(new Date("2017-01-01T08:00:00")),
      durationText: calculateDurationText(new Date("2017-01-01T08:00:00")),
    },
    {
      name: "Rubik's Cube",
      level: calculateUsagePercentage(new Date("2016-09-15T15:00:00")),
      durationText: calculateDurationText(new Date("2016-09-15T15:00:00")),
    },
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
    <section
      className="section bg-gray-50 dark:bg-gray-800/50"
      id="skills"
      ref={ref}
    >
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

        {/* Penjelasan Persentase */}
        <motion.p
          className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Persentase di bawah ini menunjukkan{" "}
          <span className="font-semibold text-indigo-600">
            proporsi waktu hidup saya
          </span>{" "}
          yang telah saya dedikasikan untuk mempelajari atau menggunakan hal
          tersebut, terhitung sejak tanggal lahir saya pada{" "}
          <span className="font-semibold text-blue-600">21 Juli 2005</span>.
          Semakin tinggi persentasenya, semakin besar bagian dari hidup saya
          yang terkait dengan keahlian tersebut. Durasi spesifiknya juga
          ditampilkan untuk setiap keahlian.
        </motion.p>
        {/* --- */}

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
              {webdevSkills.map((skill, index) => (
                <SkillBar
                  key={index}
                  name={skill.name}
                  level={skill.level}
                  durationText={skill.durationText}
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
                  durationText={skill.durationText}
                  delay={(index + webdevSkills.length) * 0.1}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
