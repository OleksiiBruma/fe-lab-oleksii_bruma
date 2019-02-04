export class Task_collection_model {
  constructor() {
    this.tasks = []
  }

  setTasks(newTasks) {
    this.tasks = newTasks
  }

  getTasks() {
    return this.tasks;
  }
}
