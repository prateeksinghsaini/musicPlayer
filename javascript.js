let trackArt = document.querySelector("#trackArt");
let coverImg = document.querySelector("#coverImg");
let trackName = document.querySelector("#trackName");
let artistName = document.querySelector("#artistName");

let playPause = document.querySelector("#play");
let prevBtn = document.querySelector("#prev");
let nextBtn = document.querySelector("#next");

let seekSlider = document.querySelector("#myProgressBar");
let displayCurrentTime = document.querySelector("#currentTime");
let displayTotalTime = document.querySelector("#totalTime");

let volumeSlider = document.querySelector("#myVolumeBar");
let volumeUp = document.querySelector("#plus");
let volumedown = document.querySelector("#minus");

let songItems = document.querySelector(".songItem");
let songName = Array.from(document.querySelector(".songName")); 
let songsList = document.querySelector("#songlist");


let audioElement = new Audio();
trackArt.style.animationPlayState = "paused";

////////  time /////////////////////////////////////////////////////////

let formatTime = (time) => {
    let min = Math.floor(time / 60);
    if(min < 10){
        min = `0${min}`;
    }
    let sec = Math.floor(time % 60);
    if(sec < 10){
        sec = `0${sec}`;
    }
    return `${min} : ${sec}`;
}


//////// playlistbox //////////////////////////////////////////////////////////

let playlistStatus = false;

let openPlayList = function() {
    let getPlayList = document.querySelector("#playList");

    if (playlistStatus === false) {
        getPlayList.style.visibility = "visible";
        playlistStatus = true;
    }
    else if (playlistStatus === true) {
        getPlayList.style.visibility = "hidden";
        playlistStatus = false
    }
};

/////// songsarry ////////////////////////////////////////////////////////////

let songIndex = 0;
let songs = [
    {trackArt: "covers/STAY.jpg",
    trackName: "STAY",
    artistName: "The Kid LAROI, Justin Bieber"},
    
    {trackArt: "covers/Sunflower.jpg",
    trackName: "Sunflower",
    artistName: "Post Malone and Swae Lee"},
    
    {trackArt: "covers/BeFoUr.jpg",
    trackName: "BeFoUr",
    artistName: "Zayn"}
];


//////// playbutton /////////////////////////////////////////////////////////

let playsong = function(songs) {
     if(audioElement.paused){
        audioElement.play();
        playPause.classList.remove("fa-play");
        playPause.classList.add("fa-pause");
        document.querySelector("#play").title = "pause";
        trackArt.style.animationPlayState = "running";
    } else {
        audioElement.pause();
        playPause.classList.remove("fa-pause");
        playPause.classList.add("fa-play");
        document.querySelector("#play").title = "play";
        trackArt.style.animationPlayState = "paused";
    }
}

playPause.addEventListener("click", playsong);

//////// next prev /////////////////////////////////////////////////////////

let loadSong = (songs) => {
    trackName.textContent = songs.trackName;
    artistName.textContent = songs.artistName;
    audioElement.src = `songs/${songs.trackName}.mp3`;
    artistName.textContent = songs.artistName;
    coverImg.src = songs.trackArt;

    
    setTimeout(() => {
        seekSlider.max = audioElement.duration;
        displayTotalTime.innerHTML = formatTime(audioElement.duration);
    }, 500);
    displayTotalTime.textContent = audioElement.duration;

    setInterval(() => {
        seekSlider.value = audioElement.currentTime;
        displayCurrentTime.innerHTML = formatTime(audioElement.currentTime);
        if(Math.floor(audioElement.currentTime) == Math.floor(seekSlider.max)){
            nextBtn.click();
        }
    }, 500);
    displayCurrentTime.textContent = audioElement.currentTime;
};

loadSong(songs[0]);

let nextSong = () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playsong();
};
nextBtn.addEventListener("click", nextSong);

let prevSong = () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playsong();
};
prevBtn.addEventListener("click", prevSong);

///////// progressbar //////////////////////////////////////////////////////


seekSlider.addEventListener("change", ()=>{
    audioElement.currentTime = seekSlider.value;
});

//////// voluebar /////////////////////////////////////////////////////////

volumeSlider.addEventListener("change", ()=>{
    audioElement.volume = volumeSlider.value / 100;
});
volumeUp.addEventListener("click", ()=>{
    audioElement.volume = volumeSlider.value / 100;
    volumeSlider.value = (audioElement.volume * 100)  + 5;
});
volumedown.addEventListener("click", ()=>{
    audioElement.volume = volumeSlider.value / 100;
    volumeSlider.value = (audioElement.volume * 100)  - 5;
});

////////  playlist /////////////////////////////////////////////////////////

