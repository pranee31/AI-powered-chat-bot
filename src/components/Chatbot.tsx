import React, { useState } from "react";
import { MessageCircle, Mic, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface Message {
  text: string;
  isBot: boolean;
}

const quickQuestions = [
  "Looking for a room?",
  "Need dinner reservations?",
  "Spa appointment?",
  "Proceed to Payment",
];

const chatbotVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
  exit: { opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.2 } },
};

const messageVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 25 },
  },
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! How may I assist you today?", isBot: true },
  ]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();

  const handleSend = () => {
    if (input.trim()) {
      const userMessage = input.trim();
      setMessages((prev) => [...prev, { text: userMessage, isBot: false }]);

      setTimeout(() => {
        if (userMessage.toLowerCase().includes("payment")) {
          navigate("/payment");
        } else {
          setMessages((prev) => [
            ...prev,
            {
              text: "I understand you're interested. Would you like to proceed with booking?",
              isBot: true,
            },
          ]);
        }
      }, 1000);
      setInput("");
    }
  };

  const handleQuickQuestion = (question: string) => {
    setMessages((prev) => [...prev, { text: question, isBot: false }]);

    setTimeout(() => {
      if (question === "Proceed to Payment") {
        navigate("/payment");
      } else {
        setMessages((prev) => [
          ...prev,
          {
            text: "I'll help you with that. What specific details would you like to know?",
            isBot: true,
          },
        ]);
      }
    }, 1000);
  };

  const toggleVoice = () => {
    setIsListening(!isListening);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 bg-[#661dda] text-white p-3 sm:p-4 rounded-full shadow-lg hover:bg-[#937bad] transition-colors z-50"
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={chatbotVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[360px] md:w-[400px] bg-white rounded-lg shadow-2xl overflow-hidden z-50"
          >
            <div className="bg-[#661dda] p-3 sm:p-4 text-white font-semibold">
              AI Concierge
            </div>

            <div className="h-[60vh] sm:h-96 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  className={`flex ${
                    message.isBot ? "justify-start" : "justify-end"
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`max-w-[80%] p-2.5 sm:p-3 rounded-lg text-sm sm:text-base ${
                      message.isBot
                        ? "bg-gray-100 text-gray-800"
                        : "bg-[#661dda] text-white"
                    }`}
                  >
                    {message.text}
                  </motion.div>
                </motion.div>
              ))}
            </div>

            <div className="p-3 sm:p-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleQuickQuestion(question)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs sm:text-sm"
                  >
                    {question}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="p-3 sm:p-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base focus:outline-none focus:border-[#661dda]"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSend}
                  className="p-2 bg-[#661dda] text-white rounded-full hover:bg-[#937bad]"
                >
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
