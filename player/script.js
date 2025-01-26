document.addEventListener("DOMContentLoaded", function () {
    // Dark Mode Variables
    const body = document.body;
    const nightIcon = document.querySelector(".night img");
    const dayIcon = document.querySelector(".day img");
    const nightButton = document.querySelector(".night");

    // Dark Mode Setup
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

    // Music Player Variables
    const songDatabase = [
        {
            title: "Paint The Town Red",
            artist: "Doja Cat",
            releaseDate: "May 1, 2023",
            banner: "./content/song/Paint The Town Red/banner/Doja Cat - Paint The Town Red banner.jpeg",
            src: "./content/song/Paint The Town Red/song/Doja Cat - Paint The Town Red.mp3",
        },
        {
            title: "I Wanna Be Yours",
            artist: "Arctic Monkeys",
            releaseDate: "May 1, 2023",
            banner: "./content/song/Arctic Monkeys - I Wanna Be Yours/banner/Arctic Monkeys - I Wanna Be Yours.png",
            src: "./content/song/Arctic Monkeys - I Wanna Be Yours/song/Arctic Monkeys - I Wanna Be Yours.mp3",
        },
        {
            title: "Without Me",
            artist: "Eminem",
            releaseDate: "May 1, 2023",
            banner: "./content/song/Eminem - Without Me/banner/Eminem - Without Me.jpeg",
            src: "./content/song/Eminem - Without Me/song/Eminem - Without Me.mp3",
        },
        {
            title: "Flawed Mangoes",
            artist: "Dramamine",
            releaseDate: "May 1, 2023",
            banner: "./content/song/Flawed Mangoes - Dramamine/banner/download (3).jpeg",
            src: "./content/song/Mangoes - Dramamine/song/Mangoes - Dramamine.mp3",
        },
        
    ];

    let currentSongIndex = 0;
    const audio = document.getElementById("music");
    const endTimeElement = document.querySelector(".end-time");
    const runTimeElement = document.querySelector(".run-time");
    const range = document.querySelector(".line");
    const controlButton = document.getElementById("play-pause");
    const playIcon = document.querySelector(".play");
    const pauseIcon = document.querySelector(".pause");

    // Load a Song
    function loadSong(index) {
        const song = songDatabase[index];
        document.getElementById("title").innerText = song.title;
        document.getElementById("display_artist_name").innerText = song.artist;
        document.getElementById("display_relese_date").innerText = song.releaseDate;
        document.getElementById("banner").src = song.banner;
        audio.src = song.src;
        audio.load();
    }

    // Update Song Time
    audio.addEventListener("loadedmetadata", () => {
        const totalDuration = audio.duration;
        const minutes = Math.floor(totalDuration / 60);
        const seconds = Math.floor(totalDuration % 60);
        endTimeElement.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    });

    audio.addEventListener("timeupdate", () => {
        const currentTime = audio.currentTime;
        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
        runTimeElement.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;

        if (!isNaN(audio.duration)) {
            const linePercent = (currentTime / audio.duration) * 100;
            range.style.width = `${linePercent}%`;
        }
    });

    // Play/Pause Toggle
    controlButton.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
            playIcon.style.display = "none";
            pauseIcon.style.display = "block";
        } else {
            audio.pause();
            playIcon.style.display = "block";
            pauseIcon.style.display = "none";
        }
    });

    // Previous Song
    function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + songDatabase.length) % songDatabase.length;
        loadSong(currentSongIndex);
        audio.play();
        playIcon.style.display = "none";
        pauseIcon.style.display = "block";
    }

    // Next Song
    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % songDatabase.length;
        loadSong(currentSongIndex);
        audio.play();
        playIcon.style.display = "none";
        pauseIcon.style.display = "block";
    }

    document.querySelector(".previous").addEventListener("click", prevSong);
    document.querySelector(".next").addEventListener("click", nextSong);

    // Generate Playlist
    function generatePlaylist() {
        const playlistContainer = document.querySelector(".scroll");
        playlistContainer.innerHTML = "";

        songDatabase.forEach((song, index) => {
            const songBox = `
                <div class="box" onclick="loadSong(${index}); audio.play();">
                    <div class="song_img">
                        <img src="${song.banner}" alt="">
                    </div>
                    <div class="info">
                        <p>${song.title}</p>
                        <p class="song_artist">${song.artist}</p>
                    </div>
                    <span class="playbtn">
                        <img src="https://img.icons8.com/?size=100&id=398&format=png&color=000000" alt="" style="width:40px;">
                    </span>
                </div>
            `;
            playlistContainer.innerHTML += songBox;
        });

        playlistContainer.innerHTML += `<p style="text-align:center; font-size:15px; margin:5px;">No More Items</p>`;
    }

    // On Load
    loadSong(currentSongIndex);
    generatePlaylist();
});

const playlist = document.getElementsByClassName("playlist");
const playlistIcon = document.getElementsByClassName("playlist_icon");

for (let i = 0; i < playlistIcon.length; i++) {
    playlistIcon[i].addEventListener("click", function () {
        for (let j = 0; j < playlist.length; j++) {
            const currentStyle = playlist[j].style.position;
            playlist[j].style.position = currentStyle === 'absolute' ? 'static' : 'absolute';
        }
    });
}

function closetab(){
    const playlist =  document.getElementsByClassName("playlist");
    if(playlist.style.position === "absolute"){
            playlist.style.position = "none"
    }else{
        playlist.style.block
    }
    function closeTab() {
  const playlistBox = document.getElementById("playlist");
  playlistBox.classList.toggle("hidden");
}}

// script.js
window.addEventListener('beforeunload', function (event) {
    // Display a confirmation message
    event.preventDefault();
    event.returnValue = "Do you want to leave this page?";
});