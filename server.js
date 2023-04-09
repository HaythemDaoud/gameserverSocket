const express = require('express');
const bodyParser = require('body-parser');
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
let playerNo = 0;
let roomNo = 0;

io.on('connection',function(socket) {

    socket.on('join_room', function(data) {
    console.log(`Connection new player: SocketId = ${socket.id}`)
    playerNo++;
    roomNo = Math.round(playerNo/2);
    if (playerNo % 2 === 0 )
    {   
        console.log(`second player join the roomNo : ${roomNo}`);
        socket.join(roomNo);
        io.to(`${roomNo}`).emit('newplayerintheroom', `second player join the roomNo : ${roomNo}`);
    }
    if (playerNo % 2 === 1 )
    {   
        console.log(`first player join the roomNo : ${roomNo}`);
        socket.join(roomNo);
        io.to(`${roomNo}`).emit('newplayerintheroom', `first player join the roomNo : ${roomNo}`);
    }
    
    })

    console.log (`cheaking number of rooms  ${roomNo}`);
    
    



    socket.on("disconnect", () => {
        console.log(`player with id ${socket.id} disconnected`);
      });
})

module.exports = server;