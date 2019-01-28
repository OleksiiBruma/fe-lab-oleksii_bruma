import {Task_list_view} from "./task_list_view";
import {Task_list_model} from "./task_list_model";

export class Task_list_controller{
  constructor(model,view){
    this.model = model;
    this.view = view;
  }
  init(){
    this.view.init();

  }
}

export const task_list_controller = new Task_list_controller(new Task_list_model(), new Task_list_view());
