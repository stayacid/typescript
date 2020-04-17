/* const person: {
  name: string,
  age: number
} = { */
// const person: {
//   name: string;
//   age: number;
//   hobbies: string[];
//   role: [number, string];
// } = {
//   name: "Max",
//   age: 30,
//   hobbies: ['Sports', 'Cooking'],
//   role: [2, 'author'] // this is tuple - array with sertain length and types
// };

enum Role { ADMIN = 5, READ_ONLY, AUTHOR }; // READ_ONLY === 6, AUTHOR === 7

const person = {
  name: "Max",
  age: 30,
  hobbies: ['Sports', 'Cooking'],
  role: Role.ADMIN
};

//person.role.push('admin'); // push works for tuple
// person.role[1] = 10; // error
// person.role = [0, 'kek', 'pek'] // error

let favoriteActivities: string[];
favoriteActivities = ['Sports'];

for (const hobby of person.hobbies) {
  console.log(hobby);
}

if (person.role === 5) {
  console.log('Admin');
}