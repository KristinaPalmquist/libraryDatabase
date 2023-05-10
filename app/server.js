const express = require('express')
const http = require('http')

// create Server class
const { Server } = require('socket.io')

// create express app
const app = express()

// create express server
const server = http.createServer(app)

// create object of Server class to to execute chat related functions
const io = new Server(server)

// use middleware for static files in public folder
app.use(express.static('public'))

// handle GET requests and send files
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/chat.html')
})
app.get('/search', (req, res) => {
    res.sendFile(__dirname + '/search.html')
})
app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/register.html')
})
app.get('/apitest', (req, res) => {
    res.sendFile(__dirname + '/apitest.html')
})

const mainRoom = 'Main room'
const waitingRoom = 'Waiting room'
let peopleInMainRoom = 0

// call io through the built in event connection
io.on('connection', (socket) => {
    peopleInMainRoom++
    // the first two visitors will be let into the main room
    if (peopleInMainRoom <= 2) {
        socket.join(mainRoom)
        // send welcome message to display in the chat
        socket.emit('server message', 'Welcome to the chat!')
        console.log('People in ' + mainRoom + ': ' + peopleInMainRoom)
    }
    // excess visitors will be put into the waiting room
    else {
        socket.join(waitingRoom)
        // send welcome message to display in the chat
        socket.emit(
            'server message',
            'Welcome to the holding area! You are placed in the queue.'
        )
    }
    // call io through the built in event disconnect
    socket.on('disconnect', () => {
        peopleInMainRoom--
        console.log('A user disconnected.')
        console.log('People in ' + mainRoom + ': ' + peopleInMainRoom)
    })
    // send chat message to the main room
    socket.on('chat message', (message) => {
        io.to(mainRoom).emit('chat message', message)
    })
})

// define port number
const PORT = 5174
// listen to port and log address to console
server.listen(PORT, console.log('Listening on: http://localhost:' + PORT))
