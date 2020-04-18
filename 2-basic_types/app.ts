let userInput: unknown; // 'any' type receive any type. 'unknown' will check type of assigned value
let userName: string;

userInput = 5;
userInput = "max"

// userName = userInput;

if (typeof userInput === 'string') {
  userName = userInput;
}

function generateError(message: string, code: number):never { // never return anything
  throw {message, errorCode: code}
}

const result = generateError('An error occured!', 500);
console.log(result);
