export const a = 1;

export const b = 2;

class Animal {
  constructor(type) {
    this.type = type;
  }

  displayType() {
    console.log(this.type);
  }
}

// per file only 1 export default is Possible
export default Animal;

// Bundling
// Minification
// Uglification

// Three type of library

// Dependency
// Dev Dependecy
// Pear Dependency
