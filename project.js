const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");
const timer = document.getElementById("timer");
const musicBtn = document.getElementById("music");
const alarmSound = document.getElementById("alarmSound");

let timeleft = 1500;
let interval = null;

const sounds = [
    "sounds/flute.mp3",
    "sounds/night.mp3",
    "sounds/water.mp3"
];

let currentSoundIndex = 0;

alarmSound.src = sounds[currentSoundIndex];

const updateTimer = () => {
    const minutes = Math.floor(timeleft / 60);
    const seconds = timeleft % 60;

    timer.innerHTML = `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
};

const startTimer = () => {
    if (interval) return;

    interval = setInterval(() => {
        timeleft--;
        updateTimer();

        if (timeleft === 0) {
            clearInterval(interval);
            interval = null;

            alarmSound.currentTime = 0;
            alarmSound.play();

            alert("Yayy!! 5 minutes break");

            timeleft = 1500;
            updateTimer();
        }
    }, 1000);
};

const stopTimer = () => {
    clearInterval(interval);
    interval = null;
};

const resetTimer = () => {
    clearInterval(interval);
    interval = null;
    timeleft = 1500;
    updateTimer();
};

musicBtn.addEventListener("click", () => {
    alarmSound.pause();

    alarmSound.src = sounds[currentSoundIndex];
    alarmSound.currentTime = 0;
    alarmSound.play();

    currentSoundIndex = (currentSoundIndex + 1) % sounds.length;
});

start.addEventListener("click", startTimer);
stop.addEventListener("click", stopTimer);
reset.addEventListener("click", resetTimer);

updateTimer();

function setBg(image) {
  document.body.style.backgroundImage = `url('backgrounds/${image}')`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
}
