let trackArt = document.querySelector("#trackArt");
let trackName = document.querySelector("#trackName");
let artistName = document.querySelector("#artistName");

let playPause = document.querySelector("#play");
let prevBtn = document.querySelector("#previous");
let netBtn = document.querySelector("#next");

let seekSlider = document.querySelector("#myProgressBar");
let currentTime = document.querySelector("#currentTime");
let totalTime = document.querySelector("#totalTime");

let volumeSlider = document.querySelector("#myVolumeBar");
let volumeUp = document.querySelector("#plus");
let volumedown = document.querySelector("#minus");

let songItems = document.querySelector(".songItem");
let songName = document.querySelector(".songName"); 
////////
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
///////
let songIndex = 0;
let songs = [
    {trackArtPath: "covers/img1.jpg", trackName: "STAY", filePath: "songs/song1.mp3", artistName: "The Kid LAROI, Justin Bieber"},
    {trackArtPath: "covers/img2.jpg", trackName: "Sunflower", filePath: "songs/song2.mp3", artistName: "Post Malone and Swae Lee"},
    {trackArtPath: "covers/img3.jpg", trackName: "BeFoUr", filePath: "songs/song3.mp3", artistName: "Zayn"}
];

let audioElement = new Audio("songs/song1.mp3");
////////
playPause.addEventListener("click", ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
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
});
/////////
audioElement.addEventListener("timeupdate", ()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100)
    seekSlider.value = progress;
});
seekSlider.addEventListener("change", ()=>{
    audioElement.currentTime = seekSlider.value * audioElement.duration/100;
});
////////
volumeSlider.addEventListener("mousemove", ()=>{
    audioElement.volume = volumeSlider.value / 100;
});
volumeUp.addEventListener("click", ()=>{
    audioElement.volume = volumeSlider.value + 5;

});










/*Array.from(document.querySelector("#playpause")).forEach((element)=>{
    element.addEventListener("click", (e)=>{
        console.log(e);
    })
});*/