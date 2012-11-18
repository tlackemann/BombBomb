ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'game.levels.factory',
	'game.entities.player'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	
	
	init: function() {
		// Initialize your game here; bind keys etc.

		ig.input.bind(ig.KEY.W, 'up');
		ig.input.bind(ig.KEY.A, 'left');
		ig.input.bind(ig.KEY.S, 'down');
		ig.input.bind(ig.KEY.D, 'right');
		this.loadLevel(LevelFactory);
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		
		var player = this.getEntitiesByType(EntityPlayer)[0];
		if (player) {
			// Zoom camera when idle and zoom out when moving
			// Encourages constant movement
			this.screen.x = player.pos.x - ig.system.width/2;
			this.screen.y = player.pos.y - ig.system.height/2;
		}
		// Add your own, additional update code here
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
		var player = this.getEntitiesByType(EntityPlayer)[0];

		player.messageBoxTimer = player.messageBoxTimer - 1;

		if (player.messageBoxTimer < 1) {
			player.messageBoxTimer = 100;
			var newText = '';
			var newSplit = '';

			for (var i = 0; i < newSplit.length; i++) {
				if (i > 1) {
					newText = newText + "\n" + newSplit[i];
				}
			}
			player.messageBox = newText;
		}

		this.font.draw(player.messageBox, 400, 10);
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 640, 480, 1 );

});
