/**
 * Represents the life bar for a character or entity in the game, visually indicating health as a percentage.
 * Extends DrawableObject for graphical representation on a canvas.
 */
class LifeBar extends DrawableObject {
    imagesOfLifeBar = [
        'img/4. Marcadores/orange/0_  copia.png',
        'img/4. Marcadores/orange/20_ copia 2.png',
        'img/4. Marcadores/orange/40_  copia.png',
        'img/4. Marcadores/orange/60_  copia.png',
        'img/4. Marcadores/orange/80_  copia.png',
        'img/4. Marcadores/orange/100_  copia.png'
    ];

    percentage;

    /**
     * Initializes a new instance of LifeBar, loading the necessary images and setting initial properties.
     */
    constructor() {
        super().loadImages(this.imagesOfLifeBar);
        this.positionX = 20;
        this.positionY = 0;
        this.width = 200;
        this.height = 50;
        this.setPercentage(100);
    }

    /**
     * Sets the current life percentage and updates the life bar's image accordingly.
     * @param {number} percentage - The current health of the entity as a percentage (0 to 100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let imagePath = this.imagesOfLifeBar[this.getImageIndex()];
        this.img = this.imageCache[imagePath];
    }

    /**
     * Determines the index of the image to use based on the current health percentage.
     * @returns {number} The index of the image corresponding to the current percentage.
     */
    getImageIndex() {
        if (this.percentage == 100)
            return 5;
        else if (this.percentage > 80)
            return 4;
        else if (this.percentage > 60)
            return 3;
        else if (this.percentage > 40)
            return 2;
        else if (this.percentage > 20)
            return 1;
        else
            return 0;
    }
}