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
  firstVisit(){
    this.view.firstVisit();
  }

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
    const states = this.model.getState();
    const currentTasks = this.getTasks();
    if (!currentTasks) return;
    const rawCategories = [];
    Object.keys(currentTasks).forEach(function (task) {
        const date = new Date(currentTasks[task].completeDate).setHours(0, 0, 0, 0,);
        const now = new Date().setHours(0, 0, 0, 0);
        if (states.todoView === 1) {
          if (parseInt(states.filterState) === parseInt(currentTasks[task].priority) && currentTasks[task].status === "GLOBAL_LIST" && parseInt(states.filterState) !== 0) {
            rawCategories.push(currentTasks[task].categoryId);
          } else if (parseInt(states.filterState) === 0 && currentTasks[task].status === "GLOBAL_LIST") {
            rawCategories.push(currentTasks[task].categoryId);
          }
        }

        if (parseInt(states.todoView) === 2) {
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
      debugger
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
    this.model.setState(state);
    this.view.setActiveClass(state)
  }

  getState() {
    return this.model.getState();
  }

  removeModeOn() {
    this.view.removeModeOn();
  }

  removeModeOff() {
    this.view.removeModeOff();
  }

  removeMode() {

    if (!document.querySelector(".task--delete")) {
      EventBus.emit("removeModeOn");
    } else if (document.querySelector(".task--delete")) {
      if (document.querySelector(".task--delete-checked")) {

        EventBus.emit("openRemoveModal");
      } else EventBus.emit("removeModeOff");
    }
  }

  showAddYourFirstTasks() {
    this.view.showAddYourFirstTasks();
  }

  showTaskAdded() {
    this.view.showTaskAdded();
  }

  showExcellentAllDaily() {
    this.view.showExcellentAllDaily();
  }

  showYouDoNotHaveAnyTasks() {
    this.view.showYouDoNotHaveAnyTasks();
  }
  hideAllMessages(){
    this.view.hideAllMessages();
  }
  showGlobalList(){
    this.view.showGlobalList()
  }


}

export const
  task_collection_controller = new Task_collection_controller(new Task_collection_model(), new Task_collection_view());
