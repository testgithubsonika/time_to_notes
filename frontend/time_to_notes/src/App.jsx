import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Header from './components/Header';

export default function App() {
  return <BrowserRouter>
  <Routes>
    <Route path="/Home" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
  </Routes>
  
  </BrowserRouter>;
   
  
}
