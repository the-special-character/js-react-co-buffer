const arr = [1, 2, 3, 4, 5, 6];

// have to use primitive type of data
const set = new Set(arr);

console.log(set);

console.log(set.has(4));

set.delete(2);

console.log(set.size);

console.log(set);

const map = new Map();

map.set("yagnesh", {
  name: "Yagnesh",
  age: 33,
  gender: "male",
});

map.set("Virat", {
  name: "Virat",
  age: 30,
  gender: "male",
});

//   O(1)
console.log(map.get("Virat"));
