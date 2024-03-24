class ThrowableObject extends MovableObject {
    damage = 50;
    firedDirection = "";
    otherDirection;

    constructor(positionX, positionY, otherDirection) {
        super().loadImage('img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
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
