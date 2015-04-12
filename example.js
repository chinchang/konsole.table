var table = require('./index');


console.table([{a:1, b:2, c: function(){}}, {a:"foo", b:false, c:undefined}]);
console.table([[1,2,3], [2,3,4]]);
console.table([
	{ firstName: 'Kushagra', lastName: 'Gour' },
	{ firstName: 'John', lastName: 'Doe' }
], ['firstName']);


function Person(firstName, lastName, age) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
}

var family = {};
family.mother = new Person("Susan", "Doyle", 32);
family.father = new Person("John", "Doyle", 33);
family.daughter = new Person("Lily", "Doyle", 5);
family.son = new Person("Mike", "Doyle", 8);

console.table(family, ["firstName", "lastName", "age"]);
