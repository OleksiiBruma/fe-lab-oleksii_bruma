require('./task_list.less');
import template from "./task_list.handlebars";

export class Task_list_view {
  constructor(){
    this.task_listTemplate = template();
  }
  init(){
    if(sessionStorage.length === 0) {
      document.querySelector("body").insertAdjacentHTML("beforeend", this.task_listTemplate);
      sessionStorage.setItem('newUser', 'false');
      this.firstVisit();
      return
    }
    document.querySelector("body").insertAdjacentHTML("beforeend", this.task_listTemplate);
  }
  firstVisit(){
    document.querySelector(".stub--first-visit").classList.remove("hidden");
    document.querySelector(".daily").classList.add("hidden");
    document.querySelector(".global").classList.add("hidden");
  }
}
