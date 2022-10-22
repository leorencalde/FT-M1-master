'use strict'
// No cambies los nombres de las funciones.

function quickSort(array) {
  // Implementar el método conocido como quickSort para ordenar de menor a mayor
  // el array recibido como parámetro
  // Devolver el array ordenado resultante
  // Tu código:
  /*
    1. caso base.
    2. Elegir el pivote
    3. definir un arreglo para la izquierda
    4. definir un arreglo para la derecha
    5. recorremos el arreglo
    6. preguntar si el valor en donde estamos array[i] es menor a mi pivote --> pusheamos al arreglo izquierdo
    7. si no es menor --> pusheamos al arreglo derecho
    8. aplicamos recursión
  */
    if (array.length <= 1) return array;
    let pivote = array[0];
    let izquierda = [];
    let derecha = [];
    for (let i = 1; i < array.length; i++) {
      if (array[i] <= pivote) {
        izquierda.push(array[i]);
      } else {
        derecha.push(array[i]);
      }
    }
    return quickSort(izquierda).concat(pivote).concat(quickSort(derecha));
}

function merge(array1, array2) {
  /*
    1. recibiendo dos parámetros
    2. declaramos dos punteros
    3. guardar los elementos ordenados en un nuevo arreglo
    4. mientras nuestros punteros estén dentro de los arreglos --> entren en el ciclo
    5. comparamos y pusheamos a nuestro arreglo nuevo
    6. no olvidarnos que nuestros punteros avancen de acuerdo al caso
  */

  let i = 0;
  let j = 0;
  let nuevoArreglo = [];

  while (i < array1.length && j < array2.length) {
    if (array1[i] < array2[j]) {
      nuevoArreglo.push(array1[i]);
      i++;
    } else {
      nuevoArreglo.push(array2[j]);
      j++;
    }
  }
  return nuevoArreglo.concat(array1.slice(i)).concat(array2.slice(j));
}

function mergeSort(array) {
  // Implementar el método conocido como mergeSort para ordenar de menor a mayor
  // el array recibido como parámetro
  // Devolver el array ordenado resultante
  // Tu código:
  /*
    1. Haremos dos funciones --> una función que se encargue de ordenar y otra que se encargue de dividir
    2. caso base --> arreglo sean de un solo elemento
  */
    if (array.length === 1) return array;
    let mitadArray = Math.floor(array.length / 2); //5/2 --> 2
    let izquierda = array.slice(0, mitadArray);
    let derecha = array.slice(mitadArray);
    return merge(mergeSort(izquierda), mergeSort(derecha));
}

// No modificar nada debajo de esta línea
// --------------------------------

module.exports = {
  quickSort,
  mergeSort,
};
