function sum(num1, num2){
    return num1 + num2;
};

function calc(num1,num2,callback){//no tiene que llamarse callback puede tener cualquier nombre
    return callback(num1,num2); //primero se llama a la funcion calc y luego hace un callback a la funcion sum para que realice la suma de los numeros y retorna esa suma (o retorna la respectiva funcion que puso como argumento cuando llamo a la funcion calc (suma, resta, multiplicacion,division))
};

//para hacer uso de callback se establece como argumentos los valores a evaluar y la funcion correspondiente que quiero que se ejecute como mi callback
console.log(calc(2,2,sum)); //no es necesario cuando se invoca una funcion poner los parentesis ni tampoco los argumentos

//son de utilidad los callback por ejemplo si a esta calculadora no solo le pusiera una funcion de suma sino tambien resta multiplicacion division. ya que con ese mismo parametro que llame callback en la funcion calc puedo retornar la operacion que corresponda cuando la llame

setTimeout(function(){ //funcion anonima
    console.log("Hola JS");
}, 5000) //settomeout por si solo es un callback

function saludo(name){
    console.log(`Hola ${name}`);
}

setTimeout(saludo, 2000, "Andres"); //como argumentos se pone la funcion que quiero que se ejecute, el tiempo que quiero que transcurra antes de la ejecucion y los argumentos que quiero enviarle como parametros a la funcion 