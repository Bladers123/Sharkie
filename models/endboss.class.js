class Endboss extends MovableObject {

    imagesOfSpawning = [
        'img/2.Enemy/3 Final Enemy/1.Introduce/1.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/2.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/3.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/4.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/5.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/6.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/7.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/8.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/9.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/10.png'
    ];

    imagesOfSwimming = [
        'img/2.Enemy/3 Final Enemy/2.floating/1.png',
        'img/2.Enemy/3 Final Enemy/2.floating/2.png',
        'img/2.Enemy/3 Final Enemy/2.floating/3.png',
        'img/2.Enemy/3 Final Enemy/2.floating/4.png',
        'img/2.Enemy/3 Final Enemy/2.floating/5.png',
        'img/2.Enemy/3 Final Enemy/2.floating/6.png',
        'img/2.Enemy/3 Final Enemy/2.floating/7.png',
        'img/2.Enemy/3 Final Enemy/2.floating/8.png',
        'img/2.Enemy/3 Final Enemy/2.floating/9.png',
        'img/2.Enemy/3 Final Enemy/2.floating/10.png',
        'img/2.Enemy/3 Final Enemy/2.floating/11.png',
        'img/2.Enemy/3 Final Enemy/2.floating/12.png',
        'img/2.Enemy/3 Final Enemy/2.floating/13.png'
    ];

    firstContactWithEndboss = false;

    constructor() {
        super();
        this.loadImages(this.imagesOfSpawning);
        this.loadImages(this.imagesOfSwimming);
        this.spawnPoint();
        this.bossSpawning();
        this.life = 500;
        this.width = 400;
        this.height = 400;
    }

    spawnPoint() {
        this.positionX = 2500;
        this.positionY = 0;
    }

    bossSpawning() {
        let animateFrame = () => {
            let characterObj = getCharacter();
            if (characterObj && characterObj.positionX > 2000 && !this.firstContactWithEndboss) {
                this.playAnimation(this.imagesOfSpawning);
                this.firstContactWithEndboss = true;
                setTimeout(() => {
                    this.playAnimation(this.imagesOfSwimming);
                }, 1500);
            }
            requestAnimationFrame(animateFrame);
        };
        requestAnimationFrame(animateFrame);
    }
}