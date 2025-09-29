const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: "*" }
});


const onlinePlayers = new Map();

io.on('connection', (socket) => {
  console.log('Player connected:', socket.id);
  
  
  onlinePlayers.set(socket.id, {
    id: socket.id,
    name: `Player${Math.floor(Math.random() * 1000)}`, // Random name
    joinedAt: new Date()
  });
  
  
  socket.emit('onlinePlayers', Array.from(onlinePlayers.values()));
  
  
  socket.broadcast.emit('playerJoined', onlinePlayers.get(socket.id));
  
  
  io.emit('playerCount', onlinePlayers.size);
  
  socket.on('disconnect', () => {
    const disconnectedPlayer = onlinePlayers.get(socket.id);
    onlinePlayers.delete(socket.id);
    
    
    io.emit('playerLeft', socket.id);
    
    
    io.emit('playerCount', onlinePlayers.size);
    
    console.log('Player disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});