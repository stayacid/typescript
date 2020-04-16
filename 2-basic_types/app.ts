/* const person: {
  name: string,
  age: number
} = { */
const person: {
  name: string;
  age: number;
  hobbies: string[];
  role: [number, string];
} = {
  name: "Max",
  age: 30,
  hobbies: ['Sports', 'Cooking'],
  role: [2, 'author'] // this is tuple - array with sertain length and types
};

person.role.push('admin'); // push works for tuple
// person.role[1] = 10; // error
// person.role = [0, 'kek', 'pek'] // error

let favoriteActivities: string[];
favoriteActivities = ['Sports'];

console.log(person.name)

for (const hobby of person.hobbies) {
  console.log(hobby);
}