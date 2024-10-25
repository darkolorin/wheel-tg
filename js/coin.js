class CoinGame {
    constructor() {
        this.isFlipping = false;
        this.betAmount = 20;
        this.init();
    }

    init() {
        document.getElementById('flip-btn').addEventListener('click', () => this.flipCoin());
    }

    flipCoin() {
        if (this.isFlipping || gameState.balance < this.betAmount) {
            if (gameState.balance < this.betAmount) {
                document.getElementById('coin-result').textContent = 'Insufficient balance!';
            }
            return;
        }
        
        this.isFlipping = true;
        const flipBtn = document.getElementById('flip-btn');
        flipBtn.disabled = true;
        
        gameState.updateBalance(gameState.balance - this.betAmount);
        
        const coin = document.getElementById('coin');
        const resultElement = document.getElementById('coin-result');
        
        resultElement.textContent = '';
        coin.classList.remove('flip');
        void coin.offsetWidth;
        
        const win = Math.random() < 0.5;
        coin.classList.add('flip');
        
        if (win) {
            coin.style.transform = 'rotateY(1800deg)';
            coin.style.webkitTransform = 'rotateY(1800deg)';
        } else {
            coin.style.transform = 'rotateY(1980deg)';
            coin.style.webkitTransform = 'rotateY(1980deg)';
        }
        
        setTimeout(() => {
            if (win) {
                const winAmount = this.betAmount * 2;
                gameState.updateBalance(gameState.balance + winAmount);
                resultElement.textContent = `You won ${winAmount} coins!`;
                
                if (winAmount > gameState.biggestWin) {
                    gameState.biggestWin = winAmount;
                    document.getElementById('biggest-win').textContent = gameState.biggestWin;
                }
            } else {
                resultElement.textContent = 'You lost!';
            }
            
            this.isFlipping = false;
            flipBtn.disabled = false;
            
            setTimeout(() => {
                coin.style.transform = 'rotateY(0)';
                coin.style.webkitTransform = 'rotateY(0)';
                coin.classList.remove('flip');
            }, 1000);
        }, 3000);
    }
}
