class Level1 extends Phaser.Scene {
    constructor(){
        super({key: "Level1"})
    }


    preload(){
        this.load.spritesheet( 'sait', 'assets/saitSpritesheet.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet( 'blob', 'assets/blueBlob.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('tiles', 'assets/sheet.png');
        this.load.tilemapTiledJSON('tilemap', 'assets/level1map.json');

        this.load.audio('jumpOnEnemySound', ['assets/sound/jumpOnEnemy.mp3']);
        this.load.audio('walking', ['assets/sound/walking.mp3']);
    }


    create(){
        this.width = 3500;
        this.height = 1050;

        this.anims.create({
            key: 'blobMove',
            frames:
            this.anims.generateFrameNumbers('blob', {start: 0, end: 5}),
            frameRate: 10,
            repeat: -1  
        })  

        this.sait = this.physics.add.sprite((this.width * 0.1), (this.height * 0.2), 'sait').setScale(2);
    

        this.blobs = this.physics.add.group();
        for(let i = 0; i < 10; i++){
            this.blobs.create((800 + (i * 100)), 100, 'blob');
        }
        this.blobs.getChildren().forEach((blob) => {
            blob.anims.play('blobMove', true);
            blob.setVelocityX(-100);
            blob.body.bounce.x = 1;
            blob.setBounce(0.3, 0.3);
            blob.body.setCollideWorldBounds(true);
        }, this);


        this.cameras.main.setBounds(0, 0, this.width, this.height);
        this.physics.world.setBounds(0, 0, this.width, this.height);
        this.cameras.main.startFollow(this.sait);
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
        this.jumpOnEnemy = this.sound.add('jumpOnEnemySound');
        this.saitWalking = this.sound.add('walking', {loop: true});



        this.map = this.make.tilemap({ key: 'tilemap'});
        this.tileset = this.map.addTilesetImage('iceworld', 'tiles');

        this.ground = this.map.createLayer('ground', this.tileset);
        this.ground.setCollisionByProperty({collides: true});
        //this.physics.world.convertTilemapLayer(this.ground);
        this.physics.add.collider(this.sait, this.ground);
        this.physics.add.collider(this.blobs, this.ground);

       

        /* this.platforms = this.physics.add.staticGroup();
        this.platforms.create(320, 550, 'platform');
        this.platforms.create(650, 500, 'platform');
        this.physics.add.collider(this.sait, this.platforms); */

        this.cursors = this.input.keyboard.createCursorKeys();
        this.sait.setCollideWorldBounds(true);
    }

    walkingSound(){
        //this.saitWalking.play('', 0, 1, true, false);
    }

    hitEnemy(){
        this.jumpOnEnemy.play();
    }
    
    collideEnemy(){;
            this.sait.setVelocityY(-600); 
    }

    update(){

        if(this.cursors.left.isDown) {
            this.sait.setVelocityX(-160);
            this.sait.anims.play('run', true);
            this.sait.flipX = true;
            this.walkingSound();
            
        }
        else if(this.cursors.right.isDown){
            this.sait.setVelocityX(160);
            this.sait.anims.play('run', true);
            this.sait.flipX = false;
            this.walkingSound();
            
        }
        else{
            this.sait.setVelocityX(0);
            this.sait.anims.play('idle', true);
        }

        if(this.cursors.space.isDown && this.sait.body.blocked.down){
            
            this.sait.setVelocityY(-600);
        }

        this.physics.world.collide(this.sait, this.blobs, beuken, null, this);

        /*
        if(this.enemyBlob.body.blocked.left){
            this.enemyBlob.setVelocityX(100);
        }
        else if(this.enemyBlob.body.blocked.right){
            this.enemyBlob.setVelocityX(-100);
        }

        
       
        
    

        this.physics.add.collider(this.blobs, this.sait, 
            function(enemy, sait) {
            if(enemy.body.touching.up && sait.body.touching.down){
                console.log("broeders");
                enemy.destroy();
                sait.setVelocityY(-600); 
            }
            else{
                sait.destroy();
            }
        })

        */
       function beuken(sait, blobs){
        if(blobs.body.touching.up && sait.body.touching.down){
            console.log("broeders");
            this.jumpOnEnemy.play();
            this.sait.setVelocityY(-600);
        }
       }
    } 
}