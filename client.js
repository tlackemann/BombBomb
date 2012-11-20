var namerAnd  = Math.floor(Math.random()*999);
var playerName = "player" + namerAnd;

var socket = io.connect('http://localhost:8080');

socket.on('message', function (data) {
	var player = ig.game.getEntitiesByType(EntityPlayer)[0];
		if(player) {
			player.messageBox = player.messageBox + '\n' + data + ' disconnected';
		}
});	 
	
socket.on('playerMove', function (positionX, positionY, direction, gameName) {
	var otherPlayer = ig.game.getEntitiesByType(EntityOtherPlayer);

	if(otherPlayer) {
 		for(var i in otherPlayer) {
				if(gameName == otherPlayer[i].gameName) {
					otherPlayer[i].netMove(positionX, positionY, direction);
					console.log("Moving: " + otherPlayer[i].gameName + " { x:"+positionX+", y:"+positionY+", direction:"+direction+" }");
				}
			}
		}
}); 

socket.on('playerStop', function (positionX, positionY, direction, gameName) {
	var otherPlayer = ig.game.getEntitiesByType(EntityOtherPlayer);

	if(otherPlayer) {
 		for(var i in otherPlayer) {
				if(gameName == otherPlayer[i].gameName) {
					otherPlayer[i].netStop(positionX, positionY, direction);
					console.log("Stopping: " + otherPlayer[i].gameName + " { x:"+positionX+", y:"+positionY+", direction:"+direction+" }");
				}
			}
		}
}); 
 
socket.on('netReplayer', function (playerList) {
  var netPlayers = ig.game.getEntitiesByType(EntityOtherPlayer);
	//loop to see if players exist
	if(netPlayers) {
	  for(var i in netPlayers) {
	  	//netPlayers[i].kill();
 		}
 	}
 
	for(var i in playerList) {
 		if(playerName != playerList[i]) {
	  	ig.game.spawnEntity(EntityOtherplayer, 160, 260, {gameName: playerList[i]} );
 		}
 	}
});

	socket.on('addPlayer', function (playerList,otherPlayerName) {
	var player = ig.game.getEntitiesByType(EntityPlayer)[0];
		player.messageBox = player.messageBox + '\n' + otherPlayerName + ' joined';
		for(var i = 0; i<playerList.length;i++) {
		if(player.gameName != playerList[i]) {  
 			ig.game.spawnEntity(EntityOtherPlayer, ig.system.width/2, ig.system.height/2, {gameName:playerList[i]} );
		}
	}
});