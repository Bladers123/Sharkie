class AttackObject extends MovableObject {
    damage;
    firedDirection = "";
    otherDirection;
    type;
    range;
    travelDistance = 0;

    constructor(positionX, positionY, otherDirection, type, range) {
        super();
        this.positionX = positionX;
        this.positionY = positionY;
        this.type = type;
        this.otherDirection = otherDirection;
        this.range = range;
        this.checkTypeOfAttack();
    }

    checkTypeOfAttack() {
        if (this.type === 'poison' || this.type === 'normal')
            this.attackWithBubble();
    }

    attackWithFinSlap() {
        this.damage = 100;
        this.onReachMaxRange();
    }

    attackWithBubble() {
        this.damage = this.type === 'poison' ? 50 * 3 : 50;
        let bubbleImage = this.type === 'poison' ? 'img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png' : 'img/1.Sharkie/4.Attack/Bubble trap/Bubble.png';
        this.loadImage(bubbleImage);
        this.width = 40;
        this.height = 40;
        this.throw();
    }

    throw() {
        this.speedY = 30;
        let interval = setInterval(() => {
            if (!this.firedDirection)
                this.firedDirection = this.otherDirection ? "left" : "right";
            if (this.firedDirection === "right")
                this.positionX += 10;
            else
                this.positionX -= 10;
            this.travelDistance += 10;
            if (this.travelDistance >= this.range) {
                clearInterval(interval);
                this.onReachMaxRange();
            }
        }, 25);
    }

    onReachMaxRange() {
        const index = world.attackObjects.findIndex(obj => obj === this);
        if (index !== -1)
            world.attackObjects.splice(index, 1);
    }
} 
