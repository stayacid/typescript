// Code goes here!
class Projectinput {
  protected templateElement: HTMLTemplateElement
  hostElement

  constructor() {
    const templateEl = document.getElementById('project-input')
    if (templateEl) {
      this.templateElement = templateEl as HTMLTemplateElement
    } else {
      throw new Error('No template element found!')
    }

    this.hostElement = 
  }
}