import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const result = await res.json();

      if (res.ok) {
        // ✅ store user data
        localStorage.setItem("token", result.token);
        localStorage.setItem("username", result.username);
        localStorage.setItem("level", result.level);

        // go to dashboard
        if (result.level === "Starter") {
  navigate("/dashboard");
} else if (result.level === "Intermediate") {
  navigate("/intermediate");
} else {
  navigate("/dashboard"); // for now (we’ll add advanced later)
}
      } else {
        alert(result.error || "Login failed");
      }
    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  return (
    <div className="page active">
      <div className="auth-card">

        <div className="logo">
          <div className="logo-icon">💻</div>
          <span>DSA-Lane</span>
        </div>

        <h1>Welcome</h1>
        <p>Sign in to continue your DSA journey with us.</p>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="e.g. your@email.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="•••••••"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button id="login-btn" onClick={handleLogin}>
          Sign In
        </button>

        <p className="auth-footer">
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")}>Sign Up</span>
        </p>

      </div>
    </div>
  );
}

export default Login;
