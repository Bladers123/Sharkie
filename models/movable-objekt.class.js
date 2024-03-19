class MovableObject extends DrawableObject {
    speed = 5;
    otherDirection = false;
    animationIntervalId;
    life = 100;
    lastHit;
    damage = 5;

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
        console.log(this.life);
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
}