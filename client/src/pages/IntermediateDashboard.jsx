import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCode, FaLayerGroup, FaProjectDiagram,
  FaTree, FaNetworkWired, FaCubes, FaDatabase,
  FaBrain, FaBolt, FaFlagCheckered,
  FaThumbsUp, FaThumbsDown, FaTrash
} from "react-icons/fa";
import "../App.css";

function IntermediateDashboard() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const [channel, setChannel] = useState("arrays");
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // FETCH POSTS
  const fetchPosts = async () => {
    const res = await fetch("http://localhost:3000/api/intermediate/posts");
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // ADD POST
  const addPost = async () => {
    if (!title || !body) return;

    await fetch("http://localhost:3000/api/intermediate/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        body,
        channel,
        author: username
      })
    });

    fetchPosts();
    setTitle("");
    setBody("");
  };

  //  UPVOTE
  const upvote = async (id) => {
    await fetch(`http://localhost:3000/api/intermediate/posts/${id}/upvote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username })
    });
    fetchPosts();
  };

  // DOWNVOTE
  const downvote = async (id) => {
    await fetch(`http://localhost:3000/api/intermediate/posts/${id}/downvote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username })
    });
    fetchPosts();
  };

  // DELETE
  const deletePost = async (id) => {
    await fetch(`http://localhost:3000/api/intermediate/posts/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username })
    });
    fetchPosts();
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const topics = [
    ["arrays", <FaCubes />, "Arrays"],
    ["linkedlist", <FaProjectDiagram />, "Linked List"],
    ["stack", <FaLayerGroup />, "Stack"],
    ["queue", <FaDatabase />, "Queue"],
    ["tree", <FaTree />, "Trees"],
    ["graph", <FaNetworkWired />, "Graphs"],
    ["dp", <FaBrain />, "DP"],
    ["greedy", <FaBolt />, "Greedy"],
    ["cp", <FaFlagCheckered />, "CP"]
  ];

  return (
    <>
      {/* NAVBAR */}
      <div className="navbar">
        <div className="logo">
          <FaCode /> DSA-Lane
        </div>

        <div>
          {username} (Intermediate)
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="container">

        {/* SIDEBAR */}
        <div className="sidebar">
          <h3>INTERMEDIATE</h3>

          {topics.map(([key, icon, label]) => (
            <div
              key={key}
              className={`sidebar-item ${channel === key ? "active" : ""}`}
              onClick={() => setChannel(key)}
            >
              {icon} {label}
            </div>
          ))}
        </div>

        {/* MAIN */}
        <div className="main">

          {/* CREATE POST */}
          <div className="card">
            <h2>{channel} Discussion</h2>

            <input
              placeholder="Post title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              placeholder="Write your question..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />

            <button className="primary-btn" onClick={addPost}>
              Post
            </button>
          </div>

          {/* POSTS */}
          {posts
            .filter(p => (p.channel ?? "arrays") === channel)
            .map((p) => (
              <div key={p._id} className="post-card">

                <h4>{p.title}</h4>
                <p>{p.body}</p>
                <span className="author">{p.author}</span>

                {/* ACTIONS */}
                <div className="post-actions">

                  <span onClick={() => upvote(p._id)}>
                    <FaThumbsUp /> {p.upvotes}
                  </span>

                  <span onClick={() => downvote(p._id)}>
                    <FaThumbsDown /> {p.downvotes}
                  </span>

                  {p.author === username && (
                    <span onClick={() => deletePost(p._id)}>
                      <FaTrash />
                    </span>
                  )}

                </div>

              </div>
            ))}

        </div>
      </div>
    </>
  );
}

export default IntermediateDashboard;
