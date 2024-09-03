const socket = io('http://localhost:3000');
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

const name = prompt('What is your name?');
appendMessage('You JOined');


socket.emit('new-user', name);
socket.on('user-connected',name => {
  appendMessage(`${name} joined`);
})
socket.on('user-disconnected',name => {
  appendMessage(`${name} disconnected`);
})
socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`)
})



messageForm.addEventListener('submit',e => {
  e.preventDefault();
  const message = messageInput.value;
  appendMessage(`You:${message}`)
  socket.emit('send-chat-message', message );
  messageInput.value = '';
})


function appendMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageContainer.appendChild(messageElement)
}