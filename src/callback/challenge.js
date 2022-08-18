const XMLHttpRequest = require("xmlhttprequest"); //objeto creado para obtener la informacion de una URL 
const API = "https://api.escuelajs.co/api/v1";//API de interes


function fetchData(urlApi, callback){
    let xhttp = new XMLHttpRequest(); //generamos una nueva instancia de la constante que ya fue declarada en la parte de arriba

    xhttp.open("GET", urlApi, true); //esta linea me sirve para abrir una conexion a la API,  el primer argumento es el tipo de peticion que se quiere hacer , el segundo argumento es la URL que va a utilizar y el tercer argumento es pasar un valor de true o false para habilitarlo o deshabilitarlo
    xhttp.onreadystatechange = function(event){
        if(xhttp.readyState === 4){ //hay varios numeros a los cuales se puede igualar el readystate el 0 es que no se ha inicializado, el 1 es que esta cargando todavia no se ha llamado el valor de sent, el 2 que es cuando ya se ejecuto el valor de sent, el 3 que es cuando esta interactuando con la informacion que se envio y el valor 4 que es cuando se ha completado la llamada en este caso se busca ese ultimo.
            if(xhttp.status === 200){//en el caso del status se pone el valor 200 que es para confirmar que el estado fue exitoso hay mas valores que se pueden consultar en este link
            //https://developer.mozilla.org/es/docs/Web/HTTP/Status
                callback(null, JSON.parsef(xhttp.responseText)); //despues de las validaciones se hace un callback donde el primer argumento debe ser NULL y el segundo sera recibir la informacion que me devuelve el llamado y transformar esa informacion a formato JSON
            }

        } else{
            const error = new Error(`Error ${urlApi}`);
            return callback(error, null); //para el caso que el llamado no haya sido completado se crea un error que devolveria ese mensaje de error y el valor nulo
        }
    } //esta linea me sirve para escuchar los diferentes estados que puede arrojarme la solicitud y con esto saber cuando esta disponible la informacion
    xhttp.send();
}
