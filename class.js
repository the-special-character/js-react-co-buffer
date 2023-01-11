// const user1 = {
//     firstName: "Yagnesh",
//     lastName: "Modh",
//     fullName: function() {
//         return `${this.firstName} ${this.lastName}`
//     },
//     age:  33,
//     profession: "trainer",
//     getInfo: function() {
//         return {
//             name: this.fullName(),
//             proffestion: this.profession,
//             age: this.age
//         }
//     }
// }

// const user2 = {
//     firstName: "Virat",
//     lastName: "Kohli",
//     fullName: function() {
//         return `${this.firstName} ${this.lastName}`
//     },
//     age:  30,
//     profession: "trainer",
//     getInfo: function() {
//         return {
//             name: this.fullName(),
//             proffestion: this.profession,
//             age: this.age
//         }
//     }
// }

// const user3 = {
//     firstName: "Rohit",
//     lastName: "Sharma",
//     fullName: function() {
//         return `${this.firstName} ${this.lastName}`
//     },
//     age:  30,
//     profession: "trainer",
//     getInfo: function() {
//         return {
//             name: this.fullName(),
//             proffestion: this.profession,
//             age: this.age
//         }
//     }
// }

// console.log(user1.getInfo());

// encapsulation ->
// abstration ->
// Polymorpysm
// inheritance

class User {
  static isOnline = true;

  constructor(firstName, lastName, age, profession) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.profession = profession;
  }

  set firstName(value) {
    this._firstName = User.capitalize(value);
  }

  get firstName() {
    return this._firstName;
  }

  set lastName(value) {
    this._lastName = User.capitalize(value);
  }

  get lastName() {
    return this._lastName;
  }

  #fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  static capitalize(value) {
    return value[0].toUpperCase() + value.slice(1);
  }

  getInfo() {
    return {
      name: this.#fullName(),
      proffestion: this.profession,
      age: this.age,
    };
  }
}

class SuperUser extends User {
  constructor() {
    super("Almighty", "God", "infinite", "god");
  }

  // method overriding
  getInfo() {
    return { ...super.getInfo(), power: "super Power" };
  }
}

console.log(User.capitalize("almighty"));

const su = new SuperUser();
console.log(su.getInfo());

const user1 = new User("yagnesh", "modh", 33, "trainer");
const user2 = new User("virat", "kohli", 30, "cricketor");

console.log(user1.getInfo());
console.log(user2.getInfo());
