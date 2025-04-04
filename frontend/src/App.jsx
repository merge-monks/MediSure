import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AllTestsPage from "./pages/AllTestsPage";
import Login from './components/login'
import Signup from './components/signup'
import './App.css'
import MedisureDashboard from './components/Dashboard'
import ScanReports from './components/ScanReports'
import HomePage from './components/HomePage/HomePage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/d" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <MedisureDashboard />
          </ProtectedRoute>
        } />
        <Route path="/ScanReports" element={
          <ProtectedRoute>
            <ScanReports />
          </ProtectedRoute>
        } />
        <Route path="/all-tests" element={
          <ProtectedRoute>
            <AllTestsPage />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  )
}

export default App
