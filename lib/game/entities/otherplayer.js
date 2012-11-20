ig.module(
  'game.entities.otherPlayer'
)
.requires(
  'impact.entity'    
)
.defines(function() {

  var isMove = 0;
  var speed = 224;

	EntityOtherPlayer = ig.Entity.extend({
	 	size: {x: 28, y: 28},
	 	type: ig.Entity.TYPE.B,
		speed: 100,
		name: "otherPlayer",
		gameName: "",
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
	
		netMovePlayer: function() {
			this.pos.x = positionX;
	    this.pos.y = positionY;
		},
	
	 	update: function() {
		  if (this.vel.y < 0) {
				this.vel.y = -speed;
				isMove = 1;
				this.direction = 1;
			} else if (this.vel.x > 0) {
				this.vel.x = speed;
				isMove = 2;
				this.direction = 2;
			} else if (this.vel.y > 0) {
				this.vel.y = speed;
				isMove = 3;
				this.direction = 3;
			} else if (this.vel.x < 0) {
				this.vel.x = -speed;
				isMove = 4;
				this.direction = 4;
			} else {
				this.vel.x = 0;
				this.vel.y = 0;
				isMove = 0;
			}
	 }
	});
})