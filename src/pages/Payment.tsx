import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, ArrowLeft, CreditCard, Plus, Minus } from 'lucide-react';

export default function AddToCartPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: ''
  });

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

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const calculateDays = () => {
    if (!userDetails.checkIn || !userDetails.checkOut) return 1;
    const checkInDate = new Date(userDetails.checkIn);
    const checkOutDate = new Date(userDetails.checkOut);
    const timeDiff = checkOutDate - checkInDate;
    return timeDiff > 0 ? Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) : 1;
  };

  const stayingDays = calculateDays();
  const totalPrice = cart.reduce((sum, room) => sum + room.price * room.quantity * stayingDays, 0);

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
      image: "https://your-logo-url.com/logo.png",
      handler: function (response) {
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
        navigate('/confirmation', { state: { cart, userDetails, stayingDays, totalPrice } });
      },
      prefill: {
        name: userDetails.name,
        email: userDetails.email,
        contact: userDetails.phone,
      },
      theme: {
        color: "#661dda"
      }
    };
    
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 bg-gradient-to-r from-purple-200 to-blue-200">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 overflow-y-auto max-h-[90vh]">
        <button onClick={() => navigate(-1)} className="flex items-center text-[#661dda] mb-6 hover:text-[#937bad]">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>
        <h2 className="text-3xl font-bold text-[#661dda] mb-4 text-center">Your Cart</h2>

        {cart.length === 0 ? (
          <p className="text-gray-600 text-center">Your cart is empty.</p>
        ) : (
          <>
            <div className="bg-gray-100 rounded-lg p-4">
              {cart.map((room, index) => (
                <div key={index} className="flex justify-between items-center border-b py-4">
                  <div>
                    <h3 className="text-xl font-semibold text-[#661dda]">{room.name}</h3>
                    <p className="text-gray-600">₹{room.price} x {room.quantity} per night</p>
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
            </div>

            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
              <h3 className="text-2xl font-bold text-[#661dda] mb-4 text-center">Enter Your Details</h3>
              <div className="space-y-4">
                <input type="text" name="name" placeholder="Your Name" value={userDetails.name} onChange={handleChange} className="w-full border p-2 rounded-lg bg-white" required />
                <input type="email" name="email" placeholder="Your Email" value={userDetails.email} onChange={handleChange} className="w-full border p-2 rounded-lg bg-white" required />
                <input type="tel" name="phone" placeholder="Your Phone no" value={userDetails.phone} onChange={handleChange} className="w-full border p-2 rounded-lg bg-white" required />
                <input type="date" name="checkIn" value={userDetails.checkIn} onChange={handleChange} className="w-full border p-2 rounded-lg bg-white" required />
                <input type="date" name="checkOut" value={userDetails.checkOut} onChange={handleChange} className="w-full border p-2 rounded-lg bg-white" required />
              </div>
            </div>

            <div className="flex justify-between items-center mt-6">
              <span className="text-2xl font-bold text-[#661dda]">
                Total: ₹{totalPrice} ({stayingDays} Night{stayingDays > 1 ? 's' : ''})
              </span>
              <button onClick={handleProceedToPayment} className="bg-[#661dda] text-white px-6 py-2 rounded-lg hover:bg-[#937bad] transition-colors flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Proceed to Payment
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
