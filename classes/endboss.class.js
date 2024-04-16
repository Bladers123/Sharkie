/**
 * Represents the final boss in the game with complex behaviors such as spawning, attacking, taking damage, and dying animations.
 * Extends MovableObject to utilize its movement capabilities and methods.
 */
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

    /**
    * Constructor for the Endboss class, which initializes the boss with various animation states and sets initial properties.
    */
    constructor() {
        super();
        this.loadImages(this.imagesOfSpawning);
        this.loadImages(this.imagesOfSwimming);
        this.loadImages(this.imagesOfAttack);
        this.loadImages(this.imagesOfHurt);
        this.loadImages(this.imagesOfDyingNormalEndBoss);
        this.spawnPoint();
        this.bossSpawning();
        this.life = 400;
        this.width = 200;
        this.height = 200;
        this.damage = 25;
    }

    /**
    * Sets the initial spawn point for the endboss.
    */
    spawnPoint() {
        this.positionX = 2650;
        this.positionY = 120;
    }

    /**
     * Initiates the spawning sequence which includes checking the player's position and starting the boss battle if conditions are met.
     */
    bossSpawning() {
        let animateFrame = () => {
            let character = getCharacter();
            if (character && character.positionX > 2500 && !this.firstContactWithEndboss)
                this.startBossBattleSequence(character);
            this.animationFrameId = requestAnimationFrame(animateFrame);
        };
        this.animationFrameId = requestAnimationFrame(animateFrame);
    }

    /**
    * Starts the sequence for the boss battle including stopping background music, playing boss fight music, and handling initial animations and invincibility.
    */
    startBossBattleSequence() {
        soundManager.stop('background');
        soundManager.play('bossfight', true);
        character.becomeInvincible(2000);
        this.playAnimation(this.imagesOfSpawning, false, true);
        this.firstContactWithEndboss = true;
        character.bossZoneReached = true;
        setTimeout(() => {
            this.playAnimation(this.imagesOfSwimming, false, false);
            this.startAttackInterval();
            this.moveToCharacter();
        }, 1500);
    }

    /**
    * Sets up an interval for the boss to perform attacks at regular intervals.
    */
    startAttackInterval() {
        this.attackInterval = setInterval(() => {
            this.attack();
        }, 5000);
    }

    /**
    * Handles the dying animation and sequence for the endboss, including stopping the attack interval and playing the victory sequence.
    */
    die() {
        if (!this.isDying) {
            this.isDying = true;
            this.playAnimation(this.imagesOfDyingNormalEndBoss, false, true);
            world.endBossDefeated = true;
            setTimeout(() => {
                this.finalizeBossDefeat();
            }, 1200);
            clearInterval(this.attackInterval);
        }
    }

    /**
     * Finalizes the boss defeat by updating the game state, stopping the boss music, and updating UI elements to reflect the victory.
     */
    finalizeBossDefeat() {
        soundManager.stop('bossfight');
        soundManager.play('win', false);
        document.getElementById('win-container').classList.remove('display-none');
        canvas.classList.remove('display-block');
        canvas.classList.add('display-none');
        document.getElementById('joystick').style.display = 'none';
        document.getElementById('finslap-attack-button').style.display = 'none';
        document.getElementById('bubble-attack-button').style.display = 'none';
        removeGameControls();
        gameWin = true;
        character.becomeInvincible(5000);
    }

    /**
    * Processes a hit received by the boss, updating health, playing hurt animations, and potentially triggering death.
    * @param {number} damage - The amount of damage to apply to the boss.
    */
    hit(damage) {
        if (!this.isDying) {
            this.life -= damage;
            if (this.life > 0)
                this.processHitAndRecover();
            else
                this.die();
        }
    }

    /**
    * Manages the recovery animation and behavior after taking damage.
    */
    processHitAndRecover() {
        this.immobilized = true;
        this.playAnimation(this.imagesOfHurt, false, true);
        setTimeout(() => {
            if (!this.firstContactWithEndboss)
                this.playAnimation(this.imagesOfSpawning, false, false);
            else
                this.playAnimation(this.imagesOfSwimming, false, false);
            this.immobilized = false;
        }, 2000);
    }

    /**
     * Handles the boss's attack action, including playing the attack animation and reverting to the swimming animation.
     */
    attack() {
        if (!this.isDying && !this.endBossIsDead && !this.immobilized) {
            this.playAnimation(this.imagesOfAttack, false, true);
            setTimeout(() => {
                this.playAnimation(this.imagesOfSwimming, false, false);
            }, 1500);
        }
    }
}