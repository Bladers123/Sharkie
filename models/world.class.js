class World {

    context;
    canvas;
    cameraX = 0;
    character;

    level = level1;
    enemies = level1.enemies;
    backgroundObjects = level1.backgroundObjects;

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
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
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
        if (object.img && object.img.complete && object.img.naturalHeight !== 0) {
            this.flipImage(object);
            this.context.drawImage(object.img, object.positionX, object.positionY, object.width, object.height);
            this.flipImageBack(object);
        }
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