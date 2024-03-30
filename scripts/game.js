// game.js

let canvas;
let world;
let keyboard;
let character;
let soundManager;

function init() {
    canvas = document.getElementById('canvas');
    soundManager = new SoundManager();
    soundManager.addSound('bossfight', 'audio/bossfight.mp3');
    soundManager.addSound('win', 'audio/win.mp3');
}

function createWorld() {
    keyboard = new Keyboard();
    character = new Character(keyboard);
    world = new World(canvas, character);  
}

function getCharacter() {
    return character;
}

window.addEventListener('keydown', event => {
    switch (event.key) {
        case 'a':
            keyboard.left = true;
            break;
        case 's':
            keyboard.down = true;
            break;
        case 'd':
            keyboard.right = true;
            break;
        case 'w':
            keyboard.up = true;
            break;
        default:
            break;
    }

    if (keyboard.left || keyboard.right || keyboard.up || keyboard.down) {
        character.isCharacterMoving = true;
        character.startMovingAnimation();
    }
});

window.addEventListener('keyup', event => {
    switch (event.key) {
        case 'a':
            keyboard.left = false;
            break;
        case 's':
            keyboard.down = false;
            break;
        case 'd':
            keyboard.right = false;
            break;
        case 'w':
            keyboard.up = false;
            break;
        default:
            break;
    }

    if (!keyboard.left && !keyboard.right && !keyboard.up && !keyboard.down) {
        character.isCharacterMoving = false;
        character.stopMovingAnimation();
    }
});

window.addEventListener('keypress', (event) => {
    if (event.key === ' ') {
        keyboard.fire = true;
        character.initiateAttack('normal');
    }
    else if (event.key === 'e') {
        keyboard.fire = true;
        character.initiateAttack('poison');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    let fullscreenButton = document.getElementById('fullscreen');
    let introductionsButton = document.getElementById('introductions');
    let startButton = document.getElementById('startscreen');
    let tryAgainButton = document.getElementById('try-again');
    let tryAgainButtonInGameOverContainer = document.getElementById('try-again-in-game-over-container');
    let introductionsContainer = document.getElementById('introductions-container');
    let startscreenContainer = document.getElementById('startscreen-container');
    let winContainer = document.getElementById('win-container');
    let gameOverContainer = document.getElementById('game-over-container');
    let inGame = false;
    introductionsContainer.innerHTML = getIntroductionsTemplate();
    
    fullscreenButton.addEventListener('click', () => canvas.requestFullscreen());
    introductionsButton.addEventListener('click', () => onIntroductionsButton(inGame, introductionsContainer, startscreenContainer));
    startButton.addEventListener('click', () => onStartButton(startscreenContainer, fullscreenButton, canvas, inGame));
    tryAgainButton.addEventListener('click', () => onTryAgainButton(winContainer, canvas, gameOverContainer));
    tryAgainButtonInGameOverContainer.addEventListener('click', () => onTryAgainButton(winContainer, canvas, gameOverContainer));

});

function onIntroductionsButton(inGame, introductionsContainer, startscreenContainer) {
    if (inGame) {
        canvas.classList.toggle('display-block');
        introductionsContainer.classList.toggle('display-block');
    }
    else if (!inGame) {
        startscreenContainer.classList.toggle('display-none');
        introductionsContainer.classList.toggle('display-block');
    }
}

function onStartButton(startscreenContainer, fullscreenButton, canvas, inGame) {
    startscreenContainer.classList.add('display-none');
    fullscreenButton.classList.toggle('disabled-image');
    canvas.classList.remove('display-none');
    inGame = true;
    initLevel();
    createWorld();
}

function onTryAgainButton(winContainer, canvas, gameOverContainer) {
    winContainer.classList.add('display-none');
    gameOverContainer.classList.add('display-none');
    canvas.classList.remove('display-none');
    soundManager.stopAll();
    initLevel();
    createWorld();
}

function getIntroductionsTemplate() {
    return /*html*/`
    <div class="introductions-content">
        <div class="move">
            <img class="introductions-move-with-arrows-img" src="img/6.Botones/Key/arrow keys.png" alt="arrow-keys">
            <img src="img/6.Botones/Tittles/Move title.png" alt="move">
        </div>
        <div class="attack">
            <img class="introductions-attack-with-d-img" src="img/6.Botones/Key/D key.png" alt="d-key">
            <img src="img/6.Botones/Tittles/Attack tittle.png" alt="attack">
        </div>
        <div class="attack">
            <img class="introductions-attack-with-space-img" src="img/6.Botones/Key/Space Bar key.png" alt="space-key">
            <img src="img/6.Botones/Tittles/Attack tittle.png" alt="attack">
        </div>
    </div>
    `;
}



