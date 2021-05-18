const config = {
    width: 800,
    height: 600,
    backgroundColor: "#333333",
    type: Phaser.Auto,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 800},
            debug: true
        }
    },
    scene: [ Level1, Level2, GameHud],

};


const game = new Phaser.Game(config);