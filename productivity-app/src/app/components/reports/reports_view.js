require('./reports.less');
import template from "./reports.handlebars";

export class Reports_view {
  constructor(){
    this.reportsTemplate = template();
  }
  init(){
    document.querySelector("body").insertAdjacentHTML("beforeend", this.reportsTemplate);
  }
}
