class World {

    context;
    canvas;
    cameraX = 0;
    bossZoneReached = false;

    character;
    lifeBar = new LifeBar();
    coinBar = new CoinBar();
    toxicBubbleBar = new ToxicBubbleBar();

    throwableObjects = [];

    level = level1;
    enemies = level1.enemies;
    endBoss = level1.endBoss;
    backgroundObjects = level1.backgroundObjects;
    collectedObjects = level1.collectedObjects;
    collectedAnimationObjects = level1.collectedAnimationObjects;

    constructor(canvas, character) {
        this.context = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.character = character;
        this.draw();
        this.checkCollisions();
        this.fire();
    }

    fire() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200);
    }

    checkCollisions() {
        this.checkCollisionCharacterWithEnemy();
        this.checkCollisionBubbleWithEnemy();
        this.checkCollisionBubbleWithEndboss();
    }

    checkCollisionCharacterWithEnemy() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                this.character.damageTaken();
                this.lifeBar.setPercentage(this.character.life);
            }
        });
    }

    checkCollisionBubbleWithEnemy() {
        this.throwableObjects.forEach(bubble => {
            this.level.enemies.forEach((enemy, enemyIndex) => {
                if (bubble.isColliding(enemy)) {
                    enemy.life -= bubble.damage;
                    if (enemy.life <= 0) {
                        this.level.enemies.splice(enemyIndex, 1);
                    }
                    let bubbleIndex = this.throwableObjects.indexOf(bubble);
                    if (bubbleIndex > -1) {
                        this.throwableObjects.splice(bubbleIndex, 1);
                    }
                }
            });
        });
    }

    checkCollisionBubbleWithEndboss() {
        this.throwableObjects.forEach(bubble => {
            this.level.endBoss.forEach((endBoss, enemyIndex) => {
                if (bubble.isColliding(endBoss)) {
                    endBoss.life -= bubble.damage;
                    if (endBoss.life <= 0) {
                        this.level.endBoss.splice(enemyIndex, 1);
                        endBoss.endBossIsDead = true;
                    }
                    let bubbleIndex = this.throwableObjects.indexOf(bubble);
                    if (bubbleIndex > -1) {
                        this.throwableObjects.splice(bubbleIndex, 1);
                    }
                }
            });
        });
    }

    checkThrowObjects() {
        if (this.keyboard.fire) {
            let bubble = new ThrowableObject(this.character.positionX + 100, this.character.positionY + 100);
            this.throwableObjects.push(bubble);
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
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.collectedObjects);
        this.addObjectsToMap(this.level.collectedAnimationObjects);

        this.context.translate(-this.cameraX, 0);
        this.addObjectToMap(this.lifeBar);
        this.addObjectToMap(this.coinBar);
        this.addObjectToMap(this.toxicBubbleBar);

        let self = this;
        requestAnimationFrame(function () {
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
            object.drawFrame(this.context);
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
        let cameraStartMovingRightX = this.canvas.width / 1.5;
        let maxCameraX = -(this.level.levelEndRightX + 140 - this.canvas.width);
        if (!this.bossZoneReached) {
            if (this.character.positionX > cameraStartMovingRightX)
                this.cameraX = Math.max(-(this.character.positionX - cameraStartMovingRightX), maxCameraX);

            if (this.character.positionX > this.level.levelEndRightX) {
                console.log('Boss Start:', this.character.positionX);
                this.cameraX = -2160;
                this.bossZoneReached = true;
            }
        }
    }
}