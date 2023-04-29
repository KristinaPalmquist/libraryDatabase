var socket = io();

// socket.on('server message', (message) => {
    
//     console.log(message);
// });

// socket.emit('client message', 'Hello from client!');

const btnSend = document.querySelector('#send');

btnSend.addEventListener('click', () => {
    const input = document.querySelector('#input');
    socket.emit('chat message', input.value);
});

socket.on('chat message', (message) => {
    const messageBox = document.querySelector('.message-box');
    messageBox.innerHTML += `<div class="message">${message}</div>`;
});

socket.on('server message', (message) => {
    const messageBox = document.querySelector('.message-box');
    messageBox.innerHTML += `<div class="message">${message}</div>`;
});