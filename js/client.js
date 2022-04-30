const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")
//audio
var audioRecive = new Audio('acb8c3e2-0e5f-419b-bf4a-27f9bfbf33bb.mp3')
var audioSend = new Audio('330666e4-0374-4a55-bac4-b1ce58995d5e.mp3')

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
        audioRecive.play();
    }
    else(audioSend.play);
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})

const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);
socket.on('user-joined', name =>{
append(`${name}: joined the chat`, 'right')
})

socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left')
})

socket.on('left', name =>{
    append(`${name}: left the chat`, 'left')
})