import fetch from 'node-fetch';
const API = 'https://api.escuelajs.co/api/v1';

function fetchData(urlApi){
    return fetch(urlApi); //fetch por defecto ya es una promesa por lo cual no hay que crear la sintaxis de new promise ni nada posterior a ello
};

//con estas lineas estoy haciendo un llamado a todos los elementos de la URL 

// fetchData(`${API}/products`)
//     .then(response => response.json()) //si solo es un parametro en la arrow function se puede dejar sin los parentesis ()
//     .then(products => {
//         console.log(products);
//     })
//     .catch(error => console.log(error));

//con estas lineas se hacen varios llamados para acceder a informacion especifica de un producto

fetchData(`${API}/products`)
    .then(response => response.json()) //trae todos los objetos y los convierte a formato json
    .then(products => {
        console.log(products); //imprimo todos los productos
        return fetchData(`${API}/products/${products[0].id}`) //de todos los objetos ahora solo retorno uno que yo quiero en este caso quiero el el objeto producto en la posicion 0
    })
    .then(response => response.json()) // ese retorno lo transformo a formato json
    .then(product => { //muestro el resultado con un console.log
        console.log(product.title); //imprimo el nombre del producto en este caso del producto en la posicion 0
        return fetchData(`${API}/categories/${product.category.id}`)// ahora dentro del objeto categories tomo el objeto category que se encuentra dentro de mi objeto product seleccionado anteriormente.
    })
    .then(response => response.json())//convierto el retorno a formato json
    .then(category => {
        console.log(category.name); //del objeto category que esta dentro de mi objeto product selecciono la variable name y la muestro en consola
    })
    .catch(err => console.log(err))
    .finally(()=> console.log('Finally'));