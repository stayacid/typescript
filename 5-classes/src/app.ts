interface AddFn { // or it can be custom type: type AddFn = (a: number, b: number) => number
  (a: number, b: number): number
} 

let add: AddFn

add = (n1: number, n2: number) => {
  return n1 + n2;
}

interface Named {
  readonly name: string;
  outputName?: string; // optional property
}

interface Greetable extends Named { // you can extend interface with anothers
  greet(phrase: string): void;
}

// use interface
let user1: Greetable;

user1 = {
  name: 'Max',
  greet(phrase: string) {
    console.log(`${phrase} ${this.name}`);
  }
}

user1.greet('Hi! I\'m')

// use interface in class
class Person implements Greetable { // you can implement a lot of interfaces
  age = 30

  constructor(readonly name: string) {

  }

  greet(phrase: string) {
    console.log(`${phrase} ${this.name} ${this.age}`);
  }
}

const person1 = new Person('Max')
person1.greet('Hello')