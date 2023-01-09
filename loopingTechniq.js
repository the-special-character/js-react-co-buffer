// for
// foreach
// while
// do while

// which is fastest

// heap
// stack
// cache

const arr = [...Array(1000000).keys()];

console.time("for");
for (let i = 0; i < arr.length; i++) {}
console.timeEnd("for");

console.time("while");
let j = 0;
while (false) {
  j++;
}
console.timeEnd("while");

console.time("dowhile");
let k = 0;
do {
  console.log("hello");
  k++;
} while (false);
console.timeEnd("dowhile");

console.time("forEach");
arr.forEach((element) => {});
console.timeEnd("forEach");
