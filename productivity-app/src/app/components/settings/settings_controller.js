import { Settings_view } from './settings_view';
import { Settings_model } from './settings_model';
import { EventBus } from '../../eventBus';

export class Settings_controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  initModel() {
    this.model.init();
  }

  init(typeOfSettings) {
    this.view.init(this.model.getSettingsData());
    if (!typeOfSettings) {
      this.showCategories();
    }

    function SettingsItem(options) {
      this.settingsElem = document.getElementById(`${options.settingsElem}`).parentElement;
      this.settingsStep = options.settingsStep;
      this.settingsMin = options.settingsMin;
      this.settingsMax = options.settingsMax;
      this.settingsValue = options.settingsValue;
      const settingsInput = this.settingsElem.querySelector('.number__input');
      const settingsUp = this.settingsElem.querySelector('.number__step--up');
      const settingsDown = this.settingsElem.querySelector('.number__step--down');

      this.setValues = function (options) {
        this.settingsElem = document.getElementById(`${options.settingsElem}`).parentElement;
        this.settingsStep = options.settingsStep;
        this.settingsMin = options.settingsMin;
        this.settingsMax = options.settingsMax;
        this.settingsValue = options.settingsValue;
      };

      this.settingsElem.onclick = function (event) {
        if (event.target.classList.contains('number__step--down')) {
          this.settingsItemDecrease();
          EventBus.emit('drawGraph');
        } else if (event.target.classList.contains('number__step--up')) {
          this.settingsItemIncrease();
          EventBus.emit('drawGraph');
        }
      }.bind(this);

      this.settingsElem.onmousedown = function () {
        return false;
      };

      this.stepUp = function () {
        this.settingsValue += this.settingsStep;
        settingsInput.value = this.settingsValue;
      };

      this.stepDown = function () {
        this.settingsValue -= this.settingsStep;
        settingsInput.value = this.settingsValue;
      };

      this.getValue = function () {
        return this.settingsValue;
      };

      this.settingsItemDecrease = function () {
        if (parseInt(settingsInput.value) > this.settingsMin) {
          settingsUp.removeAttribute('disabled');
          settingsUp.classList.remove('number__step--disabled');
          this.stepDown();
        }
        if (parseInt(settingsInput.value) === this.settingsMin) {
          settingsDown.setAttribute('disabled', '');
          settingsDown.classList.add('number__step--disabled');
        }
      };

      this.settingsItemIncrease = function () {
        if (parseInt(settingsInput.value) < this.settingsMax) {
          settingsDown.removeAttribute('disabled');
          settingsDown.classList.remove('number__step--disabled');
          this.stepUp();
        }
        if (parseInt(settingsInput.value) === this.settingsMax) {
          settingsUp.setAttribute('disabled', '');
          settingsUp.classList.add('number__step--disabled');
        }
      };
    }

    this.workTime = new SettingsItem(this.model.settingsData.workTime);
    this.workIteration = new SettingsItem(this.model.settingsData.workIteration);
    this.shortBreak = new SettingsItem(this.model.settingsData.shortBreak);
    this.longBreak = new SettingsItem(this.model.settingsData.longBreak);

    function Graph(wT, wI, sB, lB) {
      this.workTime = wT;
      this.workIteration = wI;
      this.shortBreak = sB;
      this.longBreak = lB;
      this.progressFragment = document.createDocumentFragment();
      this.progressBar = document.querySelector('.settings-pomodoro__progress-bar');
      this.progress = document.createElement('div');
      this.progress.classList.add('progress__graph');

      this.createProgressPart = function () {
        for (let i = 0; i < this.workIteration.getValue(); i++) {
          const workTimeHTML = document.createElement('div');
          workTimeHTML.classList.add('progress__work-time');
          workTimeHTML.style.width = this.calcPercentage(this.workTime.getValue());
          this.progress.appendChild(workTimeHTML);
          if (i < this.workIteration.getValue() - 1) {
            const shortBreakHTML = document.createElement('div');
            shortBreakHTML.style.width = this.calcPercentage(this.shortBreak.getValue());
            shortBreakHTML.classList.add('progress__short-break');
            this.progress.appendChild(shortBreakHTML);
          }
        }
      };
      this.createProgress = function () {
        while (this.progress.firstChild) {
          this.progress.removeChild(this.progress.firstChild);
        }
        this.createTopScale();
        this.createProgressPart();
        const longBreakHTML = document.createElement('div');
        longBreakHTML.classList.add('progress__long-break');
        longBreakHTML.style.width = this.calcPercentage(this.longBreak.getValue());
        this.progress.appendChild(longBreakHTML);
        this.createProgressPart();
        this.progressFragment.appendChild(this.progress);
        this.createBottomScale();
        while (this.progressBar.firstChild) {
          this.progressBar.removeChild(this.progressBar.firstChild);
        }
        this.progressBar.appendChild(this.progressFragment);
      };

      this.getFirstCycle = function () {
        return (this.workTime.getValue()
          + this.shortBreak.getValue()) * this.workIteration.getValue()
          - this.shortBreak.getValue() + this.longBreak.getValue();
      };

      this.createTopScale = function () {
        const topScale = document.createElement('div');
        const startPoint = document.createElement('div');
        const middlePoint = document.createElement('div');
        const middlePointValue = document.createElement('span');
        const endPoint = document.createElement('div');
        topScale.classList.add('progress__top-scale');
        startPoint.classList.add('progress__start-point');
        startPoint.style.width = '0px';
        startPoint.textContent = '0m';
        topScale.appendChild(startPoint);
        middlePoint.classList.add('progress__middle-point');
        middlePointValue.classList.add('progress__middle-point-value');
        middlePointValue.textContent = `First cycle: ${this.minToHours(this.getFirstCycle())}`;
        middlePoint.style.width = this.calcPercentage(this.getFirstCycle());
        middlePoint.appendChild(middlePointValue);
        topScale.appendChild(middlePoint);
        endPoint.classList.add('progress__end-point');
        endPoint.textContent = this.minToHours(this.getFullCycle());
        topScale.appendChild(endPoint);
        this.progressFragment.appendChild(topScale);
      };

      this.createBottomScale = function () {
        const bottomScale = document.createElement('div');
        bottomScale.classList.add('progress__bottom-scale');
        const halfOfAnHour = 30;
        for (let i = halfOfAnHour; i < this.getFullCycle(); i += halfOfAnHour) {
          const bottomScaleItem = document.createElement('div');
          const bottomScaleValue = document.createElement('span');
          bottomScaleValue.textContent = this.minToHours(i);
          bottomScaleValue.classList.add('progress__bottom-scale-value');
          bottomScaleItem.classList.add('progress__bottom-scale-item');
          bottomScaleItem.style.width = this.calcPercentage(halfOfAnHour);
          bottomScaleItem.appendChild(bottomScaleValue);
          bottomScale.appendChild(bottomScaleItem);
        }
        this.progressFragment.appendChild(bottomScale);
      };

      this.getFullCycle = function () {
        return ((this.workTime.getValue()
          + this.shortBreak.getValue()) * this.workIteration.getValue())
          * 2 - 2 * this.shortBreak.getValue() + this.longBreak.getValue();
      };


      this.minToHours = function (data) {
        const minutesInHour = 60;
        const minutes = data % minutesInHour;
        const hours = (data - minutes) / minutesInHour;
        if (hours === 0) {
          return `${minutes.toFixed(0)}m`;
        }
        if (minutes === 0) {
          return `${hours}h`;
        }
        return `${hours}h` + ` ${minutes.toFixed(0)}m`;
      };
      this.calcPercentage = function (number) {
        return `${(number / this.getFullCycle()) * 100}%`;
      };
    }

    this.graph = new Graph(this.workTime, this.workIteration, this.shortBreak, this.longBreak);
  }

  showCategories() {
    this.view.showCategories();
  }

  drawGraph() {
    this.graph.createProgress();
  }

  getNewSettingsData() {
    if (!this.view.getNewSettingsData()) {
      return;
    }
    return this.view.getNewSettingsData();
  }

  setNewSettingsData(newData) {
    this.model.setSettingsData(newData);
  }

  getSettingsData() {
    return this.model.getSettingsData();
  }
}

export const settings_controller = new Settings_controller(new Settings_model(), new Settings_view());
