/**
 * Represents a base class for drawable objects in the game. It provides methods to manage images and draw themselves on the canvas.
 */
class DrawableObject {
    positionX = 120;
    positionY = 250;
    img;
    width = 100;
    height = 100;
    imageCache = {};
    currentImage = 0;

    /**
     * Loads a single image from a given path and sets it as the object's current image.
     * @param {string} path - The path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
    * Loads multiple images from an array of paths and stores them in the image cache.
    * @param {string[]} imagePath - An array of image file paths.
    */
    loadImages(imagePath) {
        imagePath.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
    * Draws a frame around the object if it is an instance of Character, Enemy, or Endboss. This method is primarily used for debugging and visual testing.
    * @param {CanvasRenderingContext2D} context - The canvas rendering context used to draw the frame.
    */
    drawFrame(context) {
        if (this instanceof Character || this instanceof Enemy || this instanceof Endboss) {
            context.beginPath();
            context.lineWidth = "5";
            context.strokeStyle = "blue";
            context.rect(this.positionX, this.positionY, this.width, this.height);
            context.stroke();
        }
    }
}