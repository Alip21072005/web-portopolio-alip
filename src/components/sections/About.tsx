import React, { useState, useEffect } from "react"; // Import useState dan useEffect
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Code, MonitorSmartphone, Rocket, Sparkles } from "lucide-react";

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [experienceYears, setExperienceYears] = useState("2.5"); // State untuk tahun pengalaman

  useEffect(() => {
    const calculateExperience = () => {
      const startDate = new Date("2023-08-01T00:00:00Z"); // Tanggal mulai: 1 Agustus 2023
      const now = new Date(); // Tanggal saat ini

      // Hitung selisih bulan
      let months;
      months = (now.getFullYear() - startDate.getFullYear()) * 12;
      months -= startDate.getMonth();
      months += now.getMonth();

      // Jika tanggal saat ini lebih kecil dari tanggal mulai di bulan yang sama, kurangi 1 bulan
      if (now.getDate() < startDate.getDate()) {
        months--;
      }

      const years = months / 12;
      setExperienceYears(years.toFixed(1)); // Format menjadi satu desimal
    };

    calculateExperience(); // Hitung saat komponen dimuat

    // Perbarui setiap bulan atau sesuai kebutuhan (misal, setiap hari jika ingin lebih akurat)
    // Untuk tujuan ini, perhitungan yang diperbarui saat komponen dimuat sudah cukup.
    // Jika ingin update lebih sering, Anda bisa menggunakan setInterval:
    // const interval = setInterval(calculateExperience, 1000 * 60 * 60 * 24 * 30); // Setiap bulan
    // return () => clearInterval(interval);
  }, []); // Dependensi kosong agar hanya berjalan sekali saat mount

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
      title: "Pengembangan Web",
      description:
        "Membangun situs web yang responsif, mudah diakses, dan berkinerja tinggi menggunakan framework modern seperti React.",
    },
    {
      icon: <MonitorSmartphone size={24} />,
      title: "Desain Responsif",
      description:
        "Menciptakan situs web yang berfungsi sempurna di semua perangkat dan ukuran layar.",
    },
    {
      icon: <Rocket size={24} />,
      title: "Optimasi Kinerja",
      description:
        "Mengoptimalkan aplikasi web untuk kecepatan, SEO, dan pengalaman pengguna yang luar biasa.",
    },
    {
      icon: <Sparkles size={24} />,
      title: "Desain UI/UX",
      description:
        "Merancang antarmuka pengguna yang intuitif dan pengalaman pengguna yang menyenangkan.",
    },
  ];

  return (
    <section
      className="section bg-gray-50 dark:bg-gray-800/50"
      id="about"
      ref={ref}
    >
      <div className="container">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Tentang Saya</h2>
          <div className="w-24 h-1 bg-indigo-600 dark:bg-indigo-400 mx-auto mt-4"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* About Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-4">
              Web Developer dengan passion menciptakan pengalaman pengguna yang
              indah
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Halo! Saya Alip Maulana, seorang Web Developer dengan **
              {experienceYears} tahun** pengalaman yang berfokus pada
              pembangunan pengalaman digital yang luar biasa. Fokus utama saya
              adalah menciptakan aplikasi web yang intuitif, responsif, dan
              berkinerja tinggi yang memberikan nilai nyata bagi pengguna.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Saya memiliki fondasi yang kuat dalam HTML, CSS, dan JavaScript,
              serta keahlian dalam framework modern seperti React. Saya sangat
              antusias dengan kode yang bersih, aksesibilitas, dan
              prinsip-prinsip desain yang berpusat pada pengguna.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Ketika tidak sedang mengkode, Anda bisa menemukan saya menjelajahi
              teknologi baru, berkontribusi pada proyek open-source, atau
              berbagi pengetahuan melalui postingan blog dan keterlibatan
              komunitas.
            </p>
            <a
              href="https://drive.google.com/file/d/1AdwB5IYsYm0T_0SJO9mQ4C7ex3FLvYQu/view?usp=drive_link" // Pastikan link ini benar
              target="_blank" // Buka di tab baru
              rel="noopener noreferrer" // Praktik keamanan
              className="btn btn-primary bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-300 inline-block"
            >
              Lihat Resume
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
                className="card p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300" // Menambahkan gaya kartu yang lebih baik
              >
                <div className="text-indigo-600 dark:text-indigo-400 mb-4 p-3 inline-block bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {service.title}
                </h3>
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
