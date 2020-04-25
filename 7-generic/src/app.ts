// Code goes here!
const names: Array<string> = []; // string[]

const promise: Promise<string> = new Promise((resolve) => {
  setTimeout(() => {
    resolve('This is done!')
  }, 2000);
})

// CREATE GENERIC
function merge<T extends object, U extends object>(objA: T, objB: U) { // extends - constraint. With 'T' you can set sertain type when calling function
  return Object.assign(objA, objB)
}

const mergeObj = merge({name: 'Max'}, {age: 30})
console.log(mergeObj.name);

// ANOTHER GENERIC
interface Lengthy {
  length: number;
}
function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = 'Got no value';
  if (element.length === 1) {
    descriptionText = `Got 1 element`;
  } else if (element.length > 1) {
    descriptionText = `Got ${element.length} elements`;
  }
  return [element, descriptionText];
}

console.log(countAndDescribe<string>('Hi there!'));

// KEYOF CONSTRAINT
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) { // keyof check if in T exist this key
  return obj[key]; 
}

console.log(extractAndConvert({name: 'Max'}, 'name'));

// GENERIC CLASSES
class DataStorage<T extends string | number> { // no objects here
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('kek');
textStorage.addItem('lol');
textStorage.removeItem('kek');
console.log(textStorage.getItems());
