class GameEngine {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.objects = [];
        this.lastTime = 0;

        window.addEventListener('resize', this.resize.bind(this));
        this.resize();
        this.loop = this.loop.bind(this);
        requestAnimationFrame(this.loop);
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    addObject(object) {
        this.objects.push(object);
    }

    update(dt) {
        for (const obj of this.objects) {
            if (obj.update) obj.update(dt);
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        for (const obj of this.objects) {
            if (obj.draw) obj.draw(this.ctx);
        }
    }

    loop(timestamp) {
        const dt = timestamp - this.lastTime;
        this.lastTime = timestamp;

        this.update(dt / 1000); // Convert to seconds
        this.draw();

        requestAnimationFrame(this.loop);
    }
}

// Usage example
const engine = new GameEngine('gameCanvas');

// Define game objects
class GameObject {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

const player = new GameObject(50, 50, 100, 100, 'blue');
engine.addObject(player);
