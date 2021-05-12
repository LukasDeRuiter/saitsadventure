class Level1 extends Phaser.Scene {
    constructor(){
        super({key: "Level1"});
    }


    preload(){
        this.load.spritesheet( 'sait', 'assets/saitSpritesheet.png', { frameWidth: 64, frameHeight: 64 });
        this.load.image('platform', 'https://content.codecademy.com/courses/learn-phaser/physics/platform.png');
    }


    create(){
        this.sait = this.physics.add.sprite(400, 300, 'sait').setScale(2);
        this.sait.setCollideWorldBounds(true);
        this.anims.create({
            key: 'run',
            frames:
            this.anims.generateFrameNumbers('sait', {start: 1, end: 8}),
            frameRate: 10,
            repeat: -1
        } 
    )
    this.anims.create({
        key: 'idle',
        frames:
        this.anims.generateFrameNumbers('sait', {start: 0, end: 0}),
        frameRate: 10,
        repeat: -1  
    })

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(320, 550, 'platform');
        this.physics.add.collider(this.sait, this.platforms);

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update(){
        if(this.cursors.left.isDown) {
            this.sait.setVelocityX(-160);
            this.sait.anims.play('run', true);
            this.sait.flipX = true;
        }
        else if(this.cursors.right.isDown){
            this.sait.setVelocityX(160);
            this.sait.anims.play('run', true);
            this.sait.flipX = false;
        }
        else{
            this.sait.setVelocityX(0);
            this.sait.anims.play('idle', true);
        }

    }
}