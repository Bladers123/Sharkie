//level1.js

let level1;

function initLevel() {
    level1 = new Level(
        [
            new Enemy(200 + Math.random() * 500, 200 + Math.random() * 200, 'puffer-normal'),
            new Enemy(100 + Math.random() * 500, 200 + Math.random() * 200, 'puffer-normal'),
            new Enemy(200 + Math.random() * 500, 200 + Math.random() * 200, 'puffer-normal'),
            new Enemy(300 + Math.random() * 500, 200 + Math.random() * 200, 'puffer-transition'),
            new Enemy(400 + Math.random() * 500, 200 + Math.random() * 200, 'puffer-transition'),
            new Enemy(500 + Math.random() * 500, 200 + Math.random() * 200, 'puffer-transition'),
            new Enemy(600, 400, 'jelly-normal'),
            new Enemy(800, 400, 'jelly-normal'),
            new Enemy(1000, 400, 'jelly-normal'),
            new Enemy(700, 400, 'jelly-transition'),
            new Enemy(900, 400, 'jelly-transition'),
            new Enemy(1100, 400, 'jelly-transition'),
            new Enemy(1200 + Math.random() * 500, 200 + Math.random() * 200, 'puffer-normal'),
            new Enemy(1200 + Math.random() * 500, 200 + Math.random() * 200, 'puffer-normal'),
            new Enemy(1200 + Math.random() * 500, 200 + Math.random() * 200, 'puffer-normal'),
            new Enemy(1200 + Math.random() * 500, 200 + Math.random() * 200, 'puffer-transition'),
            new Enemy(1200 + Math.random() * 500, 200 + Math.random() * 200, 'puffer-transition'),
            new Enemy(1200 + Math.random() * 500, 200 + Math.random() * 200, 'puffer-transition'),
            new Enemy(1000 + Math.random() * 500, 100 + Math.random() * 200, 'puffer-follow'),
            new Enemy(2200 + Math.random() * 500, 300 + Math.random() * 200, 'puffer-follow'),
            new Enemy(1600, 200, 'jelly-dangerous'),
            new Enemy(1700, 100, 'jelly-dangerous'),
            new Enemy(1800, 300, 'jelly-dangerous')
        ],
        [
            new BackgroundObject('../img/3. Background/Layers/5. Water/D1.png', 0),
            new BackgroundObject('../img/3. Background/Layers/4.Fondo 2/D1.png', 0),
            new BackgroundObject('../img/3. Background/Layers/3.Fondo 1/D1.png', 0),
            new BackgroundObject('../img/3. Background/Layers/2. Floor/D1.png', 0),
            new BackgroundObject('../img/3. Background/Layers/1. Light/1.png', 0),
            new BackgroundObject('../img/3. Background/Layers/5. Water/D2.png', 720),
            new BackgroundObject('../img/3. Background/Layers/4.Fondo 2/D2.png', 720),
            new BackgroundObject('../img/3. Background/Layers/3.Fondo 1/D2.png', 720),
            new BackgroundObject('../img/3. Background/Layers/2. Floor/D2.png', 720),
            new BackgroundObject('../img/3. Background/Layers/1. Light/2.png', 720),
            new BackgroundObject('../img/3. Background/Layers/5. Water/D1.png', 720 * 2),
            new BackgroundObject('../img/3. Background/Layers/4.Fondo 2/D1.png', 720 * 2),
            new BackgroundObject('../img/3. Background/Layers/3.Fondo 1/D1.png', 720 * 2),
            new BackgroundObject('../img/3. Background/Layers/2. Floor/D1.png', 720 * 2),
            new BackgroundObject('../img/3. Background/Layers/1. Light/1.png', 720 * 2),
            new BackgroundObject('../img/3. Background/Layers/5. Water/D2.png', 720 * 3),
            new BackgroundObject('../img/3. Background/Layers/4.Fondo 2/D2.png', 720 * 3),
            new BackgroundObject('../img/3. Background/Layers/3.Fondo 1/D2.png', 720 * 3),
            new BackgroundObject('../img/3. Background/Layers/2. Floor/D2.png', 720 * 3),
            new BackgroundObject('../img/3. Background/Layers/1. Light/2.png', 720 * 3),
        ],
        [
            new Endboss()
        ],
        [
            new CollectedObject('img/4. Marcadores/Posión/Dark - Left.png', 560, 380, 60, 60, 'poison'),
            new CollectedObject('img/4. Marcadores/Posión/Dark - Right.png', 1750, 390, 60, 60, 'poison'),
        ],
        [
            new CollectedAnimationObject(520, 100, 'poison'),
            new CollectedAnimationObject(1420, 300, 'poison'),
            new CollectedAnimationObject(975, 200, 'poison'),
            new CollectedAnimationObject(400, 120, 'coin'),
            new CollectedAnimationObject(450, 80, 'coin'),
            new CollectedAnimationObject(500, 40, 'coin'),
            new CollectedAnimationObject(550, 40, 'coin'),
            new CollectedAnimationObject(600, 80, 'coin'),
            new CollectedAnimationObject(650, 120, 'coin'),
            new CollectedAnimationObject(1400, 400, 'coin'),
            new CollectedAnimationObject(1450, 400, 'coin'),
            new CollectedAnimationObject(1300, 320, 'coin'),
            new CollectedAnimationObject(1500, 360, 'coin'),
            new CollectedAnimationObject(1550, 320, 'coin'),
            new CollectedAnimationObject(1350, 360, 'coin'),
        ]
    )
}