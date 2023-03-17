import { Server } from "socket.io";

const io = new Server({ /* options */ });

io.on("connection", (socket) => {
    console.log('New client connected');
});

io.listen(3001);
console.log('Socket.io is listening at http://localhost:3001');