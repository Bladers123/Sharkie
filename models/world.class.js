class World {

    context;
    canvas;

    character = new Charakter();

    enemies = [
        new Enemy(),
        new Enemy(),
        new Enemy()
    ];

    backgroundObjects = [
        new BackgroundOject('../img/3. Background/Layers/3.Fondo 1/D1.png', 0)
    ];

    constructor(canvas) {
        this.context = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects){
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    addToMap(object) {
        this.context.drawImage(object.img, object.positionX, object.positionY, object.width, object.height);
    }
}