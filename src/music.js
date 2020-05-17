var audio = new Audio('topcat.mp3');

export function playPauseMusic() {
    if (audio.paused) {
        audio.addEventListener('ended', loopMusic, false);
        audio.play();
    }
    else {
        audio.removeEventListener('ended', loopMusic);
        audio.pause();
    }
}

function loopMusic() {
    audio.currentTime = 0;
    audio.play();
}
