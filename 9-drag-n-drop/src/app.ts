// Drag and drop
interface Draggable {
  dragStartHandler(event: DragEvent): void
  dragEndHandler(event: DragEvent): void
}

interface DragTarget {
  dragOverHandler(event: DragEvent): void
  dropHandler(event: DragEvent): void
  dragLeaveHandler(event: DragEvent): void
}

// Project Type
enum ProjectStatus { Active, Finished }

class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {

  }
}

// Project State Management
type Listener<T> = (items: T[]) => void

class State<T> {
  protected listeners: Listener<T>[] = []

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn)
  }
}

class ProjectState extends State<Project> {
  private projects: Project[] = []
  private static instance: ProjectState

  private constructor() {
    super()
  }

  static getInstance() { // static only avaliable in class but not in his childs
    if (this.instance) {
      return this.instance
    }
    this.instance = new ProjectState()
    return this.instance
  }

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
    )

    this.projects.push(newProject)
    this.updateListeners()
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find(prj => prj.id === projectId)
    if (project && project.status !== newStatus) {
      project.status = newStatus
      this.updateListeners()
    }
  }

  private updateListeners() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice())
    }
  }
}
const projectState = ProjectState.getInstance()


// Validation
interface Validatable {
  value: string | number;
  required: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(validatableInput: Validatable) {
  let isValid = true;
  // check if value is required and exist
  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0
  }
  // check if string > minLength
  if (validatableInput.minLength != null && typeof validatableInput.value === 'string') {
    isValid = isValid && validatableInput.value.length >= validatableInput.minLength
  }
  // check if string < maxLength
  if (validatableInput.maxLength != null && typeof validatableInput.value === 'string') {
    isValid = isValid && validatableInput.value.length <= validatableInput.maxLength
  }
  // check if number > min
  if (validatableInput.min != null && typeof validatableInput.value === 'number') {
    isValid = isValid && validatableInput.value >= validatableInput.min
  }
  // check if number < max
  if (validatableInput.max != null && typeof validatableInput.value === 'number') {
    isValid = isValid && validatableInput.value <= validatableInput.max
  }
  return isValid
}

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

// Component base
abstract class Component<T extends HTMLElement, U extends HTMLElement> { // abstract class can't be extensiated
  templateElement: HTMLTemplateElement
  hostElement: T
  element: U

  constructor(templateId: string, hostElementId: string, inserAtStart: boolean, newElementId?: string) {
    // template
    const templateEl = document.getElementById(templateId)
    if (templateEl) {
      this.templateElement = templateEl as HTMLTemplateElement
    } else {
      throw new Error('No template element found!')
    }

    // host for template
    const hostEl = document.getElementById(hostElementId)
    if (hostEl) {
      this.hostElement = hostEl as T
    } else {
      throw new Error('No host element found!')
    }

    // form from template
    const importedNode = document.importNode(this.templateElement.content, true)
    this.element = importedNode.firstElementChild as U
    if (newElementId) {
      this.element.id = newElementId
    }

    this.attach(inserAtStart)
  }

  private attach(inserAtStart: boolean) {
    this.hostElement.insertAdjacentElement(inserAtStart ? 'afterbegin' : 'beforeend', this.element)
  }

  abstract configure?(): void
  abstract renderContent(): void
}

// Project Item
class projectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
  private project: Project

  get persons() {
    if (this.project.people === 1) {
      return '1 person'
    } else {
      return `${this.project.people} persons`
    }
  }

  constructor(hostId: string, project: Project) {
    super('single-project', hostId, false, project.id)
    this.project = project

    this.configure()
    this.renderContent()
  }

  @autobind
  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData('text/plain', this.project.id)
    event.dataTransfer!.effectAllowed = 'move'
  }

  dragEndHandler(_: DragEvent) {
    console.log('Drag end');
  }

  configure() {
    this.element.addEventListener('dragstart', this.dragStartHandler)
    this.element.addEventListener('dragend', this.dragEndHandler)
  }

  renderContent() {
    this.element.querySelector('h2')!.textContent = this.project.title
    this.element.querySelector('h3')!.textContent = this.persons + ' assigned'
    this.element.querySelector('p')!.textContent = this.project.description
  }
}

// List
class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
  assignedProjects: Project[]

  constructor(private type: 'active' | 'finished') {
    super('project-list', 'app', false, `${type}-projects`, )
    // assigned projects
    this.assignedProjects = []

    this.configure()
    this.renderContent()
  }

  @autobind
  dragOverHandler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
      event.preventDefault()
      const listEl = this.element.querySelector('ul')!
      listEl.classList.add('droppable')
    }
  }

  @autobind
  dropHandler(event: DragEvent) {
    const prjId = event.dataTransfer!.getData('text/plain')
    projectState.moveProject(prjId, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished)
  }

  @autobind
  dragLeaveHandler(_: DragEvent) {
    const listEl = this.element.querySelector('ul')!
    listEl.classList.remove('droppable')
  }

  configure() {
    // add listener
    projectState.addListener((projects: Project[]) => {
      // filter project
      const relevantProjects = projects.filter(prj => {
        if (this.type === 'active') {
          return prj.status === ProjectStatus.Active
        }
        return prj.status === ProjectStatus.Finished
      })
      this.assignedProjects = relevantProjects
      this.renderProjects()
    })
    // drag over
    this.element.addEventListener('dragover', this.dragOverHandler)
    this.element.addEventListener('dragleave', this.dragLeaveHandler)
    this.element.addEventListener('drop', this.dropHandler)
  }

  renderContent() {
    const listId = `${this.type}-projects-list`
    this.element.querySelector('ul')!.id = listId

    this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS'
  }

  private renderProjects() {
    const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement
    listEl.innerHTML = ''
    for (const prjItem of this.assignedProjects) {
      new projectItem(this.element.querySelector('ul')!.id, prjItem)
    }
  }
}

// Inputs
class Projectinput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement
  descriptionInputElement: HTMLInputElement
  peopleInputElement: HTMLInputElement

  constructor() {
    super('project-input', 'app', true, 'user-input')

    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement
    this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement
    this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement

    this.configure()
  }

  configure() {
    this.element.addEventListener('submit', this.submitHandler)
  }

  renderContent() {}

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value
    const enteredDescription = this.descriptionInputElement.value
    const enteredPeople = this.peopleInputElement.value

    // validate title
    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
    }
    // validate description
    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5
    }
    // validate people
    const peopleValidatable: Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 5
    }

    if (!validate(titleValidatable)) {
      alert('Invalid title!')
    } else if (!validate(descriptionValidatable)) {
      alert('Invalid description!')
    } else if (!validate(peopleValidatable)) {
      alert('Invalid people!')
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople]
    }
  }

  private clearInputs() {
    this.titleInputElement.value = ''
    this.descriptionInputElement.value = ''
    this.peopleInputElement.value = ''
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault()
    const userInput = this.gatherUserInput()
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput
      projectState.addProject(title, desc, people)
      this.clearInputs()
    }
  }
}

const projectForm = new Projectinput();
const activePrjList = new ProjectList('active')
const finishedPrjList = new ProjectList('finished')
