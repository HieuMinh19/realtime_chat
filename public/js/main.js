const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const socket = io();

// Message from server
socket.on('message', message => {
    console.log('MESSAGE', message);
    outputMessage(message);

    //scroll down
});

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const msg = e.target.elements.msg.value;
    socket.emit('chatMessage', msg);

    //clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();

    //auto scroll down to the last message
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.user_name} <span>${message.time}</span></p>
    <p class="text">
       ${message}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}
