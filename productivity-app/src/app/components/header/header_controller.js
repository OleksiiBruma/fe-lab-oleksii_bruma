import {Header_view} from "./header_view";
import {Header_model} from "./header_model";
export class Header_controller{
  constructor(model,view){
    this.model = model;
    this.view = view;
  }
  init(){
    this.view.init();
  }
  listenForSticky(){
    this.view.listenForSticky()
  }
  openTrashCount(){
    this.view.openTrashCount()
  }
  closeTrashCount(){
    this.view.closeTrashCount()
  }
  updateTrashCount(amount){
    this.view.updateTrashCount(amount)
  }
  isChecked(){
    this.view.isChecked();
  }
}

export const header_controller = new Header_controller(new Header_model(), new Header_view());




