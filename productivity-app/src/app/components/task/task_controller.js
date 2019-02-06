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
  renderTasks(state){
    let allTasks = this.getTasks();
    let view = this.view;
    Object.keys(allTasks).forEach(function (task) {
      let category = allTasks[task].categoryId;
      let date = new Date(allTasks[task].completeDate).setHours(0,0,0,0,);
      let now = new Date().setHours(0,0,0,0);
      if(state.todoView){
        if(allTasks[task].status === "GLOBAL_LIST" && +allTasks[task].priority === +state.filterState){
          view.renderTaskGlobal(allTasks[task], category);
        }
        if(allTasks[task].status === "GLOBAL_LIST" && +state.filterState === 0){
          view.renderTaskGlobal(allTasks[task], category);
        }
        if(allTasks[task].status=== "DAILY_LIST"){
          view.renderTaskDaily(allTasks[task])
        }
      }
      if(!state.todoView){

        if(allTasks[task].status === "COMPLETED" && +allTasks[task].priority === +state.filterState && date !== now  ){
          view.renderTaskGlobal(allTasks[task], category);

        }
        if(allTasks[task].status === "COMPLETED" && +state.filterState === 0 && date !== now ){
          view.renderTaskGlobal(allTasks[task], category);

        }
        if(allTasks[task].status === "COMPLETED"  && date === now ){
          view.renderTaskDaily(allTasks[task]);

        }
      }


    });
  }
  globalToDaily(id){
    let allTasks = this.model.getTasks();
    Object.keys(allTasks).forEach(function(task){
      if(allTasks[task].id === +id) {
        EventBus.emit("updateStatus", [task,{status: "DAILY_LIST"}]);
      }
    })

  }
}

export const task_controller = new Task_controller(new Task_model(), new Task_view());
