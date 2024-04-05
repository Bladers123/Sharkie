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

    imagesOfHurtWithElectric = [
        'img/1.Sharkie/5.Hurt/2.Electric shock/1.png',
        'img/1.Sharkie/5.Hurt/2.Electric shock/2.png',
        'img/1.Sharkie/5.Hurt/2.Electric shock/3.png'
    ];

    imagesOfDeadWithElectric = [
        'img/1.Sharkie/6.dead/2.Electro_shock/1.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/2.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/3.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/4.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/5.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/6.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/7.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/8.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/9.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/10.png'
    ];

    height = 150;
    width = 150;
    positionY = 150;
    positionX = 0;
    movementSpeed = 5;
    isGameOver = false;
    isAttacking = false;
    keyboard;
    mayMove = true;
    bossZoneReached = false;
    life = 100;
    lastDamageSource = 'normal';
    isInvincible = false;

    animationFrameId = null;
    isCharacterMoving = false;
    currentAnimation = "";

    level = level1;

    constructor(keyboard) {
        super();
        this.loadImages(this.imagesOfMoving);
        this.loadImages(this.imagesOfStanding);
        this.loadImages(this.imagesOfDead);
        this.loadImages(this.imagesOfHurt);
        this.loadImages(this.imagesOfLongStanding);
        this.loadImages(this.imagesOfAttackWithBubble);
        this.loadImages(this.imagesOfHurtWithElectric);
        this.loadImages(this.imagesOfDeadWithElectric);
        this.playAnimation(this.imagesOfStanding);
        this.keyboard = keyboard;
        this.checkStatesOfSharkie();
    }

    becomeInvincible(duration) {
        this.isInvincible = true;
        setTimeout(() => {
            this.isInvincible = false;
        }, duration);
    }


    checkStatesOfSharkie() {
        let standingTimeoutId = null;
        setInterval(() => {
            if (!this.isGameOver) {
                if (this.isDead()) {
                    if (this.currentAnimation !== "dead") {
                        let animationToPlay;
                        if (this.lastDamageSource === 'electric')
                            animationToPlay = this.imagesOfDeadWithElectric;
                        else
                            animationToPlay = this.imagesOfDead;
                        this.playAnimation(animationToPlay, false, true);
                        this.currentAnimation = "dead";
                        this.isGameOver = true;
                        clearTimeout(standingTimeoutId);
                    }
                }
                else if (this.isHurt()) {
                    if (this.currentAnimation !== "hurt") {
                        let animationToPlay;
                        if (this.lastDamageSource === 'electric') {
                            animationToPlay = this.imagesOfHurtWithElectric;
                        } else {
                            animationToPlay = this.imagesOfHurt;
                        }
                        this.playAnimation(animationToPlay, false, true);
                        this.currentAnimation = "hurt";
                        clearTimeout(standingTimeoutId);
                    }
                }

                else if (this.isCharacterMoving) {
                    if (this.currentAnimation !== "moving") {
                        this.playAnimation(this.imagesOfMoving, false, false);
                        this.currentAnimation = "moving";
                        clearTimeout(standingTimeoutId);
                    }
                }
                else if (this.isAttacking) {
                    if (this.currentAnimation !== "attacking") {
                        this.currentAnimation = "attacking";
                        clearTimeout(standingTimeoutId);
                    }
                }
                else if (this.currentAnimation !== "standing") {
                    this.playAnimation(this.imagesOfStanding);
                    this.currentAnimation = "standing";
                    clearTimeout(standingTimeoutId);
                    standingTimeoutId = setTimeout(() => {
                        if (!this.isCharacterMoving && !this.isDead() && !this.isHurt()) {
                            this.playAnimation(this.imagesOfLongStanding, true, false);
                        }
                    }, 8000);
                }
            }
        }, 16);
    }

    move() {
        if (!this.isGameOver && this.mayMove) {
            if (this.keyboard.right && this.positionX < this.level.levelEndRightX) {
                this.positionX += this.movementSpeed;
                this.otherDirection = false;
                this.isCharacterMoving = true;
            }
            if (this.keyboard.left && this.positionX > this.level.levelEndLeftX) {
                if (!this.bossZoneReached || (this.bossZoneReached && this.positionX > 2140)) {
                    this.positionX -= this.movementSpeed;
                    this.otherDirection = true;
                    this.isCharacterMoving = true;
                }
            }
            if (this.keyboard.up && this.positionY > this.level.levelEndUpY) {
                this.positionY -= this.movementSpeed;
                this.isCharacterMoving = true;
            }
            if (this.keyboard.down && this.positionY < this.level.levelEndDownY) {
                this.positionY += this.movementSpeed;
                this.isCharacterMoving = true;
            }
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
    
    initiateAttack(type) {
        if (!this.isAttacking && !this.isGameOver && this.mayMove) {
            this.mayMove = false;
            if (type === 'poison' && world.toxicBubbleBar.percentage > 0) {
                this.isAttacking = true;
                this.playAnimation(this.imagesOfAttackWithBubble, false, false);
                setTimeout(() => {
                    this.shootBubble(type);
                    this.isAttacking = false;
                    world.toxicBubbleBar.decreasePercentage(20);
                    this.mayMove = true;
                }, 1000);
            }
            else if (type === 'normal') {
                this.isAttacking = true;
                this.playAnimation(this.imagesOfAttackWithBubble, false, false);
                setTimeout(() => {
                    this.shootBubble(type);
                    this.isAttacking = false;
                    this.mayMove = true;
                }, 1000);
            }
            else
                this.mayMove = true;
        }
    }

    shootBubble(type = 'normal') {
        if (!this.isGameOver) {
            let xOffset = this.otherDirection ? -30 : this.width;
            let bubble = new ThrowableObject(this.positionX + xOffset, this.positionY + 70, this.otherDirection, type);
            world.throwableObjects.push(bubble);
        }
    }

}