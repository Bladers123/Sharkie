//level1.js

const level1 = new Level(
    [
        new Enemy(),
        new Enemy(),
        new Enemy(),
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
         new CollectedObject('img/4. Marcadores/1. Coins/4.png', 400, 120),
         new CollectedObject('img/4. Marcadores/1. Coins/4.png', 450, 80),
         new CollectedObject('img/4. Marcadores/1. Coins/4.png', 500, 40),
         new CollectedObject('img/4. Marcadores/1. Coins/4.png', 550, 40),
         new CollectedObject('img/4. Marcadores/1. Coins/4.png', 600, 80),
         new CollectedObject('img/4. Marcadores/1. Coins/4.png', 650, 120),
         new CollectedObject('img/4. Marcadores/1. Coins/4.png', 1300, 320),
         new CollectedObject('img/4. Marcadores/1. Coins/4.png', 1350, 360),
         new CollectedObject('img/4. Marcadores/1. Coins/4.png', 1400, 400),
         new CollectedObject('img/4. Marcadores/1. Coins/4.png', 1450, 400),
         new CollectedObject('img/4. Marcadores/1. Coins/4.png', 1500, 360),
         new CollectedObject('img/4. Marcadores/1. Coins/4.png', 1550, 320),
         new CollectedObject('img/4. Marcadores/Posión/Dark - Left.png', 560, 380, 60, 60),
         new CollectedObject('img/4. Marcadores/Posión/Dark - Right.png', 1750, 390, 60, 60)     
    ],
    [
        new CollectedAnimationObject(520, 100),
        new CollectedAnimationObject(1420, 300)    ]
)