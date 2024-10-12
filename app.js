const player = document.getElementById('player');
const beyonce = document.getElementById('beyonce');
const gameArea = document.getElementById('game-area');

let playerPosition = { x: 100, y: 100 };
let beyoncePosition = { x: 300, y: 300 };
const playerSpeed = 40;
const beyonceSpeed = 1;

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if (playerPosition.y > 0) playerPosition.y -= playerSpeed;
            break;
        case 'ArrowDown':
            if (playerPosition.y < gameArea.clientHeight - 50) playerPosition.y += playerSpeed;
            break;
        case 'ArrowLeft':
            if (playerPosition.x > 0) playerPosition.x -= playerSpeed;
            break;
        case 'ArrowRight':
            if (playerPosition.x < gameArea.clientWidth - 50) playerPosition.x += playerSpeed;
            break;
    }
    updatePositions();
});

// Funcionalidad táctil
let isDragging = false;

// Obtener posición táctil
function getTouchPosition(e) {
    const touch = e.touches[0];
    return {
        x: touch.clientX,
        y: touch.clientY
    };
}

// Iniciar el arrastre táctil
player.addEventListener('touchstart', (e) => {
    isDragging = true;
    e.preventDefault(); // Previene comportamientos no deseados como el scroll
});

// Mover el jugador con arrastre
window.addEventListener('touchmove', (e) => {
    if (isDragging) {
        const touchPosition = getTouchPosition(e);
        playerPosition.x = touchPosition.x - (player.offsetWidth / 2);
        playerPosition.y = touchPosition.y - (player.offsetHeight / 2);
        updatePositions();
    }
});

// Finalizar el arrastre táctil
window.addEventListener('touchend', () => {
    isDragging = false;
});

function moveBeyonce() {
    if (beyoncePosition.x < playerPosition.x) {
        beyoncePosition.x += beyonceSpeed;
    } else if (beyoncePosition.x > playerPosition.x) {
        beyoncePosition.x -= beyonceSpeed;
    }

    if (beyoncePosition.y < playerPosition.y) {
        beyoncePosition.y += beyonceSpeed;
    } else if (beyoncePosition.y > playerPosition.y) {
        beyoncePosition.y -= beyonceSpeed;
    }

    updatePositions();
    checkCollision();
}

function updatePositions() {
    player.style.transform = `translate(${playerPosition.x}px, ${playerPosition.y}px)`;
    beyonce.style.transform = `translate(${beyoncePosition.x}px, ${beyoncePosition.y}px)`;
}

function checkCollision() {
    if (Math.abs(playerPosition.x - beyoncePosition.x) < 50 && Math.abs(playerPosition.y - beyoncePosition.y) < 50) {
        alert('¡Beyoncé te atrapó!');
        playerPosition = { x: 100, y: 100 };
        beyoncePosition = { x: 300, y: 300 };
    }
}

function gameLoop() {
    moveBeyonce();
    requestAnimationFrame(gameLoop);
}

gameLoop();

