import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  // ✅ GET USER DATA
  const username = localStorage.getItem("username");
  const level = localStorage.getItem("level");

  const [channel, setChannel] = useState("arrays");
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // 🔹 Fetch posts
  useEffect(() => {
 fetch("http://localhost:3000/api/intermediate/posts")
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error(err));
  }, []);

  // 🔹 Add post
  const addPost = async () => {
  if (!title || !body) {
    alert("Fill all fields");
    return;
  }

  try {
    // ✅ SEND POST REQUEST
    await fetch("http://localhost:3000/api/intermediate/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title,
        body: body,
        channel: channel,
        author: username
      })
    });

    // ✅ UPDATE UI IMMEDIATELY
    setPosts([
      ...posts,
      {
        title,
        body,
        channel,
        author: username
      }
    ]);

    // ✅ CLEAR INPUTS
    setTitle("");
    setBody("");

  } catch (err) {
    console.error(err);
    alert("Error posting");
  }
};

  // ✅ LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div id="page-dashboard">

      {/* 🔹 Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">
          <div className="navbar-icon">
            <i className="fa-solid fa-code"></i>
          </div>
          <span>DSA-Lane</span>
        </div>

        <div className="navbar-right">
          {/* ✅ SHOW USERNAME + LEVEL */}
          <span id="nav-username">
            {username} ({level})
          </span>

          {/* ✅ WORKING LOGOUT */}
          <button id="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <div className="dash-body">

        {/* 🔹 Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-title">INTERMEDIATE-ZONE</div>

          <div className="channels">

            <div
              className={`channel-item ${channel === "arrays" ? "active" : ""}`}
              onClick={() => setChannel("arrays")}
            >
              <i className="fa-solid fa-table-cells"></i>
              <span>ARRAYS</span>
            </div>

            <div
              className={`channel-item ${channel === "linkedlist" ? "active" : ""}`}
              onClick={() => setChannel("linkedlist")}
            >
              <i className="fa-solid fa-link"></i>
              <span>Linked List</span>
            </div>

            <div
              className={`channel-item ${channel === "stack" ? "active" : ""}`}
              onClick={() => setChannel("stack")}
            >
              <i className="fa-solid fa-layer-group"></i>
              <span>Stack</span>
            </div>

            <div
              className={`channel-item ${channel === "dp" ? "active" : ""}`}
              onClick={() => setChannel("dp")}
            >
              <i className="fa-solid fa-brain"></i>
              <span>Dynamic Programming</span>
            </div>

          </div>
        </aside>

        {/* 🔹 Main */}
        <main className="main">

          <div className="channel-header">
            <h2>{channel} Discussion</h2>
          </div>

          {/* 🔹 Create Post */}
          <div className="create-post">

            <input
              id="post-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post title..."
            />

            <textarea
              id="post-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Share your question or solution..."
            />

            <button id="post-btn" onClick={addPost}>
              Post
            </button>

          </div>

          {/* 🔹 Posts */}
          <div id="posts-container">
            {posts
              .filter(p => (p.channel ?? "arrays").trim().toLowerCase() === channel)
              .map((p, i) => (
                <div key={i} className="post-card">
                  <div className="post-card-title">{p.title}</div>
                  <div className="post-card-body">{p.body}</div>
                  <div className="post-card-footer">
                    <span className="post-author">{p.author}</span>
                  </div>
                </div>
              ))}
          </div>

        </main>

      </div>
    </div>
  );
}

export default Dashboard;
