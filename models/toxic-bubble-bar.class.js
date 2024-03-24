class ToxicBubbleBar extends DrawableObject{

    imagesOfToxicBubbleBar = [
        'img/4. Marcadores/Purple/0_.png',
        'img/4. Marcadores/Purple/20_.png',
        'img/4. Marcadores/Purple/40_.png',
        'img/4. Marcadores/Purple/60_.png',
        'img/4. Marcadores/Purple/80_.png',
        'img/4. Marcadores/Purple/100_.png'
    ];

    percentage = 0;

    constructor() {
        super().loadImages(this.imagesOfToxicBubbleBar);
        this.positionX = 20;
        this.positionY = 80;
        this.width = 200;
        this.height = 50;
        this.setPercentage(this.percentage);
    }       

    setPercentage(percentage) {
        this.percentage = percentage;
        let imagePath = this.imagesOfToxicBubbleBar[this.getImageIndex()]; 
        this.img = this.imageCache[imagePath];
    }

    getImageIndex() {
        if (this.percentage == 100)
            return 5;
        else if (this.percentage > 80)
            return 4;
        else if (this.percentage > 60)
            return 3;
        else if (this.percentage > 40)
            return 2;
        else if (this.percentage > 20)
            return 1;
        else
            return 0;
    }

    increasePercentage(amount) {
        this.setPercentage(Math.min(this.percentage + amount, 100));
    }
}