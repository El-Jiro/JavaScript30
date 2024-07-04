/**Obtenemos el elemento de vídeo mediante document.querySelector 
 * y lo guardamos en la constante video*/
const video = document.querySelector("video")

//Obtenemos el botón de reproducción de la misma manera
const playButton = document.getElementById("player")
console.log(playButton)
playButton.style.fontSize = "20px"

//Obtenemos el control de volumen
const volumeControl = document.getElementById("volume")
console.log(volumeControl)
//Ponemos el nivel de volumen actual multplicado por 100 en el title
volumeControl.title = `Volumen: ${volumeControl.value * 100}`

//Obtenemos el control de velocidad 
const rateControl = document.getElementById("playbackRate")
console.log(rateControl)

//Ponemos la velocidad de reproducción actual en el title
rateControl.title = `Velocidad de reproducción: x${video.playbackRate}`

function togglePlaying() {
    /**Si el vídeo está pausado, lo reproduciremos, además de cambiar el símbolo 
     * de play por el de pausa y ajustar el tamaño de fuente a 11px
    */
    if (!!video.paused) {
        video.play()
        playButton.innerText = "\u2590\u2590"
        playButton.style.fontSize = "11px"

    } else {

        /**Por el contrario, si se está reproduciendo, lo pausamos y cambiamos el símbolo 
         * de pausa por el de play y ajustamos el tamaño de la fuente a 20px*/
        video.pause()
        playButton.innerText = "►"
        playButton.style.fontSize = "20px"
    }
}

//Creamos una función que actualice el valor del volumen
function handleVolume() {
    video.volume = volumeControl.value
    volumeControl.title = `Volumen: ${volumeControl.value * 100}`
}

function handlePlaybackRate() {
    video.playbackRate = rateControl.value
    rateControl.title = `Velocidad de reproducción: x${video.playbackRate}`
}

//Añadimos al botón un event listener de tipo click que llamará a nuestra función togglePlaying
playButton.addEventListener("click", togglePlaying)
//Añadimos otro eventListener de tipo change que llamará a handleVolume
volumeControl.addEventListener("change", handleVolume)
//Otro más para la velocidad de reproducción
rateControl.addEventListener("change", handlePlaybackRate)
