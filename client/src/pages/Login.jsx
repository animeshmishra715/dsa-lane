import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaCode } from "react-icons/fa";
import "../App.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const result = await res.json();

      if (res.ok) {
        localStorage.setItem("username", result.username);
        localStorage.setItem("level", result.level);

        if (result.level === "Starter") navigate("/dashboard");
        else if (result.level === "Intermediate") navigate("/intermediate");
        else navigate("/advanced");
      } else {
        alert(result.error || "Login failed");
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        {/* LOGO */}
        <div className="logo">
          <FaCode /> DSA-Lane
        </div>

        <h1>Welcome Back</h1>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />

        {/* BUTTON */}
        <button
          className="primary-btn"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        {/* SWITCH */}
        <p className="auth-switch">
          Don’t have an account?
          <span onClick={() => navigate("/signup")}> Sign Up</span>
        </p>

      </div>
    </div>
  );
}

export default Login;
