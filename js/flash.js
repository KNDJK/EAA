// flash.js - DETECCIÓN DE FLASH
function isFlashEnabled() {
    try {
        if (navigator.mimeTypes && navigator.mimeTypes['application/x-shockwave-flash'] !== undefined) {
            return true;
        }
    } catch(e) {}
    return false;
}

function loadingScreenUpdate() {
    console.log("Flash detectado:", isFlashEnabled());
    const loadingMessage = document.getElementById("loading_message");
    if (loadingMessage) loadingMessage.innerHTML = 'Cargando juego...';
}

window.loadingScreenUpdate = loadingScreenUpdate;
window.isFlashEnabled = isFlashEnabled;