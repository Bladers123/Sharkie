class World {

    context;
    canvas;
    cameraX = 0;
    character;

    enemies = [
        new Enemy(),
        new Enemy(),
        new Enemy()
    ];

    backgroundObjects = [
        new BackgroundOject('../img/3. Background/Layers/5. Water/D1.png', 0),
        new BackgroundOject('../img/3. Background/Layers/4.Fondo 2/D1.png', 0),
        new BackgroundOject('../img/3. Background/Layers/3.Fondo 1/D1.png', 0),
        new BackgroundOject('../img/3. Background/Layers/2. Floor/D1.png', 0),
        new BackgroundOject('../img/3. Background/Layers/1. Light/1.png', 0)
    ];

    constructor(canvas, character) {
        this.context = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.character = character;
        this.draw();
    }

    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.cameraOnCharacter();
        this.context.translate(this.cameraX, 0);
        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        this.context.translate(-this.cameraX, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    addToMap(object) {
        this.flipImage(object);
        this.context.drawImage(object.img, object.positionX, object.positionY, object.width, object.height);
        this.flipImageBack(object);
    }

    flipImage(object) {
        if (object.otherDirection) {
            this.context.save();
            this.context.translate(object.width, 0);
            this.context.scale(-1, 1);
            object.positionX = object.positionX * - 1;
        }
    }

    flipImageBack(object) {
        if (object.otherDirection) {
            object.positionX = object.positionX * - 1;
            this.context.restore();
        }
    }

    cameraOnCharacter() {
        this.cameraX = -this.character.positionX;
    }
}