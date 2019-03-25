import template from './timerInit.hbs';
import timerStart from './timerStart.hbs';
import timerBreak from './timerBreakFail.hbs';
import timerBreakSuccess from './timerBrakeSuccess.hbs';
import timerTaskCompleted from './timerTaskCompleted.hbs';
import pomodoros from './timerPomodoros.hbs';
import pomodorosPlus from './pomodorosPlus.hbs';
import timerStyles from './timer.less';

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
    document.querySelector('body').insertAdjacentHTML('beforeend', this.timerTemplate(model.activeTask));
    this.updatePomodoros(model);
  }

  startTimer(activeTask, settingsData) {
    clearInterval(this.timer);
    document.querySelector('body').innerHTML = this.timerStart({
      activeTask,
      settingsData,
    });
    const finish = document.querySelector('[data-id = "finish-pomodora"');
    const circle = document.querySelector('.circle');
    circle.style.animationDuration = `${settingsData.workTime.settingsValue * 60}s`;
    let currentTime = settingsData.workTime.settingsValue - 1;

    this.timer = setInterval(() => {
      document.querySelector('.timer__time-number').innerText = currentTime;
      if (currentTime === 0) {
        clearInterval(this.timer);
      }
      currentTime -= 1;
    }, 60000);
    this.updatePomodoros(activeTask);
    circle.addEventListener('animationend', () => finish.click());
  }

  updatePomodoros(model) {
    document.querySelector('.timer__estimates').innerHTML = this.pomodoros(model);
  }

  addButton() {
    document.querySelector('.timer__estimates').insertAdjacentHTML('beforeend', this.pomodorosPlus());
  }

  breakTimer(activeTask, settingsData) {
    clearInterval(this.timer);
    document.querySelector('body').innerHTML = this.timerBreak({
      activeTask,
      settingsData,
    });
    const circle = document.querySelector('.circle');
    circle.style.animationDuration = `${settingsData.shortBreak.settingsValue * 60}s`;
    let currentBreakTime = settingsData.shortBreak.settingsValue - 1;
    this.timer = setInterval(() => {
      document.querySelector('.timer__time-number').innerText = currentBreakTime;
      if (currentBreakTime === 0) {
        clearInterval(this.timer);
        document.querySelector('.timer__message').innerHTML = '<span class="timer__time-basic timer__time-basic--brake-is-over">Break is over</span>';
      }
      currentBreakTime -= 1;
    }, 60000);
    this.updatePomodoros(activeTask);
  }

  breakSuccessTimer(activeTask, settingsData) {
    clearInterval(this.timer);
    document.querySelector('body').innerHTML = this.timerBreakSuccess({
      activeTask,
      settingsData,
    });
    const circle = document.querySelector('.circle');
    circle.style.animationDuration = `${settingsData.shortBreak.settingsValue * 60}s`;
    let currentBreakTime = settingsData.shortBreak.settingsValue - 1;
    this.timer = setInterval(() => {
      document.querySelector('.timer__time-number').innerText = currentBreakTime;
      if (currentBreakTime === 0) {
        clearInterval(this.timer);
        document.querySelector('.timer__message').innerHTML = '<span class="timer__time-basic timer__time-basic--brake-is-over">Break is over</span>';
      }
      currentBreakTime -= 1;
    }, 60000);
    this.updatePomodoros(activeTask);
  }

  taskCompleted(activeTask, settingsData) {
    clearInterval(this.timer);
    document.querySelector('body').insertAdjacentHTML('beforeend', this.timerTaskCompleted({
      activeTask,
      settingsData,
    }));
    const circle = document.querySelector('.circle');
    circle.style.animation = 'none';
    circle.style.strokeDashoffset = 0;
    this.updatePomodoros(activeTask);
  }
}
