// Code goes here!
// BASE CLASS
abstract class Department {
  static fiscalYear = 2020
  //name: string; // no need to make it here - do it in constructor
  protected employees: string[] = []; // it's like in constructor 'this.employees = []' 'protected' like 'private' but avaliable in child classes

  constructor(protected readonly id: string, public name: string) { // or you should declare it in the beginng and into constructor by 'this'. Public accessible everywhere
    // console.log(Department.fiscalYear) // access static from class itself
  }

  static createEmployee(name: string) {
    return { name }
  }

  /*describe(this: Department) { // not necessary, but help to avoid errors if we'll copy describe in other object
    console.log(`Department (${this.id}): ${this.name}`);
  }*/
  abstract describe(this: Department): void // share method for all children classes but with empty body

  addEmployee(employee: string) {
    this.employees.push(employee)
  }

  printEmployeeInformatiom() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

const employee1 = Department.createEmployee('Mila') // can access static methods in class without creating new object


// NEW CLASS
class ITDepartment extends Department {
  constructor(id: string, public admins: string[]) {
    super(id, 'IT')
  }

  describe() {
    console.log('IT DEP');
  }
}

const it = new ITDepartment('d1', ['Max', 'Anna']);

it.addEmployee('Max')
it.addEmployee('Manu')
// it.describe()
it.name = 'NEW NAME'
// it.printEmployeeInformatiom()

// NEW CLASS
class AccountingDepartment extends Department {
  private lastReport: string;
  private static instance: AccountingDepartment // AccountingDepartment itself but accessible fron outside

  static getInstance() { // here we create singleton - class which can be create only once
    if (this.instance) {
      return this.instance
    }
    this.instance = new AccountingDepartment('d2', [])
    return this.instance
  }

  private constructor(id: string, private reports: string[]) { // also for singleton - to prevent creating new class from this constructor
    super(id, 'Accounting')
    this.lastReport = reports[0]
  }


  // getter - to access private
  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport
    }
    throw new Error('No report found')
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error('Pass a valid value')
    }
    this.addReport(value) 
  }


  describe() {
    console.log(`Accounting Department - ID: ${this.id}`);
  }

  addEmployee(name: string) {
    if (name === 'Max') {
      return
    }
    this.employees.push(name)
  }

   addReport(text: string) {
     this.reports.push(text)
     this.lastReport = text
   }

   getReports() {
     console.log(this.reports);
   }
}

const accounting = AccountingDepartment.getInstance() // create singleton
// accounting.employees[2] = 'Anna' // not work because 'employee' is private
accounting.mostRecentReport = 'End report' // setter
//accounting.addReport('rep2')
// console.log(accounting.mostRecentReport); // getter

accounting.addEmployee('Max')
accounting.addEmployee('Manu')

accounting.describe()

// accounting.printEmployeeInformatiom()
// const accountingCopy = { name: 'Kek', describe: accounting.describe}
// accountingCopy.describe()