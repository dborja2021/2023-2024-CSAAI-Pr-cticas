let claveSecreta = [];
let intentos = 0;
let juegoIniciado = false;

function generarClaveSecreta() {
    claveSecreta = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10));
}

function iniciarJuego() {
    if (!juegoIniciado) {
        juegoIniciado = true;
        iniciarCronometro();
        generarClaveSecreta();
        actualizarClaveDisplay();
    }
}

function detenerJuego() {
    if (juegoIniciado) {
        detenerCronometro();
        juegoIniciado = false;
    }
}

function reiniciarJuego() {
    detenerJuego();
    reiniciarCronometro();
    intentos = 0;
    generarClaveSecreta();
    actualizarClaveDisplay();
    actualizarContador();
}

function verificarAcierto(numero) {
    if (juegoIniciado) {
        intentos++;
        actualizarContador();

        if (claveSecreta.includes(numero)) {
            actualizarClaveDisplay();
            // Puedes agregar lógica para cambiar el color del número acertado.
            if (intentos === 4) {
                detenerJuego();
            }
        }
    }
}

function actualizarClaveDisplay() {
    const claveDisplay = document.getElementById('clave-display');
    const aciertos = claveSecreta.map(num => (num === intentos ? num : '*'));
    claveDisplay.textContent = aciertos.join(' ');
}

function actual
