import {EventBus} from "../../eventBus";
import {Task_collection_view} from "./task_collection_view";
import {Task_collection_model} from "./task_collection_model";

export class Task_collection_controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }
  init() {
    this.view.init();
  };

  toggleGlobalList() {
    this.view.toggleGlobalList();
  };

  setTasks(data) {
    this.model.setTasks(data);
  }

  getTasks() {
    return this.model.getTasks();
  }

  getCategories() {
    let states = this.model.getState();
    let currentTasks = this.getTasks();
    if(!currentTasks)  return;
    let rawCategories = [];
    Object.keys(currentTasks).forEach(function (task) {
        let date = new Date(currentTasks[task].completeDate).setHours(0, 0, 0, 0,);
        let now = new Date().setHours(0, 0, 0, 0);
        if (states.todoView) {
          if (parseInt(states.filterState) === parseInt(currentTasks[task].priority) && currentTasks[task].status === "GLOBAL_LIST" && parseInt(states.filterState) !== 0) {
            rawCategories.push(currentTasks[task].categoryId);
          } else if (parseInt(states.filterState) === 0 && currentTasks[task].status === "GLOBAL_LIST") {
            rawCategories.push(currentTasks[task].categoryId);
          }
        }
        if (!states.todoView) {

          if (parseInt(states.filterState) === parseInt(currentTasks[task].priority) && currentTasks[task].status === "COMPLETED"
            && parseInt(states.filterState) !== 0 && date === now) {
            rawCategories.push(currentTasks[task].categoryId);
          } else if (parseInt(states.filterState) === 0 && currentTasks[task].status === "COMPLETED"
            && date === now) {
            rawCategories.push(currentTasks[task].categoryId);
          }
        }
      }
    );

    return rawCategories.filter(function (value, index, self) {
      return self.indexOf(value) === index;
    })
  }

  globalListRender() {
    this.view.globalListRender(this.getCategories())
  }

  dailyListRender() {
    this.view.dailyListRender()
  }

  setState(state) {
    this.model.setState(state)
  }

  getState() {
    return this.model.getState();
  }
  removeModeOn(){
    this.view.removeModeOn();
  }
  removeModeOff(){
    this.view.removeModeOff();
  }

  removeMode(){

   if(!document.querySelector(".task--delete")){
      EventBus.emit("removeModeOn");
   }
  else if(document.querySelector(".task--delete")){
    if (document.querySelector(".task--delete-checked")){

      EventBus.emit("openRemoveModal");
    }
    else EventBus.emit("removeModeOff");
  }


}}

export const task_collection_controller = new Task_collection_controller(new Task_collection_model(), new Task_collection_view());
