ig.module(
  'game.entities.player'
)
.requires(
  'impact.entity'    
)
.defines(function() {

  var isMove = 0;
  var speed = 224;

  EntityPlayer = ig.Entity.extend({
    size: {x: 18, y: 24},
    direction: 1,
    messageBox: '',
    messageBoxTimer: 200,
    type: ig.Entity.TYPE.A,
    netTimer: 10,
    name: "player",
    gameName: playerName,
    
    checkAgainst: ig.Entity.TYPE.NONE,
		collides: ig.Entity.COLLIDES.PASSIVE,

		animSheet: new ig.AnimationSheet('media/sprite.bomberman2.png', 28, 28),

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			// Add animations
			this.addAnim('up', 0.21, [6,7,8]);
			this.addAnim('right', 0.21, [9,10,11]);
			this.addAnim('down', 0.21, [0,1,2]);
			this.addAnim('left', 0.21, [3,4,5]);
			this.addAnim('idleUp', 0.1, [6]);
	    this.addAnim('idleRight', 0.1, [9]);
	    this.addAnim('idleDown', 0.1, [0]);
	    this.addAnim('idleLeft', 0.1, [3]);

			this.maxVel = {x: speed, y: speed};

			socket.emit('initializePlayer', this.gameName);
		},

		update: function() {
			if (ig.input.state('up')) {
				this.vel.y = -speed;
				isMove = 1;
				this.direction = 1;
			} else if (ig.input.state('right')) {
				this.vel.x = speed;
				isMove = 2;
				this.direction = 2;
			} else if (ig.input.state('down')) {
				this.vel.y = speed;
				isMove = 3;
				this.direction = 3;
			} else if (ig.input.state('left')) {
				this.vel.x = -speed;
				isMove = 4;
				this.direction = 4;
			} else {
				this.vel.x = 0;
				this.vel.y = 0;
				isMove = 0;
			}

			if (this.vel.y < 0) {
				this.currentAnim = this.anims.up;
				currentAnimation = 1;
			} else if (this.vel.x > 0) {
				this.currentAnim = this.anims.right;
				currentAnimation = 2;
			} else if (this.vel.y > 0) {
				this.currentAnim = this.anims.down;
				currentAnimation = 3;
			} else if (this.vel.x < 0) {
				this.currentAnim = this.anims.left;
				currentAnimation = 4;
			} else {
				if (this.direction == 1) {
					this.currentAnim = this.anims.idleUp;
					currentAnimation = 5;
				}
				if (this.direction == 2) {
					this.currentAnim = this.anims.idleRight;
					currentAnimation = 6;
				}
				if (this.direction == 3) {
					this.currentAnim = this.anims.idleDown;
					currentAnimation = 7;
				}
				if (this.direction == 4) {
					this.currentAnim = this.anims.idleLeft;
					currentAnimation = 8;
				}
			}
			
			if (this.netTimer < 1) {
				this.netTimer = 50;
				socket.emit('recieveData', this.pos.x, this.pos.y, currentAnimation, this.gameName);
			}

			this.netTimer = this.netTimer - 1;
			
			this.parent();
		}
  });


	EntityOtherplayer = ig.Entity.extend({
	 	size: {x: 32, y: 48},
	 	type: ig.Entity.TYPE.B,
		speed: 100,
		name: "otherPlayer",
		gamename: "",
		animation: 1,
    //checkAgainst: ig.Entity.TYPE.B,
		collides: ig.Entity.COLLIDES.PASSIVE,
    animSheet: new ig.AnimationSheet('media/sprite.bomberman2.png', 28, 28),
		
		init: function( x, y, settings ) {
	    this.parent( x, y, settings );
		 	this.health = 100;

			// Add animations
			this.addAnim('up', 0.21, [6,7,8]);
			this.addAnim('right', 0.21, [9,10,11]);
			this.addAnim('down', 0.21, [0,1,2]);
			this.addAnim('left', 0.21, [3,4,5]);
			this.addAnim('idleUp', 0.1, [6]);
	    this.addAnim('idleRight', 0.1, [9]);
	    this.addAnim('idleDown', 0.1, [0]);
	    this.addAnim('idleLeft', 0.1, [3]);
		},
	
		netmoveplayer: function() {
			this.pos.x = positionx;
	    this.pos.y = positiony;
		},
	
	 	update: function() {
		  switch(this.animation){
		    case 1:
			 		this.currentAnim = this.anims.up;
			 		break;
		   	case 2:
			 		this.currentAnim = this.anims.down;
			 		break;
		    case 3:
			 		this.currentAnim = this.anims.left;
			 		break;
		    case 4:
			 		this.currentAnim = this.anims.right;
			 		break;
		    case 5:
			 		this.currentAnim = this.anims.idleUp;
			 		break;
		    case 6:
			 		this.currentAnim = this.anims.idleDown;
			 		break;
		    case 7:
			 		this.currentAnim = this.anims.idleLeft;
			 		break;
		    case 8:
			 		this.currentAnim = this.anims.idleRight;
			 		break;
	   	}
	 }
	});
})