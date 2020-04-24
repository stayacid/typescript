// Code goes here!
const names: Array<string> = []; // string[]

const promise: Promise<string> = new Promise((resolve) => {
  setTimeout(() => {
    resolve('This is done!')
  }, 2000);
})
