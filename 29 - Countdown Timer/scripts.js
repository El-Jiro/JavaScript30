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

    //Llamamos a setInterval y cada segundo y le pasamos un callback:
    setInterval(() => {
        /**Calculamos los segundos restantes llamando de nuevo a Date.now() y restando 
         * su valor a then. Dividimos el resultado entre 1000 y redondeamos para convertir 
         * a segundos. Guardamos en secondsLeft*/

        const secondsLeft = Math.round((then - Date.now()) / 1000)
        console.log(secondsLeft)

    }, 1000)
}