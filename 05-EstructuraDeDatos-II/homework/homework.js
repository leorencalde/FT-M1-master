"use strict";

/*
Implementar la clase LinkedList, definiendo los siguientes métodos:
  - add: agrega un nuevo nodo al final de la lista;
  - remove: elimina el último nodo de la lista y retorna su valor (tener en cuenta el caso particular de una lista de un solo nodo y de una lista vacía);
  - search: recibe un parámetro y lo busca dentro de la lista, con una particularidad: el parámetro puede ser un valor o un callback. En el primer caso, buscamos un nodo cuyo valor coincida con lo buscado; en el segundo, buscamos un nodo cuyo valor, al ser pasado como parámetro del callback, retorne true. 
  Ejemplo: 
  search(3) busca un nodo cuyo valor sea 3;
  search(isEven), donde isEven es una función que retorna true cuando recibe por parámetro un número par, busca un nodo cuyo valor sea un número par.
  En caso de que la búsqueda no arroje resultados, search debe retornar null.
*/

function LinkedList() {
  this.head = null; // Empieza head como null
  this._length = 0; // Lista vacia, longitud = 0
}

function Node(value) {
  this.value = value; // Toma un valor como argumento
  this.next = null; // Define next como null por default
}

LinkedList.prototype.add = function(data){ // Crea el metodo add, agrega los elementos linkeandolos entre ellos a traves del next
  let node = new Node(data); // node = {value: data, next: null}
  let current = this.head;
  if (current === null){ // Si la lista esta vacia
    this.head = node; // Asigna el nodo agregado como primer elemento de la lista
    this._length++; // Aumenta en uno la longitud de la lista
    return node;
  }
  while (current.next !== null){ // Mientras la propiedad next del nodo no sea null
    current = current.next; // Pasa a evaluar al siguiente nodo
  }
  current.next = node; //Asigna el nodo como ultimo elemento de la lista
  this._length++; // Aumenta en uno la longitud de la lista
  return node; 
}
LinkedList.prototype.remove = function(){ // Crea el metodo remove, saca el ultimo nodo ingresado y devuelve su valor
  let current = this.head;
  // Si la lista esta vacia (longitud = 0):
  if (this._length === 0) return null;
  // Si la lista contiene un solo elemento (longitud = 1):
  else if (this._length === 1){
    let aux = this.head.value;
    this.head = null;
    this._length--;
    return aux;
  }
  // Si la lista contiene n elementos (longitud > 1):
  while(current.next.next){
    current = current.next;
  }
  let aux = current.next.value;
  current.next = null;
  this._length--;
  return aux;
}; 
LinkedList.prototype.search = function(value){ // Crea el metodo search
  if (this.head === null) return null; // Si la lista esta vacia devuelve null
  let current =  this.head;
  while (current) { //Mientras existan elementos en la lista:
    if (current.value === value) return current.value; // Evaluar si el valor buscado se encuentra dentro del elemento, devolver el valor del elemento
    else if (typeof value == 'function'){ // Si el valor buscado es una funcion:
      if(value(current.value)){ // Evaluar la funcion pasando como argumento el valor del elemento
        return current.value; // Devolver el valor del elemento que coincide con la busqueda
      }
    }
    current = current.next // Pasar al siguiente elemento de la lista
  }
  return null; // Si no encuentra el valor buscado dentro de todos los elementos de la lista, devuelve null
} 

/*
Implementar la clase HashTable.

Nuetra tabla hash, internamente, consta de un arreglo de buckets (slots, contenedores, o casilleros; es decir, posiciones posibles para almacenar la información), donde guardaremos datos en formato clave-valor (por ejemplo, {instructora: 'Ani'}).
Para este ejercicio, la tabla debe tener 35 buckets (numBuckets = 35). (Luego de haber pasado todos los tests, a modo de ejercicio adicional, pueden modificar un poco la clase para que reciba la cantidad de buckets por parámetro al momento de ser instanciada.)

La clase debe tener los siguientes métodos:
  - hash: función hasheadora que determina en qué bucket se almacenará un dato. Recibe un input alfabético, suma el código numérico de cada caracter del input (investigar el método charCodeAt de los strings) y calcula el módulo de ese número total por la cantidad de buckets; de esta manera determina la posición de la tabla en la que se almacenará el dato.
  - set: recibe el conjunto clave valor (como dos parámetros distintos), hashea la clave invocando al método hash, y almacena todo el conjunto en el bucket correcto.
  - get: recibe una clave por parámetro, y busca el valor que le corresponde en el bucket correcto de la tabla.
  - hasKey: recibe una clave por parámetro y consulta si ya hay algo almacenado en la tabla con esa clave (retorna un booleano).

Ejemplo: supongamos que quiero guardar {instructora: 'Ani'} en la tabla. Primero puedo chequear, con hasKey, si ya hay algo en la tabla con el nombre 'instructora'; luego, invocando set('instructora', 'Ani'), se almacenará el par clave-valor en un bucket específico (determinado al hashear la clave)
*/

function HashTable() {
  this.numBuckets = 35; 
  this.buckets = [];
}

HashTable.prototype.hash = function(key){
  let sum = 0;
  for (let i=0; i<key.length; i++){
    sum+=key.charCodeAt(i); // Suma los key code de las letras de la palabra
  }
  return sum % this.numBuckets; // Hace el modulo de la suma de los key por el numero de buckets
}
HashTable.prototype.set = function (key, value) {
  if (typeof key !== 'string') throw new TypeError('Keys must be strings') //Devuelve un error cuando el key no es un string
  let i = this.hash(key); // Define la posicion donde se guardaran los valores de acuerdo a la funcion hasheadora
  if (this.buckets[i] === undefined){ // Si la posicion no esta siendo utilizada
    this.buckets[i] = {}; // Crea un nuevo objeto dentro del arreglo en esa posicion
  }
  this.buckets[i][key] = value; // Asiga el valor al key dentro de la posicion
}
HashTable.prototype.get = function (key) {
  let i = this.hash(key); // Define la posicion donde se buscaran los valores de acuerdo a la funcion hasheadora
  return this.buckets[i][key]; // Devuelve el valor de la key en la posicion buscada
}
HashTable.prototype.hasKey = function (key) {
  let i = this.hash(key); // Define la posicion donde buscara la key
  return this.buckets[i].hasOwnProperty(key); // Revisa si existe la key en la posicion
}

// No modifiquen nada debajo de esta linea
// --------------------------------

module.exports = {
  Node,
  LinkedList,
  HashTable,
};
