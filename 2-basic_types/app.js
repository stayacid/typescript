function combine(input1, input2, resultConvesion) {
    var result;
    if (typeof input1 === 'number' && typeof input2 === 'number' || resultConvesion === 'as-number') {
        result = +input1 + +input2;
    }
    else {
        result = input1.toString() + input2.toString();
    }
    /*   if (resultConvesion === 'as-number') {
        return +result
      } else {
        return result.toString()
      } */
    return result;
}
var combinedAges = combine(30, 26, 'as-number');
console.log(combinedAges);
var combinedStringAges = combine('30', '26', 'as-number');
console.log(combinedStringAges);
var combinedNames = combine('Max', 'Anna', 'as-string');
console.log(combinedNames);
