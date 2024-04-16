/**
 * Manages the entire game world, including all characters, enemies, objects, and interactions within the game environment.
 */
class World {
    context;
    canvas;
    cameraX = 0;
    bossZoneReached = false;
    endBossDefeated = false;

    character;
    lifeBar = new LifeBar();
    coinBar = new CoinBar();
    toxicBubbleBar = new ToxicBubbleBar();

    attackObjects = [];

    level = level1;
    enemies = level1.enemies;
    endBosses = level1.endBoss;
    backgroundObjects = level1.backgroundObjects;
    collectedObjects = level1.collectedObjects;
    collectedAnimationObjects = level1.collectedAnimationObjects;

    gameOverCheckIntervalId = null;
    fireIntervalId = null;
    animationFrameId = null;

    /**
     * Constructs a new World instance, setting up the game environment and initializing all necessary components.
     * @param {HTMLCanvasElement} canvas - The canvas element where the game is drawn.
     * @param {Character} character - The main character of the game.
     */
    constructor(canvas, character) {
        this.context = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.character = character;
        soundManager.play('background', true);
        character.becomeInvincible(1000);
        this.draw();
        this.checkCollisions();
        this.fire();
        this.checkIsGameOver();
    }

    /**
     * Checks the game over condition at intervals and handles the game over sequence if the character is defeated.
     */
    checkIsGameOver() {
        let gameOver = true;
        this.gameOverCheckIntervalId = setInterval(() => {
            if (this.character.isGameOver && gameOver) {
                setTimeout(() => {
                    let gameOverContainer = document.getElementById('game-over-container');
                    let introductionButton = document.getElementById('introductions');
                    gameOver = false;
                    if (gameOverContainer)
                        this.showGameOver(gameOverContainer, introductionButton);
                }, 2000);
            }
        }, 10);
    }

    /**
    * Displays the game over screen and updates the UI accordingly.
    * @param {HTMLElement} gameOverContainer - The container element for the game over screen.
    * @param {HTMLElement} introductionButton - The button that starts the game over.
    */
    showGameOver(gameOverContainer, introductionButton) {
        gameOverContainer.classList.add('disabled-image');
        introductionButton.classList.add('disabled-image');
        gameOverContainer.classList.remove('display-none');
        this.canvas.classList.remove('display-block');
        this.canvas.classList.add('display-none');
        soundManager.stop('background');
        soundManager.stop('bossfight');
        soundManager.play('gameover', false);
        // document.getElementById('joystick').style.display = 'none';
        // document.getElementById('finslap-attack-button').style.display = 'none';
        // document.getElementById('bubble-attack-button').style.display = 'none';
        removeGameControls();
        setTimeout(() => {
            gameOverContainer.classList.remove('disabled-image');
            introductionButton.classList.remove('disabled-image');
        }, 3000);
    }

    /**
     * Initiates continuous collision detection between game elements.
     */
    fire() {
        this.fireIntervalId = setInterval(() => {
            this.checkCollisions();
        }, 200);
    }

    /**
     * Checks for collisions between different types of objects in the game world.
     */
    checkCollisions() {
        if (!this.character.isAttacking) {
            this.checkCollisionCharacterWithEndboss();
            this.checkCollisionCharacterWithEnemy();
            this.checkCollisionBubbleWithEnemy();
            this.checkCollisionBubbleWithEndboss();
            this.checkCollisionCharacterWithCoinsAndPoisons();
            this.checkCollisionCharacterWithAnimationPoisons();
        }
    }

    /**
     * Checks for collisions between the character and the end boss.
     */
    checkCollisionCharacterWithEndboss() {
        this.level.endBoss.forEach(endBoss => {
            if (endBoss && !endBoss.isDying && !endBoss.endBossIsDead) {
                if (this.character.isColliding(endBoss, -30, 100)) {
                    this.character.lastDamageSource = 'normal';
                    this.character.damageTaken(endBoss.damage);
                    this.lifeBar.setPercentage(this.character.life);
                }
            }
        });
    }

    /**
     * Checks for collisions between the character and enemies.
     */
    checkCollisionCharacterWithEnemy() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy, -30, 60)) {
                if (enemy.type.startsWith('jelly'))
                    this.character.lastDamageSource = 'electric';
                else
                    this.character.lastDamageSource = 'normal';
                this.character.damageTaken(enemy.damage);
                this.lifeBar.setPercentage(this.character.life);
            }
        });
    }

    /**
     * Checks for collisions between bubbles and enemies.
     */
    checkCollisionBubbleWithEnemy() {
        this.attackObjects.forEach(bubble => {
            this.level.enemies.forEach(enemy => {
                if (bubble.isColliding(enemy)) {
                    enemy.life -= bubble.damage;
                    if (enemy.life <= 0 && !enemy.isDying)
                        enemy.die();
                    let bubbleIndex = this.attackObjects.indexOf(bubble);
                    if (bubbleIndex > -1)
                        this.attackObjects.splice(bubbleIndex, 1);
                }
            });
        });
        this.level.enemies = this.level.enemies.filter(enemy => !enemy.isRemoved);
    }

    /**
     * Checks for collisions between bubbles and the end boss.
     */
    checkCollisionBubbleWithEndboss() {
        this.attackObjects.forEach(bubble => {
            this.level.endBoss.forEach((endBoss) => {
                if (bubble.isColliding(endBoss)) {
                    endBoss.hit(bubble.damage);
                    let bubbleIndex = this.attackObjects.indexOf(bubble);
                    if (bubbleIndex > -1) {
                        this.attackObjects.splice(bubbleIndex, 1);
                    }
                }
            });
        });
    }

    /**
     * Checks for collisions between the character and non-animated collectible objects.
     */
    checkCollisionCharacterWithCoinsAndPoisons() {
        this.level.collectedObjects = this.level.collectedObjects.filter(collectedObject => {
            if (this.character.isColliding(collectedObject)) {
                if (collectedObject.type === 'coin') {
                    this.coinBar.increasePercentage(9);
                    soundManager.play('coin', true);
                }
                else if (collectedObject.type === 'poison') {
                    this.toxicBubbleBar.increasePercentage(20);
                    soundManager.play('potion', false);
                }
                return false;
            }
            return true;
        });
    }

    /**
    * Checks for collisions between the character and animated collectible objects.
    */
    checkCollisionCharacterWithAnimationPoisons() {
        this.level.collectedAnimationObjects = this.level.collectedAnimationObjects.filter(collectedObject => {
            if (this.character.isColliding(collectedObject)) {
                if (collectedObject.type === 'coin') {
                    this.coinBar.increasePercentage(8);
                    soundManager.play('coin', false);
                } else if (collectedObject.type === 'poison') {
                    this.toxicBubbleBar.increasePercentage(20);
                    soundManager.play('potion', false);
                }
                return false;
            }
            return true;
        });
    }

    /**
     * Main drawing loop that updates the canvas with all game elements.
     */
    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.cameraOnCharacter();
        this.drawObjectsThisRunningWithoutCamera();
        this.drawObjectsThisRunningWithCamera();
        let self = this;
        this.animationFrameId = requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Draws objects that should move with the camera as the character moves through the world.
     */
    drawObjectsThisRunningWithoutCamera() {
        this.context.translate(this.cameraX, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectToMap(this.character);
        this.addObjectsToMap(this.level.endBoss);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.attackObjects);
        this.addObjectsToMap(this.level.collectedObjects);
        this.addObjectsToMap(this.level.collectedAnimationObjects);
    }

    /**
     * Draws static objects that do not move with the camera, such as the user interface elements.
     */
    drawObjectsThisRunningWithCamera() {
        this.context.translate(-this.cameraX, 0);
        this.addObjectToMap(this.lifeBar);
        this.addObjectToMap(this.coinBar);
        this.addObjectToMap(this.toxicBubbleBar);
    }

    /**
     * Helper function to add multiple objects to the canvas.
     * @param {DrawableObject[]} objects - An array of objects to be drawn.
     */
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addObjectToMap(object);
        });
    }

    /**
     * Helper function to add a single object to the canvas.
     * @param {DrawableObject} object - The object to be drawn.
     */
    addObjectToMap(object) {
        if (object.img && object.img.complete && object.img.naturalHeight !== 0) {
            this.flipImage(object);
            this.context.drawImage(object.img, object.positionX, object.positionY, object.width, object.height);
            //object.drawFrame(this.context);
            this.flipImageBack(object);
        }
    }

    /**
     * Applies transformations to the canvas to flip an image horizontally.
     * @param {DrawableObject} object - The object whose image is to be flipped.
     */
    flipImage(object) {
        if (object.otherDirection) {
            this.context.save();
            this.context.translate(object.width, 0);
            this.context.scale(-1, 1);
            object.positionX = object.positionX * - 1;
        }
    }

    /**
     * Restores the canvas state after flipping an image.
     * @param {DrawableObject} object - The object whose image was flipped.
     */
    flipImageBack(object) {
        if (object.otherDirection) {
            object.positionX = object.positionX * - 1;
            this.context.restore();
        }
    }

    /**
     * Adjusts the camera position based on the character's movement, particularly when entering the boss zone.
     */
    cameraOnCharacter() {
        let cameraStartMovingRightX = this.canvas.width / 2.5;
        let maxCameraX = -(this.level.levelEndRightX + 140 - this.canvas.width);
        if (!this.bossZoneReached) {
            if (this.character.positionX > cameraStartMovingRightX)
                this.cameraX = Math.max(-(this.character.positionX - cameraStartMovingRightX), maxCameraX);
            if (this.character.positionX > 2500) {
                this.cameraX = -2160;
                this.bossZoneReached = true;
            }
        }
    }

    /**
     * Stops all intervals and animations when the game is over or when navigating away from the game view.
     */
    stopIntervalsAndAnimations() {
        if (this.gameOverCheckIntervalId) {
            clearInterval(this.gameOverCheckIntervalId);
            this.gameOverCheckIntervalId = null;
        }
        if (this.fireIntervalId) {
            clearInterval(this.fireIntervalId);
            this.fireIntervalId = null;
        }
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }
}