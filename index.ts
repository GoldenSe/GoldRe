import { Game } from './game';

document.addEventListener('DOMContentLoaded', () => {
    const goldElement = document.getElementById('gold')!;
    const clickButton = document.getElementById('click-button') as HTMLButtonElement;
    const transferButton = document.getElementById('transfer-button') as HTMLButtonElement;
    const transferAmountDiv = document.getElementById('transfer-amount')!;
    const amountInput = document.getElementById('amount') as HTMLInputElement;
    const transferConfirmButton = document.getElementById('transfer-confirm') as HTMLButtonElement;
    const loginButton = document.getElementById('login-button') as HTMLButtonElement;

    new Game(goldElement, clickButton, transferButton, transferAmountDiv, amountInput, transferConfirmButton, loginButton);
});
