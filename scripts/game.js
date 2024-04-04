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
    soundManager = new SoundManager();
    soundManager.addSound('bossfight', 'audio/bossfight.mp3');
    soundManager.addSound('win', 'audio/win.mp3');
    soundManager.addSound('background', 'audio/background.mp3');
    soundManager.addSound('coin', 'audio/coin.mp3');
    soundManager.addSound('potion', 'audio/potion.mp3');
    soundManager.addSound('gameover', 'audio/gameover.wav');
}

function createWorld() {
    keyboard = new Keyboard();
    character = new Character(keyboard);
    character.becomeInvincible(1000);
    world = new World(canvas, character);
    soundManager.play('background', true);
}

function getCharacter() {
    return character;
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
        character.initiateAttack('melee');
    }
    else if (event.key === 'd') {
        keyboard.fire = true;
        if (world.toxicBubbleBar && world.toxicBubbleBar.percentage > 0) {
            character.initiateAttack('poison');
        } else {
            character.initiateAttack('normal');
        }
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
    let startscreenContainer = document.getElementById('startscreen-container');
    let winContainer = document.getElementById('win-container');
    let gameOverContainer = document.getElementById('game-over-container');

    introductionsContainer.innerHTML = getIntroductionsTemplate();

    fullscreenButton.addEventListener('click', () => canvas.requestFullscreen());
    introductionsButton.addEventListener('click', () => onIntroductionsButton(introductionsContainer, startscreenContainer, winContainer, gameOverContainer));
    startButton.addEventListener('click', () => onStartButton(startscreenContainer, fullscreenButton, canvas));
    tryAgainButton.addEventListener('click', () => onTryAgainButton(winContainer, canvas, gameOverContainer));
    tryAgainButtonInGameOverContainer.addEventListener('click', () => onTryAgainButton(winContainer, canvas, gameOverContainer));
    toggleVolumeButton.addEventListener('click', () => onToggleVolumeButton());
});

function onIntroductionsButton(introductionsContainer, startscreenContainer, winContainer, gameOverContainer) {
    let areIntroductionsVisible = introductionsContainer.classList.contains('display-block');
    if (!gameWin) {
        if (inGame) {
            if (areIntroductionsVisible && !character.isGameOver) {
                introductionsContainer.classList.remove('display-block');
                canvas.classList.add('display-block');
            }
            else {
                if (character.isGameOver) {
                    if (areIntroductionsVisible) {
                        gameOverContainer.classList.remove('display-none');
                        introductionsContainer.classList.remove('display-block')
                    }
                    else {
                        gameOverContainer.classList.add('display-none');
                        introductionsContainer.classList.add('display-block')
                    }
                }
                else {
                    introductionsContainer.classList.add('display-block');
                    canvas.classList.remove('display-block');
                    canvas.classList.add('display-none');
                }
            }
        }
        else {
            if (areIntroductionsVisible) {
                introductionsContainer.classList.remove('display-block');
                startscreenContainer.classList.remove('display-none');
            }
            else {
                introductionsContainer.classList.add('display-block');
                startscreenContainer.classList.add('display-none');
            }
        }
    }
    else {
        if (areIntroductionsVisible) {
            introductionsContainer.classList.remove('display-block');
            introductionsContainer.classList.add('display-none');
            winContainer.classList.remove('display-none');
        }
        else {
            introductionsContainer.classList.add('display-block');
            introductionsContainer.classList.remove('display-none');
            winContainer.classList.remove('display-block');
            winContainer.classList.add('display-none');
            startscreenContainer.classList.add('display-none');
            canvas.classList.add('display-none');
        }
    }
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
    gameWin = false;
    world.endBossDefeated = false;
    soundManager.stopAll();
    initLevel();
    createWorld();
}

function onToggleVolumeButton() {
    let volumeSlider = document.getElementById('volume1');
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

function setVolumeOfSlider() {
    const volume = parseFloat(document.getElementById('volume1').value);
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



