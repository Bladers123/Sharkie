/**
 * Represents a collectible object in the game, such as a power-up or a coin. This class extends MovableObject.
 */
class CollectedObject extends MovableObject {

    positionX;
    positionY;
    width;
    height;
    type;

    /**
    * Constructs a new CollectedObject with specified image and dimensions.
    * @param {string} imagePath - The path to the image file for the object.
    * @param {number} positionX - The x-coordinate of the object's initial position on the screen.
    * @param {number} positionY - The y-coordinate of the object's initial position on the screen.
    * @param {number} width - The width of the object.
    * @param {number} height - The height of the object.
    * @param {string} type - The type of the collectible object, used to differentiate between different kinds of collectibles.
    */
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
