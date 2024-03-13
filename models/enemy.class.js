class Enemy extends MovableObject {

    height = 80;
    width = 80;
    imagesSwimming = [
        '../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        '../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        '../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        '../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        '../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png',
    ];

    constructor() {
        super().loadImage('../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadImages(this.imagesSwimming);
        this.spawnPoint();
        this.animate();
        this.moveLeft(); 
        this.speed = 0.15 + Math.random(); 
    }

    animate() {
        setInterval(() => {
            let index = this.currentImage % this.imagesSwimming.length;
            let path = this.imagesSwimming[index];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 150);
    }

    spawnPoint(){
        this.positionX = 200 + Math.random() * 500;
    }
}