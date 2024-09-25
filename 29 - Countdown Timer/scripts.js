/**Creamos una variable global llamada countdown que almacenará 
 * el id de nuestro intervalo para poder reutilizarlo*/
let countdown

/**Creamos otra variable global que haga referencia al encabezado dentro del div 
 * en el cual mostraremos la cuenta regresiva, lo llamaremos timerDisplay*/
const timerDisplay = document.querySelector(".display__time-left")
console.log(timerDisplay)

/**De manera similar a lo de arriba, creamos una constante que haga referencia
 * al parráfo dentro del mismo div donde mostraremos la hora de finalización del
 * conteo regresivo.*/
const endTime = document.querySelector(".display__end-time")
console.log(endTime)

//Seleccionamos todos los botones con el atributo data-time y los guardamos en una lista
const buttons = document.querySelectorAll("button[data-time]")
console.log(buttons)

//Creamos una variable que haga referencia al sonido de alarma:
const clockAlarm = document.querySelector("audio")
console.log(clockAlarm)

/**Creamos una función llamada timer que reciba como parámetro 
 * el número de segundos que durará la cuenta regresiva*/
function timer(secs) {

    /**Llamamos al método estático now de la clase Date, el cual nos devuelve 
     * un número entero representando el número de milisegundos transcurridos 
     * desde el inicio de la época Unix, es decir el 1 de enero de 1970 y guardamos
     * el resultado en la constante now.
    */
    const now = Date.now()

    /**Creamos otra constante llamada then, donde multiplicaremos secs 
     * x 1000 para convertirlo a milisegundos y lo sumaremos al valor de then
     * para obtener el tiempo en milisegundos donde terminará la cuenta regresiva*/
    const then = now + (secs * 1000)

    /**Invocamos displayEndTime aquí, justo después de obtener el valor 
     * de then, y le pasamos el mismo como argumento*/
    displayEndTime(then)
    //Imprimimos un objeto con ambos valores
    console.log({ now, then })

    //La llamamos al inicio de la función para compensar el segundo que tarda en iniciar el intervalo
    displayTimeLeft(secs)

    //Llamamos a setInterval cada segundo,le pasamos un callback y asignamos su valor a countdown:
    countdown = setInterval(() => {

        /**Calculamos los segundos restantes llamando de nuevo a Date.now() y restando 
         * su valor a then. Dividimos el resultado entre 1000 y redondeamos para convertir 
         * a segundos. Guardamos en secondsLeft*/
        let secondsLeft = Math.round((then - Date.now()) / 1000)
        secondsLeft === -0 ? secondsLeft = 0 : null

        //llamamos a displayTimeLeft cada que pase un segundo
        displayTimeLeft(secondsLeft)

        /**Cuando secondsLeft llegue a 0, llamaremos a la función clearInterval, pasándole
         * como argumento el nombre de nuestro intervalo, es decir countdown, esto detendrá
         * la cuenta regresiva que de otra manera continuará hasta el -infinito*/

        if (secondsLeft === 0) {
            clearInterval(countdown)
            //También reproducimos el sonido de alarma:
            clockAlarm.currentTime = 0
            clockAlarm.play()

            //Limpiamos también la hora de regreso
            endTime.textContent = ""
        }

    }, 1000)
}


/**Creamos otra función llamada displayTimeLeft, que se encargará de mostrar 
 * la cuenta regressiva en formato MM:SS, recibiendo los segundos como parámetro
 * al igual que la función anterior*/

function displayTimeLeft(seconds) {

    /**Convertimos los segundos a minutos dividiendo entre 60 y redondeando 
     * con Math.floor() para obtener sólo la parte entera de la división*/
    const mins = Math.floor(seconds / 60)

    /**Para obtener los segundos restantes, dividimos nuevamente entre 60 
     * y tomamos el residuo o módulo de la división*/
    const secs = seconds % 60

    /**Creamos una nueva variable llamada formattedTime y le asignamos como valor
     * un string conformado por mins y seconds convertidos a strings e invocando el
     * método padStart de cada uno, que se encargará de anteponer un 0 al valor cuando
     * este sólo posea un dígito
    */
    const formattedTime = `${new String(mins).padStart(2, "0")}:${new String(secs).padStart(2, "0")}`

    //Finalmente, asignamos el valor de formattedTime a la propiedad textContent de nuestro displayer:
    timerDisplay.textContent = formattedTime

    //También mostraremos el tiempo restante en el título de la página:
    document.title = `Temporizador ${formattedTime}`

    //imprimimos los minutos y segundos en consola en forma de objeto
    //console.log({ mins, secs })
}

/**Creamos una tercera función llamada displayEndTime, que calculará la hora exacta 
 * a la que terminará la cuenta regresiva basada en la duración de la misma. Recibirá
 * como parámetro un timestamp o marca de tiempo*/

function displayEndTime(timestamp) {
    //Creamos un objeto de tipo Date a partir del timeStamp y lo guardamos en end
    const end = new Date(timestamp)
    console.log(end)

    //Obtenemos las horas y los minutos:
    const hours = end.getHours()
    const minutes = end.getMinutes()

    /**Haremos un poco de matématicas para convertir las horas del formato 24 hrs
     * al formato a.m./p.m., creamos una nueva constante llamada hours12 al que le asignamos
     * primeramente el valor del residuo de la división de hours entre 12, y usamos un operador
     * lógico OR para asignarle el valor de 12 en caso de que el primer caso sea falso (es decir 0)
    */
    const hours12 = hours % 12 || 12

    /**Creamos otra constante llamada ampm que determinará cual de los dos sufijos
     * le asignaremos a la hora, si la hora es menor que 12 será a.m y si es mayor 
     * o igual será p.m */
    const ampm = hours < 12 ? "a.m." : "p.m."

    //Necesito hacerle padStart a los minutos Y horas otra vez, la ptm
    const formattedTime = `${new String(hours12).padStart(2, "0")}:${new String(minutes).padStart(2, "0")} ${ampm}`

    //Finalmente mostramos el tiempo dentro de endTime en formato hh:mm a.m/p.m
    endTime.textContent = `Estaré de vuelta a las ${formattedTime} `
}

//Creamos otra función más llamada startTimer, esta vez sin parámetros:

function startTimer() {
    /**Obtenemos el valor del atributo html data-time de cada uno de los botones,
     * el cual representa el número de segundos que durará la cuenta regresiva, aplicamos 
     * la función parseInt para convertirlo de string a number y lo guardamos en seconds*/
    const seconds = parseInt(this.dataset.time)

    //Invocamos a timer pasandóle seconds como argumento para iniciar el temporizador
    timer(seconds)
}

//Le acoplamos a los botones un EventListener de tipo click que llamará a startTimer
buttons.forEach((btn) => btn.addEventListener("click", startTimer))