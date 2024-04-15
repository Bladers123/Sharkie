// mobileGameProperties.js

function createAttackButtons() {
    let finslapButton = document.createElement('button');
    let bubbleButton = document.createElement('button');
    createFinsSlapButton(finslapButton);
    createBubbleButton(bubbleButton);
    document.body.appendChild(finslapButton);
    document.body.appendChild(bubbleButton);
    onFinSlapButton(finslapButton);
    onBubbleButton(bubbleButton);
}

function onFinSlapButton(finslapButton) {
    finslapButton.addEventListener('click', function () {
        if (character) {
            keyboard.fire = true;
            character.initiateAttack('finSlap');
        }
    });
}

function onBubbleButton(bubbleButton) {
    bubbleButton.addEventListener('click', function () {
        if (character) {
            keyboard.fire = true;
            if (world.toxicBubbleBar && world.toxicBubbleBar.percentage > 0)
                character.initiateAttack('poison');
            else
                character.initiateAttack('normal');
        }
    });
}

function createFinsSlapButton(finslapButton) {
    finslapButton.id = 'finslap-attack-button';
    finslapButton.classList.add('finslap-attack-button');
    finslapButton.textContent = 'FS';
    finslapButton.style.display = 'none';
    finslapButton.style.display = 'block';
}
function createBubbleButton(bubbleButton) {
    bubbleButton.id = 'bubble-attack-button';
    bubbleButton.classList.add('bubble-attack-button');
    bubbleButton.textContent = 'BL';
    bubbleButton.style.display = 'none';
    bubbleButton.style.display = 'block';
}

function createJoystick() {
    let joystickElement = document.getElementById('joystick');
    if (joystickElement) {
        let joystick = initializeJoystick(joystickElement);
        movingWithJoystick(joystick);
        resetMovingWithJoystick(joystick);
    }
}

function initializeJoystick(joystickElement) {
    let joystick = nipplejs.create({
        zone: joystickElement,
        mode: 'static',
        position: { left: '50%', top: '50%' },
        color: 'white'
    });

    joystickElement.style.display = 'block';
    return joystick;
}

function movingWithJoystick(joystick) {
    joystick.on('move', function (event, data) {
        let angle = data.angle.degree;
        keyboard.left = false;
        keyboard.right = false;
        keyboard.up = false;
        keyboard.down = false;
        moveInDirection(angle);
        character.isCharacterMoving = true;
        character.startMovingAnimation();
    });
}

function resetMovingWithJoystick(joystick) {
    joystick.on('end', function () {
        keyboard.left = false;
        keyboard.right = false;
        keyboard.up = false;
        keyboard.down = false;
        character.isCharacterMoving = false;
        character.stopMovingAnimation();
    });
}

function moveInDirection(angle) {
    if (angle >= 337.5 || angle < 22.5) {
        keyboard.right = true;
    } else if (angle >= 22.5 && angle < 67.5) {
        keyboard.right = true;
        keyboard.up = true;
    } else if (angle >= 67.5 && angle < 112.5) {
        keyboard.up = true;
    } else if (angle >= 112.5 && angle < 157.5) {
        keyboard.up = true;
        keyboard.left = true;
    } else if (angle >= 157.5 && angle < 202.5) {
        keyboard.left = true;
    } else if (angle >= 202.5 && angle < 247.5) {
        keyboard.left = true;
        keyboard.down = true;
    } else if (angle >= 247.5 && angle < 292.5) {
        keyboard.down = true;
    } else if (angle >= 292.5 && angle < 337.5) {
        keyboard.down = true;
        keyboard.right = true;
    }
}

function checkOrientation() {
    if (window.innerWidth > window.innerHeight) {
        if (document.getElementById('joystick') && document.getElementById('finslap-attack-button') && document.getElementById('bubble-attack-button')) {
            document.getElementById('joystick').style.display = 'block';
            document.getElementById('finslap-attack-button').style.display = 'block';
            document.getElementById('bubble-attack-button').style.display = 'block';
        }
    } else {
        if (document.getElementById('joystick') && document.getElementById('finslap-attack-button') && document.getElementById('bubble-attack-button')) {
            document.getElementById('joystick').style.display = 'none';
            document.getElementById('finslap-attack-button').style.display = 'none';
            document.getElementById('bubble-attack-button').style.display = 'none';
        }
    }
}

window.addEventListener('load', checkOrientation);
window.addEventListener('resize', checkOrientation);
