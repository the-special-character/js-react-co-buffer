// global scope
// function scope

// block scope

if (true) {
  const c = 5;
}

console.log(c);

function test() {
  var b = 2;
  console.log(b);
}

test();

// var a, b;

// a = 1;

// a = 2;

// var a = 1;

// var b = 2;

var a = 1;

function test() {
  console.log(a); // 1
  var b = 5;
  function test1() {
    console.log(b); // 5
    b++;
    console.log(a); // 1
  }

  console.log(b);
  test1();
}

test();
