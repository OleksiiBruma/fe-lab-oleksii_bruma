import {Header_view} from "./header_view";
import {Header_model} from "./header_model";

export class Header_controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  initBasic(id) {
    this.view.init(this.model.typeHeader.basic);
    this.view.addActiveClass(id);
  }

  initFull(id) {
    this.view.init(this.model.typeHeader.full);
    this.view.addActiveClass(id);
  }


  listenForSticky() {
    this.view.listenForSticky()
  }

  openTrashCount() {
    this.view.openTrashCount()
  }

  closeTrashCount() {
    this.view.closeTrashCount()
  }

  updateTrashCount(amount) {
    this.view.updateTrashCount(amount)
  }

  isChecked() {
    this.view.isChecked();
  }
}

export const header_controller = new Header_controller(new Header_model(), new Header_view());




