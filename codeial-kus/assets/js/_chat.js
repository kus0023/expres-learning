let socket = io('http://localhost:8001');

let wrapper = document.getElementById('chat-message');
let messages = document.getElementById('chat-box-messages');
let form = document.getElementById('chat-box-form');
let input = document.getElementById('chat-box-input');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});



socket.on('chat message', function(msg) {
  
    let item = document.createElement('li');
    item.textContent = msg.data;
    messages.appendChild(item);
    wrapper.scrollTo(0, document.body.scrollHeight);
  });