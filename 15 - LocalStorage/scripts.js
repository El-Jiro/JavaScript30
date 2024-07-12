
//Obtenemos el formulario
const addItemsForm = document.querySelector('.add-items')
//Obtenemos la lista de platillos
const itemsList = document.querySelector('.plates')
//Recuperemos la lista de platillos de localStorage
const localItems = localStorage.getItem("items")
//console.log(localItems)
//Obtenemos el botón de seleccionar todo
const checkBtn = document.getElementById("select-all")
console.log(checkBtn)

/**Aquí utilizaremos el operador booleano OR para asignarle un valor según el caso, primero tratará
 * de recuperar la lista de items de localStorage, y si no lo consigue, tomará el valor de un array
 * vacío
*/
const items = JSON.parse(localItems) || []

/**Creamos una función para añadir elementos a la lista, recibirá un objeto Event 
 * como parámetro y lo imprimirá en consola*/
function addItem(e) {
    /**Para evitar que la página se recargue al enviar el formulario, 
     * llamamos al método preventDefault de nuestro objeto e*/
    e.preventDefault()

    //console.log(e)

    /**Ahora obtendremos el texto del formulario mediante un this.querySelector, 
     * esto buscará dentro del elemento sobre el cual se llamó la función, y una vez
     * obtenida la referencia al input sacamos el texto con .value*/

    const itemName = (this.querySelector("input")).value
    //console.log(itemName)

    /**Ahora creamos un objeto JSON que guardará la información del objeto: 
     * su nombre y si está seleccionada su checkbox: */

    const item = {
        name: `${itemName}`,
        checked: false
    }

    //imprimimos el objeto en consola
    //console.log(item)

    //Añadimos el objeto dentro del array:
    items.push(item)

    //invocamos a populateList
    populateList(items, itemsList)
    //Guardamos nuestro array en el localStorage
    localStorage.setItem("items", JSON.stringify(items))
    //Por último limpiamos el formulario con el método reset
    this.reset()
}

/**Creamos la función populateList que se encargará de generar el html correspondiente
 * para mostrar nuestra lista de objetos al usuario. Esta recibirá dos parámetros, el
 * array donde se encuentran almacenados los items y el elemento HTML <ul> (lista desordenada)
* donde se mostrará cada item. El primer parámetro llamado plates será igual a un array vacío
* por defecto, así no se romperá el programa si por alguna razón no recibe el array de objetos
*/

function populateList(plates = [], platesList) {

    //Mapeamos el array e igualamos el innerHTML de platesList a su resultado

    /** Dentro de map creamos un elemento de lista <li> con elemento label que tenga el nombre*del objeto dentro. 
     * También pondremos un checkbox con un atributo data-index (el cual será igual al índice del objeto dentro del array) 
     * que nos ayudará más adelante. Le añadiremos además el atributo id con el valor item${i}, esto nos asegura que se creará 
     * un id único por cada elemento del array. Ponemos el mismo valor en el atributo for de nuestro label para que así ambas queden 
     * vinculadas. Y finalmente usamos un operador ternario para añadir el atributo checked en caso de que la propiedad checked del
     * objeto sea igual a true*/
    platesList.innerHTML = plates.map((p, i) => {

        const html =
            `
                    <li>
                        <input type="checkbox" data-index="${i}" id="item${i}" ${p.checked ? "checked" : ""}>
                        <label for="item${i}">${p.name}</label>
                    </li>
                    `
        return html
    }).join('') //Aplicamos un .join al final para que nos devuelva el html en forma de string y no de array
}


/**Creamos la función toggleChecked que se encargará de actualizar la propiedad checked
* de nuestros objetos JSON y recibirá como parámetro un objeto de tipo event*/

function toggleChecked(e) {

    /**Esto está tomando como blanco tanto el checkbox como su respectivo label al ser ambos hijos de la lista
    * a la cual le acoplamos el EventListener (esto se conoce como delegación de eventos), por tanto, debemos
    * usar un if para asegurarnos que la función sólo se ejecute cuando el blanco del evento sea un input.*/
    const target = e.target

    if (target.matches("input")) {
        //Imprimimos el target o blanco en consola
        // console.log(target)

        /**Podemos obtener el índice del objeto correspondiente a nuestro elemento 
         * HTML almacenado en el array items mediante el valor de su atributo data-index. 
         * Deberemos convertirlo a un número mediante parseInt antes de guardarlo en index*/

        const index = parseInt(target.dataset.index)
        //console.log(index)

        /**Actualizamos la propiedad checked del objeto correspondiente negando 
         * su valor, es decir, si es false pasará a ser true y viceversa  
         */
        items[index].checked = !items[index].checked
        //console.log(items[index])

        //Por último, actualizamos el localStorage con los nuevos valores
        localStorage.setItem("items", JSON.stringify(items))
    }

}

/**Creamos una función que recorra nuestro array items y se encargue de actualizar a true
 * la propiedad checked de todos nuestros objetos. Recibirá como parámetro el array antes
 * mencionado.
*/

function checkAll(list) {

    //Actualizamos la propiedad checked de cada objeto
    list.forEach((e) => {
        e.checked = true
        console.log(e)
    });

    //actualizamos el localStorage con los nuevos valores:
    localStorage.setItem("items", JSON.stringify(list))

    //Llamamos a populateList para actualizar la vista
    populateList(list, itemsList)

}

/**Acoplamos la función a un EventListener de nuestro formulario,
 * escucharemos por el evento submit
*/

addItemsForm.addEventListener("submit", addItem)

//Hacemos otro EventListener de tipo click para la función toggleChecked, esta vez sobre nuestra lista
itemsList.addEventListener("click", toggleChecked)

//Creamos otro para marcar todos los elementos:
checkBtn.addEventListener("click", () => checkAll(items))

//Llamamos a la función populateList inmediatamente al cargar la página para mostrar la lista
populateList(items, itemsList)


