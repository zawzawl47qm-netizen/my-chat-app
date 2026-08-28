// @ts-nocheck
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path"; 
import express from "express";


const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.static(path.join(__dirname, '../src')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/index.html'));
});


io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
