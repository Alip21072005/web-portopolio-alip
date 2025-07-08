import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { BookOpenText, Code, Handshake, Sparkles } from "lucide-react";

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [experienceDuration, setExperienceDuration] = useState("");

  useEffect(() => {
    const calculateExperience = () => {
      // Mengubah tanggal mulai menjadi 1 Januari 2024
      const startDate = new Date("2024-01-01T00:00:00Z");
      const now = new Date();
      const diff = now.getTime() - startDate.getTime(); // Selisih dalam milidetik

      // Jika tanggal mulai di masa depan, tampilkan 0 atau pesan yang sesuai
      if (diff < 0) {
        setExperienceDuration("Belum dimulai");
        return;
      }

      // Hitung durasi
      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      // Hitung tahun dan bulan berdasarkan selisih tanggal sebenarnya
      let years = now.getFullYear() - startDate.getFullYear();
      let months = now.getMonth() - startDate.getMonth();
      let remainingDays = days;

      if (months < 0 || (months === 0 && now.getDate() < startDate.getDate())) {
        years--;
        months += 12;
      }

      // Menyesuaikan remainingDays berdasarkan bulan yang sudah dihitung
      const tempDate = new Date(startDate);
      tempDate.setFullYear(startDate.getFullYear() + years);
      tempDate.setMonth(startDate.getMonth() + months);

      // Pastikan remainingDays tidak negatif jika tanggal saat ini lebih kecil dari tanggal mulai di bulan yang sama
      if (now.getDate() < startDate.getDate() && months > 0) {
        months--; // Kurangi 1 bulan karena tanggal saat ini belum mencapai tanggal mulai di bulan baru
        tempDate.setMonth(startDate.getMonth() + months);
        remainingDays = Math.floor(
          (now.getTime() - tempDate.getTime()) / (1000 * 60 * 60 * 24)
        );
      } else {
        remainingDays = Math.floor(
          (now.getTime() - tempDate.getTime()) / (1000 * 60 * 60 * 24)
        );
      }

      const remainingHours = hours % 24;
      const remainingMinutes = minutes % 60;
      const remainingSeconds = seconds % 60;

      // Format string hasil
      const formattedDuration = `${years} tahun ${months} bulan ${remainingDays} hari ${remainingHours} jam ${remainingMinutes} menit ${remainingSeconds} detik`;
      setExperienceDuration(formattedDuration);
    };

    calculateExperience(); // Hitung saat komponen dimuat

    // Perbarui setiap detik
    const interval = setInterval(calculateExperience, 1000);

    // Bersihkan interval saat komponen di-unmount
    return () => clearInterval(interval);
  }, []);

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
        "Membangun website dengan teknologi modern seperti React, Next.js, dan Node.js. Menciptakan aplikasi web yang responsif, cepat, dan mudah digunakan.",
    },
    {
      icon: <Handshake size={24} />,
      title: "Teamwork & Kolaborasi",
      description:
        "Bekerja sama dalam tim untuk menciptakan solusi yang inovatif dan efektif, baik dalam organisasi, kepanitian dan komunitas maupun dalam proyek pengembangan web.",
    },
    {
      icon: <BookOpenText size={24} />,
      title: "Tidak Berhenti Belajar",
      description:
        "Selalu memperbarui pengetahuan dan keterampilan dalam teknologi web terbaru. Mempelajari framework dan alat baru untuk meningkatkan efisiensi dan kualitas pengembangan.",
    },
    {
      icon: <Sparkles size={24} />,
      title: "Leadership",
      description:
        "Memimpin suatu tim untuk mencapai tujuan bersama. Mendorong inovasi dan kreativitas dalam setiap hal yang dilakukan. Membangun lingkungan kerja yang positif dan produktif.",
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
            <h3 className="text-2xl font-bold mb-4">Who I am?</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Halo! Saya Alip Maulana, seorang Web Developer dengan <br />
              <strong className="text-blue-600 dark:text-blue-400">
                {experienceDuration}
              </strong>
              <br />
              pengalaman yang berfokus pada pembangunan pengalaman digital yang
              luar biasa. Fokus utama saya adalah menciptakan aplikasi web yang
              intuitif, responsif, dan berkinerja tinggi yang memberikan nilai
              nyata bagi pengguna.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Saya memiliki fondasi yang kuat dalam HTML, CSS, dan JavaScript,
              serta keahlian dalam teknologi pembangun website dan framework
              modern seperti React, Next.Js, Node.Js, Express.Js dan lainnya.
              Saya sangat antusias dengan kode yang bersih, aksesibilitas, dan
              prinsip-prinsip desain yang berpusat pada kemudahan pengguna.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Saya juga mengikuti berbagai kepanitian, organisasi, dan komunitas
              sehingga saya terbiasa bekerja dalam tim dan berkolaborasi dengan
              orang lain. Saya percaya bahwa kolaborasi yang baik menghasilkan
              produk yang lebih baik, dan saya selalu terbuka untuk belajar dari
              orang lain.
            </p>
            <a
              href="https://drive.google.com/file/d/1AdwB5IYsYm0T_0SJO9mQ4C7ex3FLvYQu/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
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
                className="card p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
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
