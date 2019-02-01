import {Pop_up_view} from "./pop_up_view";
import {Pop_up_model} from "./pop_up_model";

export class Pop_up_controller {
  constructor(view,model){
    this.view = view;
    this.model = model;
  }
  renderAdd(){
    this.view.renderAdd();
  }
  renderEdit(){
    this.view.renderEdit();
  }
  renderRemove(){
    this.view.renderRemove();
  }
  closeSelf(){
    this.view.closeSelf();
  }
  setNewTaskData(){
    const newTaskRawData = this.view.scanProperties();
    newTaskRawData.id = +new Date();
    newTaskRawData.status = "GLOBAL_LIST";
    newTaskRawData.createDate = new Date();
    this.model.setNewTaskData(newTaskRawData);
  }
  getNewTaskData(){
   return this.model.getNewTaskData();
  }
}

export const pop_up_controller = new Pop_up_controller(new Pop_up_view(), new Pop_up_model());
