import React from 'react';
import RoomCard from './RoomCard';
import { RoomCategory as RoomCategoryType } from '../types';

interface RoomCategoryProps {
  category: RoomCategoryType;
}

export default function RoomCategory({ category }: RoomCategoryProps) {
  return (
    <div className="mb-8 sm:mb-12">
      <h2 className="text-xl sm:text-2xl font-bold text-[#661dda] mb-3 sm:mb-4 px-4 sm:px-0">
        {category.name}
      </h2>
      <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base px-4 sm:px-0">
        {category.description}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {category.rooms.map(room => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
}