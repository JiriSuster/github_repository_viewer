export class NoRepositories extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'No repositories'
    Object.setPrototypeOf(this, NoRepositories.prototype)
  }
}
//source: https://medium.com/@Nelsonalfonso/understanding-custom-errors-in-typescript-a-complete-guide-f47a1df9354c
