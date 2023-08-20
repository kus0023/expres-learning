
const app = require('./index');

//chatting app
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
//second parameter is to resolve CORS error
//because client will communicate through our server which is running on 8000 port
//so we need to allow CORS for that origin that is localhost:8000.
const io = new Server(server, {cors: {origin: "http://localhost:8000"}});

io.on('connection', (socket) => {
    console.log('a user connected ', socket.id);

    socket.on('chat message', (data)=>{
        console.log('Received from client Id:', socket.id, "message: ", data);
    
        io.emit('chat message', {data, from: socket.id})
    })

    

    socket.on('disconnect', () => {
        console.log(`user ${socket.id} disconnected`);
      });
  });

server.listen(8001, () => {
    console.log('listening on *:8001 for socket.');
    
});