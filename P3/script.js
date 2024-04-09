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
canvas.height = 360;

// obtener contexto canvas
const ctx = canvas.getContext("2d");

// Variables para la posicion y velocidad
let x = 5;
let y = 305;
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
    reiniciarPartida();
});



// Funcion para actualizar la posicion el cuadrado
function update(){

    const cuadradoImg = new Image();
    cuadradoImg.src = 'bola.png';
    
    const circuloImg = new Image();
    circuloImg.src = 'papelera.png';
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // Dibujar el cuadrado en la nueva posicion
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el lienzo
    ctx.beginPath();
    ctx.drawImage(cuadradoImg, x, y, 50, 50);
    /*
    ctx.fillStyle = 'green';
    ctx.lineWidth = 2;
    ctx.fill();
    ctx.stroke();
    */
    ctx.closePath();

    // Dibujar circulo
    ctx.beginPath();
    // Centro, radio, angulo inicial, angulo final
    ctx.drawImage(circuloImg, xCircle - 50, 305 - 50, 100, 100);
    /*
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 3;
    ctx.fillStyle = 'red';
    ctx.stroke();
    ctx.fill();
    */
    ctx.closePath();

    if(disparar){
        // Actualiza la velocidad y la posicion
        vy += g;
        x += vx;
        y += vy;

        // Calcula la distancia entre los centros del cuadrado y el círculo
        distanciaCentros = calcularDistancia(xCircle, 430, x + 25, y + 25); // Sumamos 25 para obtener el centro del cuadrado

        // Actualizar el elemento en el HTML para mostrar la distancia
        document.getElementById("distancia").textContent = distanciaCentros.toFixed(2);

        if (detectarColision()){
            finPartida(distanciaCentros);
            return;
        }
    }
    
    // Solicitar el próximo cuadro de la animación
    requestAnimationFrame(update);
}

// Función para calcular la distancia
function calcularDistancia(x, y, xCircle) {
    return Math.sqrt(Math.pow(xCircle - x, 2) + Math.pow(330 - y, 2));
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

function detectarColision(){
    if (x < 0 || x > canvas.width - 55 || y < 0 || y > canvas.height - 55) {
        return true;
    }
    return false;   
}

function mostrarMensaje(mensaje){
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    ctx.fillStyle = color;
    ctx.font = '50px Arial';
    ctx.textAlign = 'center';

    ctx.fillText(mensaje, centerX, centerY);
    
}

function finPartida(distanciaCentros){
    disparar = false;

    let mensaje;
    if (distanciaCentros < 20){
        mensaje = "¡Enhorabuena!¡Has ganado!"
        color = "green"
    }else{
        mensaje = "¡Has perdido!¡Vuelve a intentarlo!"
        color = "red"
    }

    clearInterval(intervalo);
    intervalo = null;

    mostrarMensaje(mensaje);

    document.getElementById("inicio").disabled = false;
}

function reiniciarPartida(){

    // Reiniciar la posición y velocidad del cuadrado
    x = 5;
    y = 305;
    vx = 0;
    vy = 0;
    disparar = false; // Detener el disparo

    // Generar nuevas coordenadas para el circulo
    let rawXCircle = (Math.random()+1) * (300);
    xCircle = Math.max(200, Math.min(rawXCircle, 780));


    // Actualizar el elemento en el HTML para mostrar la puntuacion
    // document.getElementById("puntuacion").textContent = puntuacion.toFixed(2);

    document.getElementById("reinicio").style.dysplay = "none";
    document.getElementById("distancia").textContent = "--";

    tiempoTranscurrido = 0;
    actualizarContador();

    update();    
}

function redirigirAPracticas() {
    window.location.href = "https://dborja2021.github.io/2023-2024-CSAAI-Practicas/";
}
// Iniciar la animación
update();






