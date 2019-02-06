import {Pop_up_view} from "./pop_up_view";
import {Pop_up_model} from "./pop_up_model";

export class Pop_up_controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  renderAdd() {
    this.view.renderAdd();
  }

  renderEdit() {
    this.view.renderEdit();
  }
  setTaskToBeEdited(id){
    this.model.setTaskToBeEdited(id);
  }
  getTaskToBeEdited(){
    return this.model.getTaskToBeEdited();
  }

  renderRemove() {
    this.view.renderRemove();
  }

  closeSelf() {
    this.view.closeSelf();
  }

  getScannedProperties(){
    return this.view.scanProperties()
  }

  setNewTaskData() {
    const newTaskRawData = this.getScannedProperties();
    newTaskRawData.id = +new Date();
    newTaskRawData.status = "GLOBAL_LIST";
    newTaskRawData.createDate = new Date();
    newTaskRawData.completeDate = false;
    newTaskRawData.failedPomodoros = [];
    newTaskRawData.completedCount = false;
    this.model.setNewTaskData(newTaskRawData);
    this.closeSelf();
  }

  getNewTaskData() {
    return this.model.getNewTaskData();
  }
}

export const pop_up_controller = new Pop_up_controller(new Pop_up_view(), new Pop_up_model());
