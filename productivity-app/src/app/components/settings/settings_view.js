require('./settings.less');
import template from "./settings.handlebars";

export class Settings_view {
  constructor(){
    this.settingsTemplate = template();
  }
  init(){
    if( document.querySelector(".settings-pomodoro")){
      return
    }
    document.querySelector("body").insertAdjacentHTML("beforeend", this.settingsTemplate);
    document.querySelector(".settings-category").classList.add("hidden");
    document.querySelector(".settings-pomodoro").classList.remove("hidden");
    document.querySelector("[data-id=pomodoros]").classList.add("tab__link--active");
    document.querySelector("[data-id=category]").classList.remove("tab__link--active");
  }
  showCategories(){
    document.querySelector(".settings-category").classList.remove("hidden");
    document.querySelector(".settings-pomodoro").classList.add("hidden");
    document.querySelector("[data-id=pomodoros]").classList.remove("tab__link--active");
    document.querySelector("[data-id=category]").classList.add("tab__link--active");
  }
}
