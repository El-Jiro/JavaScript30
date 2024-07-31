const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d', true);
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
const photoButton = document.querySelector("#photo")

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
    return setInterval(() => {

        ctx.drawImage(video, 0, 0)

        /**Obtenemos cada píxel de la imagen mediante la función getImageData, esta recibirá como parámetros 
         * las coordenadas desde donde queremos empezar a obtener los datos, y el alto y ancho del canvas. 
         * Esto nos devolverá un array de pixeles el cual se guardará la variable pixels*/
        let pixels = ctx.getImageData(0, 0, width, height)
        //console.log(pixels) //Imprimimos en consola

        //Reasignamos el valor de pixels con la función applyRedFilter
        //pixels = applyRedFilter(pixels)


        //Reasignamos el valor de pixels con la función rgbSplit
        //pixels = rgbSplit(pixels)

        //ctx.globalAlpha = 0.1

        pixels = setGreenScreen(pixels)

        //Ponemos la imagen modificada dentro del canvas
        ctx.putImageData(pixels, 0, 0)

    }, 16)
}

/**Creamos una función para el filtro rojo, esta recibirá un sólo parámetro
 * llamado pixelsArray
*/

function applyRedFilter(pixels) {

    /**En nuestro array cada cuatro elementos representan un pixel, el cual se compone de los tres colores básicos 
     * (Rojo, Verde y Azul) y un cuarto elemento llamado alfa que representa la transparencia de cada color, debido 
     * a que este es un tipo de array especial que no posee los métodos de los arrays tradicionales en JS, tales 
     * como map, reduce o forEach, utilizaremos un bucle for común para recorrerlo y modificar los elementos de 
     * cada pixel. Le sumaremos 100 a los rojos, restaremos 50 a los verdes y dividimos los azules entre 2
     * */

    for (let i = 0; i < pixels.data.length; i += 4) {

        pixels.data[i - 150] += 100 //RED
        pixels.data[i + 150] -= 50 //GREEN
        pixels.data[i - 150] /= 2 //BLUE
    }

    //Regresamos el array modificado
    return pixels
}

/**De forma similar a la función de arriba, crearemos otra que nos permitirá ver las sombras
 * de los diferentes colores primarios que componen la imagen, la llamaremos rgbSplit
*/
function rgbSplit(pixels) {

    /**Recorremos el array con un bucle for, pero en lugar de sumar o restar a los componentes
     * de cada pixel, los moveremos 150 posiciones a la izquierda en el caso del rojo y azul, y 
     * a la derecha en el caso del verde:
    */

    for (let i = 0; i < pixels.data.length; i += 4) {

        pixels.data[i - 150] = pixels.data[i + 0]   //RED
        pixels.data[i + 250] = pixels.data[i + 1]  //GREEN
        pixels.data[i - 300] = pixels.data[i + 2] //BLUE
    }

    //Regresamos el array modificado
    return pixels
}


/**Creamos una tercera función llamada setGreenScreen, la cual, como indica su nombre,
 * fungirá como una suerte de pantalla verde poniendo en blanco todos los pixeles que esten
 * entre cierto rango de colores, los cuales indicaremos mediante los controles que se encuentran
 * en la esquina superior izquierda de la pantalla, justo debajo del botón tomar foto. 
*/

function setGreenScreen(pixels) {

    //Empezamos creando un objeto JSON vacío llamado colors:
    const colors = {}

    /**Hacemos una consulta al documento para obtener todos los elementos de tipo input 
     * que sean descendientes de un elemento con la clase rgb. Sobre la lista resultante
     * hacemos un forEach que añadirá al objeto colors los nombres de cada input como
     * propiedades y como valor de dichas propiedades el valor del input en cuestión. 
     * Deberemos convertir dicho valor a un número mediante parseInt antes de asignarlo a
     * la propiedad de colors, de lo contrario se guardará como texto y las operaciones de
     * comparación no funcionarán correctamente.
     */

    document.querySelectorAll(".rgb input").forEach((input) => {
        //console.log(input)
        colors[input.name] = parseInt(input.value)
        //console.log(colors)
    })



    //Recorremos el array con un bucle for
    for (let i = 0; i < pixels.data.length; i += 4) {


        //Creamos variables para cada componente de los pixeles:
        const red = pixels.data[i + 0]
        const green = pixels.data[i + 1]
        const blue = pixels.data[i + 2]



        /**Creamos una variable para guardar la condición, la cual será que el valor del componente rgb 
         * esté dentro del rango definido por nosotros, o sea, que sea mayor o igual al mínimo y menor
         * o igual al máximo, de ser el caso, establecerá el valor de alpha en 0, es decir completamente
         * transparente, lo que nos dará un pixel en blanco.
         * 
         */

        const isInRange = red >= colors.rmin && red <= colors.rmax
            && green >= colors.gmin && green <= colors.gmax
            && blue >= colors.bmin && blue <= colors.bmax

        //Si nuestra condición se cumple, establecemos en 0 el valor de alpha

        isInRange ? pixels.data[i + 3] = 0 : null
    }

    return pixels
}


//Creamos la función takePhoto para obtener una screenshot del vídeo:
function takePhoto() {

    //Reproducimos el sonido de foto:
    snap.curentTime = 0
    snap.play()

    /**Obtenemos los datos del canvas: Esto creará una representación de la imagen en formato 
     * de una cadena de texto super larga, la cual usa una codificación llamada base64*/
    const imgData = canvas.toDataURL()
    console.log(imgData)

    //A partir de dicha cadena podemos crear un link a la imagen de la siguiente forma:

    //Creamos un elemento de enlace (a) en el documento html y lo guardamos en imgLink:
    const imgLink = document.createElement("a")
    //Le asignamos el valor de imgData a su atributo href:

    imgLink.href = imgData

    /**Establecemos un valor personalizado para el atributo download, 
     * es decir el nombre con el que se guardará al descargarlo*/
    imgLink.setAttribute("download", "Kevin")

    //Finalmente, lo insertamos en nuestro elemento strip antes de su primer nodo hijo:
    strip.insertBefore(imgLink, strip.firstChild)

    /**Para hacer que se vea una miniatura de la imagen en vez sólo un link, crearemos un elemento img 
     * dentro del msismo y le asignaremos el valor de imgData a su atributo src: */

    imgLink.innerHTML = `<img src="${imgData}" alt="Yo merengues">`

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

//Invocamos la función takePhoto al hacer clic en el botón de tomar foto
photoButton.addEventListener("click", takePhoto)