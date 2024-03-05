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

    // Generar clave secreta si no existe
    if (claveSecreta.length === 0){
        generarClaveSecreta();
        actualizarClaveDisplay();
        reiniciarTabla();
    }

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

    // Generar una nueva clave secreta
    generarClaveSecreta();
    reiniciarTabla();
    actualizarClaveDisplay();
    
}

function reiniciarTabla() {
    // Reiniciar la tabla colocando asteriscos rojos
    const numerosTabla = document.querySelectorAll('.numero-tabla');
    numerosTabla.forEach(numero => {
        numero.textContent = '*';
        numero.classList.remove('correcto');
    });
}

function formatoDosDigitos(valor) {
    return valor < 10 ? `0${valor}` : `${valor}`;
}

function generarClaveSecreta() {
    while (claveSecreta.length < 4) {
        const numeroAleatorio = Math.floor(Math.random() * 10);

        // Verificar si el número ya está en la claveSecreta
        if (!claveSecreta.includes(numeroAleatorio)) {
            claveSecreta.push(numeroAleatorio);
        }
    }
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
    // Mostrar asteriscos en la visualización de la clave
    const claveSecretoElemento = document.getElementById('clave-secreta');
    claveSecretoElemento.textContent = `Clave secreta: ****`;
}

function seleccionarNumero(numero) {
    // Verificar si el juego está iniciado
    if (!intervalo) {
        iniciarJuego();
    }

    // Verificar si el numero pertenece a la clave
    const numeroEnClave = claveSecreta.includes(numero);

    // Mostrar el número en la tabla
    if (numeroEnClave) {
        const posicion = claveSecreta.indexOf(numero);
        const numerosTabla = document.querySelectorAll('.numero-tabla');
        numerosTabla[posicion].textContent = numero;
        numerosTabla[posicion].classList.add('correcto'); // Añadir la clase correcto para cambiar el color
    }

    verificarVictoria();
    
}

function verificarVictoria() {
    // Verificar si la longitud de la clave secreta es igual a la cantidad de números descubiertos
    const numerosDescubiertos = document.querySelectorAll('.numero-tabla.correcto');
    
    if (numerosDescubiertos.length === claveSecreta.length) {
        // Detener el juego si la longitud es igual
        detenerJuego();
    }
}

// Event listeners para los botones numéricos
for (let i = 0; i <= 9; i++) {
    const numeroBoton = document.getElementById(`numero-${i}`);
    numeroBoton.addEventListener('click', () => seleccionarNumero(i));
}

// Event listeners para los botones
document.getElementById('start-btn').addEventListener('click', iniciarJuego);
document.getElementById('stop-btn').addEventListener('click', detenerJuego);
document.getElementById('reset-btn').addEventListener('click', reiniciarJuego);
