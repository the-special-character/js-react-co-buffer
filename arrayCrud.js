const users = [
  {
    name: "Yagnesh",
    age: 33,
    gender: "male",
  },
  {
    name: "Virat",
    age: 30,
    gender: "male",
  },
  {
    name: "Rohit",
    age: 28, // 31
    gender: "male",
  },
  {
    name: "Deepika",
    age: 36,
    gender: "female",
  },
  {
    name: "alia",
    age: 25,
    gender: "female",
  },
];

const index = 2;

const updatedUsers = [
  ...users.slice(0, index),
  { ...users[index], age: 31 },
  ...users.slice(index + 1),
];

console.log(updatedUsers);

const arr = [1, 2, 3, 4, 5];

const arr1 = arr.slice(0, index);

const arr2 = arr.slice(index + 1);

console.log(arr1);

console.log(arr2);

const finalArr = [...arr1, ...arr2];

console.log(finalArr);
// const newArr = [ 0, ...arr, 6 ]
// console.log(newArr);

// add
// arr.splice(2,0,6,7, 8);

// update
// arr.splice(2, 2, 6, 7)

// delete
arr.splice(2, 2);

console.log(arr);

arr.push(6);

console.log(arr);

arr.pop();

console.log(arr);

arr.unshift(0);

console.log(arr);

arr.shift();

console.log(arr);
