import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard"; // Beginner
import IntermediateDashboard from "./pages/IntermediateDashboard";
import AdvancedDashboard from "./pages/advanceDashboard"; // ✅ ADD THIS
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/intermediate" element={<IntermediateDashboard />} />
        <Route path="/advanced" element={<AdvancedDashboard />} /> {/* ✅ ADD */}
      </Routes>
    </Router>
  );
}

export default App;
