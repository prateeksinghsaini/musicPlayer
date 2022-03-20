let trackArt = document.querySelector("#trackArt");
let coverImg = document.querySelector("#coverImg");
let trackName = document.querySelector("#trackName");
let artistName = document.querySelector("#artistName");

let playPause = document.querySelector("#play");
let prevBtn = document.querySelector("#previous");
let nextBtn = document.querySelector("#next");

let seekSlider = document.querySelector("#myProgressBar");
let currentTime = document.querySelector("#currentTime");
let totalTime = document.querySelector("#totalTime");

let volumeSlider = document.querySelector("#myVolumeBar");
let volumeUp = document.querySelector("#plus");
let volumedown = document.querySelector("#minus");

let songItems = document.querySelector(".songItem");
let songName = Array.from(document.querySelector(".songName")); 

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

let imgIndex = 0;
let imgs = [
    "covers/STAY.jpg",
    "covers/Sunflower.jpg",
    "covers/BeFoUr.jpg"
];

let audioElement = new Audio("songs/song1.mp3");

//////// playbutton /////////////////////////////////////////////////////////

let playsong = function(songs) {
     if(audioElement.paused){
        audioElement.play();
        playPause.classList.remove("fa-play");
        playPause.classList.add("fa-pause");
        document.querySelector("#play").title = "pause";
    } else {
        audioElement.pause();
        playPause.classList.remove("fa-pause");
        playPause.classList.add("fa-play");
        document.querySelector("#play").title = "play";
    }
}

playPause.addEventListener("click", playsong);

///////// progressbar //////////////////////////////////////////////////////

audioElement.addEventListener("timeupdate", ()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100)
    seekSlider.value = progress;
});
seekSlider.addEventListener("change", ()=>{
    audioElement.currentTime = seekSlider.value * audioElement.duration/100;
});

//////// voluebar /////////////////////////////////////////////////////////

volumeSlider.addEventListener("mousemove", ()=>{
    audioElement.volume = volumeSlider.value / 100;
});
volumeUp.addEventListener("click", ()=>{
    audioElement.volume = volumeSlider.value + 5;

});

//////// next prev /////////////////////////////////////////////////////////

let loadSong = (songs) => {
    trackName.textContent = songs.trackName;
    artistName.textContent = songs.artistName;
    audioElement.src = "songs/" + songs.trackName + ".mp3";
    artistName.textContent = songs.artistName;
    coverImg.src = "covers/" + songs.trackName + ".jpg";
};
loadSong(songs[0]);

let nextSong = () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playsong();
};
/*let prevSong = () => {
    songIndex = (((songIndex - 1) % songs.length) + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playsong();
};*/

nextBtn.addEventListener("click", nextSong);
nextBtn.addEventListener("click", prevSong);

////////  auto next /////////////////////////////////////////////////////////

/*let autoNext = () => {
    if(audioElement.currentTime = 100){
    playPause(),
    nextSong();
    }
}*/