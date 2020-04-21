function add(n1:number, n2: number):number { // set type of return manually
  return n1 + n2;
}

function printResult(num:number) {
  console.log('Result: ' + num);
}

function addAndHandle(n1:number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result);
}

addAndHandle(10, 20, (result) => {
  console.log(result);
})

printResult(add(5, 12))

// let combineValues : Function; // simple declaration of variable type
let combineValues: (a: number, b: number) => number; // concrete declaration of function type (no need of curly bracets)

combineValues = add;
// combineValues = printResult;

console.log(combineValues(8, 8));

