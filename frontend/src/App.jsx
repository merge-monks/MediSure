import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/login'
import Signup from './components/signup'
import './App.css'
import MedisureDashboard from './components/Dashboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<MedisureDashboard />} />
      </Routes>
    </Router>
  )
}

export default App
