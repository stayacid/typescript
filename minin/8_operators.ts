interface Person {
  name: string
  age: number
}

type Personkeys = keyof Person // 'name' | 'age'

let myName: Personkeys = 'name'
myName = 'age'

// ===
type User = {
  _id: number
  name: string
  email: string
  createdAt: Date
}

type UserKeysNoMeta1 = Exclude<keyof User, '_id' | 'createdAt'> // '_id' | 'createdAt' - исключить некоторые поля из типа
type UserKeysNoMeta2 = Pick<User, 'name' | 'email'> // 'name' | 'email' - включить поля из типа

let u1: UserKeysNoMeta2 = name