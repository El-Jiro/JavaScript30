const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

//console.log(video, canvas, ctx, strip, snap)

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

/**El siguiente paso es tomar un fotograma del vídeo y pintarlo en nuestro elemento canvas,
 * para esto crearemos la función paintToCanvas: 
*/

function paintToCanvas() {

    //Obtenemos la altura y anchura del vídeo mediante los atributos videoHeight y videoWidth:
    const { videoHeight: height, videoWidth: width } = video
    console.log(width, height)

    //Modificamos el alto y ancho del canvas para que coincidan con los del vídeo:
    canvas.width = width
    canvas.height = height


    /**Cada cierto tiempo tomaremos una imagen del vídeo y la pintaremos dentro del canvas, para
     * esto usaremos la función setInterval, la cual como primer argumento recibirá un callback que
     * invocará el método drawImage de nuestro elemento ctx (el contexto del canvas), el cual a su vez 
     * recibe 3 argumentos:  la fuente de la imagen, que en este caso es nuestro elemento vídeo, 
     * y las coordenadas para empezar a dibujar, que serán 0,0. 
     * 
     * Como segundo argumento de setInterval pasamos el intervalo de tiempo en el que queremos que se ejecute
     * la función, medido en milisegundos, en este caso 100, es decir, cada décima de segundo
     * */
    return setInterval(() => ctx.drawImage(video, 0, 0), 100)
}


//Invocamos la función getVideo inmediatamente al cargar la página
getVideo()

/**Si invocamos la función paintToCanvas al cargar la página, no funcionará porque
 * la función getVideo tarda unas milésimas de segundo en obtener la info de la webcam
 * y mostrarla en el elemento video, lo cual implica que paintToCanvas no podrá obtener 
 * la imagen. Para solucionar esto añadimos un EventListener al video, el cual escuchará
 * por el evento "canplay", que se emitirá cuando el vídeo empiece a reproducirse, y dentro
 * de este invocamos a la función paintToCanvas.
*/

video.addEventListener("canplay", paintToCanvas)