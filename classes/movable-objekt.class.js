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

    playAnimation(imagesOfAnimation, repeatLastFour = false, runOnce = false) {
        this.stopAnimation();
        let index = 0;
        this.handleAnimationProgress(imagesOfAnimation, repeatLastFour, runOnce, index);
    }

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

    stopAnimation() {
        if (this.animationIntervalId !== null) {
            clearInterval(this.animationIntervalId);
            this.animationIntervalId = null;
        }
    }

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

    addMovementInterval(interval) {
        this.movementIntervalIds.push(interval);
    }

    isColliding(other) {
        return this.positionX < other.positionX + other.width &&
            this.positionX + this.width > other.positionX &&
            this.positionY < other.positionY + other.height &&
            this.positionY + this.height > other.positionY;
    }

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

    isHurt() {
        if (this.life < this.totalLife) {
            let timeSpan = new Date().getTime() - this.lastHit;
            timeSpan = timeSpan / 1000;
            return timeSpan < 1;
        }
        else
            return false;
    }

    isDead() {
        return this.life == 0;
    }

    isAboveGround() {
        if (this instanceof ThrowableObject)
            return true;
        else
            return this.positionY < 180;
    }

    applyGravity() {
        this.gravityIntervalId = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                if (this.immobilized) return;
                this.positionY -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

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