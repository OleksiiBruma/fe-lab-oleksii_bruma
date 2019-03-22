export class Pop_up_model {
  constructor() {
    this.taskToBeEdited = null;
    this.getTaskToBeEdited = this.getTaskToBeEdited.bind(this);
  }

  setNewTaskData(data) {
    this.data = data;
  }

  getNewTaskData() {
    return this.data;
  }

  setTaskToBeEdited(id) {
    this.taskToBeEdited = id;
  }

  getTaskToBeEdited() {
    return this.taskToBeEdited;
  }
}
