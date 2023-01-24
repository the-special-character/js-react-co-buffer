import Test, { a, b } from "./app";

const t = new Test();
t.displayType();

function add(x, y) {
  return x + y;
}

console.log(add(a, b));
