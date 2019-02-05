require('./task.less');
import taskTemplate from "./task.handlebars";

export class Task_view {
  constructor(){
    this.taskTemplate = taskTemplate;
  }
 renderTask(data, category){
    let tasksCategory = document.querySelector(`.tasks--${category}`);
  tasksCategory.insertAdjacentHTML("beforeend",this.taskTemplate(data));
 }
}
