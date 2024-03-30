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

    imagesOfHurt = [
        'img/2.Enemy/3 Final Enemy/Hurt/1.png',
        'img/2.Enemy/3 Final Enemy/Hurt/2.png',
        'img/2.Enemy/3 Final Enemy/Hurt/3.png',
        'img/2.Enemy/3 Final Enemy/Hurt/4.png',
    ];

    imagesOfDyingNormalEndBoss = [
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png'
    ];

    firstContactWithEndboss = false;
    endBossIsDead = false;

    constructor() {
        super();
        this.loadImages(this.imagesOfSpawning);
        this.loadImages(this.imagesOfSwimming);
        this.loadImages(this.imagesOfAttack);
        this.loadImages(this.imagesOfHurt);
        this.loadImages(this.imagesOfDyingNormalEndBoss);
        this.spawnPoint();
        this.bossSpawning();
        this.life = 200;
        this.width = 200;
        this.height = 200;
    }

    spawnPoint() {
        this.positionX = 2650;
        this.positionY = 120;
    }

    bossSpawning() {
        let animateFrame = () => {
            let character = getCharacter();
            if (character && character.positionX > 2500 && !this.firstContactWithEndboss) {
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

    die() {
        if (!this.isDying) {
            this.isDying = true;
            this.playAnimation(this.imagesOfDyingNormalEndBoss, false, true);
            setTimeout(() => {
                soundManager.stop('bossfight');
                soundManager.play('win');
                document.getElementById('win-container').classList.remove('display-none');
                canvas.classList.add('display-none');
                world.endBossDefeated = true;
            }, 1200);
        }
    }

    hit(damage) {
        if (!this.isDying) {
            this.life -= damage;
            if (this.life > 0) {
                console.log("Endboss getroffen, aktuelle Lebenspunkte: ", this.life);
                // Spiele die "verletzt" Animation ab
                this.playAnimation(this.imagesOfHurt, false, true);
                setTimeout(() => {
                    // Gehe zurück zur Schwimm- oder Angriffsanimation, je nach Zustand des Endbosses
                    if (!this.firstContactWithEndboss) {
                        this.playAnimation(this.imagesOfSpawning, false, false);
                    } else {
                        this.playAnimation(this.imagesOfSwimming, false, false);
                    }
                }, 1200); // Die Dauer sollte die Länge der "verletzt" Animation widerspiegeln
            } else {
                // Wenn der Endboss 0 Lebenspunkte erreicht, stirbt er
                this.die();
            }
        }
    }
    
}