let currentNumber = 1;
let gameOver = false;

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
  if (difficulty === "easy") return 0.15;   // 15% 실수
  if (difficulty === "normal") return 0.05; // 5% 실수
  if (difficulty === "hard") return 0.001;  // 0.1% 실수
  return 0.05;
}

function handleUserTurn() {
  if (gameOver) return;

  const input = document.getElementById("userInput").value.trim();
  const correct = isClapNumber(currentNumber);

  if (input !== correct) {
    document.getElementById("game-result").textContent = `❌ 틀렸어요! 정답은 "${correct}"였습니다. 게임 오버!`;
    gameOver = true;
    return;
  }

  logMessage(`👤 사용자: ${input}`);
  currentNumber++;
  document.getElementById("userInput").value = "";
  document.getElementById("turn-info").textContent = "컴퓨터의 차례입니다";

  setTimeout(computerTurn, 1000);
}

function computerTurn() {
  if (gameOver) return;

  const mistakeRate = getComputerMistakeRate();
  const correctAnswer = isClapNumber(currentNumber);
  let computerAnswer;

  if (Math.random() < mistakeRate) {
    if (correctAnswer.includes("짝")) {
      computerAnswer = (Math.random() < 0.5) ? currentNumber.toString() : "짝!";
    } else {
      computerAnswer = "짝!";
    }
  } else {
    computerAnswer = correctAnswer;
  }

  logMessage(`🤖 컴퓨터: ${computerAnswer}`);

  if (computerAnswer !== correctAnswer) {
    document.getElementById("game-result").textContent = `🎉 컴퓨터가 틀렸어요! 당신의 승리!`;
    gameOver = true;
    return;
  }

  currentNumber++;
  document.getElementById("turn-info").textContent = "당신의 차례입니다";
}

function resetGame() {
  currentNumber = 1;
  gameOver = false;
  document.getElementById("game-log").textContent = "";
  document.getElementById("game-result").textContent = "";
  document.getElementById("turn-info").textContent = "당신의 차례입니다";
  document.getElementById("userInput").value = "";
  document.getElementById("userInput").focus();
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
});
