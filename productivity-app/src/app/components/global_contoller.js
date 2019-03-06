import {Global_model} from "./global_model";
import {Global_view} from "./global_view";
import {EventBus} from "../eventBus";

class Global_controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }
  init(){
    this.view.addEventListeners();
  }
}
export const global_controller = new Global_controller(new Global_view(), new Global_model());
global_controller.init();

