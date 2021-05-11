class Level1 extends Phaser.Scene {
    constructor(){
        super({key: "Level1"});
    }


    preload(){
        this.load.image('sait', 'assets/sait.png');
        this.load.image('platform', 'https://content.codecademy.com/courses/learn-phaser/physics/platform.png');
    }


    create(){
        this.sait = this.physics.add.sprite(400, 300, 'sait').setScale(2);
        this.sait.setCollideWorldBounds(true);
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(320, 550, 'platform');
        this.physics.add.collider(this.sait, this.platforms);

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update(){
        if(this.cursors.left.isDown) {
            this.sait.setVelocityX(-160);
        }
        else if(this.cursors.right.isDown){
            this.sait.setVelocityX(160);
        }
        else{
            this.sait.setVelocityX(0);
        }

    }
}