class ThrowableObject extends MovableObject{

    constructor(positionX, positionY){
        super().loadImage('img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        this.positionX = positionX;
        this.positionY = positionY;
        this.width = 40;
        this.height = 40;
        this.throw();
    }

    throw(){
        this.speedY = 30;
        setInterval(() => {
            this.positionX += 10;
        }, 25);
    }
}