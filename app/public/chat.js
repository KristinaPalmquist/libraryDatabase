// use sockets on the client side
var socket = io()

socket.on('server message', (message) => {
    console.log(message)
})

// create variables for button, input and username
const btnSend = document.querySelector('#send')
const username = prompt('Please enter your username')
const input = document.querySelector('#input')

// emit event with object containing username and message on button click
btnSend.addEventListener('click', () => {
    const output = {
        username: username,
        message: input.value
    }
    socket.emit('chat message', output)
    input.value = ''
})

// display welcome message in the chat
socket.on('server message', (message) => {
    const messageBox = document.querySelector('.message-box')
    messageBox.innerHTML += `<div class="message">${message}</div>`
})

// when receiving event chat message display chat message to the main room
socket.on('chat message', (output) => {
    const messageBox = document.querySelector('.message-box')
    let element = document.createElement('div.message')
    element.innerHTML = `<strong>${output.username}:</strong> ${output.message}`
    messageBox.prepend(element)
    messageBox.prepend(document.createElement('br'))

    // const messageBox = document.querySelector('.message-box')
    // messageBox.innerHTML += `<div class="message"><strong>${output.username}:</strong> ${output.message}</div>`
})
