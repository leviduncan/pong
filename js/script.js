<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Pong Game</title>
<style>
  body {
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: black;
  }
  canvas {
    border: 1px solid white;
  }
</style>
</head>
<body>
<canvas id="pongCanvas" width="800" height="600"></canvas>
<script>
  const canvas = document.getElementById("pongCanvas");
  const ctx = canvas.getContext("2d");

  // Paddle settings, scores
  const paddleWidth = 10;
  const paddleHeight = 100;
  let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
  let rightPaddleY = canvas.height / 2 - paddleHeight / 2;
  const paddleSpeed = 50;

  // Ball settings
  const ballSize = 10;
  let ballX = canvas.width / 2;
  let ballY = canvas.height / 2;
  let ballSpeedX = 5;
  let ballSpeedY = 3;

  // Scores
  let playerOneScore = 0;
  let playerTwoScore = 0;

  function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw paddles
    ctx.fillStyle = "white";
    ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
    ctx.fillRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);

    // Draw ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
    ctx.fill();

    // Draw scores
    ctx.font = "30px Arial";
    ctx.fillText(`Player One: ${playerOneScore}`, 50, 50);
    ctx.fillText(`Player Two: ${playerTwoScore}`, canvas.width - 250, 50);

    // Move the ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

     // Draw dashed line
    ctx.setLineDash([10, 10]); // Dash pattern: 10px on, 10px off
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.strokeStyle = "white";
    ctx.stroke();
    ctx.setLineDash([]); // Reset dash pattern

    // Ball collision with top and bottom walls
    if (ballY - ballSize < 0 || ballY + ballSize > canvas.height) {
      ballSpeedY = -ballSpeedY;
    }

    // Ball collision with paddles
    if (
      (ballX - ballSize < paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) ||
      (ballX + ballSize > canvas.width - paddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight)
    ) {
      ballSpeedX = -ballSpeedX;
    }

    // Ball out of bounds
    if (ballX - ballSize < 0) {
      playerTwoScore++;
      resetBall();
    } else if (ballX + ballSize > canvas.width) {
      playerOneScore++;
      resetBall();
    }

    // Game loop
    requestAnimationFrame(draw);
  }

  function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
    ballSpeedY = Math.random() > 0.5 ? -3 : 3; // Randomize Y direction
  }

  // Keyboard controls
  window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" && rightPaddleY > 0) {
      rightPaddleY -= paddleSpeed;
    }

    if (event.key === "w" && leftPaddleY > 0) {
      leftPaddleY -= paddleSpeed;
    }
    
    if (event.key === "ArrowDown" && leftPaddleY + paddleHeight < canvas.height) {
      rightPaddleY += paddleSpeed;
    }

    if (event.key === "s" && leftPaddleY + paddleHeight < canvas.height) {
      leftPaddleY += paddleSpeed;
    }
  });

  // Start the game loop
  draw();
</script>
</body>
</html>
