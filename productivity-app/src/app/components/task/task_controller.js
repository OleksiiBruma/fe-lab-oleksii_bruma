import {Task_view} from "./task_view";
import {Task_model} from "./task_model";
import {EventBus} from "../../eventBus";

export class Task_controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  setTasks(data) {
    this.model.setTasks(data);
  }

  getTasks() {
    return this.model.getTasks();
  }
  countStatusTasks(){
    const allTasks = this.getTasks();
    if(!allTasks) return;
    const now = new Date().setHours(0, 0, 0, 0);
    const countedTasks = {
      global:0,
      daily:0,
      completed:0,
      completedToday:0
    };
    Object.keys(allTasks).forEach(function (task) {
      const date = new Date(allTasks[task].completeDate).setHours(0, 0, 0, 0,);
      if (allTasks[task].status === "GLOBAL_LIST") {
        countedTasks.global++
      }
      if (allTasks[task].status === "DAILY_LIST") {
        countedTasks.daily++
      }
      if (allTasks[task].status === "COMPLETED" && date!==now){
        countedTasks.completed++
      }
      if (allTasks[task].status === "COMPLETED" && date===now){
        countedTasks.completedToday++
      }
    });
    return countedTasks}

  renderTasks(state) {
    const allTasks = this.getTasks();
    if(sessionStorage.length === 0){
      sessionStorage.setItem('newUser', 'false');
      EventBus.emit("firstVisit");
      return
    }
    EventBus.emit("renderTaskList");
    EventBus.emit("renderLists");
    EventBus.emit("hideAllMessages");
    EventBus.emit("showGlobalList");
    const countedTasks = this.countStatusTasks();
    if(!countedTasks){
      EventBus.emit("addYourFirstTask");
    }
    else if(countedTasks.global && !countedTasks.daily && !countedTasks.completedToday){
      EventBus.emit("taskAdded")
    }

    if(!allTasks) return;
    const view = this.view;
    const now = new Date().setHours(0, 0, 0, 0);
    Object.keys(allTasks).forEach(function (task) {
      const category = allTasks[task].categoryId;

      const date = new Date(allTasks[task].completeDate).setHours(0, 0, 0, 0,);

      if (state.todoView === 1) {
        if(!countedTasks.global && !countedTasks.daily && countedTasks.completed ){
          EventBus.emit("youDoNotHaveAnyTasks")
        }
        if(countedTasks.global && !countedTasks.daily && countedTasks.completedToday){
          EventBus.emit("excellentAllDaily")
        }

        if (allTasks[task].status === "GLOBAL_LIST" && parseInt(allTasks[task].priority) === parseInt(state.filterState)) {
          view.renderTaskGlobal(allTasks[task], category);
        }
        if (allTasks[task].status === "GLOBAL_LIST" && parseInt(state.filterState) === 0) {
          view.renderTaskGlobal(allTasks[task], category);
        }
        if (allTasks[task].status === "DAILY_LIST") {
          view.renderTaskDaily(allTasks[task])
        }

      }
      if (state.todoView === 2) {
        if (allTasks[task].status === "COMPLETED" && parseInt(allTasks[task].priority) === parseInt(state.filterState) && date !== now) {
          view.renderTaskGlobal(allTasks[task], category);
        }
        if (allTasks[task].status === "COMPLETED" && parseInt(state.filterState) === 0 && date !== now) {
          view.renderTaskGlobal(allTasks[task], category);
        }
        if (allTasks[task].status === "COMPLETED" && date === now) {
          view.renderTaskDaily(allTasks[task]);

        }
      }
    });
  }

  changeState([id,statusName]) {
    const allTasks = this.model.getTasks();
    Object.keys(allTasks).forEach(function (task) {
      if (allTasks[task].id === parseInt(id)) {
        EventBus.emit("updateStatus", [task, {status: statusName}]);
      }
    })
  }

  removeModeOn() {
    this.view.removeModeOn();
  }

  removeModeOff() {
    this.view.removeModeOff();
  }

  toggleSelectedTask(task) {
    task.classList.toggle("task--delete-checked");
    EventBus.emit("isChecked");
  }

  selectAll(list) {
    this.view.selectAll(list);
    EventBus.emit("isChecked");
  }

  deselectAll(list) {
    this.view.deselectAll(list);
    EventBus.emit("isChecked");
  }

  removeTasks() {
    [].forEach.call(document.querySelectorAll(".task--delete-checked"), (task) => {
      EventBus.emit("deleteTask", parseInt(task.dataset.id))
    })
  }
}

export const task_controller = new Task_controller(new Task_model(), new Task_view());
