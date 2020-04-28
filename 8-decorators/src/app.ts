/*
function Logger(logString: string) {
  return function(kek: Function) {
    console.log(logString);
    console.log(kek);
  }
}

function WithTemplate(template: string, hookId: string) { // Decorators used in angular as templates for html, connected with class
  console.log('TEMPLATE FACTORY');
  return function<T extends { new(...args: any[]): {name: string} }>(
    originalConstructor: T
    ) {
    return class extends originalConstructor { // return and chain constructor
      constructor(..._: any[]) {
        super()
          console.log('Render template');
          const hookEl = document.getElementById(hookId);
          const p = new originalConstructor();
          if (hookEl) {
            hookEl.innerHTML = template;
            hookEl.querySelector('h1')!.textContent = p.name;
          }
      }
    }
  }
}

@WithTemplate('<h1>My Person Object</h1>', 'app')
@Logger('Logging..')
class Person {
  name = 'Max';

  constructor() {
    console.log('Creating person object...');
  }
}

const pers = new Person();

console.log(pers);
*/

//DIFFERENT DECORATORS
/*
function Log(target: any, propertyName: string | Symbol) {
  console.log('Property decorator'); 
  console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('Accessor decorator!');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
  console.log('Method decorator!');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log4(target: any, name: string | Symbol, position: number) {
  console.log('Parameter decorator!');
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error('Price should be positive')
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax)
  }
}
*/

// CREATING AN AUTOBIND DECORATOR
/*
function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) { // bind called method to 'this' of class
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    }
  };
  return adjDescriptor;
}

class Printer {
  message = 'This works!';

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();

const button = document.querySelector('button');
button?.addEventListener('click', p.showMessage) // or p.showMessage.bind(p)
*/

// VALIDATION WITH DECORATORS
class Course {
  title: string;
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p; 
  }
}

const courseForm = document.querySelector('form')! as HTMLFormElement;
courseForm.addEventListener('submit', e => {
  e.preventDefault();
  const titleEl = document.getElementById('title') as HTMLInputElement;
  const priceEl = document.getElementById('price') as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);
  console.log(createdCourse);
})