const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// ဖိုင်များအားလုံးကို တိုက်ရိုက်ဖတ်နိုင်ရန် ညွှန်ကြားခြင်း
app.use(express.static(path.join(__dirname)));

// ပင်မလင့်ခ် (Home) ဝင်လာလျှင် index.html ကို ပြရန်
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    console.log('တစ်ယောက် ချိတ်ဆက်ဝင်ရောက်လာပါပြီ:', socket.id);

    socket.on('chat-message', (data) => {
        io.emit('chat-message', data);
    });

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
