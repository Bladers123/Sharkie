class Character extends MovableObject {

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

    height = 150;
    width = 150;
    positionY = 150;
    positionX = 0;

    keyboard;

    animationFrameId;
    isCharacterMoving = false;
    currentAnimation = "";

    level = level1;

    swimmingSound = new Audio('audio/fish-swimming.mp3');

    constructor(keyboard) {
        super().loadImage('../img/1.Sharkie/1.IDLE/1.png');
        this.loadImages(this.imagesOfMoving);
        this.loadImages(this.imagesOfStanding);
        this.playAnimation(this.imagesOfStanding);
        this.keyboard = keyboard;
        this.animationFrameId = null;
    }

    animation() {
        this.move();
        if (this.isCharacterMoving) {
            if (this.currentAnimation !== "moving") {
                this.playAnimation(this.imagesOfMoving);
                this.currentlyAnimating = true;
                this.currentAnimation = "moving";
            }
        } 
        else {
            if (this.currentAnimation !== "standing") {
                this.playAnimation(this.imagesOfStanding);
                this.currentlyAnimating = true;
                this.currentAnimation = "standing";
            }
        }

        this.animationFrameId = requestAnimationFrame(this.animation.bind(this));
    }

    move() {
        if (this.keyboard.right && this.positionX < this.level.levelEndRightX) {
            this.positionX += this.speed * 2;
            this.otherDirection = false;
        }
        else if (this.keyboard.left && this.positionX > this.level.levelEndLeftX) {
            this.positionX -= this.speed * 2;
            this.otherDirection = true;
        }
        else if (this.keyboard.up && this.positionY > this.level.levelEndUpY)
            this.positionY -= this.speed * 2;
        else if (this.keyboard.down && this.positionY < this.level.levelEndDownY)
            this.positionY += this.speed * 2;
    }

    startAnimation() {
        if (!this.animationFrameId)
            this.animation();
    }

    stopAni() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
            this.animation();
        }
    }
}