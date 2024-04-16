const selectors = {
    gridContainer: document.querySelector('.grid-container'),
    tablero: document.querySelector('.tablero'),
    movimientos: document.querySelector('.movimientos'),
    timer: document.querySelector('.timer'),
    comenzar: document.querySelector('button'),
    win: document.querySelector('.win')
}

const state = {
    gameStarted: false,
    flippedCards: 0,
    totalFlips: 0,
    totalTime: 0,
    loop: null
}

const generateGame = () => {
    const dimensions = selectors.tablero.getAttribute('grid-dimension')

    if (dimensions % 2 !== 0) {
        throw new Error("Las dimensiones del tablero deben ser un número par.")
    }

    const emojis = ['🥔', '🍒', '🥑', '🌽', '🥕', '🍇', '🍉', '🍌', '🥭', '🍍']
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
        selectors.timer.textContent = `tiempo: ${state.totalTime} sec`;
    }, 1000);

    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            if (state.gameStarted && !card.classList.contains('flipped') && state.flippedCards < 2) {
                voltearCarta(card);
            }
        });
    });
}

const voltearCarta = card => {
    card.classList.add('flipped');
    state.flippedCards++;
    state.totalFlips++;
    selectors.movimientos.textContent = `${state.totalFlips} movimientos`;

    if (state.flippedCards === 2) {
        comprobarPareja();
    }
}

const comprobarPareja = () => {
    const flipped = document.querySelectorAll('.flipped');
    const [firstCard, secondCard] = flipped;

    if (firstCard.dataset.index === secondCard.dataset.index) {
        setTimeout(() => {
            flipped.forEach(card => card.classList.remove('flipped'));
            state.flippedCards = 0;
        }, 1000);
    } else {
        setTimeout(() => {
            flipped.forEach(card => card.classList.remove('flipped'));
            state.flippedCards = 0;
        }, 1000);
    }
}

generateGame();
