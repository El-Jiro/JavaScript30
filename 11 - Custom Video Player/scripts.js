/**Obtenemos el elemento de vídeo mediante document.querySelector 
 * y lo guardamos en la constante video*/
const video = document.querySelector("video")
console.log(video)

//Obtenemos el botón de reproducción de la misma manera
const playButton = document.querySelector("button.toggle")
console.log(playButton)


function togglePlaying() {
    if (!!video.paused) {
        video.play()
    } else {
        video.pause()
    }
}

playButton.addEventListener("click", togglePlaying)