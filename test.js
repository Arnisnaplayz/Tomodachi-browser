const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const onlinePlayers = new Map();

io.on('connection', (socket) => {
  console.log('Player connected:', socket.id);
  
  onlinePlayers.set(socket.id, {
    id: socket.id,
    name: `Player${Math.floor(Math.random() * 1000)}`,
    joinedAt: new Date()
  });
  
  socket.emit('onlinePlayers', Array.from(onlinePlayers.values()));
  socket.broadcast.emit('playerJoined', onlinePlayers.get(socket.id));
  io.emit('playerCount', onlinePlayers.size);
  
  socket.on('setUsername', (data) => {
    if (onlinePlayers.has(socket.id)) {
      onlinePlayers.get(socket.id).name = data.username;
      io.emit('playerUpdated', onlinePlayers.get(socket.id));
    }
  });
  
  socket.on('disconnect', () => {
    onlinePlayers.delete(socket.id);
    io.emit('playerLeft', socket.id);
    io.emit('playerCount', onlinePlayers.size);
    console.log('Player disconnected:', socket.id);
  });
});

app.get('/', (req, res) => {
  res.send('Multiplayer server is running!');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});