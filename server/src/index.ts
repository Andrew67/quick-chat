import { Server } from "socket.io";

const io = new Server({
    cors: {
        origin: true
    }
});

io.on("connection", (socket) => {
    console.log('New client connected');
    socket.emit('hello', 'world');
    socket.on('message', (text) => {
        console.log(`Message received: ${text}; relaying...`);
        socket.broadcast.emit('message', text);
    })
});

io.listen(3001);
console.log('Socket.io is listening at http://localhost:3001');