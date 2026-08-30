const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public')); // (သို့မဟုတ်) ပုံမှန် ဖိုင်များထားရာ နေရာ

io.on('connection', (socket) => {
    console.log('တစ်ယောက် ချိတ်ဆက်ဝင်ရောက်လာပါပြီ:', socket.id);

    // စာပို့သည့်အခါ အခြားသူဆီ ပို့ပေးရန်
    socket.id = socket.id;
    socket.on('chat-message', (data) => {
        io.emit('chat-message', data);
    });

    // ဖုန်းခေါ်ဆိုမှုနှင့် ဗီဒီယိုခေါ်ဆိုမှုများအတွက် Signal လွှဲပြောင်းပေးရန်
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
    console.log(`ဆာဗာ စတင်လည်ပတ်နေပါပြီ Port: ${PORT}`);
});
