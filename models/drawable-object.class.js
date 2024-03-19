class DrawableObject{
    positionX = 120;
    positionY = 250;
    img;
    width = 100;
    height = 100;
    imageCache = {};
    currentImage = 0;

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

    drawFrame(context) {
        if (this instanceof Character || this instanceof Enemy || this instanceof Endboss) {
            context.beginPath();
            context.lineWidth = "10";
            context.strokeStyle = "blue";
            context.rect(this.positionX, this.positionY, this.width, this.height);
            context.stroke();
        }
    }
}