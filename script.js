let currentNumber = 1;
let gameOver = false;
let timer;
let timeLeft = 10;

function isClapNumber(num) {
  const str = num.toString();
  let count = 0;
  for (let char of str) {
    if (["3", "6", "9"].includes(char)) {
      count++;
    }
  }
  return count > 0 ? "짝!".repeat(count) : num.toString();
}

function logMessage(message) {
  const log = document.getElementById("game-log");
  log.textContent += message + "\n";
  log.scrollTop = log.scrollHeight;
}

function getComputerMistakeRate() {
  const difficulty = document.getElementById("difficulty").value;
  if (difficulty === "easy") return 0.15;
  if (difficulty === "normal") return 0.05;
  if (difficulty === "hard") return 0.001;
  return 0.05;
}

function handleUserTurn() {
  if (gameOver) return;

  clearInterval(timer);

  const input = document.getElementById("userInput").value.trim();
  const correct = isClapNumber(currentNumber);

  if (input !== correct) {
    endGame(`❌ 틀렸어요! 정답은 "${correct}"였습니다. 게임 오버!`);
    return;
  }

  logMessage(`👤 사용자: ${input}`);
  currentNumber++;
  document.getElementById("userInput").value = "";
  document.getElementById("turn-info").textContent = "컴퓨터의 차례입니다";
  document.getElementById("timer").textContent = "";

  setTimeout(computerTurn, 1000);
}

function computerTurn() {
  if (gameOver) return;

  const mistakeRate = getComputerMistakeRate();
  const correctAnswer = isClapNumber(currentNumber);
  let computerAnswer;

  if (Math.random() < mistakeRate) {
    computerAnswer = correctAnswer.includes("짝") ? (Math.random() < 0.5 ? currentNumber.toString() : "짝!") : "짝!";
  } else {
    computerAnswer = correctAnswer;
  }

  logMessage(`🤖 컴퓨터: ${computerAnswer}`);

  if (computerAnswer !== correctAnswer) {
    endGame(`🎉 컴퓨터가 틀렸어요! 당신의 승리!`);
    return;
  }

  currentNumber++;
  document.getElementById("turn-info").textContent = "당신의 차례입니다";
  startTimer();
}

function startTimer() {
  timeLeft = 10;
  document.getElementById("timer").textContent = `남은 시간: ${timeLeft}초`;

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = `남은 시간: ${timeLeft}초`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      endGame("⏰ 시간이 초과되었습니다. 게임 오버!");
    }
  }, 1000);
}

function endGame(message) {
  gameOver = true;
  clearInterval(timer);
  document.getElementById("game-result").textContent = message;
  document.getElementById("timer").textContent = "";
}

function resetGame() {
  currentNumber = 1;
  gameOver = false;
  clearInterval(timer);
  document.getElementById("game-log").textContent = "";
  document.getElementById("game-result").textContent = "";
  document.getElementById("turn-info").textContent = "당신의 차례입니다";
  document.getElementById("userInput").value = "";
  document.getElementById("timer").textContent = "";
  document.getElementById("userInput").focus();
  startTimer();
}

// ⌨️ Enter 키 입력 지원
document.addEventListener("DOMContentLoaded", () => {
  const inputBox = document.getElementById("userInput");
  inputBox.focus();

  inputBox.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      handleUserTurn();
    }
  });

  startTimer(); // 첫 게임 시작 시 타이머 작동
});


