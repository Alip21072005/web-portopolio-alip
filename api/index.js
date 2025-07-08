// your-project/api/index.js

// Pastikan semua dependensi ini terinstal di package.json ROOT proyek Anda:
// "dotenv", "express", "nodemailer", "cors"

require("dotenv").config(); // Untuk memuat variabel lingkungan saat pengembangan lokal

const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

// Middleware CORS
// Sangat disarankan untuk mengamankan 'origin' di produksi.
// Untuk Vercel, CORS_ORIGIN harus berupa domain Vercel aplikasi Anda (misalnya: https://nama-aplikasi-anda.vercel.app)
// Saat pengembangan lokal, bisa 'http://localhost:5173' (port default Vite)
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*", // Fallback ke '*' jika CORS_ORIGIN tidak disetel (kurang aman untuk produksi)
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json()); // Middleware untuk parsing body JSON

// Konfigurasi Nodemailer Transporter
// Kredensial akan diambil dari Environment Variables di Vercel saat deployment
const transporter = nodemailer.createTransport({
  service: "gmail", // Contoh: "gmail". Anda bisa menggunakan layanan lain.
  auth: {
    user: process.env.EMAIL_USER, // Variabel Lingkungan: Alamat email pengirim (misal: your_email@gmail.com)
    pass: process.env.EMAIL_PASS, // Variabel Lingkungan: App Password email pengirim
  },
});

// Definisi Endpoint API untuk Pengiriman Formulir Kontak
app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validasi input dasar
  if (!name || !email || !subject || !message) {
    return res
      .status(400)
      .json({ success: false, message: "Semua kolom wajib diisi." });
  }

  try {
    // Opsi Email yang Akan Dikirim
    const mailOptions = {
      from: process.env.EMAIL_USER, // Alamat email pengirim
      to: process.env.TARGET_EMAIL, // Variabel Lingkungan: Alamat email tujuan (email Anda)
      subject: `Pesan Portofolio - ${subject}`, // Subjek email
      html: `
        <p><strong>Nama:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subjek:</strong> ${subject}</p>
        <p><strong>Pesan:</strong></p>
        <p>${message}</p>
      `,
    };

    // Mengirim email menggunakan Nodemailer
    await transporter.sendMail(mailOptions);

    // Mengirim respons sukses ke frontend
    res
      .status(200)
      .json({ success: true, message: "Pesan Anda berhasil terkirim!" });
  } catch (error) {
    console.error("Error saat mengirim email:", error);
    // Mengirim respons error ke frontend
    res.status(500).json({
      success: false,
      message: "Gagal mengirim pesan. Silakan coba lagi nanti.",
    });
  }
});

// Bagian Krusial untuk Vercel Serverless Function:
// Mengekspor aplikasi Express agar Vercel dapat memprosesnya sebagai handler.
// Tidak perlu app.listen(), Vercel yang mengelola server.
module.exports = app;
