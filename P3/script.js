console.log("Ejecutando JS...");

const canvas = document.getElementById("canvas");

//-- Definir el tamaño del canvas
canvas.width = 780;
canvas.height = 460;

// obtener contexto canvas
const ctx = canvas.getContext("2d");
/*
// Dibujar rectangulo
ctx.beginPath();
    // Esquina sup. izq. y dimensiones
    ctx.rect(5,405,50,50);
    // Dibujar
    ctx.fillStyle = 'green';
    ctx.lineWidth = 2;
    // Relleno
    ctx.fill();
    // Trazo
    ctx.stroke();
ctx.closePath();

// Dibujar circulo
ctx.beginPath();
    // Centro, radio, angulo inicial, angulo final
    ctx.arc(390, 430, 25, 0, 2*Math.PI);
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 3;
    ctx.fillStyle = 'red';
    ctx.stroke();
    ctx.fill();
ctx.closePath();
*/

// Variables para la posicion y velocidad
let x = 5;
let y = 405;
let vx = 0; // Velocidad horzontal
let = vy = 0 // Velocidad vertical
let g = 0.25 // Gravedad

// Variables para la velocidad y el ángulo de disparo
let velocidad = 10; // CAMBIAR PARA SELECCIONARLA
let angulo = Math.PI/4;

let disparar = false;

// Controlador boton disparo
document.getElementById("disparo").addEventListener("click", function(){
    // Calcular las velocidades iniciales en las direcciones x e y
    if (disparo){
        vx = velocidad *Math.cos(angulo);
        vy = -velocidad * Math.sin(angulo);
        disparar = true;
    }
});

// Contrl boton inicio
document.getElementById("inicio").addEventListener("click",function(){
    // Reiniciar la posición y velocidad del cuadrado
    x = 5;
    y = 405;
    vx = 0;
    vy = 0;
    disparar = false; // Detener el disparo
});

// Funcion para actualizar la posicion edl cuadrado
function update(){
    if(disparar){
    // Actualiza la velocidad y la posicion
    vy += g;
    x += vx;
    y += vy;

    // Comprobar si el cuadrado ha llegado al borde del lienzo
    if (x < 0 || x > canvas.width - 50 || y < 0 || y > canvas.height - 50) {
        disparar = false; // Detener el disparo
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
    ctx.arc(390, 430, 25, 0, 2*Math.PI);
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 3;
    ctx.fillStyle = 'red';
    ctx.stroke();
    ctx.fill();
    ctx.closePath();

    // Solicitar el próximo cuadro de la animación
    requestAnimationFrame(update);
}

// Iniciar la animación
update();
