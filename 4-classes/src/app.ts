// Code goes here!
class Department {
  //name: string; // no need to make it here - do it in constructor
  private employees: string[] = []; // it's like in constructor 'this.employees = []'

  constructor(private readonly id: string, public name: string) { // or you should declare it in the beginng and into constructor by 'this'
  }

  describe(this: Department ) { // not necessary, but help to avoid errors if we'll copy describe in other object
    console.log(`Department (${this.id}): ${this.name}`);
  }

  addEmployee(employee: string) {
    this.employees.push(employee)
  }

  printEmployeeInformatiom() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  constructor(id: string, public admins: string[]) {
    super(id, 'IT')
  }
}

class AccountingDepartment extends Department {
  constructor(id: string, private reports: string[]) {
    super(id, 'Accounting')
  }

   addReport(text: string) {
     this.reports.push(text)
   }

   getReports() {
     console.log(this.reports);
   }
}

const it = new ITDepartment('d1', ['Max', 'Anna']);

it.addEmployee('Max')
it.addEmployee('Manu')

// accounting.employees[2] = 'Anna' // not work because 'employee' is private

it.describe()
it.name = 'NEW NAME'
it.printEmployeeInformatiom()

const accounting = new AccountingDepartment('d2', ['rep1'])
accounting.addReport('rep2')

// const accountingCopy = { name: 'Kek', describe: accounting.describe}
// accountingCopy.describe()