class Character extends MovableObject {

    height = 150;
    width = 150;
    positionY = 150;
    imagesOfSwimming = [
        '../img/1.Sharkie/3.Swim/1.png',
        '../img/1.Sharkie/3.Swim/2.png',
        '../img/1.Sharkie/3.Swim/3.png',
        '../img/1.Sharkie/3.Swim/4.png',
        '../img/1.Sharkie/3.Swim/5.png',
        '../img/1.Sharkie/3.Swim/6.png'
    ];

    keyboard;
    animationFrameId;

    constructor(keyboard) {
        super().loadImage('../img/1.Sharkie/1.IDLE/1.png');
        this.loadImages(this.imagesOfSwimming);
        this.keyboard = keyboard;
        this.animationFrameId = null;
    }

    animation() {
        this.move();
        let index = this.currentImage % this.imagesOfSwimming.length;
        let path = this.imagesOfSwimming[index];
        this.img = this.imageCache[path];
        this.currentImage++;
        this.animationFrameId = requestAnimationFrame(this.animation.bind(this));
    }

    startAnimation() {
        if (!this.animationFrameId)
            this.animation();
    }

    stopAnimation() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }

    move() {
        if (this.keyboard.right) {
            this.positionX += this.speed;
            this.otherDirection = false;
        }
        else if (this.keyboard.left) {
            this.positionX -= this.speed;
            this.otherDirection = true;
        }
        else if (this.keyboard.up)
            this.positionY -= this.speed;
        else if (this.keyboard.down)
            this.positionY += this.speed;
        else if (this.keyboard.right && this.keyboard.up) {
            this.positionX += this.speed;
            this.positionY -= this.speed;
        }
    }
}