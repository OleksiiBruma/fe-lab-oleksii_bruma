require('./task.less');
import taskTemplate from "./task.handlebars";

export class Task_view {
  constructor(){
    this.taskTemplate = taskTemplate;
  }
 renderTaskGlobal(data, category){
    let tasksCategory = document.querySelector(`.tasks--${category}`);
  tasksCategory.insertAdjacentHTML("beforeend",this.taskTemplate(data));
 }
 renderTaskDaily(data){
   document.querySelector(".daily__tasks-list").insertAdjacentHTML("beforeend",this.taskTemplate(data));
 }
}
