// game.js

let canvas;
let world;
let keyboard;
let character;

function init() {
    canvas = document.getElementById('canvas');
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
    document.getElementById('fullscreen').addEventListener('click', function () {
        canvas.requestFullscreen();
    });

    document.getElementById('introductions').addEventListener('click', function () {
        let introductionsContainer = document.getElementById('introductions-container');
        introductionsContainer.innerHTML = getIntroductionsTemplate();
        introductionsContainer.classList.toggle('display-block');
        canvas.classList.toggle('display-none');
    });
});

function getIntroductionsTemplate() {
    return /*html*/`
    <div class="introductions-content">
        <img class="introductions-images" src="img/6.Botones/Key/D key.png" alt="d-key">
        <img class="introductions-images" src="img/6.Botones/Key/Space Bar key.png" alt="space-key">
        <img class="introductions-images" src="img/6.Botones/Key/arrow keys.png" alt="arrow-keys">
    </div>
    `;
}



