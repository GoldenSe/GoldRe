export class Game {
    private gold: number = 0;

    constructor(
        private goldElement: HTMLElement,
        private clickButton: HTMLButtonElement,
        private transferButton: HTMLButtonElement,
        private transferAmountDiv: HTMLElement,
        private amountInput: HTMLInputElement,
        private transferConfirmButton: HTMLButtonElement,
        private loginButton: HTMLButtonElement
    ) {
        this.init();
    }

    private init() {
        this.clickButton.addEventListener('click', () => this.incrementGold());
        this.transferButton.addEventListener('click', () => this.showTransferAmount());
        this.transferConfirmButton.addEventListener('click', () => this.transferGold());
        this.loginButton.addEventListener('click', () => this.loginWithTonkeeper());
    }

    private incrementGold() {
        this.gold++;
        this.updateGoldDisplay();
    }

    private updateGoldDisplay() {
        this.goldElement.textContent = `Gold: ${this.gold}`;
    }

    private showTransferAmount() {
        this.transferAmountDiv.classList.remove('hidden');
    }

    private transferGold() {
        const amount = parseInt(this.amountInput.value, 10);
        if (isNaN(amount) || amount <= 0 || amount > this.gold) {
            alert('Invalid amount');
            return;
        }

        const address = prompt('Enter recipient address:');
        if (address) {
            const transferUrl = `https://app.tonkeeper.com/transfer/${address}?amount=${amount}`;
            window.location.href = transferUrl;
            this.gold -= amount;
            this.updateGoldDisplay();
            this.transferAmountDiv.classList.add('hidden');
        }
    }

    private loginWithTonkeeper() {
        const redirectUri = encodeURIComponent(window.location.href);
        const loginUrl = `https://app.tonkeeper.com/login?redirect_uri=${redirectUri}`;
        window.location.href = loginUrl;
    }
}
