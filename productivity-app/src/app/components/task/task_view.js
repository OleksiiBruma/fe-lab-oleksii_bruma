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
 removeModeOn(){
   [].forEach.call(document.querySelectorAll(".task"),(task)=>{task.classList.add("task--delete");})
 }
  removeModeOff(){
    [].forEach.call(document.querySelectorAll(".task"),(task)=>{task.classList.remove("task--delete");})
  }
 selectAll(list){
   [].forEach.call(document.querySelectorAll(`.${list.dataset.id} .task`),(task)=>{task.classList.add("task--delete-checked");})
 }
 deselectAll(list){
   [].forEach.call(document.querySelectorAll(`.${list.dataset.id} .task`),(task)=>{task.classList.remove("task--delete-checked");})
 }
}
