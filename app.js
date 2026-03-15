const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const mongoose =require("mongoose");
const Message = require("./server/models/message");
const User = require("./server/models/user");

const app = express();

app.use(express.static("public"));
app.set("views", path.join(__dirname,"views"));
app.set("view engine","ejs");

app.get("/dashboard",(req,res)=>{
    res.render("dashboard");
});

const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());

io.on("connection",(socket)=>{
    console.log("User Connected");

    socket.on("joinLevel",(level)=>{
        if(level==="Starter"){
            socket.join("starter-room");
        }

        if(level==="Intermediate"){
            socket.join("intermediate-room");
        }

        if(level==="Advanced"){
            socket.join("advanced-room");
        }
    });

    socket.on("sendMessage", async (data)=>{

        const msg = new Message({
            userId: data.username,
            channelId: data.room,
            content: data.message
        });

        await msg.save();

        io.to(data.room).emit("receiveMessage", data);
    });

    socket.on("disconnect",()=>{
        console.log("User Disconnected");
    });

});

app.get("/message/:room", async (req,res)=>{

    const message = await Message.find({
        channelId:req.params.room
    });

    res.json(messages);
});

app.get("/leaderboard", async (req,res)=>{

    const users = await User.find()
        .sort({reputation:-1})
        .limit(10);

    res.json(users);
});
mongoose.connect("mongodb://127.0.0.1:27017/dsaLane").then(()=>{
    console.log("mongoose connected");
}).catch((err)=>{
    console.log(err);
})


server.listen(3000,()=>{
    console.log("Server is running on port 3000");
});