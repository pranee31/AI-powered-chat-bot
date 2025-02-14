import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Mail, Phone } from 'lucide-react';

const user = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1234567890",
  bookings: [
    { type: "Room Booking", details: "Deluxe Suite", date: "March 20, 2025", time: "3:00 PM" },
    { type: "Spa Reservation", details: "Full Body Massage", date: "March 22, 2025", time: "5:00 PM" },
    { type: "Dinner Reservation", details: "Candlelight Dinner", date: "March 23, 2025", time: "8:00 PM" }
  ],
  pastBookings: [
    { type: "Room Booking", details: "Executive Suite", date: "Feb 15, 2025", time: "2:00 PM" },
    { type: "Spa Reservation", details: "Aromatherapy", date: "Feb 18, 2025", time: "6:00 PM" }
  ]
};

export default function ProfilePage() {
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12" 
      style={{ 
        backgroundImage: 'url(https://5.imimg.com/data5/SELLER/Default/2022/5/HV/ZZ/LI/106321217/luxury-bedroom-interior-design-service.jpg)', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Profile Content Box */}
      <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-3xl">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate('/home')} 
          className="flex items-center text-[#661dda] font-semibold mb-6 hover:text-[#937bad] transition-all"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Home
        </button>

        {/* Profile Header */}
        <h1 className="text-4xl font-bold text-[#661dda] mb-8 text-center">My Profile</h1>

        {/* User Info Section */}
        <div className="bg-[#937bad]/10 rounded-lg p-6 mb-6 shadow-md">
          <h2 className="text-2xl font-semibold text-[#661dda] mb-4 flex items-center">
            <User className="w-6 h-6 mr-2" /> User Information
          </h2>
          <p className="text-gray-700 flex items-center"><Mail className="w-5 h-5 mr-2 text-[#937bad]" /> <strong>Email:</strong> {user.email}</p>
          <p className="text-gray-700 flex items-center"><Phone className="w-5 h-5 mr-2 text-[#937bad]" /> <strong>Phone:</strong> {user.phone}</p>
        </div>

        {/* Current Bookings Section */}
        <div className="bg-[#937bad]/10 rounded-lg p-6 mb-6 shadow-md">
          <h2 className="text-2xl font-semibold text-[#661dda] mb-4 flex items-center">
            <Calendar className="w-6 h-6 mr-2" /> Current Bookings
          </h2>
          {user.bookings.length > 0 ? (
            <div className="space-y-4">
              {user.bookings.map((booking, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow-md border-l-4 border-[#661dda]">
                  <h3 className="text-lg font-semibold text-[#661dda]">{booking.type}</h3>
                  <p className="text-gray-700"><strong>Details:</strong> {booking.details}</p>
                  <p className="text-gray-700"><strong>Date:</strong> {booking.date} | <strong>Time:</strong> {booking.time}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No current bookings.</p>
          )}
        </div>

        {/* Past Bookings Section */}
        <div className="bg-[#937bad]/10 rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold text-[#661dda] mb-4 flex items-center">
            <Calendar className="w-6 h-6 mr-2" /> Past Bookings
          </h2>
          {user.pastBookings.length > 0 ? (
            <div className="space-y-4">
              {user.pastBookings.map((booking, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow-md border-l-4 border-[#937bad]">
                  <h3 className="text-lg font-semibold text-[#937bad]">{booking.type}</h3>
                  <p className="text-gray-700"><strong>Details:</strong> {booking.details}</p>
                  <p className="text-gray-700"><strong>Date:</strong> {booking.date} | <strong>Time:</strong> {booking.time}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No past bookings.</p>
          )}
        </div>
      </div>
    </div>
  );
}
