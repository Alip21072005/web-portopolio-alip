import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X } from "lucide-react";

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: Date;
}

// Data Proyek Alip
const projectsData = [
  {
    id: "1",
    title: "Website Komunitas De Code",
    description:
      "Website Komunitas De Code menampilkan berbagai informasi tentang komunitas, termasuk anggota, acara, dan proyek yang sedang dikerjakan. Dengan antarmuka yang responsif dan mudah dinavigasi, pengguna dapat dengan mudah menemukan informasi yang mereka butuhkan. Selain itu website ini juga menampilkan Course yang ditawarkan oleh komunitas, seperti bootcamp, Mini Class, Workshop, dan lain-lain. Pengguna dapat mendaftar untuk kursus ini secara langsung melalui website.",
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Tailwind",
      "Prisma",
      "Express",
      "PostgreSQL",
    ],
    demoUrl: "-",
    githubUrl: "https://github.com/panca55/decode",
  },
  {
    id: "2",
    title: "Undangan Digital",
    description:
      "Undangan Digital adalah platform yang dirancang untuk mempermudah pembuatan dan pengelolaan undangan acara secara online. Pengguna dapat memilih template, menyesuaikan detail acara, dan mengirim undangan melalui email atau media sosial. Dengan antarmuka yang intuitif dan fitur kolaborasi, Undangan Digital menyederhanakan proses perencanaan acara.",
    technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    demoUrl: "https://undangangilang.vercel.app/",
    githubUrl: "https://github.com/Alip21072005/undangangilang",
  },
  {
    id: "3",
    title: "Website Pengumuman Kelulusan SMP 19 Mukomuko",
    description:
      "Website Pengumuman Kelulusan SMP 19 Mukomuko adalah platform yang dirancang untuk menyampaikan informasi kelulusan siswa secara efisien. Dengan antarmuka yang sederhana dan responsif, website ini memungkinkan siswa dan orang tua untuk dengan mudah mengakses pengumuman kelulusan, melihat daftar nama siswa yang lulus, dan mendapatkan informasi terkait lainnya. Website ini juga dilengkapi dengan fitur keamanan untuk melindungi data pribadi siswa.",
    technologies: ["React", "TypeScript", "Node.js", "Next.js", "Tailwind"],
    demoUrl: "https://web-kelulusan.vercel.app/",
    githubUrl: "https://github.com/Alip21072005/web-kelulusan",
  },
  {
    id: "4",
    title: "Website Sertifikat Otomatis",
    description:
      "Website Sertifikat Otomatis adalah platform yang memungkinkan pengguna untuk membuat dan mengelola sertifikat secara otomatis. Dengan antarmuka yang intuitif, pengguna dapat memilih template sertifikat, mengisi detail acara, dan menghasilkan sertifikat dalam format PDF. Website ini juga menyediakan fitur untuk mengirimkan sertifikat melalui email kepada penerima secara langsung.",
    technologies: ["React", "TypeScript", "Node.js", "Next.js", "CSS"],
    demoUrl: "https://web-sertifikat-ten.vercel.app/",
    githubUrl: "https://github.com/Alip21072005/web-sertifikat",
  },
];

// Data Keahlian Alip (Diambil dari kode Skills.tsx Anda, disederhanakan untuk chatbot)
const getSkillsData = () => {
  const currentTime = new Date(); // Dapatkan waktu saat ini di sini
  const birthDate = new Date("2005-07-21T00:00:00");

  const calculateDurationInMilliseconds = (startDate: Date): number => {
    return Math.abs(currentTime.getTime() - startDate.getTime());
  };

  const calculateDurationText = (startDate: Date): string => {
    const diffMs = calculateDurationInMilliseconds(startDate);
    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const years = Math.floor(days / 365.25);
    const remainingDays = days - years * 365.25;
    const remainingMonths = Math.floor(remainingDays / 30.44);
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
    durationString += `${displaySeconds} dtk`;

    return durationString.trim();
  };

  const totalLifeDurationInMs = calculateDurationInMilliseconds(birthDate);

  const calculateUsagePercentage = (startDate: Date): number => {
    const usageMs = calculateDurationInMilliseconds(startDate);
    if (totalLifeDurationInMs === 0) return 0;
    const percentage = (usageMs / totalLifeDurationInMs) * 100;
    return parseFloat(percentage.toFixed(2));
  };

  const webdevSkills = [
    { name: "HTML", startDate: new Date("2023-09-01T00:00:00") },
    { name: "CSS", startDate: new Date("2024-08-01T08:30:00") },
    { name: "JavaScript", startDate: new Date("2024-09-01T14:00:00") },
    { name: "Bootstrap", startDate: new Date("2024-08-20T11:00:00") },
    { name: "Tailwind", startDate: new Date("2024-12-18T16:00:00") },
    { name: "Figma", startDate: new Date("2024-12-06T19:00:00") },
    { name: "PHP", startDate: new Date("2024-08-20T11:00:00") },
    { name: "Laravel", startDate: new Date("2025-05-17T08:00:00") },
    { name: "React", startDate: new Date("2024-12-20T03:12:00") },
    { name: "Node.js", startDate: new Date("2024-12-19T23:12:00") },
    { name: "Next.js", startDate: new Date("2024-12-30T00:00:00") },
    { name: "Git", startDate: new Date("2025-02-01T00:00:00") },
  ];

  const otherSkills = [
    { name: "Video Editing", startDate: new Date("2019-02-01T08:00:00") },
    { name: "Desain Grafis", startDate: new Date("2020-07-01T13:00:00") },
    { name: "Guitar", startDate: new Date("2021-05-01T09:00:00") },
    { name: "Public Speaking", startDate: new Date("2017-01-01T08:00:00") },
    { name: "Rubik's Cube", startDate: new Date("2016-09-15T15:00:00") },
  ];

  const allSkills = [...webdevSkills, ...otherSkills].map((skill) => ({
    name: skill.name,
    level: calculateUsagePercentage(skill.startDate),
    durationText: calculateDurationText(skill.startDate),
  }));

  return allSkills;
};

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "assistant",
      text: "Halo! Saya asisten AI. Saya di sini untuk membantu Anda mengetahui lebih banyak tentang Alip — pekerjaan, keahlian, dan pengalamannya. Apa yang ingin Anda tanyakan?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mengambil data skill secara dinamis setiap kali komponen di-render ulang
  const allSkills = getSkillsData();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const responseText = generateResponse(input);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "assistant",
        text: responseText,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    // Query informasi pribadi Alip
    if (
      input.includes("tentang alip") ||
      input.includes("siapa alip") ||
      input.includes("background alip") ||
      input.includes("profil alip")
    ) {
      return "Alip adalah seorang web developer muda yang antusias, lahir pada 21 Juli 2005. Ia memiliki minat besar dalam pengembangan web dan selalu berusaha untuk terus belajar teknologi baru. Untuk detail lebih lanjut, silakan kunjungi bagian 'Tentang Alip' di situs web atau unduh CV-nya.";
    }

    // Query proyek Alip
    if (
      input.includes("proyek alip") ||
      input.includes("pekerjaan alip") ||
      input.includes("portfolio alip")
    ) {
      if (projectsData.length === 0) {
        return "Maaf, saya tidak memiliki informasi proyek Alip saat ini.";
      }
      let projectList =
        "Alip telah mengerjakan beberapa proyek menarik, di antaranya:\n\n";
      projectsData.forEach((project, index) => {
        projectList += `- ${project.title}: ${project.description.substring(
          0,
          100
        )}... [Lihat detail lainnya di website]\n`;
        if (project.demoUrl && project.demoUrl !== "-") {
          projectList += `  Demo: ${project.demoUrl}\n`;
        }
        if (project.githubUrl) {
          projectList += `  GitHub: ${project.githubUrl}\n`;
        }
        if (index < projectsData.length - 1) {
          projectList += "\n";
        }
      });
      projectList +=
        "\nUntuk detail lebih lanjut, silakan kunjungi bagian 'Proyek' di situs web Alip.";
      return projectList;
    }

    // Query keahlian Alip
    if (
      input.includes("skill alip") ||
      input.includes("keahlian alip") ||
      input.includes("kemampuan alip")
    ) {
      const skillNameQuery = input
        .replace(
          /skill alip|keahlian alip|kemampuan alip|apa skill|apa keahlian|apa kemampuan/g,
          ""
        )
        .trim();

      for (const skill of allSkills) {
        if (
          skillNameQuery &&
          skill.name.toLowerCase().includes(skillNameQuery)
        ) {
          return `Tingkat kemahiran Alip dalam ${skill.name} adalah ${skill.level}% (${skill.durationText} pengalaman).`;
        }
      }

      let skillResponse = "Berikut adalah beberapa keahlian utama Alip:\n\n";
      const webdevSkills = allSkills.filter((s) =>
        [
          "html",
          "css",
          "javascript",
          "bootstrap",
          "tailwind",
          "figma",
          "php",
          "laravel",
          "react",
          "node.js",
          "next.js",
          "git",
        ].includes(s.name.toLowerCase())
      );
      const otherSkills = allSkills.filter((s) =>
        [
          "video editing",
          "desain grafis",
          "guitar",
          "public speaking",
          "rubik's cube",
        ].includes(s.name.toLowerCase())
      );

      if (webdevSkills.length > 0) {
        skillResponse += "Web Development:\n";
        webdevSkills.forEach((skill) => {
          skillResponse += `- ${skill.name}: ${skill.level}% (${skill.durationText})\n`;
        });
      }

      if (otherSkills.length > 0) {
        skillResponse += "\nKeahlian Lainnya:\n";
        otherSkills.forEach((skill) => {
          skillResponse += `- ${skill.name}: ${skill.level}% (${skill.durationText})\n`;
        });
      }

      skillResponse +=
        "\nUntuk informasi lebih detail, silakan lihat bagian 'Skills' di situs web Alip.";
      return skillResponse;
    }

    // Query stack teknologi Alip
    if (
      input.includes("tech alip") ||
      input.includes("teknologi alip") ||
      input.includes("stack alip")
    ) {
      const technologies = [
        "React",
        "TypeScript",
        "Node.js",
        "Next.js",
        "HTML",
        "CSS",
        "Tailwind",
        "Prisma",
        "Express",
        "PostgreSQL",
        "JavaScript",
        "Bootstrap",
        "PHP",
        "Laravel",
        "Git",
      ];
      return `Teknologi yang sering Alip gunakan meliputi: ${technologies.join(
        ", "
      )}.`;
    }

    // Query kontak Alip
    if (
      input.includes("kontak alip") ||
      input.includes("hubungi alip") ||
      input.includes("email alip") ||
      input.includes("hire alip")
    ) {
      return (
        "Anda bisa menghubungi Alip melalui:\n\n" +
        "Email: muhamadalipmaulana3@gmail.com\n" +
        "LinkedIn: https://www.linkedin.com/in/alipmaulana21?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app\n" +
        "GitHub: https://github.com/Alip210725\n\n" +
        "Atau gunakan formulir kontak di bagian 'Kontak' situs web Alip."
      );
    }

    // Query hobi/minat Alip
    if (input.includes("hobi alip") || input.includes("minat alip")) {
      return "Di waktu luangnya, Alip suka bermain gitar dan mendengar musik. Band kesukaannya adalah Hindia dan Feast.";
    }

    // Query tujuan/cita-cita Alip
    if (
      input.includes("tujuan alip") ||
      input.includes("cita-cita alip") ||
      input.includes("masa depan alip")
    ) {
      return "Cita-cita Alip adalah menjadi seorang web developer yang handal dan terus berinovasi di bidang tersebut.";
    }

    // Respons default
    return "Saya dapat memberi tahu Anda tentang latar belakang, proyek, keahlian, hobi, tujuan, atau informasi kontak Alip. Apa yang ingin Anda ketahui lebih lanjut?";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed bottom-24 right-6 w-80 sm:w-96 h-96 bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden z-50 flex flex-col"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          {/* Chatbot Header */}
          <div className="p-4 bg-indigo-600 dark:bg-indigo-700 text-white flex items-center justify-between">
            <h3 className="font-semibold">Asisten AI Alip</h3>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-indigo-500 transition-colors"
              aria-label="Tutup chatbot"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 ${
                  message.sender === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block p-3 rounded-lg max-w-[85%] ${
                    message.sender === "user"
                      ? "bg-indigo-600 text-white rounded-tr-none"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-none"
                  }`}
                >
                  {message.text.split("\n").map((line, i) => (
                    <p key={i} className={i > 0 ? "mt-2" : ""}>
                      {line}
                    </p>
                  ))}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                <span>AI sedang mengetik</span>
                <motion.div
                  className="w-1.5 h-1.5 bg-gray-500 dark:bg-gray-400 rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <motion.div
                  className="w-1.5 h-1.5 bg-gray-500 dark:bg-gray-400 rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                />
                <motion.div
                  className="w-1.5 h-1.5 bg-gray-500 dark:bg-gray-400 rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 border-t border-gray-200 dark:border-gray-700 flex"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tanyakan sesuatu tentang Alip..."
              className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
            <button
              type="submit"
              className="bg-indigo-600 dark:bg-indigo-500 text-white p-2 rounded-r-md hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
              disabled={!input.trim()}
              aria-label="Kirim pesan"
            >
              <Send size={20} />
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Chatbot;
