import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, MapPin, MessageCircleMore, Send } from "lucide-react";

const Contact: React.FC = () => {
  // `useInView` untuk animasi saat komponen terlihat di viewport
  const [ref, inView] = useInView({
    triggerOnce: true, // Animasi hanya berjalan sekali saat pertama kali terlihat
    threshold: 0.1, // Pemicu saat 10% komponen terlihat
  });

  // State untuk menyimpan data formulir
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // State untuk mengelola status pengiriman formulir (sedang dikirim, sukses, error)
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
    message: "", // Pesan untuk ditampilkan kepada pengguna
  });

  // Handler untuk memperbarui state `formData` saat input berubah
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler untuk pengiriman formulir
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah refresh halaman default dari submit form

    // Set status sedang mengirim
    setFormStatus({
      isSubmitting: true,
      isSuccess: false,
      isError: false,
      message: "",
    });

    try {
      // Mengirim data formulir ke endpoint API backend
      const response = await fetch("http://localhost:5000/api/contact", {
        // PASTIKAN URL INI SESUAI DENGAN BACKEND ANDA
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Mengirim data sebagai JSON
      });

      const data = await response.json(); // Menguraikan respons JSON dari server

      // Memeriksa apakah respons sukses (status HTTP 2xx dan properti `success` dari data)
      if (response.ok && data.success) {
        setFormStatus({
          isSubmitting: false,
          isSuccess: true,
          isError: false,
          message: data.message, // Menampilkan pesan sukses dari backend
        });
        // Mengosongkan formulir setelah berhasil dikirim
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        // Menangani respons error dari backend
        setFormStatus({
          isSubmitting: false,
          isSuccess: false,
          isError: true,
          message: data.message || "Gagal mengirim pesan. Silakan coba lagi.", // Gunakan pesan dari backend atau pesan default
        });
      }
    } catch (error) {
      // Menangani kesalahan jaringan atau kesalahan lain yang terjadi sebelum respons diterima
      console.error("Terjadi kesalahan saat mengirim formulir:", error);
      setFormStatus({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        message: "Tidak dapat terhubung ke server. Silakan coba lagi nanti.", // Pesan error koneksi
      });
    }
  };

  // Data informasi kontak yang akan ditampilkan
  const contactInfoItems = [
    {
      icon: <Mail size={24} />,
      title: "Email",
      content: "muhamadalipmaulana@gmail.com",
      link: "mailto:muhamadalipmaulana@gmail.com",
    },
    {
      icon: <MessageCircleMore size={24} />,
      title: "WhatsApp",
      content: "+62 857-5876-9683",
      link: "tel:+6285758769683",
    },
    {
      icon: <MapPin size={24} />,
      title: "Location",
      content:
        "Jl. Dharmawanita, Bentiring Permai, Muara Bangkahulu, Kota Bengkulu, Bengkulu 38228",
      link: null, // Tidak ada link untuk alamat fisik
    },
  ];

  return (
    <section className="section" id="contact" ref={ref}>
      <div className="container">
        {/* Judul Bagian Kontak dengan animasi */}
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Contact Me</h2>
          <div className="w-24 h-1 bg-indigo-600 dark:bg-indigo-400 mx-auto mt-4"></div>
        </motion.div>

        {/* Grid untuk Informasi Kontak dan Formulir */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Bagian Informasi Kontak */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-8">
              Jika Anda memiliki pertanyaan, ingin berdiskusi tentang proyek,
              atau hanya ingin menyapa, jangan ragu untuk menghubungi saya
              melalui email, WhatsApp, atau alamat di bawah ini. Saya akan
              berusaha membalas secepat mungkin.
            </p>

            {/* Daftar Item Informasi Kontak */}
            <div className="space-y-6">
              {contactInfoItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400 mr-4">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">{item.title}</h4>
                    {item.link ? (
                      <a
                        href={item.link}
                        className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-gray-700 dark:text-gray-300">
                        {item.content}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bagian Formulir Kontak */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Input Nama */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 dark:text-gray-300 mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  placeholder="John Doe"
                />
              </div>

              {/* Input Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 dark:text-gray-300 mb-2"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  placeholder="john@example.com"
                />
              </div>

              {/* Input Subjek */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-gray-700 dark:text-gray-300 mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  placeholder="Project Inquiry"
                />
              </div>

              {/* Input Pesan (Textarea) */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-700 dark:text-gray-300 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none"
                  placeholder="Your message here..."
                ></textarea>
              </div>

              {/* Tombol Kirim */}
              <motion.button
                type="submit"
                className="btn btn-primary w-full flex items-center justify-center gap-2"
                disabled={formStatus.isSubmitting} // Nonaktifkan tombol saat sedang mengirim
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {formStatus.isSubmitting ? (
                  "Sending..." // Teks saat sedang mengirim
                ) : (
                  <>
                    Send Message <Send size={18} /> {/* Teks default */}
                  </>
                )}
              </motion.button>

              {/* Pesan Sukses */}
              {formStatus.isSuccess && (
                <motion.div
                  className="p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg mt-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {formStatus.message}
                </motion.div>
              )}

              {/* Pesan Error */}
              {formStatus.isError && (
                <motion.div
                  className="p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg mt-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {formStatus.message}
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
