import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import CoachDashboard from "./pages/CoachDashboard";
import PlayerDashboard from "./pages/PlayerDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/coach-dashboard" element={<CoachDashboard />} />
        <Route path="/player-dashboard" element={<PlayerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
