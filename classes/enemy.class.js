/**
 * Represents an enemy character in the game, capable of various behaviors based on its type.
 * Extends MovableObject to utilize movement capabilities and methods.
 */
class Enemy extends MovableObject {
    imagesOfNormalPuffer = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png'
    ];

    imagesOfTransitionPuffer = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim5.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition5.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim5.png'
    ];

    imagesOfNormalJelly = [
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png'
    ];

    imagesOfTransitionJelly = [
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 2.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 3.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 4.png'
    ];

    imagesOfDangerousJelly = [
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 2.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 3.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 4.png'
    ];

    imagesOfFollowingCharacter = [
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim4.png'
    ];

    imagesOfDyingNormalPuffer = [
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png',
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 2 (can animate by going down to the floor after the Fin Slap attack).png',
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 3 (can animate by going down to the floor after the Fin Slap attack).png',
    ];

    imagesOfDyingTransitionPuffer = [
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.2.png'
    ];

    imagesOfDyingNormalJelly = [
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L1.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L2.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L3.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L4.png',
    ];

    imagesOfDyingTransitionJelly = [
        'img/2.Enemy/2 Jelly fish/Dead/green/g1.png',
        'img/2.Enemy/2 Jelly fish/Dead/green/g2.png',
        'img/2.Enemy/2 Jelly fish/Dead/green/g3.png',
        'img/2.Enemy/2 Jelly fish/Dead/green/g4.png'
    ];

    imagesOfDyingDangerousJelly = [
        'img/2.Enemy/2 Jelly fish/Dead/Pink/P1.png',
        'img/2.Enemy/2 Jelly fish/Dead/Pink/P2.png',
        'img/2.Enemy/2 Jelly fish/Dead/Pink/P3.png',
        'img/2.Enemy/2 Jelly fish/Dead/Pink/P4.png'
    ];

    imagesOfDyingFollowingCharacter = [
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.2.png'
    ];

    height = 80;
    width = 80;
    direction;
    isDying;
    isRemoved;
    type;

    /**
     * Constructs an Enemy with specified initial properties and behavior based on type.
     * @param {number} positionX - The initial horizontal position of the enemy.
     * @param {number} positionY - The initial vertical position of the enemy.
     * @param {string} type - The type of the enemy, which defines its behavior and appearance.
     */
    constructor(positionX, positionY, type) {
        super();
        this.loadingImages();
        this.type = type;
        this.isDying = false;
        this.isRemoved = false;
        this.loadEnemy(positionX, positionY);
    }

    /**
     * Loads and initializes all enemy-related images.
     */
    loadingImages() {
        this.loadImages(this.imagesOfNormalPuffer);
        this.loadImages(this.imagesOfTransitionPuffer);
        this.loadImages(this.imagesOfNormalJelly);
        this.loadImages(this.imagesOfTransitionJelly);
        this.loadImages(this.imagesOfDangerousJelly);
        this.loadImages(this.imagesOfFollowingCharacter);
        this.loadImages(this.imagesOfDyingNormalPuffer);
        this.loadImages(this.imagesOfDyingTransitionPuffer);
        this.loadImages(this.imagesOfDyingNormalJelly);
        this.loadImages(this.imagesOfDyingTransitionJelly);
        this.loadImages(this.imagesOfDyingDangerousJelly);
        this.loadImages(this.imagesOfDyingFollowingCharacter);
    }

    /**
     * Handles the death of the enemy, playing the appropriate animation and marking the enemy as removed.
     */
    die() {
        if (!this.isDying) {
            this.immobilized = true;
            this.isDying = true;
            let dyingAnimation = this.selectDyingAnimation();
            this.playAnimation(dyingAnimation, false, true);
            setTimeout(() => {
                this.isRemoved = true;
            }, 700);
        }
    }

    /**
    * Selects the appropriate dying animation based on the enemy's type.
    * @returns {string[]} Array of image paths for the dying animation.
    */
    selectDyingAnimation() {
        switch (this.type) {
            case 'puffer-normal':
                return this.imagesOfDyingNormalPuffer;
            case 'puffer-transition':
                return this.imagesOfDyingTransitionPuffer;
            case 'jelly-normal':
                return this.imagesOfDyingNormalJelly;
            case 'jelly-transition':
                return this.imagesOfDyingTransitionJelly;
            case 'jelly-dangerous':
                return this.imagesOfDyingDangerousJelly;
            case 'puffer-follow':
                return this.imagesOfDyingFollowingCharacter;
            default:
                return [];
        }
    }

    /**
     * Loads and sets properties specific to an enemy based on its initial position and type.
     * @param {number} positionX - The initial horizontal position of the enemy.
     * @param {number} positionY - The initial vertical position of the enemy.
     */
    loadEnemy(positionX, positionY) {
        if (this.type === 'puffer-normal')
            this.loadPufferNormalProperties(positionX, positionY);
        else if (this.type === 'puffer-transition')
            this.loadPufferTransitionProperties(positionX, positionY);
        else if (this.type === 'jelly-normal')
            this.loadJellyNormalProperties(positionX, positionY);
        else if (this.type === 'jelly-transition')
            this.loadJellyTransitionProperties(positionX, positionY);
        else if (this.type === 'jelly-dangerous')
            this.loadJellyDangerousProperties(positionX, positionY);
        else if (this.type === 'puffer-follow')
            this.loadPufferFollowProperties(positionX, positionY);
    }

    /**
     * Configures properties for a normal puffer fish type enemy.
     * @param {number} positionX - The horizontal position of the enemy.
     * @param {number} positionY - The vertical position of the enemy.
     */
    loadPufferNormalProperties(positionX, positionY) {
        this.setSpawnPoint(positionX, positionY);
        this.setSpeed(0.15 + Math.random());
        this.setLife(50);
        this.setDamage(5);
        this.playAnimation(this.imagesOfNormalPuffer, false, false);
        this.moveLeft();
    }

    /**
     * Configures properties for a transition stage puffer fish type enemy.
     * @param {number} positionX - The horizontal position of the enemy.
     * @param {number} positionY - The vertical position of the enemy.
     */
    loadPufferTransitionProperties(positionX, positionY) {
        this.setSpawnPoint(positionX, positionY);
        this.setSpeed(2);
        this.setLife(50);
        this.setDamage(10);
        this.playAnimation(this.imagesOfTransitionPuffer, true, false);
        this.moveLeftAndRandomlyUpDown();
    }

    /**
     * Configures properties for a normal jellyfish type enemy.
     * @param {number} positionX - The horizontal position of the enemy.
     * @param {number} positionY - The vertical position of the enemy.
     */
    loadJellyNormalProperties(positionX, positionY) {
        this.setSpawnPoint(positionX, positionY);
        this.setSpeed(2);
        this.setLife(50);
        this.setDamage(10);
        this.playAnimation(this.imagesOfNormalJelly, true, false);
        this.moveUpAndDown();
    }

    /**
     * Configures properties for a transition stage jellyfish type enemy.
     * @param {number} positionX - The horizontal position of the enemy.
     * @param {number} positionY - The vertical position of the enemy.
     */
    loadJellyTransitionProperties(positionX, positionY) {
        this.setSpawnPoint(positionX, positionY);
        this.setSpeed(4);
        this.setLife(100);
        this.setDamage(15);
        this.playAnimation(this.imagesOfTransitionJelly, true, false);
        this.moveUpAndDown();
    }

    /**
     * Configures properties for a dangerous jellyfish type enemy.
     * @param {number} positionX - The horizontal position of the enemy.
     * @param {number} positionY - The vertical position of the enemy.
     */
    loadJellyDangerousProperties(positionX, positionY) {
        this.setSpawnPoint(positionX, positionY);
        this.setSpeed(8);
        this.setLife(150);
        this.setDamage(20);
        this.playAnimation(this.imagesOfDangerousJelly, true, false);
        this.moveUpAndDown();
    }

    /**
     * Configures properties for a following character type puffer fish.
     * @param {number} positionX - The horizontal position of the enemy.
     * @param {number} positionY - The vertical position of the enemy.
     */
    loadPufferFollowProperties(positionX, positionY) {
        this.setSpawnPoint(positionX, positionY);
        this.setSpeed(2);
        this.setLife(100);
        this.setDamage(15);
        this.playAnimation(this.imagesOfFollowingCharacter, true, false);
        setTimeout(() => {
            this.moveToCharacter();
        }, 3000);
    }

    /**
   * Sets the damage value for the enemy.
   * @param {number} damage - The damage value the enemy can inflict.
   */
    setDamage(damage) {
        this.damage = damage;
    }

    /**
    * Sets the initial spawn point of the enemy.
    * @param {number} positionX - The horizontal position of the enemy.
    * @param {number} positionY - The vertical position of the enemy.
    */
    setSpawnPoint(positionX, positionY) {
        this.positionX = positionX;
        this.positionY = positionY;
    }

    /**
     * Sets the speed of the enemy.
     * @param {number} speed - The movement speed of the enemy.
     */
    setSpeed(speed) {
        this.speed = speed;
    }

    /**
     * Sets the life value of the enemy.
     * @param {number} life - The initial life value of the enemy.
     */
    setLife(life) {
        this.life = life;
    }

    /**
     * Moves the enemy left continuously.
     */
    moveLeft() {
        let intervalId = setInterval(() => {
            if (this.immobilized)
                return;
            else
                this.positionX -= this.speed;
        }, 1000 / 60);
        this.addMovementInterval(intervalId);
    }

    /**
     * Moves the enemy up and down within a defined range.
     */
    moveUpAndDown() {
        this.direction = 1;
        let intervalId = setInterval(() => {
            if (this.immobilized)
                return;
            this.positionY += this.speed * this.direction;
            if (this.positionY <= 0)
                this.direction = 1;
            else if (this.positionY >= 400)
                this.direction = -1;
        }, 1000 / 60);
        this.addMovementInterval(intervalId);
    }

    /**
    * Moves the enemy left while randomly moving up and down.
    */
    moveLeftAndRandomlyUpDown() {
        let verticalSpeed = 0;
        const maxVerticalSpeed = 2;
        let intervalId = setInterval(() => {
            if (this.immobilized) return;
            this.positionX -= this.speed;
            verticalSpeed = this.adjustVerticalSpeed(verticalSpeed, maxVerticalSpeed);
            this.adjustPositionY(verticalSpeed);
        }, 1000 / 60);
        this.addMovementInterval(intervalId);
    }

    /**
 * Adjusts the vertical speed of the enemy to create more dynamic movement patterns.
 * The speed variation is randomly adjusted within a specified range.
 * @param {number} verticalSpeed - The current vertical speed of the enemy.
 * @param {number} maxVerticalSpeed - The maximum allowed vertical speed.
 * @returns {number} The new vertical speed, adjusted to stay within the bounds of the maximum speed.
 */
    adjustVerticalSpeed(verticalSpeed, maxVerticalSpeed) {
        verticalSpeed += (Math.random() - 0.5) * 0.1;
        if (verticalSpeed > maxVerticalSpeed) verticalSpeed = maxVerticalSpeed;
        else if (verticalSpeed < -maxVerticalSpeed) verticalSpeed = -maxVerticalSpeed;
        return verticalSpeed;
    }

    /**
 * Adjusts the vertical position of the enemy based on its current vertical speed.
 * Ensures that the enemy does not move beyond the defined vertical boundaries of the gameplay area.
 * @param {number} verticalSpeed - The current vertical speed of the enemy.
 * @returns {number} The adjusted vertical speed after applying boundary constraints.
 */
    adjustPositionY(verticalSpeed) {
        this.positionY += verticalSpeed;
        if (this.positionY < 0) {
            this.positionY = 0;
            return 0;
        } else if (this.positionY > 400) {
            this.positionY = 400;
            return 0;
        }
        return verticalSpeed;
    }
}