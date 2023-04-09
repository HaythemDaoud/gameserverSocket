const express = require('express');
const http = require('http');
const path = require('path');
const app = express();
//const server = http.Server(app);
const socketIO = require('socket.io');
//const io = socketIO(server);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var server =app.listen(8090,() => {
    console.log('Starting server on port 8090')
  })

var io = socketIO.listen(server)

io.on('connection',function(socket) {

    //The moment one of your client connected to socket.io server it will obtain socket id
    //Let's print this out.
    console.log(`Connection : SocketId = ${socket.id}`)
    //Since we are going to use userName through whole socket connection, Let's make it global.   
    var userName = '';
})

module.exports = server;