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

    imagesOfHurt = [
        'img/1.Sharkie/5.Hurt/1.Poisoned/1.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/2.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/3.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/4.png'
    ];

    imagesOfDead = [
        'img/1.Sharkie/6.dead/1.Poisoned/1.png',
        'img/1.Sharkie/6.dead/1.Poisoned/2.png',
        'img/1.Sharkie/6.dead/1.Poisoned/3.png',
        'img/1.Sharkie/6.dead/1.Poisoned/4.png',
        'img/1.Sharkie/6.dead/1.Poisoned/5.png',
        'img/1.Sharkie/6.dead/1.Poisoned/6.png',
        'img/1.Sharkie/6.dead/1.Poisoned/7.png',
        'img/1.Sharkie/6.dead/1.Poisoned/8.png',
        'img/1.Sharkie/6.dead/1.Poisoned/9.png',
        'img/1.Sharkie/6.dead/1.Poisoned/10.png',
        'img/1.Sharkie/6.dead/1.Poisoned/11.png',
        'img/1.Sharkie/6.dead/1.Poisoned/12.png'
    ];

    height = 150;
    width = 150;
    positionY = 150;
    positionX = 0;
    movementSpeed = this.speed * 3;

    keyboard;

    animationFrameId = null;
    isCharacterMoving = false;
    currentAnimation = "";

    level = level1;

    swimmingSound = new Audio('audio/fish-swimming.mp3');

    constructor(keyboard) {
        super().loadImage('../img/1.Sharkie/1.IDLE/1.png');
        this.loadImages(this.imagesOfMoving);
        this.loadImages(this.imagesOfStanding);
        this.loadImages(this.imagesOfDead);
        this.loadImages(this.imagesOfHurt);
        this.playAnimation(this.imagesOfStanding);
        this.keyboard = keyboard;
        this.checkState();
    }

    checkState() {
        setInterval(() => {
            if (this.isDead()) {
                if (this.currentAnimation !== "dead") {
                    this.playAnimation(this.imagesOfDead);
                    this.currentAnimation = "dead";
                }
            } else if (this.isHurt()) {
                if (this.currentAnimation !== "hurt") {
                    this.playAnimation(this.imagesOfHurt);
                    this.currentAnimation = "hurt";
                }
            }
        }, 200);
    }

    animation() {
        this.move();
        if (!this.isDead() && this.isCharacterMoving) {
            if (this.currentAnimation !== "moving") {
                this.playAnimation(this.imagesOfMoving);
                this.currentAnimation = "moving";
            }
        } else if (!this.isDead() && !this.isCharacterMoving && !this.isHurt()) {
            if (this.currentAnimation !== "standing") {
                this.playAnimation(this.imagesOfStanding);
                this.currentAnimation = "standing";
            }
        }

        this.animationFrameId = requestAnimationFrame(this.animation.bind(this));
    }



    move() {
        let moved = false;

        if (this.keyboard.right && this.positionX < this.level.levelEndRightX) {
            this.positionX += this.movementSpeed;
            this.otherDirection = false;
            moved = true;
        }
        if (this.keyboard.left && this.positionX > this.level.levelEndLeftX) {
            this.positionX -= this.movementSpeed;
            this.otherDirection = true;
            moved = true;
        }
        if (this.keyboard.up && this.positionY > this.level.levelEndUpY) {
            this.positionY -= this.movementSpeed;
            moved = true;
        }
        if (this.keyboard.down && this.positionY < this.level.levelEndDownY) {
            this.positionY += this.movementSpeed;
            moved = true;
        }

        this.isCharacterMoving = moved;
    }


    startMovingAnimation() {
        if (!this.animationFrameId)
            this.animation();
    }

    stopMovingAnimation() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
            this.animation();
        }
    }
}