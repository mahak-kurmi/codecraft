// script.js
let timer;
let milliseconds = 0, seconds = 0, minutes = 0;
let running = false;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const lapTimes = document.getElementById('lapTimes');

function updateDisplay() {
  minutesDisplay.textContent = minutes.toString().padStart(2, '0');
  secondsDisplay.textContent = seconds.toString().padStart(2, '0');
  millisecondsDisplay.textContent = milliseconds.toString().padStart(2, '0');
}

function startStopwatch() {
  if (!running) {
    running = true;
    timer = setInterval(() => {
      milliseconds++;
      if (milliseconds === 100) {
        milliseconds = 0;
        seconds++;
      }
      if (seconds === 60) {
        seconds = 0;
        minutes++;
      }
      updateDisplay();
    }, 10);
  }
}

function pauseStopwatch() {
  clearInterval(timer);
  running = false;
}

function resetStopwatch() {
  clearInterval(timer);
  running = false;
  milliseconds = 0;
  seconds = 0;
  minutes = 0;
  updateDisplay();
  lapTimes.innerHTML = ''; // Clear laps
}

function recordLap() {
  if (running) {
    const lapTime = `${minutesDisplay.textContent}:${secondsDisplay.textContent}:${millisecondsDisplay.textContent}`;
    const li = document.createElement('li');
    li.textContent = `Lap: ${lapTime}`;
    lapTimes.appendChild(li);
  }
}

document.getElementById('start').addEventListener('click', startStopwatch);
document.getElementById('pause').addEventListener('click', pauseStopwatch);
document.getElementById('reset').addEventListener('click', resetStopwatch);
document.getElementById('lap').addEventListener('click', recordLap);
