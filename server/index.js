const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const staticPath = path.join(__dirname, '..', 'dist');
const io = new Server(server);


app.use(serveStatic(staticPath));
app.get('/', (req, res) => {
  res.sendFile(htmlPath);
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.broadcast.emit('hi');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('http://localhost:3000/');
});
