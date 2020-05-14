class Typescript {
  version: string

  constructor(version: string) {
    this.version = version
  }

  info(name: string) {
    return `[${name}]: Typescript version is ${this.version}`
  }
}

/*class Car {
  readonly model: string
  readonly numberOfWheels: number = 4

  constructor(theModel: string) {
    this.model = theModel
  }
}*/

// shortcut for class higher
class Car {
  readonly numberOfWheel: number = 4
  constructor(readonly model: string) {
  }
}

// ====
class Animal {
  protected voice: string = '' // доступно для класса и его наследников, но недоступно через cat.voice, например
  public color: string = 'black'

  private go() { // доступно только в этом классе,а в наследниках нет
    console.log('Go');
  }
}

class Cat extends Animal {
  public setVoice(voice: string): void {
    this.voice = voice
  }
}

const cat = new Cat()
cat.setVoice('test')
console.log(cat.color)

// abstract class
abstract class Component {
  abstract render(): void
  abstract info(): string
}

class AppComponent extends Component {
  render(): void {
    console.log('render');
  }

  info(): string {
    return 'this is info'
  }
}