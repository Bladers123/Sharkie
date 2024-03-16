class Character extends MovableObject {

    height = 150;
    width = 150;
    positionY = 150;
    positionX = 0;

    level = level1;

    imagesOfMoving = [
        '../img/1.Sharkie/3.Swim/1.png',
        '../img/1.Sharkie/3.Swim/2.png',
        '../img/1.Sharkie/3.Swim/3.png',
        '../img/1.Sharkie/3.Swim/4.png',
        '../img/1.Sharkie/3.Swim/5.png',
        '../img/1.Sharkie/3.Swim/6.png'
    ];

    imagesOfStanding = [
        'img/1.Sharkie/1.IDLE/1.png',
        'img/1.Sharkie/1.IDLE/2.png',
        'img/1.Sharkie/1.IDLE/3.png',
        'img/1.Sharkie/1.IDLE/4.png',
        'img/1.Sharkie/1.IDLE/5.png',
        'img/1.Sharkie/1.IDLE/6.png',
        'img/1.Sharkie/1.IDLE/7.png',
        'img/1.Sharkie/1.IDLE/8.png',
        'img/1.Sharkie/1.IDLE/9.png',
        'img/1.Sharkie/1.IDLE/10.png',
        'img/1.Sharkie/1.IDLE/11.png',
        'img/1.Sharkie/1.IDLE/12.png',
        'img/1.Sharkie/1.IDLE/13.png',
        'img/1.Sharkie/1.IDLE/14.png',
        'img/1.Sharkie/1.IDLE/15.png',
        'img/1.Sharkie/1.IDLE/16.png',
        'img/1.Sharkie/1.IDLE/17.png',
        'img/1.Sharkie/1.IDLE/18.png'
    ];


    keyboard;
    animationFrameId;

    swimmingSound = new Audio('audio/fish-swimming.mp3');

    constructor(keyboard) {
        super().loadImage('../img/1.Sharkie/1.IDLE/1.png');
        this.loadImages(this.imagesOfMoving); 
        this.playAnimation(this.imagesOfMoving);
        this.keyboard = keyboard;
        this.animationFrameId = null;
    }

    animation() {
        this.move();
        let index = this.currentImage % this.imagesOfMoving.length;
        let path = this.imagesOfMoving[index];
        this.img = this.imageCache[path];
        this.currentImage++;
        this.animationFrameId = requestAnimationFrame(this.animation.bind(this));
    }

    move() {
        if (this.keyboard.right && this.positionX < this.level.levelEndX) {
            this.positionX += this.speed * 2;
            this.otherDirection = false;
        }
        else if (this.keyboard.left && this.positionX > 0) {
            this.positionX -= this.speed * 2;
            this.otherDirection = true;
        }
        else if (this.keyboard.up)
            this.positionY -= this.speed * 2;
        else if (this.keyboard.down)
            this.positionY += this.speed * 2;
        else if (this.keyboard.right && this.keyboard.up) {
            this.positionX += this.speed * 2;
            this.positionY -= this.speed * 2;
        }
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
}