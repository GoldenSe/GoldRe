class GameEngine {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.objects = [];
        this.events = [];
        this.lastTime = 0;

        window.addEventListener('resize', this.resize.bind(this));
        this.resize();
        this.loop = this.loop.bind(this);
        requestAnimationFrame(this.loop);
    }

    resize() {
        this.width = window.innerWidth - document.getElementById('sidebar').offsetWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    addObject(object) {
        this.objects.push(object);
        this.updateObjectList();
    }

    addEvent(event) {
        this.events.push(event);
        this.updateEventList();
    }

    removeObject(object) {
        const index = this.objects.indexOf(object);
        if (index > -1) {
            this.objects.splice(index, 1);
            this.updateObjectList();
        }
    }

    removeEvent(event) {
        const index = this.events.indexOf(event);
        if (index > -1) {
            this.events.splice(index, 1);
            this.updateEventList();
        }
    }

    update(dt) {
        for (const obj of this.objects) {
            if (obj.update) obj.update(dt);
        }

        this.handleCollisions();
        this.handleEvents();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        for (const obj of this.objects) {
            if (obj.draw) obj.draw(this.ctx);
        }
    }

    handleCollisions() {
        for (let i = 0; i < this.objects.length; i++) {
            for (let j = i + 1; j < this.objects.length; j++) {
                const obj1 = this.objects[i];
                const obj2 = this.objects[j];
                if (this.isColliding(obj1, obj2)) {
                    if (obj1.onCollision) obj1.onCollision(obj2);
                    if (obj2.onCollision) obj2.onCollision(obj1);
                }
            }
        }
    }

    isColliding(obj1, obj2) {
        return !(obj1.x + obj1.width < obj2.x ||
                 obj1.x > obj2.x + obj2.width ||
                 obj1.y + obj1.height < obj2.y ||
                 obj1.y > obj2.y + obj2.height);
    }

    handleEvents() {
        for (const event of this.events) {
            if (event.trigger()) {
                event.action();
                this.removeEvent(event); // Удаляем событие после его выполнения
            }
        }
    }

    loop(timestamp) {
        const dt = timestamp - this.lastTime;
        this.lastTime = timestamp;

        this.update(dt / 1000); // Convert to seconds
        this.draw();

        requestAnimationFrame(this.loop);
    }

    // Сохранение состояния
    saveState() {
        const state = {
            objects: this.objects.map(obj => ({
                x: obj.x,
                y: obj.y,
                width: obj.width,
                height: obj.height,
                color: obj.color
            })),
            events: this.events.map(event => ({
                trigger: event.trigger.toString(),
                action: event.action.toString()
            }))
        };
        localStorage.setItem('gameState', JSON.stringify(state));
    }

    // Загрузка состояния
    loadState() {
        const state = JSON.parse(localStorage.getItem('gameState'));
        if (state) {
            this.objects = state.objects.map(obj => new GameObject(obj.x, obj.y, obj.width, obj.height, obj.color));
            this.events = state.events.map(event => new Event(
                new Function('return ' + event.trigger)(),
                new Function('return ' + event.action)()
            ));
            this.updateObjectList();
            this.updateEventList();
        }
    }

    updateObjectList() {
        const select = document.getElementById('objectSelect');
        select.innerHTML = '';
        this.objects.forEach((obj, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = `Object ${index + 1}`;
            select.appendChild(option);
        });
    }

    updateEventList() {
        const eventsList = document.getElementById('eventsList');
        eventsList.innerHTML = '';
        this.events.forEach((event, index) => {
            const div = document.createElement('div');
            div.textContent = `Event ${index + 1}`;
            eventsList.appendChild(div);
        });
    }
}
