class WheelGame {
    constructor() {
        this.segments = [
            { text: "x2", color: "#FF6B6B", multiplier: 2 },
            { text: "LOSE", color: "#4ECDC4", multiplier: 0 },
            { text: "x3", color: "#45B7D1", multiplier: 3 },
            { text: "x1", color: "#96CEB4", multiplier: 1 },
            { text: "x5", color: "#FFEEAD", multiplier: 5 },
            { text: "LOSE", color: "#D4A5A5", multiplier: 0 },
            { text: "x2", color: "#9DE0AD", multiplier: 2 },
            { text: "x4", color: "#FF9999", multiplier: 4 }
        ];
        
        this.canvas = document.getElementById('wheel');
        this.ctx = this.canvas.getContext('2d');
        this.currentRotation = 0;
        this.isSpinning = false;
        
        this.init();
    }

    init() {
        this.drawWheel();
        document.getElementById('spin-btn').addEventListener('click', () => this.spin());
    }

    drawWheel() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const radius = this.canvas.width / 2 - 10;
        const segmentAngle = (2 * Math.PI) / this.segments.length;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.segments.forEach((segment, i) => {
            this.ctx.beginPath();
            this.ctx.fillStyle = segment.color;
            this.ctx.moveTo(centerX, centerY);
            this.ctx.arc(centerX, centerY, radius, 
                i * segmentAngle + this.currentRotation, 
                (i + 1) * segmentAngle + this.currentRotation);
            this.ctx.lineTo(centerX, centerY);
            this.ctx.fill();
            this.ctx.stroke();

            this.ctx.save();
            this.ctx.translate(centerX, centerY);
            this.ctx.rotate(i * segmentAngle + segmentAngle / 2 + this.currentRotation);
            this.ctx.textAlign = "right";
            this.ctx.fillStyle = "#000";
            this.ctx.font = "bold 20px Arial";
            this.ctx.fillText(segment.text, radius - 20, 5);
            this.ctx.restore();
        });
    }

    spin() {
        if (this.isSpinning || gameState.balance <= 0) return;
        
        this.isSpinning = true;
        const spinBtn = document.getElementById('spin-btn');
        spinBtn.disabled = true;
        
        gameState.updateBalance(gameState.balance - 10);
        gameState.totalSpins++;
        document.getElementById('total-spins').textContent = gameState.totalSpins;

        const spinDuration = 3000;
        const startTime = Date.now();
        const startRotation = this.currentRotation;
        const totalRotation = 8 * Math.PI + Math.random() * 2 * Math.PI;

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / spinDuration, 1);
            
            const easeOut = (t) => 1 - Math.pow(1 - t, 3);
            
            this.currentRotation = startRotation + totalRotation * easeOut(progress);
            this.drawWheel();

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                this.isSpinning = false;
                spinBtn.disabled = false;
                
                const segmentAngle = (2 * Math.PI) / this.segments.length;
                const normalizedRotation = this.currentRotation % (2 * Math.PI);
                const winningIndex = this.segments.length - 1 - 
                    Math.floor(normalizedRotation / segmentAngle);
                const result = this.segments[winningIndex % this.segments.length];
                
                const winAmount = 10 * result.multiplier;
                if (result.multiplier > 0) {
                    gameState.updateBalance(gameState.balance + winAmount);
                }
                
                const resultElement = document.getElementById('result');
                
                if (result.multiplier === 0) {
                    resultElement.textContent = "You lost!";
                } else {
                    resultElement.textContent = `You won ${winAmount}!`;
                    if (winAmount > gameState.biggestWin) {
                        gameState.biggestWin = winAmount;
                        document.getElementById('biggest-win').textContent = gameState.biggestWin;
                    }
                }
            }
        };

        animate();
    }
}
