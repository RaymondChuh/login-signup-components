import React from 'react';
import ReactDOM from 'react-dom';
import {HelloWorld} from './components/HelloWorld.jsx';

var abc='';

// Play around with new array methods in ES6

// Array.from
let arrayOfNumber = [1,2,3,4,5,6];
let anotherArrayOfNumber = Array.from(arrayOfNumber);
let newArrayofNumber = anotherArrayOfNumber.map(n => n+1);
console.log(newArrayofNumber);

// Array.of
let y = Array.of(8);
console.log(y);

// Array.find, .findIndex, .fill
console.log(arrayOfNumber.find(n => n === 4), `expect ${4}`);
console.log(arrayOfNumber.findIndex(n => n === 4), `expect ${3}`);

//Template Literal
let name = 'John',
  apples = 5,
  pears = 7,
  bananas = function() { return 3; }
console.log(`He carries ${apples} apples, ${pears} pears, and ${bananas()}`);


// React HelloWorld
ReactDOM.render(
  <HelloWorld/>,
  document.getElementById('example')
);
