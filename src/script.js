//selecting our elements
const videoHeader = document.getElementsByClassName("video-header")[0];
const playBtn = document.getElementById("play-btn");
const valumeBtn = document.getElementById("valume-icon");
const playerSpeed = document.getElementsByClassName("player-speed")[0];
const fullScreenBtn = document.getElementsByClassName("full-screen")[0];
const timeElapsedRange =
  document.getElementsByClassName("time-elapsed-range")[0];
const timeElapsed = document.getElementsByClassName("time-elapsed")[0];
const progressBar = document.getElementsByClassName("progress-bar")[0];
const progressRange = document.getElementsByClassName("progress-range")[0];

//our functions

// play and puse function
function PlayHandler() {
  if (!videoHeader.paused) {
    videoHeader.pause(); // Pause the video
    playBtn.classList.replace("fa-pause", "fa-play");
  } else {
    videoHeader.play(); // Play the video
    playBtn.classList.replace("fa-play", "fa-pause");
  }
}

//mute and unmute function
function valumeHandler() {
  if (!videoHeader.muted) {
    videoHeader.muted = true;
    valumeBtn.classList.replace("fa-volume-high", "fa-volume-mute");
  } else {
    videoHeader.muted = false;
    valumeBtn.classList.replace("fa-volume-mute", "fa-volume-high");
  }
}

// full screen function
function fullScreenHandler() {
  // full screen function
  if (!document.fullscreenElement) {
    // Enter fullscreen mode
    if (videoHeader.requestFullscreen) {
      videoHeader.requestFullscreen();
    } else if (videoHeader.mozRequestFullScreen) {
      // Firefox
      videoHeader.mozRequestFullScreen();
    } else if (videoHeader.webkitRequestFullscreen) {
      // Chrome, Safari and Opera
      videoHeader.webkitRequestFullscreen();
    } else if (videoHeader.msRequestFullscreen) {
      // IE/Edge
      videoHeader.msRequestFullscreen();
    }
  } else {
    // Exit fullscreen mode
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      // Chrome, Safari and Opera
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      // IE/Edge
      document.msExitFullscreen();
    }
  }
}

// click on screen mute / unmute
function videoHandler(e) {
  // e for getting  more information about video so we can munipulate
  console.log(e);
  if (document.exitFullscreen) {
    if (!videoHeader.paused) {
      videoHeader.pause(); // Pause the video
      playBtn.classList.replace("fa-pause", "fa-play");
    } else {
      videoHeader.play(); // Play the video
      playBtn.classList.replace("fa-play", "fa-pause");
    }
  }
}

// duration function

// update progress bar
function updateProgressbar() {
  // this is updating our duration :
  var vidDuration = videoHeader.duration;
  var minutes = `00`;
  var seconds = `00`;
  minutes = Math.floor(vidDuration / 60);
  seconds = Math.floor(vidDuration % 60);
  timeElapsedRange.textContent = `${minutes}:${seconds}`;

  // this is updating our current time :
  var vidCurrent = videoHeader.currentTime;
  var currentMin = `00`;
  var currentSec = `00`;
  currentMin = Math.floor(vidCurrent / 60);
  currentSec = Math.floor(vidCurrent % 60);

  if (currentSec >= 10) {
    timeElapsed.textContent = `0${currentMin}:${currentSec} /`;
  } else {
    timeElapsed.textContent = `0${currentMin}:0${currentSec} /`;
  }

  console.log();
  progressBar.style.width = `${
    (videoHeader.currentTime / videoHeader.duration) * 100
  }%`;
  console.log(currentMin.currentSec);
}

//changeProgressbar on click

function changeProgressbar() {}

// our eventlisnters
playBtn.addEventListener("click", PlayHandler);
valumeBtn.addEventListener("click", valumeHandler);
videoHeader.addEventListener("click", videoHandler);
fullScreenBtn.addEventListener("click", fullScreenHandler);
videoHeader.addEventListener("timeupdate", updateProgressbar);
videoHeader.addEventListener("canplay", updateProgressbar);
progressRange.addEventListener("click", changeProgressbar);
