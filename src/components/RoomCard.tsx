import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Users } from 'lucide-react';
import { Room } from '../types';
import { motion } from 'framer-motion';

interface RoomCardProps {
  room: Room;
}

export default function RoomCard({ room }: RoomCardProps) {
  const navigate = useNavigate();

  return (
    <motion.div 
      whileHover={{ 
        y: -10,
        boxShadow: "0px 10px 20px rgba(0,0,0,0.1)"
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group"
      onClick={() => navigate(`/room/${room.id}`)}
    >
      <div className="relative overflow-hidden">
        <motion.img 
          src={room.images[0]} 
          alt={room.name}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className="w-full h-48 sm:h-56 object-cover"
        />
        <motion.div 
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white px-2 sm:px-3 py-1 rounded-full shadow-md"
        >
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3 sm:w-4 sm:h-4 text-[#661dda]" />
            <span className="text-xs sm:text-sm font-medium text-gray-700">
              {room.capacity} {room.capacity === 1 ? 'Guest' : 'Guests'}
            </span>
          </div>
        </motion.div>
      </div>
      <div className="p-4 sm:p-6">
        <div className="flex justify-between items-start mb-2">
          <motion.h3 
            whileHover={{ color: "#937bad" }}
            className="text-lg sm:text-xl font-semibold text-[#661dda] transition-colors"
          >
            {room.name}
          </motion.h3>
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.1 }}
          >
            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm sm:text-base text-gray-700 font-medium">
              {room.rating}
            </span>
          </motion.div>
        </div>
        <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-2">
          {room.description}
        </p>
        <div className="flex items-center justify-between">
          <motion.div whileHover={{ scale: 1.05 }}>
            <span className="text-xs sm:text-sm text-gray-500">Starting from</span>
            <div className="text-xl sm:text-2xl font-bold text-[#661dda]">${room.price}</div>
          </motion.div>
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${
              room.available 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}
          >
            {room.available ? 'Available' : 'Booked'}
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}