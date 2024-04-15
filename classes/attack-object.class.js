
/**
 * Represents an attack projectile or object in the game. This could be a bubble, fin slap, or any other form of attack.
 * Extends MovableObject to utilize movement capabilities and additional properties.
 */
class AttackObject extends MovableObject {
    damage;
    firedDirection = "";
    otherDirection;
    type;
    range;
    travelDistance = 0;

    /**
 * Constructs an attack object with specified parameters, setting initial position, attack type, and range.
 * @param {number} positionX - The x-coordinate of the attack object's starting position.
 * @param {number} positionY - The y-coordinate of the attack object's starting position.
 * @param {string} otherDirection - The initial direction if not yet fired, typically left or right.
 * @param {string} type - The type of attack, e.g., 'poison' or 'normal'.
 * @param {number} range - The maximum distance the attack object can travel.
 */
    constructor(positionX, positionY, otherDirection, type, range) {
        super();
        this.positionX = positionX;
        this.positionY = positionY;
        this.type = type;
        this.otherDirection = otherDirection;
        this.range = range;
        this.checkTypeOfAttack();
    }

    /**
 * Determines the type of attack based on the attack object's type attribute and executes the appropriate method.
 */
    checkTypeOfAttack() {
        if (this.type === 'poison' || this.type === 'normal')
            this.attackWithBubble();
    }

    /**
 * Defines the behavior for a fin slap attack including setting damage and handling when max range is reached.
 */
    attackWithFinSlap() {
        this.damage = 100;
        this.onReachMaxRange();
    }

    /**
 * Defines the behavior for a bubble type attack, sets damage, loads appropriate image, and starts the throw action.
 */
    attackWithBubble() {
        this.damage = this.type === 'poison' ? 50 * 3 : 50;
        let bubbleImage = this.type === 'poison' ? 'img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png' : 'img/1.Sharkie/4.Attack/Bubble trap/Bubble.png';
        this.loadImage(bubbleImage);
        this.width = 40;
        this.height = 40;
        this.throw();
    }

    /**
 * Handles the movement of the attack object over time, adjusting its position according to its fired direction until it reaches its maximum range.
 */
    throw() {
        this.speedY = 30;
        let interval = setInterval(() => {
            if (!this.firedDirection)
                this.firedDirection = this.otherDirection ? "left" : "right";
            if (this.firedDirection === "right")
                this.positionX += 10;
            else
                this.positionX -= 10;
            this.travelDistance += 10;
            if (this.travelDistance >= this.range) {
                clearInterval(interval);
                this.onReachMaxRange();
            }
        }, 25);
    }

    /**
 * Removes the attack object from the world's attack objects array when it reaches its maximum travel range.
 */
    onReachMaxRange() {
        const index = world.attackObjects.findIndex(obj => obj === this);
        if (index !== -1)
            world.attackObjects.splice(index, 1);
    }
} 
