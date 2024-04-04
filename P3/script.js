console.log("Ejecutando JS...");

const canvas = document.getElementById("canvas");

// Captura los elementos de ángulo y velocidad
const anguloInput = document.getElementById('angulo');
const velocidadInput = document.getElementById('velocidad');

// Captura los elementos donde mostrar los valores seleccionados
const anguloValor = document.getElementById('angulo_valor');
const velocidadValor = document.getElementById('velocidad_valor');

//-- Definir el tamaño del canvas
canvas.width = 780;
canvas.height = 460;

// obtener contexto canvas
const ctx = canvas.getContext("2d");

// Variables para la posicion y velocidad
let x = 5;
let y = 405;
let vx = 0; // Velocidad horzontal
let = vy = 0; // Velocidad vertical
let g = 0.2; // Gravedad

// Variables para la velocidad y el ángulo de disparo
let velocidad = velocidadInput.value; // CAMBIAR PARA SELECCIONARLA
let angulo = anguloInput.value * Math.PI/180;

let disparar = false;
let xCircle = 360;

let puntuacion = 0;
let distanciaCentros;

let tiempoTranscurrido = 0;

// Agrega event listener para actualizar los valores cuando cambien los controles de rango
anguloInput.addEventListener('input', () => {
    anguloValor.textContent = anguloInput.value;
    angulo = anguloInput.value * Math.PI/180;
});

velocidadInput.addEventListener('input', () => {
    velocidadValor.textContent = velocidadInput.value;
    velocidad = velocidadInput.value;
});

// Controlador boton disparo
document.getElementById("disparo").addEventListener("click", function(){
    // Calcular las velocidades iniciales en las direcciones x e y
    if (disparo){

        vx = velocidad * Math.cos(angulo);
        vy = -velocidad * Math.sin(angulo);

        // Iniciar la cuenta ascendente con un intervalo de 1 segundo
        intervalo = setInterval(function() {
        tiempoTranscurrido += 10;
        actualizarContador();
    }, 10);

        disparar = true;
    }

});

// Control boton inicio
document.getElementById("inicio").addEventListener("click",function(){
    // Reiniciar la posición y velocidad del cuadrado
    puntuacion = 0;
    x = 5;
    y = 405;
    vx = 0;
    vy = 0;
    disparar = false; // Detener el disparo

    // Generar nuevas coordenadas para el circulo
    let rawXCircle = (Math.random()+1) * (300);
    xCircle = Math.max(200, Math.min(rawXCircle, 780));

    // Calcular la puntuacion con la distancia
    puntuacion = 0;

    // Actualizar el elemento en el HTML para mostrar la puntuacion
    document.getElementById("puntuacion").textContent = puntuacion.toFixed(2);


    tiempoTranscurrido = 0;
    actualizarContador();

});



// Funcion para actualizar la posicion el cuadrado
function update(){

    if(disparar){
        // Actualiza la velocidad y la posicion
        vy += g;
        x += vx;
        y += vy;

        // Comprobar si el cuadrado ha llegado al borde del lienzo
        if (x < 0 || x > canvas.width - 55 || y < 0 || y > canvas.height - 55) {
            disparar = false; // Detener el disparo

            // Calcular la puntuacion con la distancia
            puntuacion = calcularPuntuacion(distanciaCentros);

            // Actualizar el elemento en el HTML para mostrar la puntuacion
            document.getElementById("puntuacion").textContent = puntuacion.toFixed(2);

            clearInterval(intervalo);
            intervalo = null;

        }
    }

    // Dibujar el cuadrado en la nueva posicion
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el lienzo
    ctx.beginPath();
    ctx.rect(x, y, 50, 50);
    ctx.fillStyle = 'green';
    ctx.lineWidth = 2;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    // Dibujar circulo
    ctx.beginPath();
    // Centro, radio, angulo inicial, angulo final
    ctx.arc(xCircle, 430, 25, 0, 2*Math.PI);
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 3;
    ctx.fillStyle = 'red';
    ctx.stroke();
    ctx.fill();
    ctx.closePath();

    // Calcula la distancia entre los centros del cuadrado y el círculo
    distanciaCentros = calcularDistancia(xCircle, 430, x + 25, y + 25); // Sumamos 25 para obtener el centro del cuadrado

    // Actualizar el elemento en el HTML para mostrar la distancia
    document.getElementById("distancia").textContent = distanciaCentros.toFixed(2);

    
    // Solicitar el próximo cuadro de la animación
    requestAnimationFrame(update);
}

// Función para calcular la distancia
function calcularDistancia(x, y, xCircle) {
    return Math.sqrt(Math.pow(xCircle - x, 2) + Math.pow(430 - y, 2));
}

function calcularPuntuacion(distanciaCentros){
    return 1000/distanciaCentros;
}

function formatoDosDigitos(valor) {
    return valor < 10 ? `0${valor}` : `${valor}`;
}

function actualizarContador() {
    // Calcular minutos, segundos y centésimas de segundo
    // const minutos = Math.floor(tiempoTranscurrido / (60 * 1000));
    const segundos = Math.floor((tiempoTranscurrido % (60 * 1000)) / 1000);
    const centesimas = Math.floor((tiempoTranscurrido % 1000) / 10);
   
    // Formatear y mostrar en el elemento HTML
    const contadorElemento = document.getElementById('contador');
    contadorElemento.textContent = `${formatoDosDigitos(segundos)}.${formatoDosDigitos(centesimas)}`;
}

// Iniciar la animación
update();






