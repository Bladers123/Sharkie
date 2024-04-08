class CollectedObject extends MovableObject {

    positionX;
    positionY;
    width;
    height;
    type;

    constructor(imagePath, positionX, positionY, width, height, type) {
        super();
        this.loadImage(imagePath);
        this.positionX = positionX;
        this.positionY = positionY;
        this.width = width;
        this.height = height;
        this.type = type;
    }
}
