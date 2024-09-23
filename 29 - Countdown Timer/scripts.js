/**Creamos una variable global llamada countdown que almacenará 
 * el id de nuestro intervalo*/

let countdown


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

        secondsLeft <= 0 ? clearInterval(countdown) : null

    }, 1000)

}


/**Creamos otra función llamada displayTimeLeft, que se encargará de convertir 
 * los segundos restantes a formato MM:SS, recibiendo los segundos como parámetro
 * al igual que la función anterior*/

function displayTimeLeft(secs) {

    //imprimimos secs en consola
    console.log(secs)
}