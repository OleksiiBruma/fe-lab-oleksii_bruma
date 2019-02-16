import {Timer_view} from "./timer_view";
import {Timer_model} from "./timer_model";

export class Timer_controller{
  constructor(model,view){
    this.model = model;
    this.view = view;
  }
  init(){
    this.view.init(this.model.getActiveTask());

  }
  setActiveTask(activeTask){
    this.model.setActiveTask(activeTask);
  }
  getActiveTask(){
    return this.model.getActiveTask();
  }
}

export const timer_controller = new Timer_controller(new Timer_model(), new Timer_view());
