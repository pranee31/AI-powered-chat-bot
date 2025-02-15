import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, ArrowLeft, CreditCard, Plus, Minus } from 'lucide-react';

export default function AddToCartPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const parsedCart = savedCart !== null ? JSON.parse(savedCart) : [];
    setCart(parsedCart);
  }, []);
  

  const handleRemove = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (id, type) => {
    const updatedCart = cart.map(item =>
      item.id === id
        ? { ...item, quantity: type === 'increase' ? item.quantity + 1 : Math.max(1, item.quantity - 1) }
        : item
    );
    setCart(updatedCart as CartItem[]);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };


  const handleProceedToPayment = () => {
    navigate('/payment', { state: { cart } }); // Pass cart array instead of a single room
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-[#661dda] mb-6 hover:text-[#937bad]"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>
        <h2 className="text-3xl font-bold text-[#661dda] mb-4 text-center">Your Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-600 text-center">Your cart is empty.</p>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-6">
            {cart.map((room, index) => (
              <div key={index} className="flex justify-between items-center border-b py-4">
                <div>
                  <h3 className="text-xl font-semibold text-[#661dda]">{room.name}</h3>
                  <p className="text-gray-600">₹{room.price} x {room.quantity}</p>
                </div>
                <div className="flex items-center">
                  <button onClick={() => handleQuantityChange(room.id, 'decrease')} className="text-gray-600 hover:text-gray-800 px-2">
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="text-lg font-semibold px-2">{room.quantity}</span>
                  <button onClick={() => handleQuantityChange(room.id, 'increase')} className="text-gray-600 hover:text-gray-800 px-2">
                    <Plus className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleRemove(room.id)} className="text-red-500 hover:text-red-700 ml-4">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center mt-6">
              <span className="text-2xl font-bold text-[#661dda]">
                Total: ₹{cart.reduce((sum, room) => sum + room.price * room.quantity, 0)}
              </span>
              <button
                onClick={handleProceedToPayment}
                className="bg-[#661dda] text-white px-6 py-2 rounded-lg hover:bg-[#937bad] transition-colors flex items-center"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Proceed to Payment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
