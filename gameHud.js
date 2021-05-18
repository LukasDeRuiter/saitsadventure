
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
                    stepX: 32
                },
                quantity: 3

            })
            this.ourGame = this.scene.get('Level1');
            this.ourGame.events.on('damage', changeHealth, this.SaitHealth);

            function changeHealth(health){
                if(health === 3){
                    this.hearts.children[0].setTexture('fullHeart');
                    this.hearts.children[1].setTexture('fullHeart');
                    this.hearts.children[2].setTexture('fullHeart');
                }
                else if(health === 2){
                     this.hearts.children[0].setTexture('fullHeart');
                     this.hearts.children[1].setTexture('fullHeart');
                     this.hearts.children[2].setTexture('emptyHeart');
                }
                else if(health === 1){
                    this.hearts.children[0].setTexture('fullHeart');
                    this.hearts.children[1].setTexture('emptyHeart');
                    this.hearts.children[2].setTexture('emptyHeart');
                }
                else{
                    this.hearts.children[0].setTexture('emptyHeart');
                    this.hearts.children[1].setTexture('emptyHeart');
                    this.hearts.children[2].setTexture('emptyHeart');
                }
            }

    }}