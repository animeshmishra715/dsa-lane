document.addEventListener("DOMContentLoaded", () => {

    const socket = io();

    const username = window.username;
    const level = window.level;

    const room = level.toLowerCase() + "-room";

    const chat = document.getElementById("chat");
    const input = document.getElementById("msg");
    const button = document.getElementById("sendbutton");

    // JOIN ROOM
    socket.emit("joinLevel", level);

    // LOAD OLD MESSAGES
    fetch(`/message/${room}`)
        .then(res => res.json())
        .then(messages => {
            messages.forEach(msg => {
                displayMessage(msg.userId, msg.content);
            });
        });

    // SEND MESSAGE
    function sendMessage() {
        const message = input.value;

        console.log("Sending:", message); // debug

        if (message.trim() === "") return;

        socket.emit("sendMessage", {
            room: room,
            username: username,
            message: message
        });

        input.value = "";
    }

    // RECEIVE MESSAGE
    socket.on("receiveMessage", (msg) => {
        console.log("Received:", msg); // debug
        displayMessage(msg.username, msg.message);
    });

    // DISPLAY
    function displayMessage(user, message) {
        const p = document.createElement("p");
        p.innerText = user + ": " + message;
        chat.appendChild(p);
        chat.scrollTop = chat.scrollHeight;
    }

    // ✅ NOW BUTTON WILL WORK
    button.addEventListener("click", sendMessage);

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    });

});
