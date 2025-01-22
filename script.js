let startTime, updatedTime, difference, tInterval, savedTime = 0, running = false;
const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - savedTime;
        tInterval = setInterval(getShowTime, 1000);
        startStopBtn.innerHTML = "Pause";
        startStopBtn.classList.remove('bg-green-500', 'hover:bg-green-700');
        startStopBtn.classList.add('bg-yellow-500', 'hover:bg-yellow-700');
        running = true;
    } else {
        clearInterval(tInterval);
        savedTime = difference;
        startStopBtn.innerHTML = "Start";
        startStopBtn.classList.remove('bg-yellow-500', 'hover:bg-yellow-700');
        startStopBtn.classList.add('bg-green-500', 'hover:bg-green-700');
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    display.innerHTML = "00:00:00";
    startStopBtn.innerHTML = "Start";
    startStopBtn.classList.remove('bg-yellow-500', 'hover:bg-yellow-700');
    startStopBtn.classList.add('bg-green-500', 'hover:bg-green-700');
    running = false;
    savedTime = 0;
    laps.innerHTML = '';
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    display.innerHTML = hours + ":" + minutes + ":" + seconds;
}

function recordLap() {
    if (running) {
        const lapTime = display.innerHTML;
        const lapItem = document.createElement('li');
        lapItem.innerHTML = lapTime;
        laps.appendChild(lapItem);
    }
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);
