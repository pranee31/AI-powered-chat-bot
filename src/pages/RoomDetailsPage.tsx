import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ArrowLeft } from 'lucide-react';
import { roomCategories } from '../data/rooms';

export default function RoomDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const room = roomCategories
    .flatMap(category => category.rooms)
    .find(room => room.id === id);

  if (!room) {
    return <div>Room not found</div>;
  }

  const handleBooking = () => {
    navigate('/payment', { state: { room } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-[#661dda] mb-6 hover:text-[#937bad]"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to rooms
        </button>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6">
              <h1 className="text-3xl font-bold text-[#661dda] mb-4">{room.name}</h1>
              <div className="flex items-center mb-4">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="ml-1 text-gray-700">{room.rating}</span>
              </div>
              <p className="text-gray-600 mb-6">{room.description}</p>
              <h3 className="text-xl font-semibold text-[#937bad] mb-3">Amenities</h3>
              <ul className="grid grid-cols-2 gap-2 mb-6">
                {room.amenities.map((amenity, index) => (
                  <li key={index} className="text-gray-600">• {amenity}</li>
                ))}
              </ul>
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold text-[#661dda]">${room.price}</span>
                <button
                  onClick={handleBooking}
                  className="bg-[#661dda] text-white px-6 py-2 rounded-lg hover:bg-[#937bad] transition-colors"
                >
                  Book Now
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 p-6">
              {room.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${room.name} view ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
