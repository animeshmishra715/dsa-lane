const socket=io();
const username=window.username;
const joinLevel=user.level;
const room=level.toLowerCase()+"-room";
socket.emit("joinLevel",joinLevel);
function sendMessage(){
    const message= document.getElementById("msg").value;
    socket.emit("sendMessage",{
        room:room,
        username:username,
        message:message
    });
}
socket.on("receiveMessage",(msg)=>{
    const chat=document.getElementById("chat");
    const p=document.createElement("p");
    p.innerText = msg.username + ": " + msg.message;
    chat.appendChild(p);
})

