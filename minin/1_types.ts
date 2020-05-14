const str: string = "Hello";
const isFetching: boolean = false;
const int: number = 42;

// Any
let anyVar: any = 'a'
anyVar = 23

// Arrays
const numArr: number[] = [1, 1, 2, 3, 5, 8, 13]
const numArr2: Array<number> = [1, 1, 2, 3, 5, 8, 13]

const strArr: string[] = ['a', 'b', 'c']

// Tuple
const contact: [string, number] = ['Max', 42]

// function
function sayMyName(name: string): void {
  console.log(name);
}
sayMyName('Max')

// Never
function throwError(message:string):never {
  throw new Error('Its 5!')
}

function infinite():never {
  while (true) {
    
  }
}

// Custom type
type Login = string | number
const login: Login = 'admin'
const login2: Login = 34

