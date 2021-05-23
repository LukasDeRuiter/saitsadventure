class Level2 extends Phaser.Scene {
    constructor(){
        super({key: "Level2"})
    }

    
    preload(){
        this.load.spritesheet( 'sait', 'assets/saitSpritesheet.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet( 'blob', 'assets/blueBlob.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet( 'cbrpaper', 'assets/cbrpaperSpritesheet.png', { frameWidth: 64, frameHeight: 64 });
        this.load.image('tiles', 'assets/sheet.png');
        this.load.image('coin', 'assets/coin.png');
        this.load.spritesheet('coinMove', 'assets/coinSpritesheet.png', { frameWidth: 70, frameHeight: 70 });
        this.load.tilemapTiledJSON('tilemap', 'assets/level2map.json');

        this.load.audio('jumpOnEnemySound', ['assets/sound/jumpOnEnemy.mp3']);
        this.load.audio('jump', ['assets/sound/jumping.mp3']);
        this.load.audio('jump2', ['assets/sound/jumping2.mp3']);
        this.load.audio('jump3', ['assets/sound/jumping3.mp3']);
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

        this.anims.create({
            key: 'cbrpaperMove',
            frames:
            this.anims.generateFrameNumbers('cbrpaper', {start: 0, end: 5}),
            frameRate: 10,
            repeat: -1  
        })  

        this.anims.create({
            key: 'coinAnimation',
            frames:
            this.anims.generateFrameNumbers('coinMove', {start: 0, end: 5}),
            frameRate: 10,
            repeat: -1  
        })  

        this.sait = this.physics.add.sprite((this.width * 0.1), (this.height * 0.2), 'sait').setScale(2);
        this.sait.body.setSize(this.sait.width - 30, this.sait.height).setOffset(15, 0);
        this.lookingLeft = false;
        this.lookingRight = false;
    

        this.cbrpapers = this.physics.add.group();
        for(let i = 0; i < 5; i++){
            this.cbrpapers.create((800 + (i * 100)), 100, 'cbrpaper').setScale(Math.floor(Math.random() * 3) + 1);
        }
        this.cbrpapers.getChildren().forEach((cbrpaper) => {
            cbrpaper.anims.play('cbrpaperMove', true);
            cbrpaper.setVelocityX(-50);
            cbrpaper.body.bounce.x = 1;
            cbrpaper.body.setCollideWorldBounds(true);
        }, this);

        this.blobs = this.physics.add.group();
        for(let i = 0; i < 10; i++){
            this.blobs.create((800 + (i * 100)), 300, 'blob').setScale(Math.floor(Math.random() * 3) + 1);
        }
        this.blobs.getChildren().forEach((blob) => {
            blob.anims.play('blobMove', true);
            blob.setVelocityX(-100);
            blob.body.bounce.x = 1;
            blob.setBounce(1, 1);
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
        })

        this.anims.create({
        key: 'idle',
        frames:
        this.anims.generateFrameNumbers('sait', {start: 0, end: 0}),
        frameRate: 10,
        repeat: -1  
    }) 
        
    this.anims.create({
        key: 'attack',
        frames:
        this.anims.generateFrameNumbers('sait', {start: 9, end: 12}),
        frameRate: 10,
        repeat: -1
    } 
)

        this.jumpOnEnemy = this.sound.add('jumpOnEnemySound');
        this.jumpArray= [];
        this.jumpArray[0] = this.sound.add('jump'),
        this.jumpArray[1] = this.sound.add('jump2'),
        this.jumpArray[2] = this.sound.add('jump3')

        
        this.saitWalking = this.sound.add('walking', {loop: true});



        this.map = this.make.tilemap({ key: 'tilemap'});
        this.tileset = this.map.addTilesetImage('iceworld', 'tiles');

        this.ground = this.map.createLayer('ground', this.tileset);
        this.ground.setCollisionByProperty({collides: true});
        this.coinLayer = this.map.getObjectLayer('coins')['objects'];
        this.coins = this.physics.add.staticGroup();
        this.coinLayer.forEach(object => {
            this.obj = this.coins.create(object.x, object.y, 'coins');
            this.obj.anims.play('coinAnimation', true);
            this.obj.body.width = object.width;
            this.obj.body.height = object.height;
        })

        this.endPointLayer = this.map.getObjectLayer('endpoint')['objects'];
        this.endPoints = this.physics.add.staticGroup();
        this.endPointLayer.forEach(object => {
            this.obj = this.endPoints.create(object.x, object.y, 'coins');
            this.obj.anims.play('coinAnimation', true);
            this.obj.body.width = object.width;
            this.obj.body.height = object.height;
        })

        //this.physics.world.convertTilemapLayer(this.ground);
        this.physics.add.collider(this.sait, this.ground);
        this.physics.add.collider(this.blobs, this.ground);
        this.physics.add.collider(this.cbrpapers, this.ground);
        this.physics.add.overlap(this.coins, this.sait);
        this.physics.add.overlap(this.endPoints, this.sait);
     

       

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
        this.sait.setVelocityX(0);
        if(this.lookingRight == true){
        this.sait.flipX = false;
        this.sait.body.setSize(this.sait.width, this.sait.height).setOffset(5, 0);
        this.sait.anims.play('attack', 60, false);
        }
        else if(this.lookingLeft == true){
            this.sait.body.setSize(this.sait.width, this.sait.height).setOffset(-5, 0);
            this.sait.flipX = true;
            this.sait.anims.play('attack', 60, false);
        }

    }
    
    collideEnemy(){;
            this.sait.setVelocityY(-600); 
    }

    update(){

        if(this.attacking == false){
        this.sait.body.setSize(this.sait.width - 30, this.sait.height).setOffset(15, 0);
        if(this.cursors.left.isDown) {
            this.sait.setVelocityX(-160);
            this.sait.anims.play('run', true);
            this.sait.flipX = true;
            this.lookingLeft = true;
            this.lookingRight = false;
            
        }
        else if(this.cursors.right.isDown){
            this.sait.setVelocityX(160);
            this.sait.anims.play('run', true);
            this.sait.flipX = false;
            this.lookingLeft = false;
            this.lookingRight = true;
            
        }
        else{
            this.sait.setVelocityX(0);
            this.sait.anims.play('idle', true);
        }}

        if(this.cursors.space.isDown && this.sait.body.blocked.down){
            this.jumpArray[Math.floor(Math.random() * 3)].play();
            this.sait.setVelocityY(-600);
        }

        if(this.cursors.up.isDown){
            this.attacking = true;
            this.hitEnemy();
        }

        if(this.cursors.up.isUp){
            this.attacking = false;
        }



        this.physics.world.collide(this.sait, this.blobs, beuken, null, this);
        this.physics.world.collide(this.sait, this.cbrpapers, beuken, null, this);
        this.physics.world.overlap(this.coins, this.sait, addCoin, null, this);
        this.physics.world.overlap(this.endPoints, this.sait, reachNextLevel, null, this);
   

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
       function beuken(sait, blob){
        if(blob.body.touching.up && sait.body.touching.down){
            this.jumpOnEnemy.play();
            this.sait.setVelocityY(-600);
            blob.destroy();
        }
        else if(this.attacking == true && blob.body.touching.left && this.lookingRight == true){
            blob.destroy();
        }
        else if(this.attacking == true && blob.body.touching.right && this.lookingLeft == true){
            blob.destroy();
        }
        else{
            console.log('damn');
        }
       }

       function addCoin(sait, coin){
           coin.destroy();
           console.log('oof');
       }

       function reachNextLevel(sait, endpoint){
        this.scene.start("Level3");
    }


    } 
}