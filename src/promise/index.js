const promise = new Promise(function (resolve,reject) {
    resolve('Hey!');
});

// programa ejemplo para revisar si tengo el numero de vacas suficientes en mi granja y sino devuelve un error.
const cows = 15;

const countCows = new Promise( function(resolve, reject) {
    if (cows > 10){
        resolve(`We have ${cows} cows on the farm`);
    } else{
        reject('There is no cows in the farm');
    }
});

countCows.then((result) => { //arrow function con el parametro result que tomara el resultado de la promesa sea resolve (then) o reject(catch). el then me sirve para ejecutar precisamente la promesa
    console.log(result);
}).catch((error) => { // el catch me sirve para capturar el error si este existe
    console.log(error);
}).finally(() => console.log('Finally')); //finally me sirve para cuando no importa si resolvio o rechazo solo si ya termino la ejecucion de la promesa independiente del resultado.

