import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, ArrowLeft, CreditCard, Plus, Minus } from 'lucide-react';

export default function AddToCartPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [guestDetails, setGuestDetails] = useState({});

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') ?? '[]') || [];
    setCart(savedCart);
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
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleGuestChange = (roomId, index, field, value) => {
    setGuestDetails(prev => {
      const updated = { ...prev };
      if (!updated[roomId]) updated[roomId] = [];
      updated[roomId][index] = { ...updated[roomId][index], [field]: value };
      return updated;
    });
  };

  const calculateDays = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return 1;
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const timeDiff = checkOutDate - checkInDate;
    return timeDiff > 0 ? Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) : 1;
  };

  const totalPrice = cart.reduce((sum, room) => {
    if (!guestDetails[room.id]) return sum;
    return sum + guestDetails[room.id].reduce((roomSum, guest) => {
      const stayingDays = calculateDays(guest.checkIn, guest.checkOut);
      return roomSum + room.price * stayingDays;
    }, 0);
  }, 0);

  const loadRazorpay = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  };

  useEffect(() => {
    loadRazorpay();
  }, []);

  const handleProceedToPayment = () => {
    const options = {
      key: "rzp_test_sTI8C7gVwEqyXC",
      amount: totalPrice * 100,
      currency: "INR",
      name: "Hotel Booking",
      description: "Room Booking Payment",
      handler: function (response) {
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
        navigate('/home', { state: { cart, guestDetails, totalPrice } });
      },
      theme: { color: "#661dda" }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 bg-gradient-to-r from-purple-200 to-blue-200">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 overflow-y-auto max-h-[90vh]">
        <button onClick={() => navigate(-1)} className="flex items-center text-[#661dda] mb-6 hover:text-[#937bad]">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back
        </button>
        <h2 className="text-3xl font-bold text-[#661dda] mb-4 text-center">Your Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-600 text-center">Your cart is empty.</p>
        ) : (
          <>
            {cart.map((room) => (
              <div key={room.id} className="bg-gray-100 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <h3 className="text-xl font-semibold text-[#661dda]">{room.name} - ₹{room.price} per night</h3>
                  <button onClick={() => handleRemove(room.id)} className="text-red-500 hover:text-red-700">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                {[...Array(room.quantity)].map((_, index) => (
                  <div key={index} className="mt-4 bg-gray-50 p-3 rounded-lg">
                    <h4 className="text-lg font-bold text-[#661dda]">Guest {index + 1}</h4>
                    <input type="text" placeholder="Guest Name" className="w-full border p-2 rounded-lg bg-white mb-2"
                      onChange={(e) => handleGuestChange(room.id, index, 'name', e.target.value)} required />
                    <input type="tel" className="w-full border p-2 rounded-lg bg-white" placeholder='Phone Number'
                      onChange={(e) => handleGuestChange(room.id, index, 'phoneno', e.target.value)} required />
                    <input type="date" className="w-full border p-2 rounded-lg bg-white mb-2"
                      onChange={(e) => handleGuestChange(room.id, index, 'checkIn', e.target.value)} required />
                    <input type="date" className="w-full border p-2 rounded-lg bg-white"
                      onChange={(e) => handleGuestChange(room.id, index, 'checkOut', e.target.value)} required />
                  </div>
                ))}
              </div>
            ))}
            <div className="flex justify-between items-center mt-6">
              <span className="text-2xl font-bold text-[#661dda]">Total: ₹{totalPrice}</span>
              <button onClick={handleProceedToPayment} className="bg-[#661dda] text-white px-6 py-2 rounded-lg hover:bg-[#937bad] flex items-center">
                <CreditCard className="w-5 h-5 mr-2" /> Proceed to Payment
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
