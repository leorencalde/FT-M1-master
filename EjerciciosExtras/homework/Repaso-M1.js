const {
    Queue,
    Node,
    LinkedList,
    BinarySearchTree
} = require('./DS.js')

// Implementar la función countArray: a partir de un array en el cual cada posición puede ser un único
// número u otro array anidado de números, determinar la suma de todos los números contenidos en el array.
// El array será recibido por parámetro.
// Ejemplo:
//    const array = [1, [2, [3,4]], [5,6], 7];
//    countArray(array); --> Debería devolver 28 (1 + 2 + 3 + 4 + 5 + 6 + 7)
// Pista: utilizar el método Array.isArray() para determinar si algun elemento de array es un array anidado
// [Para más información del método: https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/isArray]

var countArray = function(array) {
    // Tu código aca:
    /*
    1. necesitamos sumar los valores que están en nuestro array
    2. Debemos devolver la suma.
    3. recibimos un arreglo --> recorremos el arreglo
    4. nos encontraremos con dos caminos:
        - el primero --> que sea un numero -->sumamos
        - el segundo --> que sea un arreglo -->recursión
    */
  let contador = 0;

  for (let i = 0; i < array.length; i++) {
    if (Array.isArray(array[i])) {
      contador += countArray(array[i]);
    } else {
      contador += array[i];
    }
  }
  return contador;
}


// Implementar la función countProps: a partir de un objeto en el cual cada propiedad puede contener
// cualquier tipo de dato, determinar la cantidad de propiedades de objetos en cualquier nivel, ya sea el inicial
// u objetos anidados
// Ejemplo:
// var obj = {
//   a: {
//     a1: 10,
//     a2: 'Franco',
//     a3: {f: 'r', a: 'n', c: {o: true}}
//   },
//   b: 2,
//   c: [1, {a: 1}, 'Franco']
// }
// countProps(obj)--> Deberia devolver 10 ya que el objeto inicial tiene 3 propiedades, pero a su vez
// dentro de a tenemos 3 propiedades mas, luego a3 tiene otras 3 y por ultimo c tiene una extra.
// Propiedades: a, a1, a2, a3, f, a, c, o, b, c --> 10 en total

var countProps = function(obj) {
    // Tu código aca:
    /*
  1. También precisamos una variable que se encargue de contar
  2. recorremos el objeto con for in --> propiedades se suman a nuestro contador
  3. preguntar si la propiedad es un objeto --> recursión
  4. Debemos asegurarnos que no sea un arreglo
  5. debemos devolver nuestro contador
  */
  let contador = 0;
  for (const propiedad in obj) {
    if (typeof obj[propiedad] === "object" && !Array.isArray(obj[propiedad])) {
      contador += countProps(obj[propiedad]);
    }
    contador++;
  }
  return contador;
}


// Implementar el método changeNotNumbers dentro del prototype de LinkedList que deberá cambiar
// aquellos valores que no puedan castearse a numeros por 'Kiricocho' y devolver la cantidad de cambios que hizo
// Aclaracion: si el valor del nodo puede castearse a número NO hay que reemplazarlo
// Ejemplo 1:
//    Suponiendo que la lista actual es: Head --> [1] --> ['2'] --> [false] --> ['Franco']
//    lista.changeNotNumbers();
//    Ahora la lista quedaría: Head --> [1] --> ['2'] --> [false] --> ['Kirikocho] y la función debería haber devuelto el valor 1

LinkedList.prototype.changeNotNumbers = function(){
    // Tu código aca:
    /*
  1. recorrer la lista
  2. definimos nuestro iterador --> current
  3. preguntar si el valor del nodo lo podemos convertir a numero, si no podemos --> cambiamos el valor por kiricocho
  4.Necesitamos guardar la cantidad de cambios que hicimos
  */

  let cambios = 0;
  let current = this.head;
  while (current) {
    if (isNaN(Number(current.value))) {
      current.value = "Kiricocho";
      cambios++;
    }
    current = current.next;
  }

  return cambios;
}


// Implementar la función mergeQueues que a partir de dos queues recibidas por parametro
// debe devolver una nueva Queue que vaya mergeando los nodos de las anteriores.
// Ejemplo:
// - queueOne: [7,3,5]
// - queueTwo: [2,4,6]
// mergeQueues(queueOne, queueTwo) --> [7,2,3,4,5,6]
// IMPORTANTE: NO son arreglos sino que son Queues.

var mergeQueues = function(queueOne, queueTwo) {
    // Tu código aca:
    /*
  1. Debemos asegurarnos de los métodos que nos entregan en DS
  2. NO SON ARREGLOS
  3. Debemos fijarnos en la longitud de las queues que nos pasan
  4. objetivo --> retornar una nueva queue mergeada (unida)
  5. Debemos sacar un elemento de las queues y las vamos uniendo a la nueva queue
  */
  const nuevaQueue = new Queue();
  //   console.log(nuevaQueue);
  while (queueOne.size() || queueTwo.size()) {
    let sacarElementoUno = queueOne.dequeue();
    let sacarElementoDos = queueTwo.dequeue();

    sacarElementoUno && nuevaQueue.enqueue(sacarElementoUno);
    if (sacarElementoDos) {
      nuevaQueue.enqueue(sacarElementoDos);
    }
  }
  return nuevaQueue;
}


// Implementar la funcion closureMult que permita generar nuevas funciones que representen
// las tablas de multiplicación de distintos numeros
// Ejemplo: 
// - var multByFour = closureMult(4);
// - multByFour(2) --> 8 (2 * 4)
// - multByFour(5) --> 20
// - var multBySix = closureMult(6);
// - multBySix(4) --> 24

var closureMult = function(multiplier) {
    // Tu código aca:
    /*
    1. nuestra función closureMult recibe un número como parámetro
    2. Objetivo --> multiplicar dos números
    3. retornar otra función que también recibe un parámetro
    4. retornamos el resultado de la multiplicación
  */
  return function (num) {
    return multiplier * num;
  };
}

// Implementar el método sum dentro del prototype de BinarySearchTree
// que debe retornar la suma total de los valores dentro de cada nodo del arbol
BinarySearchTree.prototype.sum = function() {
    // Tu código aca:
    /*
  1. debemos sumar los valores de cada nodo de nuestro árbol
  2. No nos debemos olvidar que los árboles son recursivos
  3. acumulando en alguna parte(variable) el resultado
  4. debemos preguntarnos si hay izquierda y derecha
  5. No olvidarse del caso base de los árboles --> nodos hoja
  */

  let acumuladora = 0;
  if (this.left) acumuladora += this.left.sum();
  if (this.right) acumuladora += this.right.sum();
  acumuladora += this.value;
  return acumuladora;
}

module.exports = {
    countArray,
    countProps,
    mergeQueues,
    closureMult
}