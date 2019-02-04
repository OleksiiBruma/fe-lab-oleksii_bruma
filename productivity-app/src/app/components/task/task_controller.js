import {Task_view} from "./task_view";
import {Task_model} from "./task_model";

export class Task_controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  setTasks(data) {
    this.model.setTasks(data);
  }

  getTasks() {
    return this.model.getTasks();
  }
  renderTasks(){
    let allTasks = this.getTasks();
    let view = this.view;
    Object.keys(allTasks).forEach(function (task) {
      let category = allTasks[task].categoryId;
      view.renderTask(allTasks[task],category);
    });
  }
}

export const task_controller = new Task_controller(new Task_model(), new Task_view());
