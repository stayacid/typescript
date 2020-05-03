// Component base
export default abstract class Component<T extends HTMLElement, U extends HTMLElement> { // abstract class can't be extensiated
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
