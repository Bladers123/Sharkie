// game.js

let canvas;
let world;
let keyboard;
let character;
let soundManager;
let isMuted = false;
let oldVolume;
let inGame = false;
let gameWin = false;

/**
 * Initializes the game by setting up the canvas, the keyboard handler, the sound manager, and loading sounds.
 */
function init() {
    canvas = document.getElementById('canvas');
    keyboard = new Keyboard();
    soundManager = new SoundManager();
    addSounds();
}

/**
 * Loads and adds sound effects to the game.
 */
function addSounds() {
    soundManager.addSound('bossfight', 'audio/bossfight.mp3');
    soundManager.addSound('win', 'audio/win.mp3');
    soundManager.addSound('background', 'audio/background.mp3');
    soundManager.addSound('coin', 'audio/coin.mp3');
    soundManager.addSound('potion', 'audio/potion.mp3');
    soundManager.addSound('gameover', 'audio/gameover.wav');
}

/**
 * Creates the game world by initializing the character and setting up the world.
 */
function createWorld() {
    character = new Character(keyboard);
    world = new World(canvas, character);
    createControlsForMobile();
}

/**
 * Resets the game world to its initial state, stopping all animations and clearing enemies and attack objects.
 */
function resetWorld() {
    world.character.stopIntervals();
    world.enemies.forEach(enemy => enemy.stopIntervals());
    world.attackObjects.forEach(object => object.stopIntervals());
    world.endBosses.forEach(endBoss => endBoss.stopIntervals());
    world.stopIntervalsAndAnimations();
    world.enemies = [];
    world.attackObjects = [];
    soundManager.stopAll();
    world.lifeBar.setPercentage(100);
    world.coinBar.setPercentage(0);
    world.toxicBubbleBar.setPercentage(0);
    gameWin = false;
    world.endBossDefeated = false;
}

/**
 * Creates mobile controls, including attack buttons and a joystick.
 */
function createControlsForMobile() {
    createAttackButtons();
    createJoystick();
}

/**
 * Event handler for 'keypress' events to manage special attacks based on key inputs.
 * ' ' (spacebar) triggers a fin slap attack.
 * 'd' triggers a poison attack if the toxic bubble bar is filled, otherwise a normal attack.
 * @param {KeyboardEvent} event - The event object containing details about the key pressed.
 */
window.addEventListener('keydown', event => {
    switch (event.key) {
        case 'ArrowLeft':
            keyboard.left = true;
            break;
        case 'ArrowDown':
            keyboard.down = true;
            break;
        case 'ArrowRight':
            keyboard.right = true;
            break;
        case 'ArrowUp':
            keyboard.up = true;
            break;
    }
    startAnimation(event);
});

window.addEventListener('keyup', event => {
    switch (event.key) {
        case 'ArrowLeft':
            keyboard.left = false;
            break;
        case 'ArrowDown':
            keyboard.down = false;
            break;
        case 'ArrowRight':
            keyboard.right = false;
            break;
        case 'ArrowUp':
            keyboard.up = false;
            break;
    }
    stopAnimation();
});

/**
 * Handles the 'keydown' event by updating the keyboard state and starting character animation based on the key pressed.
 * @param {Event} event - The keydown event object.
 */
function startAnimation(event) {
    if (keyboard.left || keyboard.right || keyboard.up || keyboard.down) {
        event.preventDefault();
        character.isCharacterMoving = true;
        character.startMovingAnimation();
    }
}

/**
 * Handles the 'keyup' event by updating the keyboard state and stopping character animation if no movement keys are pressed.
 */
function stopAnimation() {
    if (!keyboard.left && !keyboard.right && !keyboard.up && !keyboard.down) {
        character.isCharacterMoving = false;
        character.stopMovingAnimation();
    }
}

window.addEventListener('keypress', (event) => {
    if (event.key === ' ') {
        keyboard.fire = true;
        character.initiateAttack('finSlap');
    }
    else if (event.key === 'd') {
        keyboard.fire = true;
        if (world.toxicBubbleBar && world.toxicBubbleBar.percentage > 0)
            character.initiateAttack('poison');
        else
            character.initiateAttack('normal');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    let fullscreenButton = document.getElementById('fullscreen');
    let introductionsButton = document.getElementById('introductions');
    let startButton = document.getElementById('startscreen');
    let tryAgainButton = document.getElementById('try-again');
    let tryAgainButtonInGameOverContainer = document.getElementById('try-again-in-game-over-container');
    let toggleVolumeButton = document.getElementById('volume');
    let introductionsContainer = document.getElementById('introductions-container');
    let introductionsCloseContainerButton = document.getElementById('close-introduction');
    let startscreenContainer = document.getElementById('startscreen-container');
    let winContainer = document.getElementById('win-container');
    let gameOverContainer = document.getElementById('game-over-container');
    let volumeSlider = document.getElementById('volumeSlider');
    let gameIntroductionContainer = document.getElementById('game-introduction-container');
    let gameIntroductionButton = document.getElementById('game-introduction');
    let gameIntroductionCloseButton = document.getElementById('close-game-introduction');
    loadEvents(fullscreenButton, introductionsButton, startButton, tryAgainButton, tryAgainButtonInGameOverContainer, toggleVolumeButton, introductionsContainer, startscreenContainer, winContainer, gameOverContainer, volumeSlider, gameIntroductionContainer, gameIntroductionButton, gameIntroductionCloseButton, introductionsCloseContainerButton);
});

/**
 * Initializes event listeners for various UI buttons and sliders in the game interface.
 * Handles events for fullscreen toggle, starting the game, retrying, toggling volume, and navigating the introduction and game instruction screens.
 * @param {HTMLElement} fullscreenButton - Button to toggle fullscreen mode.
 * @param {HTMLElement} introductionsButton - Button to open game introductions.
 * @param {HTMLElement} startButton - Button to start the game.
 * @param {HTMLElement} tryAgainButton - Button to retry the game.
 * @param {HTMLElement} tryAgainButtonInGameOverContainer - Another retry button in the game over screen.
 * @param {HTMLElement} toggleVolumeButton - Button to toggle sound volume.
 * @param {HTMLElement} introductionsContainer - Container for game introductions.
 * @param {HTMLElement} startscreenContainer - Container for the start screen.
 * @param {HTMLElement} winContainer - Container shown when the game is won.
 * @param {HTMLElement} gameOverContainer - Container shown when the game is over.
 * @param {HTMLElement} volumeSlider - Slider to adjust the game volume.
 * @param {HTMLElement} gameIntroductionContainer - Container for detailed game introductions.
 * @param {HTMLElement} gameIntroductionButton - Button to open detailed game introductions.
 * @param {HTMLElement} gameIntroductionCloseButton - Button to close detailed game introductions.
 * @param {HTMLElement} introductionsCloseButton - Button to close game introductions.
 */
function loadEvents(fullscreenButton, introductionsButton, startButton, tryAgainButton, tryAgainButtonInGameOverContainer, toggleVolumeButton, introductionsContainer, startscreenContainer, winContainer, gameOverContainer, volumeSlider, gameIntroductionContainer, gameIntroductionButton, gameIntroductionCloseButton, introductionsCloseButton) {
    fullscreenButton.addEventListener('click', () => canvas.requestFullscreen());
    introductionsButton.addEventListener('click', () => onIntroductionsButton(introductionsContainer));
    introductionsCloseButton.addEventListener('click', () => onCloseIntroductionsButton(introductionsContainer));
    startButton.addEventListener('click', () => onStartButton(startscreenContainer, fullscreenButton, canvas));
    tryAgainButton.addEventListener('click', () => onTryAgainButton(winContainer, canvas, gameOverContainer));
    tryAgainButtonInGameOverContainer.addEventListener('click', () => onTryAgainButton(winContainer, canvas, gameOverContainer));
    toggleVolumeButton.addEventListener('click', () => onToggleVolumeButton(volumeSlider));
    volumeSlider.addEventListener('input', () => onVolumeSlider(volumeSlider));
    gameIntroductionButton.addEventListener('click', () => onGameIntroduction(gameIntroductionContainer));
    gameIntroductionCloseButton.addEventListener('click', () => onCloseGameIntroduction(gameIntroductionContainer));
}

/**
 * Reveals the game introduction panel.
 * @param {HTMLElement} gameIntroductionContainer - Container for the game introduction.
 */
function onGameIntroduction(gameIntroductionContainer) {
    gameIntroductionContainer.classList.remove('display-none');
}

/**
 * Hides the game introduction panel.
 * @param {HTMLElement} gameIntroductionContainer - Container for the game introduction.
 */
function onCloseGameIntroduction(gameIntroductionContainer) {
    gameIntroductionContainer.classList.add('display-none');
}

/**
 * Opens the game introductions overlay.
 * @param {HTMLElement} introductionsContainer - Container for game introductions.
 */
function onIntroductionsButton(introductionsContainer) {
    introductionsContainer.classList.remove('display-none');
}

/**
 * Closes the game introductions overlay.
 * @param {HTMLElement} introductionsContainer - Container for game introductions.
 */
function onCloseIntroductionsButton(introductionsContainer) {
    introductionsContainer.classList.add('display-none');
}

/**
 * Begins the game from the start screen and optionally requests fullscreen for the canvas.
 * @param {HTMLElement} startscreenContainer - The start screen container to be hidden.
 * @param {HTMLElement} fullscreenButton - Fullscreen toggle button.
 * @param {HTMLCanvasElement} canvas - The game canvas element.
 */
function onStartButton(startscreenContainer, fullscreenButton, canvas) {
    startscreenContainer.classList.add('display-none');
    fullscreenButton.classList.toggle('disabled-image');
    canvas.classList.remove('display-none');
    inGame = true;
    initLevel();
    createWorld();
}

/**
 * Resets the game world and reinitializes it, typically called after a game over or win.
 * @param {HTMLElement} winContainer - The win screen container.
 * @param {HTMLCanvasElement} canvas - The game canvas element.
 * @param {HTMLElement} gameOverContainer - The game over screen container.
 */
function onTryAgainButton(winContainer, canvas, gameOverContainer) {
    winContainer.classList.add('display-none');
    winContainer.classList.remove('display-block');
    gameOverContainer.classList.add('display-none');
    canvas.classList.remove('display-none');
    resetWorld();
    initLevel();
    createWorld();
}

/**
 * Toggles the volume on and off. When muted, sets the volume to 0 and updates the volume icon to show the muted state.
 * Restores the volume to its previous level when unmuted and updates the icon accordingly.
 * @param {HTMLInputElement} volumeSlider - The slider element used to adjust the game's volume.
 */
function onToggleVolumeButton(volumeSlider) {
    if (!isMuted) {
        soundManager.setVolumeForAll(0);
        oldVolume = parseFloat(volumeSlider.value);
        isMuted = true;
        volumeSlider.value = 0;
        document.getElementById('volume').src = "img/Additional/mute.png";
    } else {
        soundManager.setVolumeForAll(oldVolume);
        isMuted = false;
        volumeSlider.value = oldVolume;
        document.getElementById('volume').src = "img/Additional/volume.png";
    }
}

/**
 * Adjusts the game volume according to the value of the volume slider and updates the volume icon based on the current volume.
 * If the volume is set to 0, it is considered muted, otherwise, it is unmuted.
 * @param {HTMLInputElement} volumeSlider - The slider element used to adjust the game's volume.
 */
function onVolumeSlider(volumeSlider) {
    if (volumeSlider) {
        let volume = parseFloat(volumeSlider.value);
        soundManager.setVolumeForAll(volume);
        if (volume === 0) {
            document.getElementById('volume').src = "img/Additional/mute.png";
            isMuted = true;
        }
        else {
            document.getElementById('volume').src = "img/Additional/volume.png";
            isMuted = false;
        }
    }
    else
        soundManager.setVolumeForAll(0.01);
}

/**
 * Retrieves the current character instance from the game.
 * @returns {Character} The current character object.
 */
function getCharacter() {
    return character;
}