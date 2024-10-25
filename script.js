// Initialize Telegram WebApp
window.Telegram.WebApp.ready();
window.Telegram.WebApp.expand();

// Initialize game state and components
const gameState = new GameState();
const wheelGame = new WheelGame();
const coinGame = new CoinGame();

// Initialize UI
UI.initializeTabs();
UI.initializeProfile();
