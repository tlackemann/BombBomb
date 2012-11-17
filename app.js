var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
 

app.listen(8080);

var playerlocation = 0;
var playerlist = [];



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
  
     
  
socket.on('recievedata', function (positionx,positiony,currentanimation,gamename) {
   
     socket.broadcast.emit('playermove', positionx,positiony,currentanimation,gamename);
    
    
  }); 

  
   
  
  
  socket.on('initializeplayer', function (newplayername) {
 
    socket.clientname = newplayername;
     playerlist.push(newplayername);
 io.sockets.emit('addplayer',playerlist,newplayername);
   
   
  });
 socket.on('disconnect', function(){
   delete playerlist[socket.clientname];
 for(var i in playerlist)
 {
  if(playerlist[i] == socket.clientname)
  {
    playerlist.splice(i, 1);
  }
 }
socket.broadcast.emit('message',socket.clientname);
 socket.broadcast.emit('netreplayer',playerlist);
 
 
});
 

 
});