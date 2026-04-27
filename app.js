require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors({
  origin: "https://dsa-lane-frntnd.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const mongoose = require("mongoose");

const Message = require("./server/models/message");
const User = require("./server/models/user");

const authRoutes = require("./server/routes/auth");
const leaderboardRoutes = require("./server/routes/leaderboard");
const beginnerRoutes = require("./server/routes/beginner");
const intermediateRoutes = require("./server/routes/intermediate");
const advancedRoutes = require("./server/routes/advanced");

// ROUTES
app.use("/api/intermediate", intermediateRoutes);
app.use("/api/beginner", beginnerRoutes);
app.use("/api/advanced", advancedRoutes);
app.use("/auth", authRoutes);
app.use("/leaderboard", leaderboardRoutes);

app.use(express.static("public"));

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
    console.log("User Connected");

    // ✅ FIXED ROOM MAPPING
    socket.on("joinLevel", (level) => {
        let room = "";

        if (level === "Starter") room = "beginner-room";
        else if (level === "Intermediate") room = "intermediate-room";
        else if (level === "Advanced") room = "advanced-room";

        console.log("JOINING ROOM:", room);

        socket.join(room);
    });

    // SEND MESSAGE
    socket.on("sendMessage", async (data) => {
        console.log("SENDING TO ROOM:", data.room);

        const msg = new Message({
            userId: data.username,
            channelId: data.room,   // IMPORTANT
            content: data.message
        });

        await msg.save();

        // ✅ STRICT ROOM EMIT
        io.to(data.room).emit("receiveMessage", data);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected");
    });
});

// GET MESSAGES BY ROOM
app.get("/message/:room", async (req, res) => {
    const messages = await Message.find({
        channelId: req.params.room
    }).sort({ createdAt: -1 });

    res.json(messages);
});

// DB CONNECT
mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/dsaLane")
.then(() => {
    console.log("mongoose connected");
})
.catch((err) => {
    console.log(err);
});

// START SERVER
server.listen(3000, () => {
    console.log("Server is running on port 3000");
});
