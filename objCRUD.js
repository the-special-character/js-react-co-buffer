const obj = {
  a: 1,
  b: 2,
  c: 3,
};

// destrucring + spred operator
const { b, c, a, ...restOfData } = obj;
console.log(restOfData);

// const a = 5;

const key = "b";
// destructuring
// const { a: objA, c, [key]: dynamicValue } = obj;

// console.log(a);
// console.log(objA);
// // console.log(b);
// console.log(c);
// console.log(dynamicValue);

// dot notation
console.log(obj.a);
console.log(obj.b);
console.log(obj.c);

// array notation
console.log(obj["a"]);
console.log(obj[key]);
console.log(obj["c"]);

// console.log(obj);

// spread operator
// const newObj = { ...obj, b: 5  }
// console.log(newObj);

// console.log(newObj);

// const newObj = Object.assign({},obj, { d: 4});

// newObj.e= 5;

// console.log(newObj);
// console.log(obj);

// console.log(obj);
// console.log(newObj);

// delete obj.b;

// console.log(obj);

// d

// Mutable approch

// Immutable approch

// obj.d = 4;

// console.log(obj);

// CRUD operation

// read object property
// Create object property
// Update object property
// Delete object property
