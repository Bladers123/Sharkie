/**
 * Represents a basic movable object in the game, providing common functionality for movement, animations, and handling game mechanics like collisions and gravity.
 * Extends DrawableObject to add movement and animation capabilities.
 */
class MovableObject extends DrawableObject {
    speed = 5;
    otherDirection = false;
    life = 100;
    lastHit;
    damage;
    speedY = 0;
    acceleration = 2.5;
    totalLife = 100;
    isDying;
    isRemoved;
    immobilized = false;
    isInvincible = false;

    movementIntervalIds = [];
    animationIntervalId = null;
    animationFrameId = null;
    checkStatesIntervalId = null;
    gravityIntervalId = null;
    moveIntervalIds = null;

    /**
     * Plays an animation sequence from the given images, with options to repeat the last few frames or run only once.
     * @param {string[]} imagesOfAnimation - Array of image paths for the animation sequence.
     * @param {boolean} repeatLastFour - Whether to loop the last four frames of the animation.
     * @param {boolean} runOnce - Whether to run the animation only once.
     */
    playAnimation(imagesOfAnimation, repeatLastFour = false, runOnce = false) {
        this.stopAnimation();
        let index = 0;
        this.handleAnimationProgress(imagesOfAnimation, repeatLastFour, runOnce, index);
    }

    /**
     * Handles the progress of the animation, updating the image according to the animation logic.
     * @param {string[]} imagesOfAnimation - Array of image paths for the animation sequence.
     * @param {boolean} repeatLastFour - Whether to loop the last four frames of the animation.
     * @param {boolean} runOnce - Whether to run the animation only once.
     * @param {number} index - Current index in the animation sequence.
     */
    handleAnimationProgress(imagesOfAnimation, repeatLastFour, runOnce, index) {
        this.animationIntervalId = setInterval(() => {
            if (index < imagesOfAnimation.length) {
                let path = imagesOfAnimation[index];
                this.img = this.imageCache[path];
                index++;
            }
            else if (repeatLastFour)
                index = imagesOfAnimation.length - 4;
            else if (runOnce)
                this.stopAnimation();
            else
                index = 0;
        }, 150);
    }

    /**
     * Stops any ongoing animation.
     */
    stopAnimation() {
        if (this.animationIntervalId !== null) {
            clearInterval(this.animationIntervalId);
            this.animationIntervalId = null;
        }
    }

    /**
     * Stops all intervals associated with the object, including movement and animation timers.
     */
    stopIntervals() {
        if (this.animationIntervalId) {
            clearInterval(this.animationIntervalId);
            this.animationIntervalId = null;
        }
        if (this.movementIntervalIds) {
            this.movementIntervalIds.forEach(intervalId => clearInterval(intervalId));
            this.movementIntervalIds = [];
        }
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
        if (this.checkStatesIntervalId) {
            clearInterval(this.checkStatesIntervalId);
            this.checkStatesIntervalId = null;
        }
    }

    /**
     * Adds a movement interval ID to the list for management.
     * @param {number} interval - The interval ID to be stored.
     */
    addMovementInterval(interval) {
        this.movementIntervalIds.push(interval);
    }

    /**
     * Checks if the object is colliding with another object within the game world.
     * @param {DrawableObject} object - The other object to check for collision.
     * @param {number} additionalRange - Additional range to consider for the collision detection.
     * @param {number} characterIsCollidingY - Additional vertical range to consider.
     * @returns {boolean} True if colliding, false otherwise.
     */
    isColliding(object, additionalRange = 0, characterIsCollidingY = 0) {
        return this.positionX < object.positionX + object.width + additionalRange &&
            this.positionX + this.width + additionalRange > object.positionX &&
            this.positionY < object.positionY + object.height - characterIsCollidingY &&
            this.positionY + this.height > object.positionY;
    }

    /**
    * Handles the event when damage is taken by the object, considering invincibility and immobilization states.
    * @param {number} damage - The amount of damage taken.
    */
    damageTaken(damage) {
        if (this.isInvincible || this.immobilized)
            return;
        else {
            this.becomeInvincible(2000);
            if (world && !world.endBossDefeated) {
                this.life -= damage;
                if (this.life <= 0)
                    this.life = 0;
                else
                    this.lastHit = new Date().getTime();
            }
        }
    }

    /**
    * Checks if the object is currently hurt.
    * @returns {boolean} True if hurt, false otherwise.
    */
    isHurt() {
        if (this.life < this.totalLife) {
            let timeSpan = new Date().getTime() - this.lastHit;
            timeSpan = timeSpan / 1000;
            return timeSpan < 1;
        }
        else
            return false;
    }

    /**
     * Checks if the object is dead.
     * @returns {boolean} True if dead, false otherwise.
     */
    isDead() {
        return this.life == 0;
    }

    /**
     * Checks if the object is above the ground, useful for objects affected by gravity.
     * @returns {boolean} True if above ground, false otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject)
            return true;
        else
            return this.positionY < 180;
    }

    /**
     * Applies gravity to the object, affecting its vertical position.
     */
    applyGravity() {
        this.gravityIntervalId = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                if (this.immobilized) return;
                this.positionY -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Initiates the behavior to move towards the character, usually used by enemy objects.
     */
    moveToCharacter() {
        if (getCharacter()) {
            let followSpeed = 0.05;
            let inertia = 0.1;
            this.moveIntervalIds = setInterval(() => {
                if (this.immobilized || world.endBossDefeated)
                    return;
                else
                    this.followCharacter(followSpeed, inertia);
            }, 1000 / 60);
        }
    }

    /**
     * Continuously adjusts the position towards the character based on calculated differences and speed factors.
     * @param {number} followSpeed - Speed factor for following the character.
     * @param {number} inertia - Inertia factor affecting movement smoothness.
     */
    followCharacter(followSpeed, inertia) {
        let charPos = getCharacter().positionX;
        let fishPos = this.positionX;
        this.otherDirection = charPos > fishPos;
        let diffX = charPos - fishPos;
        let diffY = getCharacter().positionY - this.positionY;
        this.positionX += diffX * followSpeed * inertia;
        this.positionY += diffY * followSpeed * inertia;
    }
}