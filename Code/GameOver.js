var GameOver = function(game){};
var scoreText;

GameOver.prototype = {
	init: function(scoreText) {
		//Initializes score
		this.scoreText = scoreText;
	},
	preload: function(){
		
	},
	create: function(){
		game.add.text(268, 120, 'Game Over', { fontSize: '48px', fill: '#fff' });
		game.add.text(315, 200, 'You lasted ', { fontSize: '32px', fill: '#fff' });
		score = game.add.text(270,250, scoreText.text,{ fontSize: '32px', fill: '#000' });
		score.addColor('#ffffff',5);
		game.add.text(225, 310, 'searching for the truth ', { fontSize: '32px', fill: '#fff' });
		game.add.text(215, 400, 'Press [space] to restart', { fontSize: '32px', fill: '#fff' });
	},
	update: function(){
		//Goes to GamePlay state upon user input
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('GamePlay');
		}
	}
}