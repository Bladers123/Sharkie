/**
 * Represents a game level, containing all the elements that make up the gameplay environment, including enemies, the end boss, and various objects.
 */
class Level {
    enemies;
    endBoss;
    backgroundObjects;
    collectedObjects;
    collectedAnimationObjects;

    levelEndLeftX = 0;
    levelEndRightX = 2740;
    levelEndUpY = -30;
    levelEndDownY = 320;

    /**
     * Constructs a new Level instance with specified sets of game entities.
     * @param {Enemy[]} enemies - An array of enemies present in the level.
     * @param {BackgroundObject[]} backgroundObjects - An array of background objects that make up the visual environment of the level.
     * @param {Endboss} endBoss - The end boss of the level, typically a singular, significant enemy.
     * @param {CollectedObject[]} collectedObjects - An array of collectible objects that the player can interact with or collect.
     * @param {CollectedAnimationObject[]} collectedAnimationObjects - An array of animated collectible objects that add dynamic interactions.
     */
    constructor(enemies, backgroundObjects, endBoss, collectedObjects, collectedAnimationObjects) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.endBoss = endBoss;
        this.collectedObjects = collectedObjects;
        this.collectedAnimationObjects = collectedAnimationObjects;
    }
} 