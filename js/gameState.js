class GameState {
    constructor() {
        this.balance = 100;
        this.totalSpins = 0;
        this.biggestWin = 0;
    }

    updateBalance(newBalance) {
        this.balance = newBalance;
        this.updateAllBalanceDisplays();
    }

    updateAllBalanceDisplays() {
        document.getElementById('balance').textContent = `Balance: ${this.balance}`;
        document.getElementById('coin-balance').textContent = `Balance: ${this.balance}`;
        document.getElementById('total-balance').textContent = this.balance;
    }
}
