class CollectedAnimationObject extends MovableObject {

    imagesOfPoisons = [
         'img/4. Marcadores/Posión/Animada/1.png',
         'img/4. Marcadores/Posión/Animada/2.png',
         'img/4. Marcadores/Posión/Animada/3.png',
         'img/4. Marcadores/Posión/Animada/4.png',
         'img/4. Marcadores/Posión/Animada/5.png',
         'img/4. Marcadores/Posión/Animada/6.png',
         'img/4. Marcadores/Posión/Animada/7.png',
         'img/4. Marcadores/Posión/Animada/8.png'
    ];

    imagesOfCoins = [
        'img/4. Marcadores/1. Coins/1.png',
        'img/4. Marcadores/1. Coins/2.png',
        'img/4. Marcadores/1. Coins/3.png',
        'img/4. Marcadores/1. Coins/4.png',
    ];

    positionX;
    positionY;
    type;

    constructor(positionX, positionY, type) {
        super();
        this.positionX = positionX;
        this.positionY = positionY;
        this.type = type;
        this.loadObjects();
    }

    loadObjects(){
        if (this.type === 'poison') {
            this.loadImages(this.imagesOfPoisons);
            this.playAnimation(this.imagesOfPoisons);
            this.width = 60;
            this.height = 60;
        } else if (this.type === 'coin') {
            this.loadImages(this.imagesOfCoins);
            this.playAnimation(this.imagesOfCoins);
            this.width = 40;
            this.height = 40;
        }
    }
}
