const aboutUsVideoContainer = document.querySelector(".about-us-video-container");
const videoContainer = document.querySelector(".video-container");
const video = document.querySelector("video");
const controls = document.querySelector(".control-nav");
const progressField = document.querySelector(".progress-field");
const progressFieldUpdate = document.querySelector(".progress-field-update");
const controlNav = document.querySelector(".control-nav");
const playButton = document.querySelector("#play-button");
const playButtonIcon = document.querySelector(".fa-play");
const skipButtons = document.querySelectorAll("[data-skip]");
const volumeButton = document.querySelector("#volume-button");
const volumeButtonIcon = document.querySelector(".fa-volume-up");
const myVolumeController = document.querySelector(".volume-controller");
const myVolumeControllerBar = document.querySelector(".volume-controller-bar");
const currentTime = document.querySelector("#current-time");
const videoTime = document.querySelector("#total-time");
const fullScreenButton = document.querySelector("#full-screen-button");
const fullScreenButtonIcon = document.querySelector(".fa-window-maximize");

video.style.height = `${aboutUsVideoContainer.offsetHeight - controls.offsetHeight}px`;
const totalTimeMinutes = Math.floor(video.duration / 60);
const totalTimeSeconds = (video.duration % 60).toFixed(0);
const volumeWidth = myVolumeController.offsetWidth;
videoTime.innerHTML = `<b> /${totalTimeMinutes < 10 ? "0" : ""}${totalTimeMinutes}:${totalTimeSeconds < 10 ? "0" : ""}${totalTimeSeconds}</b>`;

window.addEventListener("resize", () => {
    video.style.height = `${aboutUsVideoContainer.offsetHeight - controls.offsetHeight}px`;
});

function playVideo() {
    if (volumeButtonIcon.classList.contains("fa-volume-off")) {
        video.volume = 0;
    } else {
        video.volume = 0.5;
    }
    video.paused ? video.play() : video.pause();
    playButtonIcon.classList.toggle("fa-play", video.paused);
    playButtonIcon.classList.toggle("fa-pause", !video.paused);
}


function handleTimeUpdate() {
    const percent = (video.currentTime / video.duration) * 100;
    progressFieldUpdate.style.width = `${percent}%`;
}

function updateProgressField(e) {
    const clickTime = (e.offsetX / progressField.offsetWidth) * video.duration;
    video.currentTime = clickTime;

}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function silenceVideo() {
    let currentVolume = parseFloat(myVolumeControllerBar.offsetWidth / myVolumeController.offsetWidth).toFixed(2);
    video.volume == 0 ? video.volume = currentVolume : video.volume = 0;
    volumeButtonIcon.classList.toggle("fa-volume-up", video.volume !== 0);
    volumeButtonIcon.classList.toggle("fa-volume-off", video.volume == 0);
}

function volumeBarAppear() {
    myVolumeController.style.width = `20%`;
}

function volumeBarDisappear() {
    myVolumeController.style.width = `0%`;
}

function volumeChange(e) {
    const volumePower = e.offsetX / myVolumeController.offsetWidth;
    const volumePercent = volumePower * 100;
    video.volume = volumePower;
    volumeButtonIcon.classList.toggle("fa-volume-up", video.volume !== 0);
    volumeButtonIcon.classList.toggle("fa-volume-off", video.volume == 0);
    myVolumeControllerBar.style.width = `${volumePercent}%`;
}

function timeChange() {
    const currentTimeMinutes = Math.floor(video.currentTime / 60);
    const currentTimeSeconds = (video.currentTime % 60).toFixed(0);
    currentTime.innerHTML = `<b>${currentTimeMinutes < 10 ? "0" : ""}${currentTimeMinutes}:${currentTimeSeconds < 10 ? "0" : ""}${currentTimeSeconds}</b>`;
}

function fullScreenCheck() {
    return document.isFullscreen || document.webkitIsFullscreen || document.mozFullScreen || document.msFullscreenElement;
}

function fullScreenHandle() {
    if (fullScreenCheck()) {
        closeFullscreen();
    } else {
        openFullscreen(aboutUsVideoContainer);
    }
}

function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
    }
}

function openFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { /* Firefox */
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { /* IE/Edge */
        element.msRequestFullscreen();
    }
}

function handleFullScreenIcon() {
    fullScreenButtonIcon.classList.toggle("fa-window-minimize", fullScreenCheck());
    fullScreenButtonIcon.classList.toggle("fa-window-maximize", !fullScreenCheck());
}




video.addEventListener("click", playVideo);
video.addEventListener("timeupdate", handleTimeUpdate);
let mouseOnPF = false;
progressField.addEventListener("click", updateProgressField);
progressField.addEventListener("mousedown", () => mouseOnPF = true);
progressField.addEventListener("mousemove", (e) => {
    if (mouseOnPF) {
        updateProgressField(e);
    }
});
progressField.addEventListener("mouseup", () => mouseOnPF = false);
progressField.addEventListener("mouseout", () => mouseOnPF = false);
playButton.addEventListener("click", playVideo);
skipButtons.forEach(skipButton => skipButton.addEventListener("click", skip));
volumeButton.addEventListener("click", silenceVideo);
volumeButton.addEventListener("mouseover", volumeBarAppear);
volumeButton.addEventListener("mouseout", volumeBarDisappear);
myVolumeController.addEventListener("mouseover", volumeBarAppear);
myVolumeController.addEventListener("mouseout", volumeBarDisappear);
let mouseOnVol = false;
myVolumeController.addEventListener("click", volumeChange);
myVolumeController.addEventListener("mousedown", () => {
    mouseOnVol = true;
});
myVolumeController.addEventListener("mousemove", (e) => {
    if (mouseOnVol) {
        volumeChange(e);
    }
});
myVolumeController.addEventListener("mouseup", () => {
    mouseOnVol = false;
});
myVolumeController.addEventListener("mouseleave", () => {
    mouseOnVol = false;
});
video.addEventListener("timeupdate", timeChange);
fullScreenButton.addEventListener("click", fullScreenHandle);
aboutUsVideoContainer.addEventListener("fullscreenchange", handleFullScreenIcon);




const nav = document.querySelector(".nav-bar");
const welcome_block = document.querySelector(".welcome");

function mouseOnNav() {
    welcome_block.classList.add("welcome-fixed");
    welcome_block.innerHTML = "Welcome!";
    console.log(welcome_block);
}

function mouseNotOnNav() {
    welcome_block.classList.remove("welcome-fixed");
    welcome_block.innerHTML = "";
    console.log(welcome_block);
}


nav.addEventListener("mouseover", mouseOnNav);
nav.addEventListener("mouseout", mouseNotOnNav);