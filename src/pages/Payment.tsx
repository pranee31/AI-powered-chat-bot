import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, CalendarDays, Building, ArrowRight } from 'lucide-react';

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const room = location.state?.room;

  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    bookingDate: '',
    checkoutDate: ''
  });

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handlePayment = () => {
    const options = {
      key: 'rzp_test_sTI8C7gVwEqyXC',
      amount: room.price * 100,
      currency: 'INR',
      name: 'Hotel Booking',
      description: `Payment for ${room.name}`,
      handler: (response) => {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        navigate('/home');
      },
      prefill: {
        name: userDetails.name,
        email: userDetails.email,
        contact: userDetails.phone
      },
      theme: {
        color: '#661dda'
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://www.incedoinc.com/wp-content/uploads/integrated-with-payment-channels.jpg)',
        backgroundAttachment: 'fixed'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white/95 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-2xl flex flex-col items-center"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Payment Details</h2>
        <div className="max-h-96 overflow-y-auto w-full space-y-6 p-4 bg-gray-50 rounded-lg">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Building className="w-5 h-5 text-[#661dda]" />
              <span className="font-semibold">{room.name}</span>
            </div>
            <div className="flex flex-col space-y-3">
              <label className="text-gray-600">Full Name</label>
              <input type="text" name="name" value={userDetails.name} onChange={handleChange} className="p-2 border rounded-lg w-full" required />
              
              <label className="text-gray-600">Email</label>
              <input type="email" name="email" value={userDetails.email} onChange={handleChange} className="p-2 border rounded-lg w-full" required/>
              
              <label className="text-gray-600">Phone</label>
              <input type="text" name="phone" value={userDetails.phone} onChange={handleChange} className="p-2 border rounded-lg w-full" required/>
              
              <label className="text-gray-600 flex items-center">
                <CalendarDays className="w-6 h-6 text-[#661dda] mr-2" /> Booking Date
              </label>
              <input type="date" name="bookingDate" value={userDetails.bookingDate} onChange={handleChange} className="p-2 border rounded-lg w-full" required/>
              
              <label className="text-gray-600 flex items-center">
                <CalendarDays className="w-6 h-6 text-[#661dda] mr-2" /> Check-out Date
              </label>
              <input type="date" name="checkoutDate" value={userDetails.checkoutDate} onChange={handleChange} className="p-2 border rounded-lg w-full" required/>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Total Cost</span>
              <span className="font-bold text-xl text-[#661dda]">₹{room.price}</span>
            </div>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handlePayment}
          className="w-full flex items-center justify-center px-4 py-3 rounded-lg bg-[#661dda] text-white hover:bg-[#937bad] transition-colors mt-4"
        >
          <CreditCard className="w-5 h-5 mr-2" />
          Pay Now
          <ArrowRight className="w-5 h-5 ml-2" />
        </motion.button>
      </motion.div>
    </div>
  );
}
