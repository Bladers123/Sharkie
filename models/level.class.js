class Level{
    enemies;
    backgroundObjects;
    levelEndLeftX = 0;
    levelEndRightX = 720*3;
    levelEndUpY = -30;
    levelEndDownY = 320;
    

    constructor(enemies, backgroundObjects){
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
    }
}