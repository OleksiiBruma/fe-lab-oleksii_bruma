import {Timer_view} from "./timer_view";
import {Timer_model} from "./timer_model";

export class Timer_controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  init() {
    this.view.init(this.model.getActiveTask());
  }

  startTimer(settingsData) {
    this.view.startTimer(this.model.getActiveTask(), settingsData);
    if (this.model.getActiveTask().estimation < 10) {
      this.view.addButton();
    }
  }

  setActiveTask(activeTask) {
    this.model.setActiveTask(activeTask);
  }

  getActiveTask() {
    return this.model.getActiveTask();
  }

  increasePomodoros() {
    this.model.increaseEstimation();
    this.view.updatePomodoros(this.model.getActiveTask());
    if (this.model.getActiveTask().estimation < 10) {
      this.view.addButton();
    }
  }
  failPomodoro(settingsData) {
    this.model.failPomodoro();
    this.view.breakTimer(this.model.getActiveTask(), settingsData);
  }
  finishPomodoro(settingsData){
    this.model.finishPomodoro();
    this.view.breakSuccessTimer(this.model.getActiveTask(), settingsData);
  }
  taskCompleted(settingsData){
    this.model.taskCompleted();
    this.view.taskCompleted(this.model.getActiveTask(), settingsData);
  }
  getCompletedTask(){
    return this.model.getCompletedTask();
  }
}

export const timer_controller = new Timer_controller(new Timer_model(), new Timer_view());
