class MovableObject {
    positionX = 120;
    positionY = 250;
    img;
    width = 100;
    height = 100;
    imageCache = {};
    currentImage = 0;
    speed = 5;
    otherDirection = false;
    animationIntervalId;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(imagePath) {
        imagePath.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

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
}