const body = document.querySelector('body');
const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');

let intervalID = null;

startButton.addEventListener('click', () => {
  intervalID = setInterval(onStartColorChange, 1000);
  startButton.setAttribute('disabled', '');
  stopButton.removeAttribute('disabled');
});

stopButton.addEventListener('click', onStopColorChange);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStartColorChange() {
  body.style.backgroundColor = getRandomHexColor();
}

function onStopColorChange() {
  clearInterval(intervalID);
  stopButton.setAttribute('disabled', '');
  startButton.removeAttribute('disabled');
}
