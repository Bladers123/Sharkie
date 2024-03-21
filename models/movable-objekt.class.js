class MovableObject extends DrawableObject {
    speed = 5;
    otherDirection = false;
    animationIntervalId;
    life = 100;
    lastHit;
    damage = 5;
    speedY = 0;
    acceleration = 2.5;

    playAnimation(imagesOfAnimation) {
        this.stopAnimation();
        this.animationIntervalId = setInterval(() => {
            let index = this.currentImage % imagesOfAnimation.length;
            let path = imagesOfAnimation[index];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 150);
    }

    stopAnimation() {
        if (this.animationIntervalId !== null) {
            clearInterval(this.animationIntervalId);
            this.animationIntervalId = null;
        }
    }

    isColliding(object) {
        return this.positionX + this.width > object.positionX &&
            this.positionX < object.positionX + object.width &&
            this.positionY < object.positionY + object.height &&
            this.positionY + this.height > object.positionY;
    }

    damageTaken() {
        this.life -= this.damage;
        if (this.life < 0) {
            this.life = 0;
        }
        else
            this.lastHit = new Date().getTime();
    }

    isHurt() {
        if (this.life < 100) {
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
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.positionY -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }
}