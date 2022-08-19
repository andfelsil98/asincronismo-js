import fetch from 'node-fetch';
const API = 'https://api.escuelajs.co/api/v1';

//funcion para agregar informacion a la API trabajada.

function postData(urlApi, data){
    const response = fetch(urlApi, {
        method: 'POST', // el method puede ser GET, POST, PUT O DELETE.
        mode: 'cors', //este mode siempre sera cors
        credentials: 'same-origin', //si este no se declara no hay problema por defecto establece lo que se acaba de escribir
        headers: { //en el header se establece el tipo de informacion que se va a pasar en este caso un json
            'Content-Type': 'application/json'
        },
        //en el body se pasa la informacion como tal
        body: JSON.stringify(data)  //utilizo el JSON.stringify para pasar la informacion en formato de texto (el default es un objeto)
    });
    return response;
}

const data = { //la informacion que voy a enviar a la API
    "title": "andres product",
    "price": 214,
    "description": "A description",
    "categoryId": 1,
    "images": ["https://placeimg.com/640/480/any"]
  }

  postData(`${API}/products`, data) //finalmente llamo a la funcion enviando los argumentos de la api que quiero que use y los datos que quiero que envie 
    .then(response => response.json()) //me retorna la informacion y asignacion del producto que yo agregue y la convierte a formato json
    .then(data => console.log(data)) //de la respuesta imprimo en consola 'data'