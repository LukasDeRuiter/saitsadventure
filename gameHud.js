
class GameHud extends Phaser.Scene {
    constructor(){
        super({key: "GameHud", active: true})
    }

    
    preload = () => {
        this.load.image('emptyHeart', 'assets/hudHeartEmpty.png');
        this.load.image('fullHeart', 'assets/hudHeartFull.png');

    }

    create = () => {
        
            this.ourGame = this.scene.get('Level1');
            
            this.ourGame.events.on('damage', changeHealth, this.SaitHealth, this.yourHealth, null, this);
            
            function changeHealth(health, hearts){
                if(health === 3){
                    hearts[0].setTexture('fullHeart');
                    hearts[1].setTexture('fullHeart');
                    hearts[2].setTexture('fullHeart');
                }
                else if(health === 2){
                    hearts[0].setTexture('fullHeart');
                    hearts[1].setTexture('fullHeart');
                    hearts[2].setTexture('emptyHeart');
                }
                else if(health === 1){
                    hearts[0].setTexture('fullHeart');
                    hearts[1].setTexture('emptyHeart');
                    hearts[2].setTexture('emptyHeart');
                }
                else if(health <= 0){
                    hearts[0].setTexture('emptyHeart');
                    hearts[1].setTexture('emptyHeart');
                    hearts[2].setTexture('emptyHeart');
                }
                else{
                console.log(health);
                console.log(hearts);
                }
                     
            }

            

        } 

    
    
    
    }
        

        
 
                /*
                if(health === 3){
                    this.hearts.getChildren().forEach((heart) => {
                        heart.setTexture('fullHeart');
                    })
               
                }
                else if(health === 2){
                    this.hearts.getChildren().forEach((heart) => {
                        heart.setTexture('fullHeart');
                        if(heart.name = "heart3"){
                            heart.setTexture('emptyHeart');
                        }
                    })
                }}
                /* 
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
*/
