require('./task_list.less');
import template from "./task_list.handlebars";

export class Task_list_view {
  constructor(){
    this.task_listTemplate = template();
  }
  init(){
    document.querySelector("body").insertAdjacentHTML("beforeend", this.task_listTemplate);
  }
}
