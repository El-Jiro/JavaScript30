const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

console.log(video, canvas, ctx, strip, snap)

/**Primeramente obtendremos el video de la webcam  y lo mostraremos en
 * el elemento video, para ello utilizaremos la función getVideo:
*/

/**Necesitamos acceder a la propiedad mediaDevices del objeto navigator y posteriormente
   * al método getUserMedia de la misma, a esta le pasaremos como atributo un objeto JSON
   * con dos propiedades booleanas: video y audio, la primera será true y la segunda false.
   * 
   * Esta función devuelve una promesa, por tanto necesitaremos anexarle un then-catch, si 
   * la promesa se cumple imprimirá el objeto localMediaStream en nuestra consola, asignará 
   * el parámetro localMediaStream (el vídeo de nuestra webcam) a la propiedad srcObject del
   * elemento video, y finalmente, llamará a video.play() para mostrar en tiempo real la grabación
   * obtenida de la webcam.
   * 
   * Por el contrario, si la promesa es rechazada imprimirá el objeto error más un mensaje indicando 
   * que no se ha podido acceder a la cámara.
  */

function getVideo() {

    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then((localMediaStream) => {
            console.log(localMediaStream)
            video.srcObject = localMediaStream
            video.play()
        })
        .catch((error) => console.error(`No se ha podido acceder a la cámara: ${error}`))
}

getVideo()