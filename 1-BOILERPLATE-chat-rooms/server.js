const express = require('express'); // KRÄV express

const app = express(); // SKAPA en express-applikation

const http = require('http'); // KRÄV http (node)

const server = http.createServer(app); // SKAPA server av typen Express

const { Server } = require("socket.io"); // KRÄV Socket.io-biblioteket och klassen Server
//      ^----^ Klass

const io = new Server(server); // INKLUDERA Socket.io
//         ^--------^ Ny instans av Server-klassen

app.use(express.static('public')); // ANVÄND middleware för statiska filer

const PORT = 3000; // DEFINIERA portnummer

server.listen(PORT, () => { // LYSSNA på port
    console.log('Listening on port*:' + PORT);
});

app.get('/', (req, res) => { // HANTERA GET-request

    res.sendFile(__dirname + '/index.html'); // SKICKA fil
});