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
}

export const header_controller = new Header_controller(new Header_model(), new Header_view());




