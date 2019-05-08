var GameTitle = function(game){};

GameTitle.prototype = {
	preload: function(){

	},
	create: function(){
		//add some text
		game.add.text(220, 80, 'Memento Mori', { fontSize: '50px', fill: '#fff' });
		game.add.text(200, 140, 'Created by: Nathan Baledio', { fontSize: '30px', fill: '#fff' });
		game.add.text(200, 300, 'Asset Credits:', { fontSize: '24px', fill: '#fff' });
		game.add.text(200, 320, 'Music: YouFulca (Wingless Seraph)', { fontSize: '24px', fill: '#fff' });
		game.add.text(200, 340, 'Slash Effect: Isabella Ava', { fontSize: '24px', fill: '#fff' });
		game.add.text(200, 360, 'Forest Background: ansimuz', { fontSize: '24px', fill: '#fff' });
		game.add.text(200, 380, 'Platform: Foxly', { fontSize: '24px', fill: '#fff' });
		game.add.text(200, 400, 'SFX: ZapSplat', { fontSize: '24px', fill: '#fff' });
		game.add.text(600, 420, 'Press Space to continue', { fontSize: '16px', fill: '#fff' });
	},
	update: function(){
		//Goes to GamePlay state upon user input
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('GameTutorial');
		}
	}
}