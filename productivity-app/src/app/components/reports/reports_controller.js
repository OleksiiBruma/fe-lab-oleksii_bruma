import {Reports_view} from "./reports_view";
import {Reports_model} from "./reports_model";

export class Reports_controller{
  constructor(model,view){
    this.model = model;
    this.view = view;
  }
  init(){
    this.view.init();
  }
}

export const reports_controller = new Reports_controller(new Reports_model(), new Reports_view());
