// Code goes here!
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
}

type ElevatedEmployee = Admin & Employee; // use both types, like extended interfaces

const e1: ElevatedEmployee = {
  name: 'Max',
  privileges: ['create-server'],
  startDate: new Date()
}

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

// type guards
function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') { // this is type guard
    return a.toString() + b.toString();
  }
  return a + b;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log(`Name: ${emp.name}`);
  if ('privileges' in emp) { // check if there such prop in obj
    console.log(`Privilages: ${emp.privileges}`);
  }
  if ('startDate' in emp) {
    console.log(`Start Date: ${emp.startDate}`);
  }
}

printEmployeeInformation(e1)

class Car {
  drive() {
    console.log('Driving...');
  }
}

class Truck {
  drive() {
    console.log('Driving truck...');
  }

  loadCargo(amount: number) {
    console.log(`Loading cargo ${amount}`);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  if (vehicle instanceof Truck) { // another way to check method existance. Working only with classes, because interfaces and types doesn't compile
    vehicle.loadCargo(1000);
  }
}

useVehicle(v1)
useVehicle(v2)

//DISCRIMINATING UNIONS -how to check interface type
interface Bird {
  type: 'bird';
  flyingSpeed: number;
}

interface Horse {
  type: 'horse'
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal:Animal) {
  let speed;
  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      speed = animal.runningSpeed;
      break;
    default:
      speed = '0'
  }
  console.log(`Moving speed ${speed}`);
};

moveAnimal({type: 'bird', flyingSpeed: 10})

// TYPE CASTING
// const userInputElement = <HTMLInputElement>document.getElementById('user-input') // set type of element. If types set you don't need use '!'
const userInputElement = document.getElementById('user-input') as HTMLInputElement // another way

if (userInputElement) {
  userInputElement.value = 'Hi there!';
}

// index properties
interface ErrorContainer { // { email: 'Not a valid email', username: 'must start woti a character'}
  [key: string]: string; // any quantity of props like 'string': 'string'
}
const errorBag: ErrorContainer = {
  email: 'Not a valid email!',
  username: 'Must start with a capital character!'
}

// function overloads
function add2(a: number, b: number): number
function add2(a: string, b: string): string
function add2(a:Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString()
  }
  return a + b
}

const result = add2('Max', ' Schwarz')
result.split(' ')

// OPTIONAL CHAINING
const fetchedUserData = {
  id: 'u1',
  name: 'Max',
  job: {
    title: 'CEO',
    description: 'My own company'
  }
}

console.log(fetchedUserData?.job?.title); // check if pops exist

// NULLISH COALESCING
const userInput = null;

const storedData = userInput ?? 'DEFAULT';
console.log(storedData);