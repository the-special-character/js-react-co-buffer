class Auth {
  #login() {
    console.log("login success");
  }

  #logout() {
    console.log("logout success");
  }

  *flow() {
    yield this.#login();
    yield this.#logout();
  }
}

// const auth = new Auth();

// const gen = auth.flow();
// gen.next()
// gen.next()

function* test() {
  try {
    yield 1;
    yield 2;
    yield 3;
  } catch (error) {
    console.log(error);
  }
}

const gen = test();

const set = new Set([1, 2, 3, 4]);

for (const iterator of set) {
  console.log(iterator);
}

for (const iterator of gen) {
  console.log(iterator);
}

// console.log(gen.next());
// console.log(gen.next());
// gen.throw(new Error("something went wrong"))

// console.log(gen.next());
