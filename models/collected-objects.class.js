class CollectedObject extends MovableObject {

    positionX;
    positionY;
    width = 40;
    height = 40;

    constructor(imagePath, positionX, positionY) {
        super();
        this.loadImage(imagePath);
        this.positionX = positionX;
        this.positionY = positionY;
    }
}