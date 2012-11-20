ig.module(
  'game.entities.otherPlayer'
)
.requires(
  'impact.entity'    
)
.defines(function() {

  var speed = 224;

	EntityOtherPlayer = ig.Entity.extend({
	 	size: {x: 28, y: 28},
	 	type: ig.Entity.TYPE.B,
		speed: 100,
		name: "otherPlayer",
		gameName: "",
		animation: 1,
		isMoving: false,
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

	    this.maxVel = {x: speed, y: speed};
		},

		netMove: function(positionX, positionY, direction) {
			this.pos.x = positionX;
			this.pos.y = positionY;
			this.direction = direction;
			this.isMoving = true;
		},

		netStop: function(positionX, positionY, direction) {
			this.pos.x = positionX;
			this.pos.y = positionY;
			this.direction = direction;
			this.isMoving = false;
		},

	 	update: function() {
		  if (this.isMoving && this.direction == 1) {
				this.vel.y = -speed;
				this.currentAnim = this.anims.up;
				currentAnimation = 1;

			} else if (this.isMoving && this.direction == 2) {
				this.vel.x = speed;
				this.currentAnim = this.anims.right;
				currentAnimation = 2;

			} else if (this.isMoving && this.direction == 3) {
				this.vel.y = speed;
				this.currentAnim = this.anims.down;
				currentAnimation = 2;

			} else if (this.isMoving && this.direction == 4) {
				this.vel.x = -speed;
				this.currentAnim = this.anims.left;
				currentAnimation = 2;

			} else {
				this.vel.x = 0;
				this.vel.y = 0;

				if (this.direction == 1) {
					this.currentAnim = this.anims.idleUp;
					currentAnimation = 5;
					//socket.emit('movePlayer', this.anims.idleUp, this.vel.x, this.vel.y, this.gameName);
				}
				if (this.direction == 2) {
					this.currentAnim = this.anims.idleRight;
					currentAnimation = 6;
					//socket.emit('movePlayer', this.anims.idleRight, this.vel.x, this.vel.y, this.gameName);
				}
				if (this.direction == 3) {
					this.currentAnim = this.anims.idleDown;
					currentAnimation = 7;
					//socket.emit('movePlayer', this.anims.idleDown, this.vel.x, this.vel.y, this.gameName);
				}
				if (this.direction == 4) {
					this.currentAnim = this.anims.idleLeft;
					currentAnimation = 8;
					//socket.emit('movePlayer', this.anims.idleLeft, this.vel.x, this.vel.y, this.gameName);
				}
			}
	 	
			this.parent();
	 	}
	});
})