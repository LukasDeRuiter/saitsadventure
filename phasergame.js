const config = {
    width: 800,
    height: 600,
    backgroundColor: "#333333",
    type: Phaser.Auto,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 500},
            debug: true
        }
    },
    scene: [Level1],

};


const game = new Phaser.Game(config);