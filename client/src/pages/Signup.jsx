import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaCode } from "react-icons/fa";
import "../App.css";

function Signup() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    codeforcesHandle: "",
    leetcodeUsername: ""
  });

  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    const { username, email, password } = data;

    if (!username || !email || !password) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("https://dsa-lane.onrender.com/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (res.ok) {
        alert("Signup successful");
        navigate("/");
      } else {
        alert(result.error || "Signup failed");
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

        <div className="logo">
          <FaCode /> DSA-Lane
        </div>

        <h1>Create Account</h1>

        <input
          placeholder="Username"
          value={data.username}
          onChange={(e) =>
            setData({ ...data, username: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={(e) =>
            setData({ ...data, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) =>
            setData({ ...data, password: e.target.value })
          }
          onKeyDown={(e) => e.key === "Enter" && handleSignup()}
        />

        <input
          placeholder="Codeforces Handle (optional)"
          value={data.codeforcesHandle}
          onChange={(e) =>
            setData({ ...data, codeforcesHandle: e.target.value })
          }
        />

        <input
          placeholder="LeetCode Username (optional)"
          value={data.leetcodeUsername}
          onChange={(e) =>
            setData({ ...data, leetcodeUsername: e.target.value })
          }
        />

        <button
          className="primary-btn"
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>

        <p className="auth-switch">
          Already have an account?
          <span onClick={() => navigate("/")}> Sign In</span>
        </p>

      </div>
    </div>
  );
}

export default Signup;
