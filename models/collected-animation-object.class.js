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

    positionX;
    positionY;

    constructor(positionX, positionY) {
        super();
        this.loadImages(this.imagesOfPoisons);
        this.positionX = positionX;
        this.positionY = positionY;
        this.width = 60;
        this.height = 60;
        this.playAnimation(this.imagesOfPoisons);
    }
}
