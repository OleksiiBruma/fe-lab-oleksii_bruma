export class Timer_model {
  controller(){
    this.activeTask = null;
  }
  setActiveTask(activeTask){
    this.activeTask = activeTask;
  }
  getActiveTask(){
    return this.activeTask;
  }
}
