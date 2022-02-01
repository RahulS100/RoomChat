const socket = io('http://localhost:3000'); //inclusion of socket server for client event handling

const send_m = document.getElementById('massage');
const form_m = document.getElementById('send');
const container_m = document.querySelector('.container');

const append = (massage_s, position_s) => {
    const massage_section = document.createElement('div');
    massage_section.innerText = massage_s;
    massage_section.classList.add('massage');
    massage_section.classList.add(position_s);
    container_m.append(massage_section);
}

const name_u = prompt('Enter your name: ');
socket.emit('new-user-join', name_u);
socket.on('user-join', name=> {
append(`${name} join the chat`, 'right')
});

socket.on('c_massage', data=> {
append(`${data.name}: ${data.massage}`, 'left');
});

socket.on('left', name=> {
append(`${name} left the chat`, 'right');
});

form_m.addEventListener('submit', (e)=>{
    e.preventDefault();
    const massage = send_m.value;
    if(massage != '') {
    append(massage, 'right');
    socket.emit('sender', massage);
    send_m.value = '';
    }
});