var GameTutorial = function(game){};
var presscount = 0;

GameTutorial.prototype = {
	preload: function(){
		game.load.image('keys', 'assets/img/keys.png');
		game.load.image('spacebar', 'assets/img/spacebar.png',200,100);
		game.load.image('blackimage','assets/img/blackimage.png',800,450);
		game.load.spritesheet('playerwhite', 'assets/img/playerwhite.png', 32, 45);
		game.load.spritesheet('playerblack', 'assets/img/playerblack.png', 32, 45);		
	},
	create: function(){
		
	},
	update: function(){
		//Goes to GamePlay state upon user input
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			presscount++;
		}
		
		if(presscount == 0){
			presscount++;
			game.add.text(30, 40, 'My name is Luna.', { fontSize: '32px', fill: '#fff' });
			game.add.text(30, 80, 'I... do not remember how I ended up here.', { fontSize: '32px', fill: '#fff' });
			game.add.text(30, 120, 'When I awoke, my skin was as pale as death', { fontSize: '32px', fill: '#fff' });
			game.add.text(30, 160, 'and I stood before a dark forest.', { fontSize: '32px', fill: '#fff' });
			game.add.text(30, 200, 'There was something about it that... called to me.', { fontSize: '32px', fill: '#fff' });
			move = game.add.text(30, 240, 'It allured me to move deeper into the forest.', { fontSize: '32px', fill: '#fff' });
			move.addColor('#ff0000',17);
			move.addColor('#ffffff',21);
			keys = game.add.sprite(340,330,'keys');
			keys.scale.setTo(3,3);
			game.add.text(355,300, 'Jump', { fontSize: '28px', fill: '#fff' });
			game.add.text(270, 370, 'Left', { fontSize: '28px', fill: '#fff' });
			game.add.text(460, 370, 'Right', { fontSize: '28px', fill: '#fff' });
			game.add.text(600, 420, 'Press Space to continue', { fontSize: '16px', fill: '#fff' });
			blackimage1 = game.add.sprite(0,0,'blackimage');
			
		}
		
		if(presscount == 1){
			blackimage1.alpha -= .06;
		}
		
		
		if(presscount == 2){
			presscount++;
			blackimage1.alpha = 1;
			game.add.text(30, 40, 'As I traveled in the abyss, I encountered ghosts.', { fontSize: '28px', fill: '#fff' });
			game.add.text(30, 80, 'Before they could attack, a flash of fire surrounded me.', { fontSize: '28px', fill: '#fff' });
			color = game.add.text(30, 120, 'My dress became the same color as them.', { fontSize: '28px', fill: '#fff' });
			color.addColor('#ff0000',25);
			color.addColor('#ffffff',30);
			game.add.text(30, 160, 'After that, they could not harm me.', { fontSize: '28px', fill: '#fff' });
			dis = game.add.text(30, 200, 'Even the ground seemed to disappear, depending on', { fontSize: '28px', fill: '#fff' });
			dis.addColor('#ff0000',25);
			dis.addColor('#ffffff',35);
			game.add.text(30,240,'my color.',{ fontSize: '28px', fill: '#fff' });
			game.add.text(375, 320, '<->', { fontSize: '24px', fill: '#fff' });
			game.add.text(600, 420, 'Press Space to continue', { fontSize: '16px', fill: '#fff' });
			bar = game.add.sprite(335,390,'spacebar');
			bar.scale.setTo(3,3);
			bplayer = game.add.sprite(325, 300, 'playerblack');
			bplayer.scale.setTo(1.3,1.3);
			bplayer.frame = 4;
			wplayer = game.add.sprite(415, 300, 'playerwhite');
			wplayer.scale.setTo(1.3,1.3);
			wplayer.frame = 4;
			blackimage2 = game.add.sprite(0,0,'blackimage');
		}	
		
		if(presscount == 3){
			blackimage2.alpha -= .06;
		}

		
		if(presscount == 4){
			presscount++;
			blackimage2.alpha = 1;
			blackimage = game.add.sprite(0,0,'blackimage');
			game.add.text(30, 40, 'What a strange power.', { fontSize: '28px', fill: '#fff' });
			game.add.text(30, 80, 'This forest feels... familiar.', { fontSize: '28px', fill: '#fff' });
			sharp = game.add.text(30, 120, 'Those sharp branches... These restless souls...', { fontSize: '28px', fill: '#fff' });
			sharp.addColor('#ff0000',6);
			sharp.addColor('#ffffff',11);
			color = game.add.text(30, 160, 'Was I here before...?', { fontSize: '28px', fill: '#fff' });
			game.add.text(30, 200, 'The deeper I go, the closer I feel to discovering', { fontSize: '28px', fill: '#fff' });
			game.add.text(30, 240, 'my answer.', { fontSize: '28px', fill: '#fff' });
			game.add.text(600, 420, 'Press Space to start', { fontSize: '16px', fill: '#fff' });
			blackimage3 = game.add.sprite(0,0,'blackimage');
		}
		
		if(presscount == 5){
			blackimage3.alpha -= .06;
		}
		
		if(presscount == 6){
			game.state.start('GamePlay');
		}
	}
}