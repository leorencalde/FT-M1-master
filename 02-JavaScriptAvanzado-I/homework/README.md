
# Homework JavaScript Avanzado I

## Scope & Hoisting

Determiná que será impreso en la consola, sin ejecutar el código.

> Investiga cuál es la diferencia entre declarar una variable con `var` y directamente asignarle un valor.

```javascript

x = 1;
var a = 5;
var b = 10;
var c = function(a, b, c) {
  // #2 
  // var a = 8
  // var b = 9
  // var c = 10
  var x = 10;
  console.log(x); // #3 x=10
  console.log(a); // #4 a=8
  var f = function(a, b, c) {
    // #6
    // var a = 8
    // var b = 9
    // var c = 10
    b = a; // #7 b=8
    console.log(b); //#8 b=8
    b = c; //#9 b=10
    var x = 5;
  }
  f(a,b,c); 
  // #5 - Crea un nuevo contexto de ejecución
  // #10 - Termina de ejecutarse la función, desaparece el contexto
  console.log(b); // #11 toma el valor de la variable b dentro del scope que se encuentra, b=9
}
c(8,9,10); 
// #1  - Crea un nuevo contexto de ejecución
// #12 - Termina de ejecutarse la función, desaperece el contexto
console.log(b); //#13 toma el valor de la variable b dentro del scope que se encuentra, b=10
console.log(x); //#14 toma el valor de la variable x dentro del scope que se encuentra, x=1

//Global context----> c context ----> f context
//Memory
//x=1
//a=5
//b=10
//c=function (a,b,c) {...}

//consola
// #3  --> x=10 --> 10
// #4  --> a=8  --> 8
// #8  --> b=8  --> 8
// #11 --> b=9  --> 9 
// #13 --> b=10 --> 10
// #14 --> x=1  --> 1

```

```javascript

console.log(bar); //undefined
console.log(baz); //error (baz no esta definido)
foo();            //no se ejecuta
function foo() { console.log('Hola!'); }
var bar = 1;
baz = 2;

//global context --> 
// #1 Creation phase
//    Hoisting
//    Memory
//    --> foo: function () {...}
//    --> bar: undefined
// #2 Execution phase
//    console.log(bar); bar=undefined --> undefined
//    console.log(baz); error (rompe la ejecución, se detiene)

```

```javascript

var instructor = "Tony";
if(true) {
    var instructor = "Franco";
}
console.log(instructor); //Franco

```

```javascript

var instructor = "Tony";
console.log(instructor); //#1 Tony
(function() {
   if(true) {
      var instructor = "Franco";
      console.log(instructor); //#2 Franco
   }
})();
console.log(instructor); //#3 Tony

```

```javascript

var instructor = "Tony";
let pm = "Franco";
if (true) {
    var instructor = "The Flash";
    let pm = "Reverse Flash";
    console.log(instructor); //#1 "The Flash"
    console.log(pm); //#2 "Reverse Flash"
}
console.log(instructor); //#3 "The Flash"
console.log(pm); //#4 "Franco"

```
### Coerción de Datos

¿Cuál crees que será el resultado de la ejecución de estas operaciones?:

```javascript
6 / "3" //2
"2" * "3" //6
4 + 5 + "px" //'9px'
"$" + 4 + 5 //'$45'
"4" - 2 //2
"4px" - 2 //NaN
7 / 0 //Infinity
{}[0] //[0]
parseInt("09") //9
5 && 2 //2
2 && 5 //5
5 || 0 //5
0 || 5 //5
[3]+[3]-[10] //23
3>2>1 //false
[] == ![] //true
```

> Si te quedó alguna duda repasá con [este artículo](http://javascript.info/tutorial/object-conversion).


### Hoisting

¿Cuál es el output o salida en consola luego de ejecutar este código? Explicar por qué:

```javascript
function test() {
   console.log(a); //undefined
   console.log(foo()); //2

   var a = 1;
   function foo() {
      return 2;
   }
}

test();
```

Y el de este código? :

```javascript
var snack = 'Meow Mix';

function getFood(food) {
    if (food) {
        var snack = 'Friskies';
        return snack; 
    }
    return snack;
}

getFood(false); //undefined
```


### This

¿Cuál es el output o salida en consola luego de ejecutar esté código? Explicar por qué:

```javascript
var fullname = 'Juan Perez';
var obj = {
   fullname: 'Natalia Nerea',
   prop: {
      fullname: 'Aurelio De Rosa',
      getFullname: function() {
         return this.fullname;
      }
   }
};

console.log(obj.prop.getFullname()); //Aurelio De Rosa

var test = obj.prop.getFullname; //Juan Perez

console.log(test());
```

### Event loop

Considerando el siguiente código, ¿Cuál sería el orden en el que se muestra por consola? ¿Por qué?

```javascript
function printing() {
   console.log(1);
   setTimeout(function() { console.log(2); }, 1000);
   setTimeout(function() { console.log(3); }, 0);
   console.log(4);
}

printing();

//console.log ---> 1 4 3 2 
```
