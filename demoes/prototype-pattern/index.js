class Dog {
  constructor(name) {
    this.name = name;
  }

  bark() {
    return `Woof!`;
  }
}

const dog1 = new Dog("Daisy");

console.log(Dog.prototype);
// constructor: ƒ Dog(name, breed) bark: ƒ bark()

console.log(dog1.__proto__);
// constructor: ƒ Dog(name, breed) bark: ƒ bark()

Dog.prototype.play = () => console.log("Playing now!");

dog1.play();

class SuperDog extends Dog {
  // eslint-disable-next-line no-useless-constructor
  constructor(name) {
    super(name);
  }

  fly() {
    console.log(`Flying!`);
  }
}

const dog2 = new SuperDog("Max");
dog2.bark();
dog2.fly();