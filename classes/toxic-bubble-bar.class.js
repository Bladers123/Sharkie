/**
 * Represents a progress bar specifically for toxic bubbles in the game, showing how much capacity or charge is available for using toxic bubbles.
 * Extends DrawableObject to visually represent this capacity on the game screen.
 */
class ToxicBubbleBar extends DrawableObject {
    imagesOfToxicBubbleBar = [
        'img/4. Marcadores/Purple/0_.png',
        'img/4. Marcadores/Purple/20_.png',
        'img/4. Marcadores/Purple/40_.png',
        'img/4. Marcadores/Purple/60_.png',
        'img/4. Marcadores/Purple/80_.png',
        'img/4. Marcadores/Purple/100_.png'
    ];

    percentage = 0;

    /**
     * Initializes a new instance of ToxicBubbleBar, loading the necessary images and setting initial properties.
     */
    constructor() {
        super().loadImages(this.imagesOfToxicBubbleBar);
        this.positionX = 20;
        this.positionY = 80;
        this.width = 200;
        this.height = 50;
        this.setPercentage(this.percentage);
    }

    /**
     * Sets the current percentage of the toxic bubble bar and updates the image accordingly.
     * @param {number} percentage - The current capacity of toxic bubbles as a percentage (0 to 100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let imagePath = this.imagesOfToxicBubbleBar[this.getImageIndex()];
        this.img = this.imageCache[imagePath];
    }

    /**
     * Decreases the percentage of the toxic bubble bar by a specified amount.
     * @param {number} amount - The amount by which to decrease the bar's percentage.
     */
    decreasePercentage(amount) {
        this.setPercentage(Math.max(this.percentage - amount, 0));
    }

    /**
     * Determines the index of the image to use based on the current percentage.
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

    /**
     * Increases the percentage of the toxic bubble bar by a specified amount.
     * @param {number} amount - The amount by which to increase the bar's percentage.
     */
    increasePercentage(amount) {
        this.setPercentage(Math.min(this.percentage + amount, 100));
    }
}