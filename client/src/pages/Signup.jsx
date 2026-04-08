import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Signup() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    codeforcesHandle: "",
    leetcodeUsername: ""
  });

  const handleSignup = async () => {
    try {
      const res = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (res.ok) {
        alert("Signup successful!");
        navigate("/"); // go to login
      } else {
        alert(result.error || "Signup failed");
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
          <label>Email</label>
          <input
            type="email"
            onChange={(e) =>
              setData({ ...data, email: e.target.value })
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
          <label>Codeforces Handle</label>
          <input
            type="text"
            placeholder="e.g. tourist"
            onChange={(e) =>
              setData({ ...data, codeforcesHandle: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>LeetCode Username</label>
          <input
            type="text"
            placeholder="e.g. johndoe"
            onChange={(e) =>
              setData({ ...data, leetcodeUsername: e.target.value })
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
