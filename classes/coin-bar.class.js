/**
 * Represents a coin bar that displays the player's current coin collection as a percentage.
 * Extends DrawableObject to include functionality for displaying images.
 */
class CoinBar extends DrawableObject {

    imagesOfCoinBar = [
        'img/4. Marcadores/green/Coin/0_  copia 4.png',
        'img/4. Marcadores/green/Coin/20_  copia 2.png',
        'img/4. Marcadores/green/Coin/40_  copia 4.png',
        'img/4. Marcadores/green/Coin/60_  copia 4.png',
        'img/4. Marcadores/green/Coin/80_  copia 4.png',
        'img/4. Marcadores/green/Coin/100_ copia 4.png'
    ];

    percentage = 0;

    /**
    * Constructor initializes and loads images representing different states of the coin bar.
    * Sets the initial position, size, and percentage of the coin bar.
    */
    constructor() {
        super().loadImages(this.imagesOfCoinBar);
        this.positionX = 20;
        this.positionY = 40;
        this.width = 200;
        this.height = 50;
        this.setPercentage(this.percentage);
    }

    /**
    * Sets the coin bar's displayed percentage and updates the image to reflect the current coin total.
    * @param {number} percentage - The new percentage of coins collected, ranging from 0 to 100.
    */
    setPercentage(percentage) {
        this.percentage = percentage;
        let imagePath = this.imagesOfCoinBar[this.getImageIndex()];
        this.img = this.imageCache[imagePath];
    }

    /**
    * Determines the index of the image to display based on the current percentage.
    * @returns {number} The index of the image corresponding to the current coin bar percentage.
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
     * Increases the coin bar's percentage by a specified amount, ensuring it does not exceed 100%.
     * @param {number} amount - The amount by which to increase the coin bar's percentage.
     */
    increasePercentage(amount) {
        this.setPercentage(Math.min(this.percentage + amount, 100));
    }
}