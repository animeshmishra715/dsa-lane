const socket=io();
const joinLevel="Advanced";
socket.emit("joinLevel",joinLevel);

function sendMessage(){
    const message= document.getElementById("msg").value;
    socket.emit("sendMessage",{
        room:"advanced-room",
        message:message
    });
}
socket.on("receiveMessage",(msg)=>{
    const chat=document.getElementById("chat");
    const p=document.createElement("p");
    p.innerText=msg;
    chat.appendChild(p);
})
