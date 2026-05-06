// empires.js - CON GUARDADO EN SERVIDOR
const API_URL = '/api/';

let currentGameState = { level: 1, coins: 100, name: "Emperador" };

async function saveToServer(level, coins, gameData) {
    try {
        const response = await fetch(API_URL + 'save_game.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ level, coins, game_data: gameData })
        });
        const result = await response.json();
        if (result.success) console.log("✅ Progreso guardado en servidor");
        else console.log("❌ Error:", result.error);
    } catch(e) { console.log("❌ Error de red:", e); }
}

async function loadFromServer() {
    try {
        const response = await fetch(API_URL + 'load_game.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        });
        const result = await response.json();
        if (result.success) {
            console.log("✅ Progreso cargado del servidor:", result.player);
            return result.player;
        }
    } catch(e) { console.log("❌ Error cargando:", e); }
    return null;
}

function saveUserInfo(userId, name, level = 1, coins = 100) {
    currentGameState = { name, level, coins, userId };
    const userData = { name, level, coins, timestamp: Date.now() };
    localStorage.setItem('user_' + userId, JSON.stringify(userData));
    saveToServer(level, coins, { name, level, coins });
    console.log("Usuario guardado:", userData);
}

function loadUserInfo(userId) {
    loadFromServer().then(serverData => {
        if (serverData) {
            currentGameState.level = serverData.level;
            currentGameState.coins = serverData.coins;
            const userData = { name: currentGameState.name, level: serverData.level, coins: serverData.coins, timestamp: Date.now() };
            localStorage.setItem('user_' + userId, JSON.stringify(userData));
        } else {
            const userData = localStorage.getItem('user_' + userId);
            if (userData) {
                const data = JSON.parse(userData);
                currentGameState.level = data.level;
                currentGameState.coins = data.coins;
            }
        }
    });
    return currentGameState;
}

function inner_getUserInfo() {
    console.log("Obteniendo info de usuario...");
    const loadingMsg = document.getElementById("loading_message");
    const progressBar = document.getElementById("inner_progress_bar");
    if (loadingMsg) loadingMsg.innerHTML = "Cargando datos del servidor...";
    if (progressBar) progressBar.style.width = "30%";
    
    const player = JSON.parse(localStorage.getItem('current_player') || '{}');
    const userId = "player_" + (player.id || Math.floor(Math.random() * 10000));
    saveUserInfo(userId, player.username || "Emperador");
    loadUserInfo(userId);
}

function inner_getFriendData() {
    console.log("Cargando amigos...");
    const progressBar = document.getElementById("inner_progress_bar");
    if (progressBar) progressBar.style.width = "50%";
}

function inner_getAppFriendIds() {
    console.log("Cargando IDs de amigos...");
    const progressBar = document.getElementById("inner_progress_bar");
    if (progressBar) progressBar.style.width = "70%";
}

function inner_onGameLoaded(seen, popp, canvas) {
    console.log("Juego cargado completamente!");
    const progressBar = document.getElementById("inner_progress_bar");
    const loadingGame = document.getElementById("loading_game");
    if (progressBar) progressBar.style.width = "100%";
    setTimeout(() => { if (loadingGame) loadingGame.style.display = "none"; }, 500);
}

window.inner_getUserInfo = inner_getUserInfo;
window.inner_getFriendData = inner_getFriendData;
window.inner_getAppFriendIds = inner_getAppFriendIds;
window.inner_onGameLoaded = inner_onGameLoaded;