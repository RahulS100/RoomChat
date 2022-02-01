const io = require('socket.io')(3000);
const users = {};

//emmit the massages
io.on('connection', socket => {
    console.log('conection');
    socket.on('new-user-join', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-join', name);
    })

    socket.on('sender', massage => {
        socket.broadcast.emit('c_massage', {massage: massage, name: users[socket.id]});
    });
   
    socket.on('disconnect', massage => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
});

console.log('server started at post 3000');