let lastFlippedCards = [];

const selectors = {
    gridContainer: document.querySelector('.grid-container'),
    tablero: document.querySelector('.tablero'),
    movimientos: document.querySelector('.movimientos'),
    timer: document.querySelector('.timer'),
    comenzar: document.getElementById('comenzar'),
    win: document.querySelector('.win'),
    grid2x2: document.getElementById('facil'),
    grid4x4: document.getElementById('medio'),
    grid6x6: document.getElementById('dificil'),
    reiniciar: document.getElementById('reiniciar'),
    home: document.getElementById('home')
}

const state = {
    gameStarted: false,
    flippedCards: 0,
    totalFlips: 0,
    totalTime: 0,
    loop: null,
}

selectors.tablero.style.display = 'none';
selectors.comenzar.disabled = true;

const buttons = document.querySelectorAll('button');

function handleButtonClick(event) {
    event.currentTarget.classList.add('button-pressed');
}

buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});

const generateGame = () => {

    const dimensions = selectors.tablero.getAttribute('grid-dimension')

    if (dimensions % 2 !== 0) {
        throw new Error("Las dimensiones del tablero deben ser un número par.")
    }

   /*const emojis = ['🥔', '🍒', '🥑', '🌽', '🥕', '🍇', '🍉', '🍌', '🥭', '🍍',
                     '🍑', '🥝', '🥥', '🍆', '🍈', '🍊', '🍋', '🫐', '🌶️']*/

    const emojis = ['🎮', '🕹️', '🎱', '🎲', '🛰️', '👾', '🤖', '📡', '💀', '🔊',
    '💻', '🎙️', '🚀', '🛸', '🎚️', '💾', '👻', '👽', '🖥️']

    const picks = pickRandom(emojis, (dimensions * dimensions) / 2) 
    const items = shuffle([...picks, ...picks])

    const cards = `
        <div class="tablero" style="grid-template-columns: repeat(${dimensions}, auto)">
            ${items.map((item, index) => `
                <div class="card" data-index="${index}">
                    <div class="card-front"></div>
                    <div class="card-back">${item}</div>
                </div>
            `).join('')}
       </div>
    `
    const parser = new DOMParser().parseFromString(cards, 'text/html')
    selectors.tablero.replaceWith(parser.querySelector('.tablero'))
    selectors.comenzar.addEventListener('click', iniciarJuego)
    //selectors.reiniciar.addEventListener('click', reiniciarJuego);
}

const pickRandom = (array, items) => {
    const clonedArray = [...array]
    const randomPicks = []

    for (let index = 0; index < items; index++) {
        const randomIndex = Math.floor(Math.random() * clonedArray.length)
        randomPicks.push(clonedArray[randomIndex])
        clonedArray.splice(randomIndex, 1)
    }
    return randomPicks
}

const shuffle = array => {
    const clonedArray = [...array]

    for (let index = clonedArray.length - 1; index > 0; index--) {
        const randomIndex = Math.floor(Math.random() * (index + 1))
        const original = clonedArray[index]

        clonedArray[index] = clonedArray[randomIndex]
        clonedArray[randomIndex] = original
    }

    return clonedArray
}

const iniciarJuego = () => {   
    state.gameStarted = true;
    state.loop = setInterval(() => {
        state.totalTime++;
        selectors.timer.textContent = `tiempo: ${state.totalTime} s`;
    }, 1000);

    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            if (state.gameStarted && !card.classList.contains('flipped') && state.flippedCards < 2) {
                voltearCarta(card);
            }
        });
    });
    selectors.comenzar.disabled = true;
    console.log("JUGANDO")
}

const voltearCarta = card => {
// PROblEmA AQUI
    card.classList.add('flipped');
    state.flippedCards++;
    state.totalFlips++;
    selectors.movimientos.textContent = `movimientos: ${state.totalFlips} `;

    lastFlippedCards.push(card);

    if (state.flippedCards === 2) {
        comprobarPareja();

    }
}

const comprobarVictoria = () => {
    const allCards = document.querySelectorAll('.card');
    const matchedCards = document.querySelectorAll('.matched');

    console.log('comprobando victoria' ,allCards.length, matchedCards.length);
    
    if (allCards.length === matchedCards.length) {
        clearInterval(state.loop);
        selectors.win.style.display = 'block';
        selectors.win.textContent = `¡Felicidades! Has ganado en ${state.totalTime} segundos con ${state.totalFlips} movimientos.`;
        console.log('FIN');
        selectors.comenzar.disabled = true;
    }
}

const comprobarPareja = () => {
    const [firstCard, secondCard] = lastFlippedCards;

    if (firstCard.innerHTML.trim() !== secondCard.innerHTML.trim()) {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            state.flippedCards = 0;
            lastFlippedCards = [];
        }, 1000);
    } else {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        state.flippedCards = 0;
        lastFlippedCards = [];
    }
    comprobarVictoria();
}

selectors.reiniciar.addEventListener('click', function(){
    location.reload();
});

selectors.home.addEventListener('click', function(){
    location.href ='https://dborja2021.github.io/2023-2024-CSAAI-Practicas/';
});

const seleccionDificultad = () => {
    selectors.grid2x2.addEventListener('click', function() {
        selectors.tablero.setAttribute('grid-dimension', 2);
        generateGame();
        selectors.comenzar.disabled = false;
        console.log("FACIL")
    });

    selectors.grid4x4.addEventListener('click', function() {
        selectors.tablero.setAttribute('grid-dimension', 4);
        generateGame();
        selectors.comenzar.disabled = false;
        console.log("MEDIO")
    });

    selectors.grid6x6.addEventListener('click', function() {
        selectors.tablero.setAttribute('grid-dimension', 6);
        generateGame();
        selectors.comenzar.disabled = false;
        console.log("DIFICIL")
    });
}

seleccionDificultad();
