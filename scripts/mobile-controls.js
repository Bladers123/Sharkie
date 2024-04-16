// mobileGameProperties.js

/**
 * Creates mobile controls, including attack buttons and a joystick.
 */
function createControlsForMobile() {
    createAttackButtons();
    createJoystick();
    checkOrientation();
}

/**
 * Creates attack buttons for mobile controls and attaches event listeners for these buttons.
 */
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

/**
 * Adds an event listener to the Fin Slap button for initiating the Fin Slap attack.
 * @param {HTMLElement} finslapButton - The button that triggers the Fin Slap attack.
 */
function onFinSlapButton(finslapButton) {
    finslapButton.addEventListener('click', function () {
        if (character) {
            keyboard.fire = true;
            character.initiateAttack('finSlap');
        }
    });
}

/**
 * Adds an event listener to the Bubble button for initiating either a poison or normal attack based on the toxic bubble bar's status.
 * @param {HTMLElement} bubbleButton - The button that triggers bubble attacks.
 */
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

/**
 * Sets properties for the Fin Slap attack button.
 * @param {HTMLElement} finslapButton - The button designated for Fin Slap attacks.
 */
function createFinsSlapButton(finslapButton) {
    finslapButton.id = 'finslap-attack-button';
    finslapButton.classList.add('finslap-attack-button');
    finslapButton.textContent = 'FS';
}

/**
 * Sets properties for the Bubble attack button.
 * @param {HTMLElement} bubbleButton - The button designated for Bubble attacks.
 */
function createBubbleButton(bubbleButton) {
    bubbleButton.id = 'bubble-attack-button';
    bubbleButton.classList.add('bubble-attack-button');
    bubbleButton.textContent = 'BL';
}

/**
 * Creates and configures a joystick for mobile navigation.
 */
function createJoystick() {
    let joystickElement = document.getElementById('joystick');
    if (joystickElement)
        return;
    else {
        joystickElement = document.createElement('div');
        joystickElement.id = 'joystick';
        joystickElement.classList.add('joystick');
        document.body.appendChild(joystickElement);
        let joystick = initializeJoystick(joystickElement);
        movingWithJoystick(joystick);
        resetMovingWithJoystick(joystick);
    }
}

/**
 * Initializes the joystick control using the nipplejs library.
 * @param {HTMLElement} joystickElement - The DOM element where the joystick will be rendered.
 * @returns {Object} The created joystick instance.
 */
function initializeJoystick(joystickElement) {
    let joystick = nipplejs.create({
        zone: joystickElement,
        mode: 'static',
        position: { left: '50%', top: '50%' },
        color: 'white'
    });

    return joystick;
}

/**
 * Configures joystick movement handling, updating character direction based on joystick movement.
 * @param {Object} joystick - The joystick instance to attach the movement listener to.
 */
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

/**
 * Resets movement when joystick is released, stopping the character's movement.
 * @param {Object} joystick - The joystick instance to attach the end listener to.
 */
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

/**
 * Calculates the direction of movement based on the angle provided by the joystick.
 * @param {number} angle - The angle in degrees, provided by the joystick, indicating the direction of movement.
 */
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

/**
 * Adjusts the display of mobile controls based on screen orientation.
 */
function checkOrientation() {
    let isLandscape = window.innerWidth > window.innerHeight;
    let isWidthUnder1000 = window.innerWidth < 1000;
    let hasAllControls = document.getElementById('joystick') && document.getElementById('finslap-attack-button') && document.getElementById('bubble-attack-button');
    if (isLandscape && isWidthUnder1000 && hasAllControls) {
        document.getElementById('joystick').style.display = 'block';
        document.getElementById('finslap-attack-button').style.display = 'block';
        document.getElementById('bubble-attack-button').style.display = 'block';
    } else if (hasAllControls) {
        document.getElementById('joystick').style.display = 'none';
        document.getElementById('finslap-attack-button').style.display = 'none';
        document.getElementById('bubble-attack-button').style.display = 'none';
    }
}

window.addEventListener('load', checkOrientation);
window.addEventListener('resize', checkOrientation);


/**
 * Remove the mobile controls.
 */
function removeGameControls() {
    let joystick = document.getElementById('joystick');
    let finslapButton = document.getElementById('finslap-attack-button');
    let bubbleButton = document.getElementById('bubble-attack-button');
    if (joystick)
        joystick.parentNode.removeChild(joystick);
    if (finslapButton)
        finslapButton.parentNode.removeChild(finslapButton);
    if (bubbleButton)
        bubbleButton.parentNode.removeChild(bubbleButton);
}
