class Charakter extends MovableObject {

    height = 150;
    width = 150;
    positionY = 150;

    constructor() {
        super().loadImage('../img/1.Sharkie/1.IDLE/1.png');
        this.loadImages([
            '../img/1.Sharkie/3.Swim/1.png',
            '../img/1.Sharkie/3.Swim/2.png',
            '../img/1.Sharkie/3.Swim/3.png',
            '../img/1.Sharkie/3.Swim/4.png',
            '../img/1.Sharkie/3.Swim/5.png',
            '../img/1.Sharkie/3.Swim/6.png'
        ]);
    }
}