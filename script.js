const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
let snake = [{ x: 15, y: 15 }];
let food = { x: 100, y: 100 };
let direction = "right";

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00f";
  snake.forEach(segment => {
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
  });

  ctx.fillStyle = "#f00";
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

function update() {
  const head = Object.assign({}, snake[0]);
  switch (direction) {
    case "up": head.y--; break;
    case "down": head.y++; break;
    case "left": head.x--; break;
    case "right": head.x++; break;
  }

  if (
    head.x < 0 || head.x >= canvas.width / gridSize ||
    head.y < 0 || head.y >= canvas.height / gridSize ||
    snake.some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    alert("Game Over!");
    resetGame();
    return;
  }

  if (head.x === food.x && head.y === food.y) {
    snake.unshift(food);
    generateFood();
  } else {
    snake.pop(); // Remove the last segment of the snake
    snake.unshift(head); // Add the new head of the snake
  }
}

function generateFood() {
  food = {
    x: Math.floor(Math.random() * (canvas.width / gridSize)),
    y: Math.floor(Math.random() * (canvas.height / gridSize))
  };
}

function resetGame() {
  snake = [{ x: 5, y: 5 }];
  direction = "right";
  generateFood();
}

function gameLoop() {
  draw();
  update();
}

document.addEventListener("keydown", event => {
  switch (event.key) {
    case "ArrowUp": direction = "up"; break;
    case "ArrowDown": direction = "down"; break;
    case "ArrowLeft": direction = "left"; break;
    case "ArrowRight": direction = "right"; break;
  }
});

generateFood(); 
setInterval(gameLoop, 400); 
