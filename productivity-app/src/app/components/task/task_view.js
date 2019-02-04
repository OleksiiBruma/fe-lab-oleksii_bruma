require('./task.less');
import taskTemplate from "./task.handlebars";

export class Task_view {
  constructor(){
    this.taskTemplate = taskTemplate;
  }
 renderTask(data, category){
   document.querySelector(`.tasks--${category}`).insertAdjacentHTML("beforeend",this.taskTemplate(data))
 }
}
