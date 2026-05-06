// session.js - MANEJO DE SESIONES
function saveSession(userId, sessionId) {
    const sessionData = { userId, sessionId, timestamp: Date.now() };
    localStorage.setItem('empire_session', JSON.stringify(sessionData));
    console.log("Sesión guardada:", sessionData);
}

function getCurrentSession() {
    const data = localStorage.getItem('empire_session');
    return data ? JSON.parse(data) : null;
}

function logout() {
    document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem('empire_session');
    localStorage.removeItem('current_player');
    localStorage.removeItem('session_token');
    window.location.href = "login.html";
}

function login(sessionId) {
    const cookieValue = sessionId.replace(":", "=") + "; max-age=" + (60 * 60 * 24 * 365 * 2);
    document.cookie = cookieValue;
    const userId = "user_" + Math.floor(Math.random() * 10000);
    saveSession(userId, sessionId);
    window.location.href = "home.html";
}

function cleanHome() {
    document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem('empire_session');
    window.location.href = "home.html";
}

window.login = login;
window.logout = logout;
window.cleanHome = cleanHome;
window.getCurrentSession = getCurrentSession;