/**
 * Represents a background object in the game. This class extends MovableObject to use properties and methods 
 * that manage movement and positioning of the background elements.
 */
class BackgroundObject extends MovableObject {

    width = 720;
    height = 480;

    /**
     * Constructs a BackgroundObject with a specified image and position.
     * The object's vertical position is automatically set to align with the bottom of the screen based on its height.
     * @param {string} imagePath - The path to the image file used for the background object.
     * @param {number} positionX - The initial horizontal position of the background object on the screen.
     */
    constructor(imagePath, positionX) {
        super().loadImage(imagePath);
        this.positionX = positionX;
        this.positionY = 480 - this.height;
    }
}