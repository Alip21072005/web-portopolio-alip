// backend/index.js

require("dotenv").config(); // Muat variabel lingkungan dari .env

const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000; // Server akan berjalan di port 5000

// Middleware
app.use(cors()); // Mengizinkan permintaan lintas origin dari frontend Anda
app.use(express.json()); // Mengizinkan parsing body JSON dari permintaan

// Konfigurasi Nodemailer transporter
// Gunakan kredensial dari .env
const transporter = nodemailer.createTransport({
  service: "gmail", // Contoh: untuk Gmail
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Endpoint API untuk mengirim formulir kontak
app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validasi sederhana (Anda bisa menambahkan validasi yang lebih kompleks)
  if (!name || !email || !subject || !message) {
    return res
      .status(400)
      .json({ success: false, message: "Semua kolom wajib diisi." });
  }

  try {
    // Opsi email untuk dikirim
    const mailOptions = {
      from: process.env.EMAIL_USER, // Alamat pengirim
      to: process.env.TARGET_EMAIL, // Alamat tujuan (email Anda)
      subject: `Pesan Portofolio - ${subject}`, // Subjek email
      html: `
                <p><strong>Nama:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subjek:</strong> ${subject}</p>
                <p><strong>Pesan:</strong></p>
                <p>${message}</p>
            `,
    };

    // Kirim email
    await transporter.sendMail(mailOptions);

    // Kirim respons sukses ke frontend
    res
      .status(200)
      .json({ success: true, message: "Pesan Anda berhasil terkirim!" });
  } catch (error) {
    console.error("Error saat mengirim email:", error);
    // Kirim respons error ke frontend
    res.status(500).json({
      success: false,
      message: "Gagal mengirim pesan. Silakan coba lagi nanti.",
    });
  }
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server backend berjalan di http://localhost:${PORT}`);
});
