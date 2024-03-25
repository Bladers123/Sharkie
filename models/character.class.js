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

    imagesOfLongStanding = [
        'img/1.Sharkie/2.Long_IDLE/i1.png',
        'img/1.Sharkie/2.Long_IDLE/i2.png',
        'img/1.Sharkie/2.Long_IDLE/i3.png',
        'img/1.Sharkie/2.Long_IDLE/i4.png',
        'img/1.Sharkie/2.Long_IDLE/i5.png',
        'img/1.Sharkie/2.Long_IDLE/i6.png',
        'img/1.Sharkie/2.Long_IDLE/i7.png',
        'img/1.Sharkie/2.Long_IDLE/i8.png',
        'img/1.Sharkie/2.Long_IDLE/i9.png',
        'img/1.Sharkie/2.Long_IDLE/i10.png',
        'img/1.Sharkie/2.Long_IDLE/i11.png',
        'img/1.Sharkie/2.Long_IDLE/i12.png',
        'img/1.Sharkie/2.Long_IDLE/i13.png',
        'img/1.Sharkie/2.Long_IDLE/i14.png'
    ];

    imagesOfAttackWithBubble = [
        'img/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/1.png',
        'img/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/2.png',
        'img/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/3.png',
        'img/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/4.png',
        'img/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/5.png',
        'img/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/6.png',
        'img/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/7.png'
    ];

    height = 150;
    width = 150;
    positionY = 150;
    positionX = 0;
    movementSpeed = this.speed * 3;
    isGameOver = false;

    keyboard;

    animationFrameId = null;
    isCharacterMoving = false;
    currentAnimation = "";

    level = level1;

    swimmingSound = new Audio('audio/fish-swimming.mp3');

    constructor(keyboard) {
        super();
        this.loadImages(this.imagesOfMoving);
        this.loadImages(this.imagesOfStanding);
        this.loadImages(this.imagesOfDead);
        this.loadImages(this.imagesOfHurt);
        this.loadImages(this.imagesOfLongStanding);
        this.loadImages(this.imagesOfAttackWithBubble);

        this.playAnimation(this.imagesOfStanding);
        this.keyboard = keyboard;
        this.checkStatesOfSharkie();
    }

    checkStatesOfSharkie() {
        let standingTimeoutId = null; 
        setInterval(() => {
            if (!this.isGameOver) {
                if (this.isDead()) {
                    if (this.currentAnimation !== "dead") {
                        this.playAnimation(this.imagesOfDead, false, true);
                        setTimeout(() => {
                            this.stopAnimation();
                        }, 2000);
                        this.currentAnimation = "dead";
                        this.isGameOver = true;
                        clearTimeout(standingTimeoutId);
                    }
                }
                else if (this.isHurt()) {
                    if (this.currentAnimation !== "hurt") {
                        this.playAnimation(this.imagesOfHurt, false, false);
                        this.currentAnimation = "hurt";
                        clearTimeout(standingTimeoutId);
                    }
                } else if (this.isCharacterMoving) {
                    if (this.currentAnimation !== "moving") {
                        this.playAnimation(this.imagesOfMoving, false, false);
                        this.currentAnimation = "moving";
                        clearTimeout(standingTimeoutId);
                    }
                } else if (this.currentAnimation !== "standing") {
                    this.playAnimation(this.imagesOfStanding);
                    this.currentAnimation = "standing";
                    clearTimeout(standingTimeoutId);
                    standingTimeoutId = setTimeout(() => {
                        if (!this.isCharacterMoving && !this.isDead() && !this.isHurt()) {
                            this.playAnimation(this.imagesOfLongStanding, true, false);
                        }
                    }, 5000); 
                }
            }
        }, 16);
    }

    move() {
        if (this.keyboard.right && this.positionX < this.level.levelEndRightX) {
            this.positionX += this.movementSpeed;
            this.otherDirection = false;
            this.isCharacterMoving = true;
        }
        if (this.keyboard.left && this.positionX > this.level.levelEndLeftX) {
            this.positionX -= this.movementSpeed;
            this.otherDirection = true;
            this.isCharacterMoving = true;
        }
        if (this.keyboard.up && this.positionY > this.level.levelEndUpY) {
            this.positionY -= this.movementSpeed;
            this.isCharacterMoving = true;
        }
        if (this.keyboard.down && this.positionY < this.level.levelEndDownY) {
            this.positionY += this.movementSpeed;
            this.isCharacterMoving = true;
        }

        this.animationFrameId = requestAnimationFrame(this.move.bind(this));
    }


    startMovingAnimation() {
        if (!this.animationFrameId)
            this.move();
    }

    stopMovingAnimation() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
            this.move();
        }
    }
}