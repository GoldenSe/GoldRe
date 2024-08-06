// Пример добавления логики игры
class Player extends GameObject {
    constructor(x, y) {
        super(x, y, 50, 50, 'red');
        this.speed = 200; // Пикселей в секунду
    }

    update(dt) {
        const moveSpeed = this.speed * dt;
        if (keyState['ArrowUp']) this.y -= moveSpeed;
        if (keyState['ArrowDown']) this.y += moveSpeed;
        if (keyState['ArrowLeft']) this.x -= moveSpeed;
        if (keyState['ArrowRight']) this.x += moveSpeed;
    }
}

const player = new Player(100, 100);
engine.addObject(player);

// Управление клавишами
const keyState = {};

window.addEventListener('keydown', (e) => {
    keyState[e.code] = true;
});

window.addEventListener('keyup', (e) => {
    keyState[e.code] = false;
});
