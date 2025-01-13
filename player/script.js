// day and night mode function
document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    const nightIcon = document.querySelector(".night img");
    const dayIcon = document.querySelector(".day img");
    const nightButton = document.querySelector(".night");

    const savedMode = localStorage.getItem("mode") || "light";
    const setMode = (mode) => {
        if (mode === "dark") {
            body.classList.add("dark");
            nightIcon.style.display = "none";
            dayIcon.style.display = "block";
        } else {
            body.classList.remove("dark");
            nightIcon.style.display = "block";
            dayIcon.style.display = "none";
        }
        localStorage.setItem("mode", mode);
    };

    nightButton.addEventListener("click", function () {
        const currentMode = body.classList.contains("dark") ? "dark" : "light";
        setMode(currentMode === "dark" ? "light" : "dark");
    });

    // for pause,play,end-time,duration,next,previus function

    const song = document.getElementById('music');
    const endTimeElement = document.getElementsByClassName('end-time')[0];
    const runTimeElement = document.getElementsByClassName('run-time')[0];
    const range = document.getElementsByClassName('line')[0];
    const controlButton = document.getElementById('play-pause');
    const playIcon = document.getElementsByClassName('play')[0];
    const pauseIcon = document.getElementsByClassName('pause')[0];
    const nextbtn = document.getElementsByClassName('next')[0];

    song.addEventListener('loadedmetadata', () => {
        const totalDuration = song.duration;
        const minutes = Math.floor(totalDuration / 60);
        const seconds = Math.floor(totalDuration % 60);
        endTimeElement.innerHTML = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    });

    song.addEventListener('timeupdate', () => {
        const currentTime = song.currentTime;
        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
        runTimeElement.innerHTML = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        if (!isNaN(song.duration)) {
            const linepr = (currentTime / song.duration) * 100;
            range.style.width = `${linepr}%`;
        }
    });

    controlButton.addEventListener('click', function () {
        if (song.paused) {
            song.play();
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        } else {
            song.pause();
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        }
    });

    song.addEventListener('ended', function () {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        range.style.width = '0%';
        runTimeElement.innerHTML = '0:00';
    });
});