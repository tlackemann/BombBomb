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

  socket.on('movePlayer', function (velocityX, velocityY, gameName) {
    socket.broadcast.emit("playerMove", velocityX, velocityY, gameName);
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