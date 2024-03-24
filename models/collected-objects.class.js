class CollectedObject extends MovableObject {

    positionX;
    positionY;
    width;
    height;

    constructor(imagePath, positionX, positionY, width = 40, height = 40) {
        super();
        this.loadImage(imagePath);
        this.positionX = positionX;
        this.positionY = positionY;
        this.width = width;
        this.height = height;
    }
}
