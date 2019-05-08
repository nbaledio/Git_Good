// be strict
'use strict';

var game = new Phaser.Game(800,450, Phaser.AUTO, 'phaser');

// add states to StateManager and start MainMenu
game.state.add('GameTitle', GameTitle)
game.state.add('GameTutorial', GameTutorial)
game.state.add('GamePlay', GamePlay);
game.state.add('GameOver', GameOver);
game.state.start('GameTitle')