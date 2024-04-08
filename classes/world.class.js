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

    checkIsGameOver() {
        let gameOver = true;
        this.gameOverCheckIntervalId = setInterval(() => {
            if (this.character.isGameOver && gameOver) {
                setTimeout(() => {
                    let gameOverContainer = document.getElementById('game-over-container');
                    let introductionButton = document.getElementById('introductions');
                    if (gameOverContainer) {
                        gameOverContainer.classList.add('disabled-image');
                        introductionButton.classList.add('disabled-image');
                        gameOverContainer.classList.remove('display-none');
                        this.canvas.classList.remove('display-block');
                        this.canvas.classList.add('display-none');
                        gameOver = false;
                        soundManager.stop('background');
                        soundManager.stop('bossfight');
                        soundManager.play('gameover', false);
                        setTimeout(() => {
                            gameOverContainer.classList.remove('disabled-image');
                            introductionButton.classList.remove('disabled-image');
                        }, 3000);
                    }
                }, 2000);
            }
        }, 10);
    }

    fire() {
        this.fireIntervalId = setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200);
    }

    checkCollisions() {
        this.checkCollisionCharacterWithEndboss();
        this.checkCollisionCharacterWithEnemy();
        this.checkCollisionBubbleWithEnemy();
        this.checkCollisionBubbleWithEndboss();
        this.checkCollisionCharacterWithCoinsAndPoisons();
        this.checkCollisionCharacterWithAnimationPoisons();
    }

    checkCollisionCharacterWithEndboss() {
        this.level.endBoss.forEach(endBoss => {
            if (endBoss && !endBoss.isDying && !endBoss.endBossIsDead) {
                if (this.character.isColliding(endBoss)) {
                    this.character.lastDamageSource = 'normal';
                    this.character.damageTaken(endBoss.damage);
                    this.lifeBar.setPercentage(this.character.life);
                }
            }
        });
    }

    checkCollisionCharacterWithEnemy() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                if (enemy.type.startsWith('jelly')) {
                    this.character.lastDamageSource = 'electric';
                } else {
                    this.character.lastDamageSource = 'normal';
                }
                this.character.damageTaken(enemy.damage);
                this.lifeBar.setPercentage(this.character.life);
            }
        });
    }

    checkCollisionBubbleWithEnemy() {
        this.attackObjects.forEach(bubble => {
            this.level.enemies.forEach(enemy => {
                if (bubble.isColliding(enemy)) {
                    enemy.life -= bubble.damage;
                    if (enemy.life <= 0 && !enemy.isDying) {
                        enemy.die();
                    }
                    let bubbleIndex = this.attackObjects.indexOf(bubble);
                    if (bubbleIndex > -1) {
                        this.attackObjects.splice(bubbleIndex, 1);
                    }
                }
            });
        });
        this.level.enemies = this.level.enemies.filter(enemy => !enemy.isRemoved);
    }

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

    checkThrowObjects() {
        if (this.keyboard.fire) {
            this.character.initiateAttack();
            this.keyboard.fire = false;
        }
    }

    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.cameraOnCharacter();
        this.context.translate(this.cameraX, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectToMap(this.character);
        this.addObjectsToMap(this.level.endBoss);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.attackObjects);
        this.addObjectsToMap(this.level.collectedObjects);
        this.addObjectsToMap(this.level.collectedAnimationObjects);

        this.context.translate(-this.cameraX, 0);
        this.addObjectToMap(this.lifeBar);
        this.addObjectToMap(this.coinBar);
        this.addObjectToMap(this.toxicBubbleBar);

        let self = this;
        this.animationFrameId = requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addObjectToMap(object);
        });
    }

    addObjectToMap(object) {
        if (object.img && object.img.complete && object.img.naturalHeight !== 0) {
            this.flipImage(object);
            this.context.drawImage(object.img, object.positionX, object.positionY, object.width, object.height);
            // object.drawFrame(this.context);
            this.flipImageBack(object);
        }
    }

    flipImage(object) {
        if (object.otherDirection) {
            this.context.save();
            this.context.translate(object.width, 0);
            this.context.scale(-1, 1);
            object.positionX = object.positionX * - 1;
        }
    }

    flipImageBack(object) {
        if (object.otherDirection) {
            object.positionX = object.positionX * - 1;
            this.context.restore();
        }
    }

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