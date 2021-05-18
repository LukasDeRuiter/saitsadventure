class GameHud extends Phaser.Scene {
    constructor(){
        super({key: "GameHud", active: true})
    }

    preload(){
        this.load.image('emptyHeart', 'assets/hudHeartEmpty.png');
        this.load.image('fullHeart', 'assets/hudHeartFull.png');

    }

    create(){
        this.hearts = this.add.group({
            classType: Phaser.GameObjects.Image})

            this.hearts.createMultiple({
                key: 'fullHeart',
                setXY: {
                    x: 10,
                    y: 10,
                    stepX: 16
                },
                quantity: 3

            })

    }}