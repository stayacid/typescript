// example of plugin js library
import _ from 'lodash'
// import class transformer
import 'reflect-metadata'
import { plainToClass } from 'class-transformer'
// use any side code
declare var GLOBAL: any; 
// custom data
import { Product } from './product.model'
// validate data
import { validate } from 'class-validator'


console.log(_.shuffle([1, 2, 3]));
console.log(GLOBAL);

const products = [
  {title: 'A carpet', price: 12.99}, 
  {title: 'A book', price: 5.99}
]

// use class class transformer - transform data to instances of class
const loadedProducts = plainToClass(Product, products)

for (const prod of loadedProducts) {
  console.log(prod.getInformation());
}

const newProduct = new Product('', -1)
validate(newProduct).then(errors => {
  if (errors.length > 0) {
    console.log('Eroror: ', errors);
  } else {
    console.log(newProduct.getInformation());
  }
})