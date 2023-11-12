//selecting our elements
const videoHeader = document.getElementsByClassName("video-header")[0];
const playBtn = document.getElementById("play-btn");
const speed = document.querySelector(".player-speed");
const fullScreenBtn = document.getElementsByClassName("full-screen")[0];
const timeElapsedRange =
  document.getElementsByClassName("time-elapsed-range")[0];
const timeElapsed = document.getElementsByClassName("time-elapsed")[0];
const progressBar = document.getElementsByClassName("progress-bar")[0];
const progressRange = document.getElementsByClassName("progress-range")[0];
const valumeRange = document.getElementsByClassName("valume-range")[0];
const volumeBar = document.getElementsByClassName("volume-bar")[0];
const volumeIcon = document.getElementById("valume-icon");

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
    volumeIcon.className = "";
    volumeIcon.classList.add("fas", "fa-volume-mute");
  } else {
    videoHeader.muted = false;
    volumeIcon.className = "";
    volumeIcon.classList.add("fas", "fa-volume-high");
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

function changeProgressbar(e) {
  const newTime = e.offsetX / progressRange.offsetWidth;
  progressBar.style.width = `${newTime * 100}%`;
  videoHeader.currentTime = newTime * videoHeader.duration;
}

// change volume function
function changeVolumeProgress(e) {
  let volume = e.offsetX / valumeRange.offsetWidth;
  // rounding volume
  if (volume < 0.1) {
    volume = 0;
  }
  if (volume > 0.9) {
    volume = 1;
  }
  videoHeader.volume = volume;
  volumeBar.style.width = `${volume * 100}%`;

  volumeIcon.className = "";
  if (volume > 0.7) {
    volumeIcon.classList.add("fas", "fa-volume-up");
  } else if (volume < 0.7 && volume > 0) {
    volumeIcon.classList.add("fas", "fa-volume-down");
  } else if (volume === 0) {
    volumeIcon.classList.add("fas", "fa-volume-off");
  }
  lastVolume = volume;
}

// changing our speed :
function changeSpeed() {
  videoHeader.playbackRate = speed.value;
}

// our eventlisnters
playBtn.addEventListener("click", PlayHandler);
volumeIcon.addEventListener("click", valumeHandler);
videoHeader.addEventListener("click", videoHandler);
fullScreenBtn.addEventListener("click", fullScreenHandler);
videoHeader.addEventListener("timeupdate", updateProgressbar);
videoHeader.addEventListener("canplay", updateProgressbar);
progressRange.addEventListener("click", changeProgressbar);
valumeRange.addEventListener("click", changeVolumeProgress);
speed.addEventListener("click", changeSpeed);
