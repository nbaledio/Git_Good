//Creative Tilt:
//1. One of the thing's I'm proud of coding is the way hitboxes
//"disable" upon chaning color. I originally turned them off, but
//then that also turned off ghost/platform velocity. So instead, I just
//offset them to the bottom of the screen out of the player's view. Also
//ghosts spawn and platforms speed up at certain time stamps.
//2. I created a few of my own assets (ghosts, branches) and modified
//some free ones too. For my game, I wanted to explore the idea of light
//and dark so I included color as an essential element to the game. Being able
//to manage their color in addition to the basic concept of platforming is essential
//to lasting long in this game.

var GamePlay = function(game){};
var count = 0;
var min = 0;
var alive = 1;
var play = 0;
var PlatformSpeed = -100;
var increment = 1;

GamePlay.prototype = {
	preload: function(){
		//Preload game assets
		game.load.image('background', 'assets/img/parallax-forest.png');
		game.load.image('BlackPlatform', 'assets/img/BlackPlatform.png');
		game.load.image('WhitePlatform', 'assets/img/WhitePlatform.png');
		game.load.image('WhiteGhost', 'assets/img/WhiteGhost.png');
		game.load.image('BlackGhost', 'assets/img/BlackGhost.png');
		game.load.image('whitetimebox', 'assets/img/whitetimebox.png');
		game.load.image('blacktimebox', 'assets/img/blacktimebox.png');
		game.load.image('spikes','assets/img/spikes.png'); 
		game.load.image('blackimage','assets/img/blackimage.png',800,450); 
		game.load.spritesheet('slashwhite','assets/img/slashwhite.png',192,192);
		game.load.spritesheet('slashblack','assets/img/slashblack.png',192,192);
		game.load.spritesheet('playerwhite', 'assets/img/playerwhite.png', 32, 45);
		game.load.spritesheet('playerblack', 'assets/img/playerblack.png', 32, 45);
		game.load.audio('bgm','assets/audio/Rest-in-Peace_loop.ogg');
		game.load.audio('whoosh','assets/audio/whoosh.ogg');
	},
	create: function(){
		
		//Reset variables upon replay
		alive = 1;
		count = 0;
		min = 0;
		
		//Create bgm
		bgm = game.add.audio('bgm');
		bgm.loop = true;
		
		whoosh = game.add.audio('whoosh');
		
		//  Create our Timer
		timer = game.time.create(false);

		//  Set a TimerEvent to occur after 2 seconds
		timer.loop(1000, updateCounter, this);
		timer.start();
		//Adds Forest background
		forest = game.add.tileSprite(0, 0,game.world.width,game.world.height, 'background');
		
		//Adds Spikes and enables body
		spikes = game.add.tileSprite(0,404,800,46,'spikes');
		game.physics.arcade.enable(spikes);
		
		//  Platforms group to hold ledges
		platformgroup = game.add.group();

		//  Enable physics for every object in platforms group
		platformgroup.enableBody = true;
		
		//Creates 3 platforms (Only 3 are on-screen at a time. They will loop)
		p1 = new platforms(0);
		p1.spawn(game,10,game.rnd.integerInRange(120,300),'BlackPlatform','WhitePlatform');
		platformgroup.add(p1.platform);
		p1.platform.body.immovable = true;
		p1.platform.body.velocity.x = PlatformSpeed;
		
		
		p2 = new platforms(0);
		p2.spawn(game,365,game.rnd.integerInRange(120,300),'BlackPlatform','WhitePlatform');
		platformgroup.add(p2.platform);
		p2.platform.body.immovable = true;
		p2.platform.body.velocity.x = PlatformSpeed;
		
		p3 = new platforms(1);
		p3.spawn(game,700,game.rnd.integerInRange(120,300),'BlackPlatform','WhitePlatform');
		platformgroup.add(p3.platform);
		p3.platform.body.immovable = true;
		p3.platform.body.velocity.x = PlatformSpeed;
		
		//  Ghosts group sp00ky
		ghostgroup = game.add.group();

		//  Enable body for ghosts
		ghostgroup.enableBody = true;
		
		spook1 = new ghosts(game.rnd.integerInRange(0,1));
		spook1.spawn(game,800,game.rnd.integerInRange(100,300),'BlackGhost','WhiteGhost');
		ghostgroup.add(spook1.ghost);
		s1 = .8;
		
		spook2 = new ghosts(game.rnd.integerInRange(0,1));
		spook2.spawn(game,800,game.rnd.integerInRange(100,300),'BlackGhost','WhiteGhost');
		ghostgroup.add(spook2.ghost);
		s2 = .8;
		
		spook3 = new ghosts(game.rnd.integerInRange(0,1));
		spook3.spawn(game,800,game.rnd.integerInRange(100,300),'BlackGhost','WhiteGhost');
		ghostgroup.add(spook3.ghost);
		s3 = .8;
		
		//Put a border around the time
		timebox = game.add.sprite(1,17,'blacktimebox')
		timebox.scale.setTo(1.4,.7);
		
		//Enable score display
		scoreText = game.add.text(45, 22, 'Time: ' + count, { fontSize: '32px', fill: '#000' });
		
		// Create player character
		player = game.add.sprite(30, 30, 'playerblack');
		player.scale.setTo(1.3,1.3);
	    pcolor = 0;

		//  Enable physics on player character
		game.physics.arcade.enable(player);
		player.body.setSize(27, 38,5,6);

		//  Create slight "bounce" effect for the player character upon landing
		//player.body.bounce.y = 0.2;
		player.body.gravity.y = 750;
		player.body.collideWorldBounds = true;

		//  Add left and right walking animations
		player.animations.add('left', [0, 1, 2,1], 5, true);
		player.animations.add('right', [3,4,5,4], 5, true);
		
		//  Enable controls
		cursors = game.input.keyboard.createCursorKeys();	
		lastinput = 'right';
		
		
		//Create Slash effect
		slashw = game.add.sprite(0,-50,'slashwhite');
		slashw.scale.setTo(.5,.5);
		slashw.alpha = 0;
		slashw.animations.add('slashing',[1,2,3,4],15,false);
		
		slashb = game.add.sprite(0,-50,'slashblack');
		slashb.scale.setTo(.5,.5);
		slashb.alpha = 0;
		slashb.animations.add('slashing',[1,2,3,4],15,false);
		
		//Create fade to black image
		blackimage = game.add.sprite(0,0,'blackimage');
		blackimage.alpha = 0;	
	},
	update:function(){
		
		if(play == 0){
			play = 1;
			bgm.play();
		}
		
		//Slash effect postioning
		slashw.x = player.x
		slashw.y = player.y;
		
		slashb.x = player.x
		slashb.y = player.y;
		
		//Score formatting
		if(alive == 1){
			scoreText.text = 'Time: ' + min + ':';
			if(count % 60 < 10 ){
				scoreText.text += '0'
			}
			scoreText.text += count%60;
		}
		
		if(pcolor == 0){
			scoreText.fill = '#ffffff';
			timebox.loadTexture('blacktimebox');
		}else{
			scoreText.fill = '#000000';
			timebox.loadTexture('whitetimebox');
		}
		
		//Scroll Background
		forest.tilePosition.x -= 1.5;
		
		//Scroll Spikes
		spikes.tilePosition.x -= 1.5;
		
		//  Collide the player and the stars with the platforms
		var hitPlatform = game.physics.arcade.collide(player, platformgroup);
		
		//  Reset the players velocity (movement)
		player.body.velocity.x = 0;
		
		//Check if left is input
		if (cursors.left.isDown && alive == 1)
		{
			//  Move to the left
			player.body.velocity.x = -245;
			//  Play left animation
			player.animations.play('left');
			lastinput = 'left'
		}
		//Check if right is input
		else if (cursors.right.isDown && alive == 1)
		{
			//  Move to the right
			player.body.velocity.x = 215;
			//  Play right animation
			player.animations.play('right');
			lastinput = 'right';
		}
		else
		{
			//  Stand still
			player.animations.stop();
			if(lastinput == 'left'){
				player.frame = 1;
			}else{
				player.frame = 4;
			}
		}

		//  Enable player to jump if they are standing on the ground/platform
		if (cursors.up.isDown && hitPlatform && alive == 1)
		{
			player.body.velocity.y = -450;
		}
		
		// Change player color
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && alive == 1){
			whoosh.play();
			if(pcolor == 0){
				slashw.animations.play('slashing');
				slashw.alpha = 1
				pcolor = 1;
				player.loadTexture('playerwhite')
			}else{
				slashb.animations.play('slashing');
				slashb.alpha = 1;
				pcolor = 0;
				player.loadTexture('playerblack')
			}
		}
		
		
		////CREATIVE TILT////
		
		//Check if platform color is the same as player color
		if(pcolor != p1.color){
			//p1.platform.body.enable = false;
			p1.platform.body.setSize(0,0,0,800);
			p1.platform.alpha = .55;
			//p1.platform.x -= 1.67;
		}else{
			p1.platform.body.setSize(500,77,0,0);
			p1.platform.body.enable = true;
			p1.platform.alpha = 1;
		}
		
		if(pcolor != p2.color){
			//p2.platform.body.enable = false;
			p2.platform.body.setSize(0,0,0,800);
			p2.platform.alpha = .55;
			//p2.platform.x -= 1.67;
		}else{
			p2.platform.body.setSize(500,77,0,0);
			p2.platform.body.enable = true;
			p2.platform.alpha = 1;
		}
		
		if(pcolor != p3.color){
			//p3.platform.body.enable = false;
			p3.platform.body.setSize(0,0,0,800);
			p3.platform.alpha = .55;
			//p3.platform.x -= 1.67;
		}else{
			p3.platform.body.setSize(500,77,0,0);
			p3.platform.body.enable = true;
			p3.platform.alpha = 1;
			
		}
		
		//Check if ghost is same color as player
		if(pcolor != spook1.color){
			spook1.ghost.alpha = 1;
			spook1.ghost.body.enable = true;
			spook1.ghost.body.setSize(14,14,2,4);
		}else{
			spook1.ghost.alpha = .45;
			spook1.ghost.body.setSize(0,0,0,800)
		}
		
		if(pcolor != spook2.color){
			spook2.ghost.alpha = 1;
			spook2.ghost.body.enable = true;
			spook2.ghost.body.setSize(14,14,2,4);
		}else{
			spook2.ghost.alpha = .45;
			spook2.ghost.body.setSize(0,0,0,800)
		}
		
		if(pcolor != spook3.color){
			spook3.ghost.alpha = 1;
			spook3.ghost.body.enable = true;
			spook3.ghost.body.setSize(14,14,2,4);
		}else{
			spook3.ghost.alpha = .45;
			spook3.ghost.body.setSize(0,0,0,800)
		}
		
		//Reset platform to right hand side of the screen
		if(p1.platform.x <= -250){
			resetPlatform(p1,p3);
		}
		
		if(p2.platform.x <= -250){
			resetPlatform(p2,p1);
		}
		
		if(p3.platform.x <= -250){
			resetPlatform(p3,p2);
		}
		
		//Creates up/down movement of ghosts
		if(spook1.ghost.y >= spook1.ypos+20 || spook1.ghost.y <= spook1.ypos-20){
			s1 = -s1;
		}
		//Move first ghost at 10 sec
		if(count >=20){
			spook1.ghost.x -= 1.8;
		}
		spook1.ghost.y += s1
		
		if(spook2.ghost.y >= spook2.ypos+20 || spook2.ghost.y <= spook2.ypos-20){
			s2 = -s2;
		}
		//Move second ghost at 20 sec
		if(count >=31){
			spook2.ghost.x -= 1.8;
		}
		spook2.ghost.y += s2
		
		if(spook3.ghost.y >= spook3.ypos+20 || spook3.ghost.y <= spook3.ypos-20){
			s3 = -s3;
		}
		//Move 3rd ghost at 30 sec
		if(count >=41){
			spook3.ghost.x -= 1.8;
		}
		spook3.ghost.y += s3
		
		
		//Resets ghosts to right hand side of screen
		if(spook1.ghost.x <= -40){
			resetGhost(spook1);
		}
		
		if(spook2.ghost.x <= -40){
			resetGhost(spook2);
		}
		
		if(spook3.ghost.x <= -40){
			resetGhost(spook3);
		}
		
		//Checks for collision of ghost and player/spikes and player
		game.physics.arcade.overlap(player, ghostgroup, hit, null, this);
		game.physics.arcade.overlap(player, spikes, hit, null, this);
		
		//Fade away if hit
		if(alive == 0){
			if(player.alpha > 0){
				player.alpha -= .05;
			}
		}
		
		//Play fade to black once player has disappeared
		if(player.alpha <= 0 && blackimage.alpha < 1){
			blackimage.alpha += .01;
		}
		if(blackimage.alpha >= 1){
			game.state.start('GameOver', this.scoreText);
		}
		
		//Increase speed in increments
		if (count == 30 && increment == 1){
			increment++;
			PlatformSpeed -= 50;
			p1.platform.body.velocity.x = PlatformSpeed;
			p2.platform.body.velocity.x = PlatformSpeed;
			p3.platform.body.velocity.x = PlatformSpeed;
		}
		if( min >= 1 && increment == 2){
			increment++;
			PlatformSpeed -= 50;
			p1.platform.body.velocity.x = PlatformSpeed;
			p2.platform.body.velocity.x = PlatformSpeed;
			p3.platform.body.velocity.x = PlatformSpeed;
		}
		//game.debug.body(p1.platform);
		//game.debug.body(p2.platform);
		//game.debug.body(p3.platform);
	}
}

function updateCounter(){
	count++;
	if(count % 60 == 0){
		min++;
	}
}

function hit(){
	alive = 0;
}

function resetGhost(Ghost){
	Ghost.ghost.x = 800;
	Ghost.ypos = game.rnd.integerInRange(100,300);
	Ghost.ghost.y = Ghost.ypos;
	Ghost.color = game.rnd.integerInRange(0,1);
	if(Ghost.color == 0){
		Ghost.ghost.loadTexture('BlackGhost');
	}else{
		Ghost.ghost.loadTexture('WhiteGhost');
	}
}

function resetPlatform(Platform, Platform2){
	Platform.platform.x = 800;
	Platform.platform.y = game.rnd.integerInRange(120,300);
	//SafeCheck, to make sure platforms don't spawn higher than the player can jump
	while(Platform2.platform.y - Platform.platform.y >= 40){
		Platform.platform.y = game.rnd.integerInRange(120,300);
	}
	Platform.color = game.rnd.integerInRange(0,1);
	if(Platform.color == 0){
		Platform.platform.loadTexture('BlackPlatform');
	}else{
		Platform.platform.loadTexture('WhitePlatform');
	}
}
