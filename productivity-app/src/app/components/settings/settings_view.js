require('./settings.less');
import template from "./settings.handlebars";

export class Settings_view {
  constructor() {
    this.settingsTemplate = template;
  }

  init(data) {
    if (document.querySelector(".settings-pomodoro")) {
      return
    }
    document.querySelector("body").insertAdjacentHTML("beforeend", this.settingsTemplate(data));
    document.querySelector(".settings-category").classList.add("hidden");
    document.querySelector(".settings-pomodoro").classList.remove("hidden");
    document.querySelector("[data-id=pomodoros]").classList.add("tab__link--active");
    document.querySelector("[data-id=category]").classList.remove("tab__link--active");
  }

  showCategories() {
    document.querySelector(".settings-category").classList.remove("hidden");
    document.querySelector(".settings-pomodoro").classList.add("hidden");
    document.querySelector("[data-id=pomodoros]").classList.remove("tab__link--active");
    document.querySelector("[data-id=category]").classList.add("tab__link--active");
  }

  getNewSettingsData() {
    const workTime = document.querySelector("#work-time");
    const workIteration = document.querySelector("#work-iteration");
    const shortBreak = document.querySelector("#short-break");
    const longBreak = document.querySelector("#long-break");
    if(!workTime||!workIteration||!shortBreak||!longBreak){
      return;
    }
    return {
      workTime: {
        settingsElem: "work-time",
        settingsStep: 5,
        settingsMin: parseInt(workTime.min),
        settingsMax: parseInt(workTime.max),
        settingsValue: parseInt(workTime.value),
      },
      workIteration: {
        settingsElem: 'work-iteration',
        settingsStep: 1,
        settingsMin: parseInt(workIteration.min),
        settingsMax: parseInt(workIteration.max),
        settingsValue: parseInt(workIteration.value),
      },
      shortBreak: {
        settingsElem: 'short-break',
        settingsStep: 1,
        settingsMin: parseInt(shortBreak.min),
        settingsMax: parseInt(shortBreak.max),
        settingsValue: parseInt(shortBreak.value),
      },
      longBreak: {
        settingsElem: 'long-break',
        settingsStep: 5,
        settingsMin: parseInt(longBreak.min),
        settingsMax: parseInt(longBreak.max),
        settingsValue: parseInt(longBreak.value),
      }
    };
  }

}
