let balance = 100;
const segments = [
    { text: "x2", color: "#FF6B6B", multiplier: 2 },
    { text: "LOSE", color: "#4ECDC4", multiplier: 0 },
    { text: "x3", color: "#45B7D1", multiplier: 3 },
    { text: "x1", color: "#96CEB4", multiplier: 1 },
    { text: "x5", color: "#FFEEAD", multiplier: 5 },
    { text: "LOSE", color: "#D4A5A5", multiplier: 0 },
    { text: "x2", color: "#9DE0AD", multiplier: 2 },
    { text: "x4", color: "#FF9999", multiplier: 4 }
];

const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
let currentRotation = 0;
let isSpinning = false;

function drawWheel() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2 - 10;
    const segmentAngle = (2 * Math.PI) / segments.length;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    segments.forEach((segment, i) => {
        ctx.beginPath();
        ctx.fillStyle = segment.color;
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, 
            i * segmentAngle + currentRotation, 
            (i + 1) * segmentAngle + currentRotation);
        ctx.lineTo(centerX, centerY);
        ctx.fill();
        ctx.stroke();

        // Draw text
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(i * segmentAngle + segmentAngle / 2 + currentRotation);
        ctx.textAlign = "right";
        ctx.fillStyle = "#000";
        ctx.font = "bold 20px Arial";
        ctx.fillText(segment.text, radius - 20, 5);
        ctx.restore();
    });
}

function spin() {
    if (isSpinning || balance <= 0) return;
    
    isSpinning = true;
    const spinBtn = document.getElementById('spin-btn');
    spinBtn.disabled = true;
    
    // Deduct 10 from balance for each spin
    balance -= 10;
    document.getElementById('balance').textContent = `Balance: ${balance}`;

    const spinDuration = 3000; // 3 seconds
    const startTime = Date.now();
    const startRotation = currentRotation;
    const totalRotation = 8 * Math.PI + Math.random() * 2 * Math.PI; // 4 full rotations + random

    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / spinDuration, 1);
        
        // Easing function for smooth deceleration
        const easeOut = (t) => 1 - Math.pow(1 - t, 3);
        
        currentRotation = startRotation + totalRotation * easeOut(progress);
        drawWheel();

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            isSpinning = false;
            spinBtn.disabled = false;
            
            // Calculate result
            const segmentAngle = (2 * Math.PI) / segments.length;
            const normalizedRotation = currentRotation % (2 * Math.PI);
            const winningIndex = segments.length - 1 - 
                Math.floor(normalizedRotation / segmentAngle);
            const result = segments[winningIndex % segments.length];
            
            // Update balance and show result
            const winAmount = 10 * result.multiplier;
            balance += winAmount;
            const resultElement = document.getElementById('result');
            
            if (result.multiplier === 0) {
                resultElement.textContent = "You lost!";
            } else {
                resultElement.textContent = `You won ${winAmount}!`;
            }
            
            document.getElementById('balance').textContent = `Balance: ${balance}`;
        }
    }

    animate();
}

document.getElementById('spin-btn').addEventListener('click', spin);
drawWheel();

// Initialize Telegram WebApp
window.Telegram.WebApp.ready();
window.Telegram.WebApp.expand();
