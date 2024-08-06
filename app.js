// app.js

const tonweb = new TonWeb();
const Address = TonWeb.Address;

let walletAddress = '';
let horseGold = 0;

// Конфигурация кошелька
async function connectWallet() {
    walletAddress = prompt("Enter your wallet address:");

    if (!Address.isValid(walletAddress)) {
        alert("Invalid wallet address.");
        return;
    }

    // Запрос баланса (здесь только для примера, необходимо подключение к реальному API)
    const balance = await getWalletBalance(walletAddress);

    document.getElementById('walletInfo').innerHTML = `
        <p>Wallet Address: ${walletAddress}</p>
        <p>Balance: ${balance} TON</p>
    `;
    document.getElementById('walletSection').style.display = 'none';
    document.getElementById('gameSection').style.display = 'block';
}

// Функция получения баланса (имитация)
async function getWalletBalance(address) {
    // Здесь должна быть реализация получения баланса через API TON
    // В этом примере возвращаем случайное значение
    return (Math.random() * 100).toFixed(2);
}

// Участие в соревновании
function participateInRace() {
    document.getElementById('raceResults').style.display = 'block';

    const lanes = document.querySelectorAll('.lane');
    let winnerLane = Math.floor(Math.random() * lanes.length);

    // Анимация забега
    lanes.forEach((lane, index) => {
        lane.style.transition = 'transform 3s ease-out';
        lane.style.transform = `translateX(${index === winnerLane ? 100 : 0}%)`;
    });

    setTimeout(() => {
        const winner = winnerLane + 1;
        document.getElementById('raceOutcome').innerText = `Horse ${winner} wins!`;

        // Обновление золота
        horseGold += 10; // Добавляем 10 золота
        document.getElementById('horseGold').innerText = horseGold;

        // Отправка золота на счет (здесь должна быть реальная реализация)
        sendGoldToWallet(10);
    }, 3000);
}

// Отправка золота на кошелек (имитация)
async function sendGoldToWallet(amount) {
    const transferURL = `https://app.tonkeeper.com/transfer/${walletAddress}?amount=${amount * 1000000000}&text=${encodeURIComponent('Race winnings')}`;
    window.open(transferURL, '_blank');
}

// Обработчики событий
document.getElementById('connectWallet').addEventListener('click', connectWallet);
document.getElementById('raceButton').addEventListener('click', participateInRace);
