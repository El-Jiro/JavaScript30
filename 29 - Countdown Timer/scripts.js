/**Creamos una variable global llamada countdown que almacenará 
 * el id de nuestro intervalo*/

let countdown

/**Creamos otra variable global que haga referencia al encabezado dentro del div 
 * en el cual mostraremos la cuenta regresiva, lo llamaremos timerDisplay*/

const timerDisplay = document.querySelector(".display__time-left")
console.log(timerDisplay)

//Creamos una variable que haga referencia al sonido de alarma:
const clockAlarm = document.querySelector("audio")
console.log(clockAlarm)

/**Creamos una función llamada timer que reciba como parámetro 
 * el número de segundos que durará la cuenta regresiva
*/
function timer(secs) {

    /**Llamamos al método estático now de la clase Date, el cual nos devuelve 
     * un número entero representando el número de milisegundos transcurridos 
     * desde el inicio de la época Unix, es decir el 1 de enero de 1970 y guardamos
     * el resultado en la constante now.
    */
    const now = Date.now()

    /**Creamos otra constante llamada then, donde multiplicaremos secs 
     * x 1000 para convertirlo a milisegundos y lo sumaremos al valor de then
     * para obtener el número exacto de milisegundos que durará la cuenta regresiva*/
    const then = now + (secs * 1000)


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
     * un string conformado pro mins y seconds convertidos a strings e invocando el
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