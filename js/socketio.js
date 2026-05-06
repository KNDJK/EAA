// socketio.js - LOGS LOCALES
function logEvent(type, msg) {
    console.log(`[${type}]`, msg);
    const logs = JSON.parse(localStorage.getItem('empire_logs') || '[]');
    logs.push({ type, message: msg, timestamp: Date.now() });
    localStorage.setItem('empire_logs', JSON.stringify(logs));
}

function simulateLog(type, msg) { logEvent(type, msg); }

console.log("Sistema de logs local inicializado");
logEvent('system', 'Sistema iniciado');

window.logEvent = logEvent;
window.simulateLog = simulateLog;