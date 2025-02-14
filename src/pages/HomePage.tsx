import React from 'react';
import { Hotel, Wifi, Utensils, Bath } from 'lucide-react';
import RoomCategory from '../components/RoomCategory';
import { roomCategories } from '../data/rooms';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    icon: <Wifi className="w-6 h-6 sm:w-8 sm:h-8" />,
    title: "High-Speed WiFi",
    description: "Stay connected with complimentary high-speed internet throughout the property"
  },
  {
    icon: <Utensils className="w-6 h-6 sm:w-8 sm:h-8" />,
    title: "Fine Dining",
    description: "Experience culinary excellence at our award-winning restaurants"
  },
  {
    icon: <Bath className="w-6 h-6 sm:w-8 sm:h-8" />,
    title: "Luxury Spa",
    description: "Rejuvenate your body and mind at our world-class spa facility"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="h-[60vh] sm:h-[80vh] bg-cover bg-center relative overflow-hidden"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1542314831-068cd1dbfeeb)'
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30"
        />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1,
              type: "spring",
              stiffness: 100 
            }}
            className="text-center text-white"
          >
            <motion.div 
              className="flex items-center justify-center mb-4"
              animate={{ 
                rotate: [0, 10, -10, 10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 5
              }}
            >
              <Hotel className="w-12 h-12 sm:w-16 sm:h-16 text-[#937bad]" />
            </motion.div>
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white"
            >
              Luxury Hotel & Resort
            </motion.h1>
            <motion.p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 px-4">
              Experience the perfect blend of comfort and elegance
            </motion.p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#661dda] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full text-base sm:text-lg font-semibold"
              onClick={() => navigate('/profile')}
            >
              View Profile
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <motion.div className="text-center mb-12 sm:mb-16">
          <motion.h2 className="text-3xl sm:text-4xl font-bold text-[#661dda] mb-4">
            Welcome to Luxury Living
          </motion.h2>
        </motion.div>

        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {features.map((feature, index) => (
            <motion.div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-[#661dda]">{feature.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold text-[#661dda] mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Room Categories */}
        <motion.div className="space-y-12 sm:space-y-16">
          {roomCategories.map((category) => (
            <RoomCategory key={category.id} category={category} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
