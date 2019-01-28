require('./timer.less');
import template from "./timer.handlebars";

export class Timer_view {
  constructor(){
    this.timerTemplate = template();
  }
  init(){
    document.querySelector("body").insertAdjacentHTML("beforeend", this.timerTemplate);
  }
}
