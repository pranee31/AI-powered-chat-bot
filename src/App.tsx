import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RoomDetailsPage from './pages/RoomDetailsPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import PaymentPage from './pages/Payment';
import ProfilePage from './pages/ProfilePage';
<Route path="/payment" element={<PaymentPage />} />
import Chatbot from './components/Chatbot';
import AddToCartPage from './pages/AddToCart';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/room/:id" element={<RoomDetailsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/cart" element={<AddToCartPage />} />
      </Routes>
      <Chatbot />
    </Router>
  );
}

export default App;