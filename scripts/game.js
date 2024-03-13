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
            character.startAnimation();
            break;
        case 's':
            keyboard.down = true;
            character.move();
            character.startAnimation();
            break;
        case 'd':
            keyboard.right = true;
            character.startAnimation();
            break;
        case 'w':
            keyboard.up = true;
            character.startAnimation();
            break;
        case 'Space':
            keyboard.space = true;
            character.startAnimation();
            break;
        default:
            break;
    }
});

window.addEventListener('keyup', event => {
    switch (event.key) {
        case 'a':
            keyboard.left = false;
            character.stopAnimation();
            break;
        case 's':
            keyboard.down = false;
            character.stopAnimation();
            break;
        case 'd':
            keyboard.right = false;
            character.stopAnimation();
            break;
        case 'w':
            keyboard.up = false;
            character.stopAnimation();
            break;
        case 'Space':
            keyboard.space = false;
            character.stopAnimation();
            break;
        default:
            break;
    }
});

