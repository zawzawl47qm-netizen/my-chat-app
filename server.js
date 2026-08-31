const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Static ဖိုင်များ ချိတ်ဆက်ခြင်း
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log('တစ်ယောက်က် ဆက်သွယ်လာပါပြီ:', socket.id);

  // စာသား မက်ဆေ့ချ် ပို့ခြင်း
socket.broadcast.emit('chat-message', data);
  });

  // ဗီဒီယို/ဖုန်း ခေါ်ဆိုရန် Signal များနှင့် WebRTC
  socket.on('call-user', (data) => {
    socket.broadcast.emit('incoming-call', data);
  });

  socket.on('answer-call', (data) => {
    socket.broadcast.emit('call-answered', data);
  });

  socket.on('end-call', () => {
    socket.broadcast.emit('call-ended');
  });

  socket.on('disconnect', () => {
    console.log('ချိတ်ဆက်မှု ပြတ်တောက်သွားပါပြီ:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`ဆာဗာ စတင်လည်ပတ်နေပြီ Port: ${PORT}`);
});
