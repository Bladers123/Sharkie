class Character extends MovableObject {

    height = 150;
    width = 150;
    positionY = 150;
    imagesWalking = [
        '../img/1.Sharkie/3.Swim/1.png',
        '../img/1.Sharkie/3.Swim/2.png',
        '../img/1.Sharkie/3.Swim/3.png',
        '../img/1.Sharkie/3.Swim/4.png',
        '../img/1.Sharkie/3.Swim/5.png',
        '../img/1.Sharkie/3.Swim/6.png'
    ];

    keyboard;
    animationFrameId;

    constructor(keyboard) {
        super().loadImage('../img/1.Sharkie/1.IDLE/1.png');
        this.loadImages(this.imagesWalking);
        this.keyboard = keyboard;
        this.animationFrameId = null;
    }

    animate() {
        if (this.keyboard.right || this.keyboard.left || this.keyboard.up || this.keyboard.down) {
            let index = this.currentImage % this.imagesWalking.length;
            let path = this.imagesWalking[index];
            this.img = this.imageCache[path];
            this.currentImage++;
        }
        this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
    }

    startAnimation() {
        if (!this.animationFrameId) {
            this.animate();
        }
    }

    stopAnimation() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }
}