import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    navigate("/dashboard");
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
          <label>Username</label>
          <input
            type="text"
            placeholder="e.g. username"
            onChange={(e) => setUsername(e.target.value)}
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