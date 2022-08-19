const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest; //objeto creado para obtener la informacion de una URL 
const API = 'https://api.escuelajs.co/api/v1';//API de interes


function fetchData(urlApi, callback){
    let xhttp = new XMLHttpRequest(); //generamos una nueva instancia de la constante que ya fue declarada en la parte de arriba

    xhttp.open('GET', urlApi, true); //esta linea me sirve para abrir una conexion a la API,  el primer argumento es el tipo de peticion que se quiere hacer , el segundo argumento es la URL que va a utilizar y el tercer argumento es pasar un valor de true o false para habilitarlo o deshabilitarlo. el metodo puede ser 'GET' o 'POST', luego se envia la URL, si es asincrono (true o false), usuario y contraseña. En esta caso solo se utiliza el metodo, la url y async.

    xhttp.onreadystatechange = function(event){//estas lineas me sirve para escuchar los diferentes estados que puede arrojarme la solicitud y con esto saber cuando esta disponible la informacion 

        if(xhttp.readyState === 4){ //hay varios numeros a los cuales se puede igualar el readystate el 0 es que no se ha inicializado, el 1 es que esta cargando todavia no se ha llamado el valor de sent, el 2 que es cuando ya se ejecuto el valor de sent, el 3 que es cuando esta interactuando con la informacion que se envio y el valor 4 que es cuando se ha completado la llamada en este caso se busca ese ultimo.
            if(xhttp.status === 200){//en el caso del status se pone el valor 200 que es para confirmar que el estado fue exitoso hay mas valores que se pueden consultar en este link
            //https://developer.mozilla.org/es/docs/Web/HTTP/Status
                callback(null, JSON.parse(xhttp.responseText)); //despues de las validaciones se hace un callback donde el primer argumento debe ser NULL y el segundo sera recibir la informacion que me devuelve el llamado y transformar esa informacion a formato JSON
            } else{
                const error = new Error(`Error ${urlApi}`);
                return callback(error, null); //para el caso que el llamado no haya sido completado se crea un error que devolveria ese mensaje de error y el valor nulo

            } 
        }
    } 
    xhttp.send(); //el método .send() envia la petición al servidor
}

//se invoca el metodo fetchData() pasandole como argumentos la varible API concatenada con la cadena 'products' para acceder a la URL de la API deseada, y una función anónima que recibe 2 parámetros (un objeto de error y un arreglo que almacena todos los objetos traidos por la API).

fetchData(`${API}/products`, function(error1, data1){ // el primer argumento que le paso a la funcion fetchData es la constante api que ya se declaro arriba sumandole el path al que quiero llegar en este caso a products.el otro argumento es una funcion anonima que tiene como parametros error o data es decir o recibe la informacion o da un error en este caso esta funcion seria el callback.
    if (error1) return console.error(error1);//si en este punto se identifica un error se imprime en consola y se detiene el proceso

    //se invoca nuevamente la función fetchData con el fin de acceder a un objeto puntual del arreglo data1, se envia como parámetros la url de la API apuntando al atributo del primer objeto de arreglo data1 y nuevamente una función anónima.

    fetchData(`${API}/products/${data1[0].id}`, function(error2, data2){
        if (error2) return console.error(error2);

         //Se invoca nuevamente la funcion fetchData con el fin de acceder a la categoria, se envían como parametros la url de la API con la concatenación de 'Categories' y el atributo Id de categoria del objeto data2 de la función anterior
       
        fetchData(`${API}/categories/${data2?.category?.id}`, function(error3, data3){
            if (error3) return console.error(error3);
            console.log(data1[0]); //Se imprime el objeto en la posición 1 del arreglo de los objetos obtenidos en el metodo invocado inicialmente
            console.log(data2.title);//Se imprime el titulo del objeto que se consultó en la seguna invocación de la función
            console.log(data3.name);//Se imprime el nombre de la categoria a la que pertenece el objeto que se consultó en la seguna invocación del método.

        });  //en este caso puntual se hace uso de Optional Chaining "?" el cual hace una evalucación de las propiedades de un objeto y en vez de arrojar un error devuelve undefined en caso que la propiedad no exista o sea null.
    });
});
