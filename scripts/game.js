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
        case 'Space':
            keyboard.space = true;
            break;
        default:
            break;
    }

    if (keyboard.left || keyboard.right || keyboard.up || keyboard.down) {
        character.isCharacterMoving = true;
        character.startAnimation();
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
        case 'Space':
            keyboard.space = false; // Gehe davon aus, dass dies auch eine Bewegungstaste ist
            break;
        default:
            break;
    }

    // Überprüfen, ob keine Bewegungstasten mehr gedrückt sind
    if (!keyboard.left && !keyboard.right && !keyboard.up && !keyboard.down) {
        character.isCharacterMoving = false;
        character.stopAni(); // Dies könnte optional sein, je nach gewünschtem Verhalten
    }
});


