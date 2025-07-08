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

const Chatbotasd: React.FC<ChatbotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "assistant",
      text: "Yo!! I'm Vikas's AI assistant. I can help you learn more about his work, skills, and experience. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

    // Personal information queries
    if (
      input.includes("about") ||
      input.includes("who is") ||
      input.includes("background")
    ) {
      return "Please check the About section on the website for detailed information about Vikas. You can also download his resume for a comprehensive overview of his experience and qualifications.";
    }

    // Project queries
    if (input.includes("project") || input.includes("work")) {
      const projectInfo =
        "Vikas has worked on several impressive projects including:\n\n" +
        "- E-commerce Platform: Full-featured online store with advanced features\n" +
        "- Task Management App: Team collaboration tool with real-time updates\n" +
        "- Weather Dashboard: Interactive weather visualization application\n\n" +
        "For more details, please visit the live demos or check out the GitHub repositories in the Projects section.";
      return projectInfo;
    }

    // Skills queries
    if (input.includes("skill") || input.includes("proficiency")) {
      // Check for specific skill queries
      const skillLevels: { [key: string]: number } = {
        html: 95,
        css: 95,
        javascript: 90,
        typescript: 85,
        react: 90,
        tailwind: 88,
        "node.js": 75,
        graphql: 70,
        "ui/ux": 80,
        git: 85,
        testing: 78,
      };

      for (const [skill, level] of Object.entries(skillLevels)) {
        if (input.includes(skill)) {
          return `Vikas's proficiency in ${skill.toUpperCase()} is ${level}%.`;
        }
      }

      return (
        "Vikas's key skills and proficiency levels:\n\n" +
        "Frontend Development:\n" +
        "- HTML/CSS: 95%\n" +
        "- JavaScript: 90%\n" +
        "- TypeScript: 85%\n" +
        "- React: 90%\n" +
        "- Tailwind CSS: 88%\n\n" +
        "Other Skills:\n" +
        "- Node.js: 75%\n" +
        "- GraphQL: 70%\n" +
        "- UI/UX Design: 80%\n" +
        "- Git: 85%\n" +
        "- Testing: 78%"
      );
    }

    // Technology stack queries
    if (
      input.includes("tech") ||
      input.includes("technolog") ||
      input.includes("stack")
    ) {
      return (
        "Technologies Vikas works with:\n\n" +
        "- React\n" +
        "- TypeScript\n" +
        "- JavaScript\n" +
        "- HTML5\n" +
        "- CSS3\n" +
        "- Tailwind\n" +
        "- Node.js\n" +
        "- Git"
      );
    }

    // Contact queries
    if (
      input.includes("contact") ||
      input.includes("hire") ||
      input.includes("email")
    ) {
      return (
        "You can contact Vikas through:\n\n" +
        "Email: talawarh316@gmail.com\n" +
        "LinkedIn: https://www.linkedin.com/in/vikas-talawar-407a61257/\n" +
        "Twitter: https://x.com/TalawarVik70120\n" +
        "GitHub: https://github.com/VT-2004\n\n" +
        "Or use the contact form in the Contact section of the website."
      );
    }

    // Default response
    return "I can tell you about Vikas's background, projects, skills, or provide contact information. What would you like to know?";
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
            <h3 className="font-semibold">YO!!</h3>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-indigo-500 transition-colors"
              aria-label="Close chatbot"
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
                <span>AI is typing</span>
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
              placeholder="Ask me about Vikas..."
              className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
            <button
              type="submit"
              className="bg-indigo-600 dark:bg-indigo-500 text-white p-2 rounded-r-md hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
              disabled={!input.trim()}
              aria-label="Send message"
            >
              <Send size={20} />
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Chatbotasd;
