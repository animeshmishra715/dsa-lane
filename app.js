
const express = require("express");
const http =require("http");
const {Server}=require("socket.io");
const path=require("path");
const app =express();
app.use(express.static("public"));
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.get("/dashboard",(req,res)=>{
    res.render("dashboard");
})


const server=http.createServer(app);
const io =new Server(server);

app.use(express.json());

io.on("connection",(socket)=>{
    console.log("User Connected");
    socket.on("joinLevel",(level)=>{
        if(level==="Starter"){
            socket.join("starter-room");
        }
        if(level==="intermediate"){
            socket.join("intermediate-room");
        }
        if(level==="Advanced"){
            socket.join("advanced-room");
        }
    });
    socket.on("sendMessage",(data)=>{
        io.to(data.room).emit("receiveMessage",data.message);
    });
    socket.on("disconnect",()=>{
        console.log("User Disconnected");
    });
});
server.listen(3000,()=>{
    console.log("Server is running on port 3000");
});
















