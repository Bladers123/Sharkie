class Enemy extends MovableObject {

    imagesOfSwimming = [
        '../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        '../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        '../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        '../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        '../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png',
    ];

    height = 80;
    width = 80;

    constructor() {
        super().loadImage('../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadImages(this.imagesOfSwimming);
        this.spawnPoint();
        this.playAnimation(this.imagesOfSwimming, false, false);
        this.moveLeft(this.imagesOfSwimming); 
        this.speed = 0.15 + Math.random(); 
    }

    spawnPoint(){
        this.positionX = 200 + Math.random() * 500;
    }

    moveLeft() {
        setInterval(() => {
            this.positionX -= this.speed;
        }, 1000 / 60);
    }
}