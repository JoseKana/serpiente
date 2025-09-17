const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const box = 20; // tamaño de cada cuadro

let snake = [{ x: 9 * box, y: 9 * box }];
let direction;
let food = {
  x: Math.floor(Math.random() * 20) * box,
  y: Math.floor(Math.random() * 20) * box,
};
let score = 0;
const scoreDisplay = document.getElementById("score");

// Movimiento con teclado
document.addEventListener("keydown", setDirection);
function setDirection(event) {
  if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
}

// Dibujar elementos
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibujar snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "#00ff55" : "#ffffff";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // Dibujar comida
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  // Posición cabeza
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === "LEFT") snakeX -= box;
  if (direction === "UP") snakeY -= box;
  if (direction === "RIGHT") snakeX += box;
  if (direction === "DOWN") snakeY += box;

  // Si come la comida
  if (snakeX === food.x && snakeY === food.y) {
    score++;
    scoreDisplay.textContent = score;
    food = {
      x: Math.floor(Math.random() * 20) * box,
      y: Math.floor(Math.random() * 20) * box,
    };
  } else {
    snake.pop(); // borra la cola
  }

  let newHead = { x: snakeX, y: snakeY };

  // Game over: bordes o colisión con cuerpo
  if (
    snakeX < 0 ||
    snakeY < 0 ||
    snakeX >= canvas.width ||
    snakeY >= canvas.height ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
    alert("💀 Game Over! Puntaje: " + score);
  }

  snake.unshift(newHead);
}

// Verificar colisión
function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) {
      return true;
    }
  }
  return false;
}

// Reinicio
document.getElementById("restartBtn").addEventListener("click", () => {
  snake = [{ x: 9 * box, y: 9 * box }];
  direction = null;
  score = 0;
  scoreDisplay.textContent = score;
  food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box,
  };
  clearInterval(game);
  game = setInterval(draw, 150);
});

// Iniciar juego
let game = setInterval(draw, 150);
