//--------------------------Obtener elementos-----------------------------------

/**Obtenemos el elemento de vídeo mediante document.querySelector 
 * y lo guardamos en la constante video*/
const video = document.querySelector("video")
console.log(video)

//Obtenemos el botón de reproducción de la misma manera
const playButton = document.querySelector(".toggle")
console.log(playButton)

//Obtenemos el control de volumen
const volumeControl = document.getElementById("volume")
console.log(volumeControl)
//Ponemos el nivel de volumen actual multplicado por 100 en el title
volumeControl.title = `Volumen: ${volumeControl.value * 100}`

//Obtenemos el control de velocidad 
const rateControl = document.getElementById("playbackRate")
console.log(rateControl)

//Obtenemos la barra de progreso
const progressBar = document.querySelector(".progress__filled")
console.log(progressBar)



/**Obtenemos los botones de adelantar y retroceder, para esto usaremos querySelectorAll 
 * y en nuestra consulta buscaremos los elementos con la clase player__button y que posean
 * el atributo data-skip. Los guardaremos en timeControls*/
const skipButtons = document.querySelectorAll(".player__button[data-skip]")
console.log(skipButtons)

//Ponemos la velocidad de reproducción actual en el title
rateControl.title = `Velocidad de reproducción: x${video.playbackRate}`

//-------------------------------Crear funciones---------------------------------------

function togglePlaying() {
    //Si el vídeo está pausado, lo reproduciremos, además de cambiar el símbolo de play por el de pausa
    if (!!video.paused) {
        video.play()
        playButton.innerText = "❚ ❚"

    } else {
        //Por el contrario, si se está reproduciendo, lo pausamos y cambiamos el símbolo de pausa por el de play
        video.pause()
        playButton.innerText = "►"

    }
}

//Creamos una función que actualice el valor del volumen
function handleVolume() {
    //Asignamos el valor del controlador al atributo volume de video (debe ser un número entre 0 y 1)
    video.volume = volumeControl.value
    //Actualizamos el título con el valor del controlador pero multiplicado por 100 para mejor comprensión del usuario
    volumeControl.title = `Volumen: ${volumeControl.value * 100}`
}

//Creamos otra función similar para manejar la velocidad de reproducción
function handlePlaybackRate() {
    video.playbackRate = rateControl.value
    rateControl.title = `Velocidad de reproducción: x${video.playbackRate}`
}

//Creamos una función para adelantar o retroceder el vídeo según el caso

function skip() {

    /**Primeramente obtenemos el valor del atributo data-skip, esto nos dirá el número 
     * de segundos que debemos adelantar o retroceder según el caso. Lo convertimos a un 
     * número entero mediante parseInt y lo guardamos en secondsToSkip*/
    const secondsToSkip = parseInt(this.dataset.skip)

    //Imprimimos secondsToSkip en consola
    console.log(secondsToSkip)

    /**Le sumamos secondsToSkip al tiempo actual del video, dado que uno de ellos tiene el
     * valor de -10, en la práctica es como si le estuviéramos restando 10 segundos
    */
    video.currentTime += secondsToSkip
}

/**Creamos otra función más para manejar el llenado de la barra de progreso*/
function handleProgress() {

    //Calculamos el porcentaje de llenado diviendo el tiempo actual del vídeo entre su duración total y multiplicandolo por 100
    const progressPercent = (video.currentTime / video.duration) * 100
    console.log(progressPercent) //Lo imprimimos en consola
    //Actualizamos el valor de la propiedad css flexBasis de progressBar a progressPercent
    progressBar.style.flexBasis = `${progressPercent}%`;

    progressBar.title = `${getCurrentTimeFormatted(video.currentTime)}`
}

//Esta función mostrará el tiempo actual en formato MM:SS
function getCurrentTimeFormatted(currentTime) {
    //Caculamos los minutos dividiendo el tiempo entre 60 y los segundos tomando el residuo de la división
    let minutes = Math.floor(currentTime / 60);
    let seconds = Math.floor(currentTime % 60);

    //Añadimos un 0 para rellenar de ser necesario
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');

    const formatedTime = `${minutes}:${seconds}`

    return formatedTime;
}


//--------------------------------Añadir EventListeners-------------------------------------------

//Añadimos al botón un event listener de tipo click que llamará a nuestra función togglePlaying
playButton.addEventListener("click", togglePlaying)
//Añadimos otro eventListener de tipo change que llamará a handleVolume
volumeControl.addEventListener("change", handleVolume)
//Otro más para la velocidad de reproducción
rateControl.addEventListener("change", handlePlaybackRate)

/**Añadimos un eventListener sobre el propio vídeo, el cual llamará a nuestra función handleProgress. 
 * Para ello utilizaremos el evento timeupdate*/
video.addEventListener("timeupdate", handleProgress)

/**Dado que timeControls es una lista, deberemos hacer un forEach para añadir
 * el eventListener a cada uno de los elementos dentro de ella:
*/
skipButtons.forEach((e) => {
    e.addEventListener("click", skip)
})
