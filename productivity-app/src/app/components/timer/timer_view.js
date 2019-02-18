require('./timer.less');
import template from "./timerInit.handlebars";
import timerStart from "./timerStart.handlebars";
import timerBreak from "./timerBreakFail.handlebars";
import timerBreakSuccess from "./timerBrakeSuccess.handlebars";
import timerTaskCompleted from "./timerTaskCompleted.handlebars";
import pomodoros from "./timerPomodoros.handlebars";
import pomodorosPlus from "./pomodorosPlus.handlebars";

export class Timer_view {
  constructor() {
    this.timerTemplate = template;
    this.timerStart = timerStart;
    this.timerBreak = timerBreak;
    this.timerBreakSuccess = timerBreakSuccess;
    this.timerTaskCompleted = timerTaskCompleted;
    this.pomodoros = pomodoros;
    this.pomodorosPlus = pomodorosPlus;
  }

  init(model) {
    document.querySelector("body").insertAdjacentHTML("beforeend", this.timerTemplate(model.activeTask));
    this.updatePomodoros(model)
  }

  startTimer(activeTask, settingsData) {
    document.querySelector("body").innerHTML = this.timerStart({
      activeTask,
      settingsData
    });
    this.updatePomodoros(activeTask);
  }

  updatePomodoros(model) {
    document.querySelector(".timer__estimates").innerHTML = this.pomodoros(model);
  }

  addButton() {
    document.querySelector(".timer__estimates").insertAdjacentHTML("beforeend", this.pomodorosPlus());
  }

  breakTimer(activeTask, settingsData) {
    document.querySelector("body").innerHTML = this.timerBreak({
      activeTask,
      settingsData
    });
    this.updatePomodoros(activeTask);
  }

  breakSuccessTimer(activeTask, settingsData) {
    document.querySelector("body").innerHTML = this.timerBreakSuccess({activeTask, settingsData});
    this.updatePomodoros(activeTask);
  }

  taskCompleted(activeTask, settingsData) {
    document.querySelector("body").insertAdjacentHTML("beforeend", this.timerTaskCompleted({activeTask, settingsData}));
    this.updatePomodoros(activeTask);
  }
}
