/**
 * Represents an animated object that can be collected in the game. This class extends MovableObject to utilize its movement capabilities and methods.
 */
class CollectedAnimationObject extends MovableObject {

    imagesOfPoisons = [
        'img/4. Marcadores/Posión/Animada/1.png',
        'img/4. Marcadores/Posión/Animada/2.png',
        'img/4. Marcadores/Posión/Animada/3.png',
        'img/4. Marcadores/Posión/Animada/4.png',
        'img/4. Marcadores/Posión/Animada/5.png',
        'img/4. Marcadores/Posión/Animada/6.png',
        'img/4. Marcadores/Posión/Animada/7.png',
        'img/4. Marcadores/Posión/Animada/8.png'
    ];

    imagesOfCoins = [
        'img/4. Marcadores/1. Coins/1.png',
        'img/4. Marcadores/1. Coins/2.png',
        'img/4. Marcadores/1. Coins/3.png',
        'img/4. Marcadores/1. Coins/4.png',
    ];

    positionX;
    positionY;
    type;

    /**
     * Constructor for creating a collected animation object with specified initial positions and type.
     * It loads and plays animations based on the object type.
     * @param {number} positionX - The x-coordinate of the object's starting position.
     * @param {number} positionY - The y-coordinate of the object's starting position.
     * @param {string} type - The type of collectible ('poison' or 'coin'), which determines the set of animations to use.
     */
    constructor(positionX, positionY, type) {
        super();
        this.positionX = positionX;
        this.positionY = positionY;
        this.type = type;
        this.loadObjects();
    }

    /**
     * Loads images and animations based on the object's type and sets the object's dimensions.
     * Images for 'poison' are larger compared to those for 'coins'.
     */
    loadObjects() {
        if (this.type === 'poison') {
            this.loadImages(this.imagesOfPoisons);
            this.playAnimation(this.imagesOfPoisons);
            this.width = 60;
            this.height = 60;
        } else if (this.type === 'coin') {
            this.loadImages(this.imagesOfCoins);
            this.playAnimation(this.imagesOfCoins);
            this.width = 40;
            this.height = 40;
        }
    }
}
