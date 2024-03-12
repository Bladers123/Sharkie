class MovableObject {
    positionX = 120;
    positionY = 250;
    img;
    width = 100;
    height = 100;
    imageCache = {};

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(imagePath) {
        imagePath.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = path;
        });
    }



    jump() {

    }

    moveLeft() {

    }

    moveRight() {

    }


}