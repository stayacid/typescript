// autobind decorator
function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value // this is the name of the function which we decorate
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      return originalMethod.bind(this)
    }
  }
  return adjDescriptor
}

class Projectinput {
  templateElement: HTMLTemplateElement
  hostElement: HTMLDivElement
  form: HTMLFormElement
  titleInputElement: HTMLInputElement
  descriptionInputElement: HTMLInputElement
  peopleInputElement: HTMLInputElement

  constructor() {
    // template
    const templateEl = document.getElementById('project-input')
    if (templateEl) {
      this.templateElement = templateEl as HTMLTemplateElement
    } else {
      throw new Error('No template element found!')
    }

    // host for template
    const hostEl = document.getElementById('app')
    if (hostEl) {
      this.hostElement = hostEl as HTMLDivElement
    } else {
      throw new Error('No div element found!')
    }

    // form from template
    const importedNode = document.importNode(this.templateElement.content, true)
    this.form = importedNode.firstElementChild as HTMLFormElement
    this.form.id = 'user-input'
    this.attach(this.form) // paste form

    this.titleInputElement = this.form.querySelector('#title') as HTMLInputElement
    this.descriptionInputElement = this.form.querySelector('#description') as HTMLInputElement
    this.peopleInputElement = this.form.querySelector('#people') as HTMLInputElement
    this.configure()
  }

  private attach(el: HTMLElement) {
    this.hostElement.insertAdjacentElement('afterbegin', el)
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault()
    console.log(this.titleInputElement.value);
  }

  private configure() {
    this.form.addEventListener('submit', this.submitHandler)
  }
}

const projectForm = new Projectinput();