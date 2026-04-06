import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Signup() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
    problems: ""
  });

  const handleSignup = () => {
    navigate("/");
  };

  return (
    <div className="page active">
      <div className="auth-card">

        <div className="logo">
          <div className="logo-icon">💻</div>
          <span>DSA-Lane</span>
        </div>

        <h1>Create Account</h1>
        <p>Join the community and hustle harder.</p>

        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            onChange={(e) =>
              setData({ ...data, username: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            onChange={(e) =>
              setData({ ...data, password: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Problems Solved</label>
          <input
            type="number"
            placeholder="e.g. 12"
            onChange={(e) =>
              setData({ ...data, problems: e.target.value })
            }
          />
        </div>

        <button id="signup-btn" onClick={handleSignup}>
          Create Account
        </button>

        <p className="auth-footer">
          Already have an account?{" "}
          <span onClick={() => navigate("/")}>Sign In</span>
        </p>

      </div>
    </div>
  );
}

export default Signup;