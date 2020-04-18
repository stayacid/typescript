var userInput; // 'any' type receive any type. 'unknown' will check type of assigned value
var userName;
userInput = 5;
userInput = "max";
// userName = userInput;
if (typeof userInput === 'string') {
    userName = userInput;
}
function generateError(message, code) {
    throw { message: message, errorCode: code };
}
var result = generateError('An error occured!', 500);
console.log(result);
