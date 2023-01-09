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
    age: 35,
    gender: "male",
  },
  {
    name: "Taimur",
    age: 08,
    gender: "male",
  },
  {
    name: "Alia",
    age: 25,
    gender: "female",
  },
  {
    name: "Deepika",
    age: 28,
    gender: "female",
  },
  {
    name: "Priyanka",
    age: 38,
    gender: "female",
  },
];

// O(logN) => Best case
// O(N) => Worst case
// if record found then returns Index ie. >= 0
// if record Not found then returns -1
const aliaIndex = users.findIndex((item) => {
  console.log(item.name);
  return item.name === "Shikhar";
});

// O(logN) => Best case
// O(N) => Worst case
// if record found then returns data
// if record Not found then returns undefined
const aliaInfo = users.find((item) => {
  console.log(item.name);
  return item.name === "Alia";
});

console.log(aliaInfo);

// O(N)
// if record found then returns array of data
// if record Not found then returns empty array
const maleRecords = users.filter((item) => {
  console.log(item.name);
  return item.gender === "other";
});

// O(logN) => Best case
// O(N) => Worst case
// if record found then returns true
// if record Not found then returns false
const isRohitInTeam = users.some((item) => {
  return item.name === "Rohit";
});

const isEveryAdult = users.every((item) => {
  console.log(item.name);
  return item.age >= 18;
});

console.log(isRohitInTeam);

console.log(isEveryAdult);

console.log(maleRecords);

// find record if age is > 35 and gender is male
