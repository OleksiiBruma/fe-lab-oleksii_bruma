require('./settings.less');
import template from "./settings.handlebars";

export class Settings_view {
  constructor(){
    this.settingsTemplate = template();
  }
  init(){
    document.querySelector("body").insertAdjacentHTML("beforeend", this.settingsTemplate);
  }
}
