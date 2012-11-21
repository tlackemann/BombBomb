var app = require('http').createServer(handler)
, io = require('socket.io').listen(app)
, fs = require('fs');

app.listen(8080);

var playerLocation = 0;
var playerList = [];

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {

  socket.on('initializePlayer', function (newPlayerName) {
    socket.clientname = newPlayerName;
    playerList.push(newPlayerName);
    io.sockets.emit('addPlayer',playerList,newPlayerName);
  });

  socket.on('movePlayer', function (positionX, positionY, direction, gameName) {
    socket.broadcast.emit("playerMove", positionX, positionY, direction, gameName);
  });
  
  socket.on('stopPlayer', function (positionX, positionY, direction, gameName) {
    socket.broadcast.emit("playerStop", positionX, positionY, direction, gameName);
  });

  socket.on('plantBomb', function (positionX, positionY, gameName) {
    socket.broadcast.emit("playerPlant", positionX, positionY, gameName);
  });

  socket.on('disconnect', function () {
    delete playerList[socket.clientname];
    for(var i in playerList) {
      if(playerList[i] == socket.clientname) {
        playerList.splice(i, 1);
      }
    }
    socket.broadcast.emit('message',socket.clientname);
    socket.broadcast.emit('netReplayer',playerList);
  });

});