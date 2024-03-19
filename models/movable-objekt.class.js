class MovableObject extends DrawableObject {
    speed = 5;
    otherDirection = false;
    animationIntervalId;
    life = 100;
    lastHit;

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

    drawFrame(context) {
        if (this instanceof Character || this instanceof Enemy || this instanceof Endboss) {
            context.beginPath();
            context.lineWidth = "10";
            context.strokeStyle = "blue";
            context.rect(this.positionX, this.positionY, this.width, this.height);
            context.stroke();
        }
    }

    isColliding(object) {
        return this.positionX + this.width > object.positionX &&
            this.positionX < object.positionX + object.width &&
            this.positionY < object.positionY + object.height &&
            this.positionY + this.height > object.positionY;
    }

    damageTaken() {
        this.life -= 5;
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