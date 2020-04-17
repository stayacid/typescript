type Combine = number | string; // type alias

type User = { name: string; age: number }; // alias for object
const u1: User = { name: 'Max', age: 30 }; // this works!

function combine(input1: Combine, input2: number | string, resultConvesion: 'as-number' | 'as-string' ) {
  let result;
  if (typeof input1 === 'number' && typeof input2 === 'number' || resultConvesion === 'as-number') {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString()
  }
/*   if (resultConvesion === 'as-number') {
    return +result
  } else {
    return result.toString()
  } */
  return result
}

const combinedAges = combine(30, 26, 'as-number');
console.log(combinedAges);

const combinedStringAges = combine('30', '26', 'as-number');
console.log(combinedStringAges);

const combinedNames = combine('Max', 'Anna', 'as-string');
console.log(combinedNames);

