#BombBomb

Run and defeat your fellow bombers before time runs out!

Written using
- ImpactJs* (http://impactjs.com)
- node.js (http://nodejs.org)
- socket.io (http://socket.io)
- HTML5

ImpactJs is sold commercially therefore I cannot provide it in the source code. To run the game as source, copy the 'impact' folder of ImpactJs into the 'lib' folder of BombBomb.

To run, type

    node app.js

You'll also be able to play it with other people (bandwidth permitted) on my personal site when completed.

##How it works

I'm still very new to node.js so if any of this seems wrong I am open to feedback.

#####Role of Node
The node server starts and listens for incoming connections - when a new client connects, the server emits a call and initializes the new player for all currently connected clients. Any time a player presses or releases one of the control keys, the server emits position and direction data to each client's game in which then renders the appropriate movement.

#####Security
All position, damage, and collision is known on the server, therefore 'hacking' movement on the client side will only render that client's game useless.

#####Syncing
The server syncs a client's actual position after every key up/down. 

##To-do

1. Movement gets off sync quick - need to fix
2. Plant bombs
3. Kick bombs
4. Graphics
5. Sound
6. Intro level - "Binding of Isaac"-style (controls on ground)
7. Server rooms - 4 people per room - free for all

http://www.whoistom.me