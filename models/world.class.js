class World {

    character = new Charakter();
    enemy = new Fish();
    context;

    enemies = [
        new Fish(),
        new Fish(),
        new Fish()
    ];

    constructor(canvas) {
        this.context = canvas.getContext('2d');
        this.draw();
    }

    draw(){
        this.context.drawImage(this.character.img, this.character.positionX, this.character.positionY, this.character.width, this.character.height);
        this.context.drawImage(this.enemy.img, this.enemy.positionX, this.enemy.positionY, this.enemy.width, this.enemy.height);
    }
}