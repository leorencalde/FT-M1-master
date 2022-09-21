'use strict'

function BinarioADecimal(num) {
  // tu codigo aca
  // Operacion matematica binario a decimal = Sumatoria (2^posicion * valor_posicion)
  // num llega como un string, se debe pasar esta string a numero decimal
  var array = num.split(''); 
  // Toma el string que llega por parametro, 
  // separa cada elemento que conforma el string y los devuelve como un arreglo de strings,
  // almacena el nuevo arreglo en la varibale array
  var sum = 0; // Crea la variable sum y la inicia en cero
  for(var i=0; i<array.length; i++){ //Recorre cada elemento del arreglo
    sum = sum + Math.pow(2, array.length-1-i) * array[i];
    // Realiza la operacion matematica binario a decimal = Sumatoria (2^posicion * valor_posicion)
    // Va sumando y almacenando el resultado para cada elemento [i] en la variable sum
    // JS entiende la operacion, convierte internamente de string a number, el valor de la posicion 
  }
  return sum; // Devuelve la suma final despues de recorrer todo el arreglo

}

function DecimalABinario(num) {
  // tu codigo aca
  // num pasa por parametro un numero decimal
  var array = []; // Crea un arreglo vacio almacenado bajo la variable array
  while(num > 0){ // Mientras el parametro num sea mayor a cero
    array.unshift(num%2); 
    // Inserta al inicio de array, el restante de la division (modulo) de num entre 2
    // Devuelve el nuevo arreglo modificado
    num = Math.floor(num/2); // num pasa a ser el resultado de dividir num entre 2 redondeado hacia abajo
  }
  return array.join(''); 
  // Une todos los elementos del arreglo bajo la variable array dentro de un string
  // Devuelve el string 
}


module.exports = {
  BinarioADecimal,
  DecimalABinario,
}