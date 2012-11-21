ig.module(
	'game.entities.bomb'
).requires(
	'impact.entity'
).defines(function() {

	EntityBomb = ig.Entity.extend({
		size: {x: 28, y: 28},
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.PASSIVE,
		animSheet: new ig.AnimationSheet('media/sprite.bomb.png', 28, 28),
		

		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.addAnim('active', 0.21, [0,1,2]);
		},

		update: function() {

			this.parent();
		}
	});

})