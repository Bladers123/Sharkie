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

    imagesOfAttack = [
        'img/2.Enemy/3 Final Enemy/Attack/1.png',
        'img/2.Enemy/3 Final Enemy/Attack/2.png',
        'img/2.Enemy/3 Final Enemy/Attack/3.png',
        'img/2.Enemy/3 Final Enemy/Attack/4.png',
        'img/2.Enemy/3 Final Enemy/Attack/5.png',
        'img/2.Enemy/3 Final Enemy/Attack/6.png'
    ];

    firstContactWithEndboss = false;
    endBossIsDead = false;

    constructor() {
        super();
        this.loadImages(this.imagesOfSpawning);
        this.loadImages(this.imagesOfSwimming);
        this.loadImages(this.imagesOfAttack);
        this.spawnPoint();
        this.bossSpawning();
        this.life = 50;
        this.width = 200;
        this.height = 200;
        this.checkEndbossDead();
    }



    spawnPoint() {
        this.positionX = 2650;
        this.positionY = 120;
    }

    bossSpawning() {
        let animateFrame = () => {
            let character = getCharacter();
            if (character && character.positionX > 2500 && !this.firstContactWithEndboss) {
                //this.endBossBeginningMusic.play();
                soundManager.play('bossfight', false);
                this.playAnimation(this.imagesOfSpawning, false, true);
                this.firstContactWithEndboss = true;
                character.bossZoneReached = true;
                setTimeout(() => {
                    this.playAnimation(this.imagesOfSwimming, false, false);
                }, 1500);
            }
            requestAnimationFrame(animateFrame);
        };
        requestAnimationFrame(animateFrame);
    }

    checkEndbossDead() {
        setInterval(() => {
            if (this.endBossIsDead) {
                soundManager.stop('bossfight');
                soundManager.play('win');
                this.endBossIsDead = false;
                world.endBossDefeated = true;
                //this.playAnimation(this.imagesOfAttack, false, true);

                setTimeout(() => {
                
                }, 4000);
            }
        }, 200);
    }
}