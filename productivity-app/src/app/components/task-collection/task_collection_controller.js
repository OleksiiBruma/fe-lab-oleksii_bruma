import {Task_collection_view} from "./task_collection_view";
import {Task_collection_model} from "./task_collection_model";

export class Task_collection_controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  init() {
    this.view.init();
  };

  toggleGlobalList() {
    this.view.toggleGlobalList();
  };

  setTasks(data) {
    this.model.setTasks(data);
  }

  getTasks() {
    return this.model.getTasks();
  }

  getCategories() {
    let currentTasks = this.getTasks();
    let rawCategories = [];
    Object.keys(currentTasks).forEach(function (task) {
      rawCategories.push(currentTasks[task].categoryId);
    });
    return rawCategories.filter(function (value, index, self) {
      return self.indexOf(value) === index;
    })
  }
  globalListRender() {
    this.view.globalListRender(this.getCategories())
  }
  setState(state){
    this.model.setState(state)
  }
  getState(){
    return this.model.getState();
  }

}

export const task_collection_controller = new Task_collection_controller(new Task_collection_model(), new Task_collection_view());
