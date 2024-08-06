const engine = new GameEngine('gameCanvas');

// Инициализация интерфейса
const objectSelect = document.getElementById('objectSelect');
const objectProperties = document.getElementById('objectProperties');

// Обработка выбора объекта
objectSelect.addEventListener('change', () => {
    const index = parseInt(objectSelect.value);
    const obj = engine.objects[index];
    objectProperties.innerHTML = `
        <label>Координата X: <input type="number" id="propX" value="${obj.x}" /></label><br />
        <label>Координата Y: <input type="number" id="propY" value="${obj.y}" /></label><br />
        <label>Ширина: <input type="number" id="propWidth" value="${obj.width}" /></label><br />
        <label>Высота: <input type="number" id="propHeight" value="${obj.height}" /></label><br />
        <label>Цвет: <input type="color" id="propColor" value="${obj.color}" /></label><br />
        <button id="updateObject">Обновить</button>
        <button id="deleteObject">Удалить</button>
    `;

    // Обработка обновления объекта
    document.getElementById('updateObject').addEventListener('click', () => {
        obj.x = parseFloat(document.getElementById('propX').value);
        obj.y = parseFloat(document.getElementById('propY').value);
        obj.width = parseFloat(document.getElementById('propWidth').value);
        obj.height = parseFloat(document.getElementById('propHeight').value);
        obj.color = document.getElementById('propColor').value;
        engine.updateObjectList();
    });

    // Обработка удаления объекта
    document.getElementById('deleteObject').addEventListener('click', () => {
        engine.removeObject(obj);
    });
});

// Добавление события
document.getElementById('addEventButton').addEventListener('click', () => {
    const trigger = prompt('Введите функцию для триггера (например, "player.x > 500")');
    const action = prompt('Введите функцию для действия (например, "console.log(\'Triggered!\')")');
    if (trigger && action) {
        const event = new Event(
            new Function('return ' + trigger)(),
            new Function('return ' + action)()
        );
        engine.addEvent(event);
    }
});

// Сохранение и загрузка состояния
document.getElementById('saveButton').addEventListener('click', () => {
    engine.saveState();
});

document.getElementById('loadButton').addEventListener('click', () => {
    engine.loadState();
});

// Пример добавления объектов
const player = new Player(100, 100);
const building = new Building(300, 300);

engine.addObject(player);
engine.addObject(building);
