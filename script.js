let songBox = document.querySelectorAll(".songbox");
let masterPlay = document.querySelectorAll(".masterplay");

let menuBtn = document.querySelector(".menu");
let closeBtn = document.querySelector("#close");
let sideNav = document.querySelector(".sidenav");
let sideUl = document.querySelector('#sidenavlist')
let logo = document.querySelector("#logo");
let sideBrand = document.querySelector(".sidebrand");

let playPause = document.querySelector("#play");
let prevBtn = document.querySelector("#prev");
let nextBtn = document.querySelector("#next");

let seekSlider = document.querySelector("#myProgressBar");
let displayCurrentTime = document.querySelector("#currentTime");
let displayTotalTime = document.querySelector("#totalTime");

let volumeSlider = document.querySelector("#myVolumeBar");
let volumeUp = document.querySelector("#plus");
let volumedown = document.querySelector("#minus");

let audioElement = new Audio();


songBox.forEach(songBoxTile => {
        songBoxTile.addEventListener("mouseover", () =>{
                masterPlay.forEach(masterPlayBtn => {
                        masterPlayBtn.style.visibility = "visible";
                });
        });
        songBoxTile.addEventListener("mouseout", () =>{
                masterPlay.forEach(masterPlayBtn => {
                        masterPlayBtn.style.visibility = "hidden";
                });
        });
});

menuBtn.addEventListener('click', () => {
        sideNav.style.width = "90%";
        sideUl.style.visibility = "visible";
        sideBrand.style.visibility = "visible";
        logo.style.visibility = "visible";
        closeBtn.style.visibility = "visible";
});
closeBtn.addEventListener('click', () => {
        sideNav.style.width = "0%";
        sideUl.style.visibility = "hidden";
        sideBrand.style.visibility = "hidden";
        logo.style.visibility = "hidden";
        closeBtn.style.visibility = "hidden";
});

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
        playPause.classList.remove("fa-circle-play");
        playPause.classList.add("fa-circle-pause");
        document.querySelector("#play").title = "pause";
    } else {
        audioElement.pause();
        playPause.classList.remove("fa-circle-pause");
        playPause.classList.add("fa-circle-play");
        document.querySelector("#play").title = "play";
    }
}

playPause.addEventListener("click", playsong);

//////// next prev /////////////////////////////////////////////////////////

let loadSong = (songs) => {
    audioElement.src = `songs/${songs.trackName}.mp3`;

    
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
