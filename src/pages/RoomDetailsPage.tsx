import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ArrowLeft, ShoppingCart } from 'lucide-react';
import { roomCategories } from '../data/rooms';

export default function RoomDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const room = roomCategories
    .flatMap(category => category.rooms)
    .find(room => room.id === id);

  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')?.toString() ?? '[]');
    setCart(savedCart);
    setCartCount(savedCart.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0)); 
  }, []);

  const handleAddToCart = () => {
    const existingItem = cart.find(item => item.id === room.id);
    let updatedCart;

    if (existingItem) {
      updatedCart = cart.map(item =>
        item.id === room.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...room, quantity: 1 }];
    }

    setCart(updatedCart);
    setCartCount(updatedCart.reduce((sum, item) => sum + item.quantity, 0)); 
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  if (!room) {
    return <div>Room not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-[#661dda] hover:text-[#937bad]"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to rooms
          </button>

          {/* Cart Icon with Count Badge */}
          <div className="relative">
            <button
              onClick={() => navigate('/cart')}
              className="relative flex items-center text-[#661dda] hover:text-[#937bad]"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

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
                <span className="text-3xl font-bold text-[#661dda]">₹{room.price}</span>
                <button
                  onClick={handleAddToCart}
                  className="bg-[#661dda] text-white px-6 py-2 rounded-lg hover:bg-[#937bad] transition-colors"
                >
                  Add to Cart
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
