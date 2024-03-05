let tiempoTranscurrido = 0;
let intervalo;

let claveSecreta = [];

function iniciarJuego() {
    // Verificar si ya se inició el juego
    if (intervalo) {
        return;
    }

    // Iniciar la cuenta ascendente con un intervalo de 1 segundo
    intervalo = setInterval(function() {
        tiempoTranscurrido += 10;
        actualizarContador();
    }, 10);
}

function detenerJuego() {
    // Detener el intervalo si está en ejecución
    if (intervalo) {
        clearInterval(intervalo);
        intervalo = null;
    }
}

function reiniciarJuego() {
    // Detener el juego y reiniciar el tiempo
    detenerJuego();
    tiempoTranscurrido = 0;
    actualizarContador();
    generarClaveSecreta();
    actualizarClaveDisplay();
}

function formatoDosDigitos(valor) {
    return valor < 10 ? `0${valor}` : `${valor}`;
}

function generarClaveSecreta() {
    claveSecreta = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10));
    // Mostrar asteriscos en la visualización de la clave
    claveSecretaDisplay = Array.from({ length: 4 }, () => '*');
    actualizarClaveDisplay();
}

function actualizarContador() {
    // Calcular minutos, segundos y centésimas de segundo
    const minutos = Math.floor(tiempoTranscurrido / (60 * 1000));
    const segundos = Math.floor((tiempoTranscurrido % (60 * 1000)) / 1000);
    const centesimas = Math.floor((tiempoTranscurrido % 1000) / 10);
   
    // Formatear y mostrar en el elemento HTML
    const contadorElemento = document.getElementById('contador');
    contadorElemento.textContent = `${formatoDosDigitos(minutos)}:${formatoDosDigitos(segundos)}.${formatoDosDigitos(centesimas)}`;
}

function actualizarClaveDisplay() {
    // Actualizar la visualización de la clave secreta en los numero-box
    const numeroBoxes = document.querySelectorAll('.numero-box');
    claveSecreta.forEach((numero, index) => {
        numeroBoxes[index].textContent = numero;
    });

    // Mostrar la clave secreta en el elemento clave-secreta
    const claveSecretoElemento = document.getElementById('clave-secreta');
    claveSecretoElemento.textContent = `Clave secreta: ${claveSecreta.join('')}`;
}

function seleccionarNumero(numero) {
    // Verificar si el juego está iniciado
    if (!intervalo) {
        iniciarJuego();
    }

    // Generar la clave secreta solo si aún no existe
    if (claveSecreta.length === 0) {
        generarClaveSecreta();
    }

    // Verificar si el dígito pulsado está en la clave secreta
    if (claveSecreta.includes(numero)) {
        // Reemplazar el asterisco con el número acertado
        const index = claveSecreta.indexOf(numero);
        claveSecretaDisplay[index] = claveSecreta[index];

        // Actualizar la visualización de la clave
        actualizarClaveDisplay();

        // Verificar si se acertaron todos los números de la clave
        if (!claveSecreta.includes('*')) {
            detenerJuego();  // Detener el juego si se acertó la clave completa
        }
    }
}
// Event listeners para los botones
document.getElementById('start-btn').addEventListener('click', iniciarJuego);
document.getElementById('stop-btn').addEventListener('click', detenerJuego);
document.getElementById('reset-btn').addEventListener('click', reiniciarJuego);

// Event listeners para los números
const numeros = document.querySelectorAll('.numero-box');
numeros.forEach((numero, index) => {
    numero.addEventListener('click', () => seleccionarNumero(index + 1));
});