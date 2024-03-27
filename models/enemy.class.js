class Enemy extends MovableObject {

    imagesOfNormalPuffer = [
        '../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        '../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        '../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        '../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        '../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png'
    ];

    imagesOfTransitionPuffer = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim5.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition5.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim5.png'
    ];

    imagesOfNormalJelly = [
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png'
    ];

    imagesOfTransitionJelly = [
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 2.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 3.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 4.png'
    ];

    imagesOfDangerousJelly = [
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 2.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 3.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 4.png'
    ];

    imagesOfFollowingCharacter = [
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim4.png'
    ];

    imagesOfDyingNormalPuffer = [
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png',
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 2 (can animate by going down to the floor after the Fin Slap attack).png',
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 3 (can animate by going down to the floor after the Fin Slap attack).png',
    ];

    imagesOfDyingTransitionPuffer = [
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.2.png'
    ];

    imagesOfDyingNormalJelly = [
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L1.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L2.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L3.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L4.png',
    ];

    imagesOfDyingTransitionJelly = [
        'img/2.Enemy/2 Jelly fish/Dead/green/g1.png',
        'img/2.Enemy/2 Jelly fish/Dead/green/g2.png',
        'img/2.Enemy/2 Jelly fish/Dead/green/g3.png',
        'img/2.Enemy/2 Jelly fish/Dead/green/g4.png'
    ];

    imagesOfDyingDangerousJelly = [
        'img/2.Enemy/2 Jelly fish/Dead/Pink/P1.png',
        'img/2.Enemy/2 Jelly fish/Dead/Pink/P2.png',
        'img/2.Enemy/2 Jelly fish/Dead/Pink/P3.png',
        'img/2.Enemy/2 Jelly fish/Dead/Pink/P4.png'
    ];

    imagesOfDyingFollowingCharacter = [
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.2.png'
    ];


    height = 80;
    width = 80;
    direction;
    isDying;
    isRemoved;
    type;

    constructor(positionX, positionY, type) {
        super();
        this.loadImages(this.imagesOfNormalPuffer);
        this.loadImages(this.imagesOfTransitionPuffer);
        this.loadImages(this.imagesOfNormalJelly);
        this.loadImages(this.imagesOfTransitionJelly);
        this.loadImages(this.imagesOfDangerousJelly);
        this.loadImages(this.imagesOfFollowingCharacter);
        this.loadImages(this.imagesOfDyingNormalPuffer);
        this.loadImages(this.imagesOfDyingTransitionPuffer);
        this.loadImages(this.imagesOfDyingNormalJelly);
        this.loadImages(this.imagesOfDyingTransitionJelly);
        this.loadImages(this.imagesOfDyingDangerousJelly);
        this.loadImages(this.imagesOfDyingFollowingCharacter);

        this.type = type;
        this.isDying = false;
        this.isRemoved = false;
        this.loadEnemy(positionX, positionY); 
    }

    die() {
        if (!this.isDying) {
            this.isDying = true; 
            let dyingAnimation = this.selectDyingAnimation();
            this.playAnimation(dyingAnimation, false, true);
            setTimeout(() => {
                this.isRemoved = true;
            }, 700);
        }
    }

    selectDyingAnimation() {
        switch (this.type) {
            case 'puffer-normal':
                return this.imagesOfDyingNormalPuffer;
            case 'puffer-transition':
                return this.imagesOfDyingTransitionPuffer;
            case 'jelly-normal':
                return this.imagesOfDyingNormalJelly;
            case 'jelly-transition':
                return this.imagesOfDyingTransitionJelly;
            case 'jelly-dangerous':
                return this.imagesOfDyingDangerousJelly;
            case 'puffer-follow':
                return this.imagesOfDyingFollowingCharacter;
            default:
                return []; 
        }
    }

    loadEnemy(positionX, positionY) {
        if (this.type === 'puffer-normal') {
            this.setSpawnPoint(positionX, positionY);
            this.setSpeed(0.15 + Math.random());
            this.setLife(50);
            this.playAnimation(this.imagesOfNormalPuffer, false, false);
            this.moveLeft();
        }
        else if (this.type === 'puffer-transition') {
            this.setSpawnPoint(positionX, positionY);
            this.setSpeed(2);
            this.setLife(50);
            this.playAnimation(this.imagesOfTransitionPuffer, true, false);
            this.moveLeftAndRandomlyUpDown();
        }
        else if (this.type === 'jelly-normal') {
            this.setSpawnPoint(positionX, positionY);
            this.setSpeed(2);
            this.setLife(50);
            this.playAnimation(this.imagesOfNormalJelly, true, false);
            this.moveUpAndDown();
        }
        else if (this.type === 'jelly-transition') {
            this.setSpawnPoint(positionX, positionY);
            this.setSpeed(4);
            this.setLife(100);
            this.playAnimation(this.imagesOfTransitionJelly, true, false);
            this.moveUpAndDown();
        }
        else if (this.type === 'jelly-dangerous') {
            this.setSpawnPoint(positionX, positionY);
            this.setSpeed(8);
            this.setLife(150);
            this.playAnimation(this.imagesOfDangerousJelly, true, false);
            this.moveUpAndDown();
        }
        else if (this.type === 'puffer-follow') {
            this.setSpawnPoint(positionX, positionY);
            this.setSpeed(2);
            this.setLife(100);
            this.playAnimation(this.imagesOfFollowingCharacter, true, false);
            setTimeout(() => {
                this.moveToCharacter();
            }, 3000);
        }
    }

    setSpawnPoint(positionX, positionY) {
        this.positionX = positionX;
        this.positionY = positionY;
    }

    setSpeed(speed) {
        this.speed = speed;
    }

    setLife(life) {
        this.life = life;
    }

    moveLeft() {
        setInterval(() => {
            this.positionX -= this.speed;
        }, 1000 / 60);
    }

    moveUpAndDown() {
        this.direction = 1;
        setInterval(() => {
            this.positionY += this.speed * this.direction;
            if (this.positionY <= 0)
                this.direction = 1;
            else if (this.positionY >= 400)
                this.direction = -1;
        }, 1000 / 60);
    }

    moveLeftAndRandomlyUpDown() {
        let verticalSpeed = 0;
        let maxVerticalSpeed = 2;
        setInterval(() => {
            this.positionX -= this.speed;
            verticalSpeed += (Math.random() - 0.5) * 0.1;
            if (verticalSpeed > maxVerticalSpeed)
                verticalSpeed = maxVerticalSpeed;
            else if (verticalSpeed < -maxVerticalSpeed)
                verticalSpeed = -maxVerticalSpeed;
            this.positionY += verticalSpeed;
            if (this.positionY < 0) {
                this.positionY = 0;
                verticalSpeed = 0;
            } else if (this.positionY > 400) {
                this.positionY = 400;
                verticalSpeed = 0;
            }
        }, 1000 / 60);
    }

    moveToCharacter() {
        if (getCharacter()) {
            let followSpeed = 0.05;
            let inertia = 0.1;
            setInterval(() => {
                let charPos = getCharacter().positionX;
                let fishPos = this.positionX;

                this.otherDirection = charPos > fishPos;

                let diffX = charPos - fishPos;
                let diffY = getCharacter().positionY - this.positionY;

                this.positionX += diffX * followSpeed * inertia;
                this.positionY += diffY * followSpeed * inertia;

            }, 1000 / 60);
        }
    }


}