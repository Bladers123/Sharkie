class Level{
    enemies;
    endBoss;
    backgroundObjects;
    levelEndLeftX = 0;
    levelEndRightX = 720*3;
    levelEndUpY = -30;
    levelEndDownY = 320;
    

    constructor(enemies, backgroundObjects, endBoss){
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.endBoss = endBoss;
    }
} 