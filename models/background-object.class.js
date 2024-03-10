class BackgroundOject extends MovableObject{

    width = 720;
    height = 200;

    constructor(imagePath, positionX){
        super().loadImage(imagePath);
        this.positionX = positionX;
        this.positionY = 480 - this.height;
    }
}