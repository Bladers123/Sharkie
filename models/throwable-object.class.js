class ThrowableObject extends MovableObject {
    damage;
    firedDirection = "";
    otherDirection;
    type;

    constructor(positionX, positionY, otherDirection, type = 'normal') {
        super();
        this.type = type;
        this.damage = type === 'poison' ? 50 * 3 : 50; 
        let bubbleImage = type === 'poison' ? 'img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png' : 'img/1.Sharkie/4.Attack/Bubble trap/Bubble.png';
        this.loadImage(bubbleImage);
        this.positionX = positionX;
        this.positionY = positionY;
        this.width = 40;
        this.height = 40;
        this.otherDirection = otherDirection;
        this.throw();
    }

    throw() {
        this.speedY = 30;
        setInterval(() => {
            if (!this.firedDirection)
                this.firedDirection = this.otherDirection ? "left" : "right";
            if (this.firedDirection === "right") 
                this.positionX += 10;
            else
                this.positionX -= 10;
        }, 25);
    }
} 
