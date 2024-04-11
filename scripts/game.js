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

function init() {
    canvas = document.getElementById('canvas');
    keyboard = new Keyboard();
    soundManager = new SoundManager();
    addSounds();
}

function addSounds() {
    soundManager.addSound('bossfight', 'audio/bossfight.mp3');
    soundManager.addSound('win', 'audio/win.mp3');
    soundManager.addSound('background', 'audio/background.mp3');
    soundManager.addSound('coin', 'audio/coin.mp3');
    soundManager.addSound('potion', 'audio/potion.mp3');
    soundManager.addSound('gameover', 'audio/gameover.wav');
}

function createWorld() {
    character = new Character(keyboard);
    world = new World(canvas, character);
}

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


function startAnimation(event) {
    if (keyboard.left || keyboard.right || keyboard.up || keyboard.down) {
        event.preventDefault();
        character.isCharacterMoving = true;
        character.startMovingAnimation();
    }
}

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

function onGameIntroduction(gameIntroductionContainer){
     gameIntroductionContainer.classList.remove('display-none');
}

function onCloseGameIntroduction(gameIntroductionContainer){
    gameIntroductionContainer.classList.add('display-none');
}

function onIntroductionsButton(introductionsContainer){
    introductionsContainer.classList.remove('display-none');
}

function onCloseIntroductionsButton(introductionsContainer) {
    introductionsContainer.classList.add('display-none');
}

function onStartButton(startscreenContainer, fullscreenButton, canvas) {
    startscreenContainer.classList.add('display-none');
    fullscreenButton.classList.toggle('disabled-image');
    canvas.classList.remove('display-none');
    inGame = true;
    initLevel();
    createWorld();
}

function onTryAgainButton(winContainer, canvas, gameOverContainer) {
    winContainer.classList.add('display-none');
    winContainer.classList.remove('display-block');
    gameOverContainer.classList.add('display-none');
    canvas.classList.remove('display-none');
    resetWorld();
    initLevel();
    createWorld();
}

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

function getCharacter() {
    return character;
}