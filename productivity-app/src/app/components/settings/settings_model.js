import {EventBus} from "../../eventBus";

export class Settings_model {
  constructor() {
    this.settingsData = null;
  }

  init() {
    EventBus.emit("getNewSettings")
  }


  setSettingsData(newSettingsData) {
    if (!newSettingsData) {
      this.settingsData = {
        longBreak: {
          settingsElem: 'long-break',
          settingsStep: 5,
          settingsMin: 15,
          settingsMax: 30,
          settingsValue: 30
        },
        shortBreak: {
          settingsElem: 'short-break',
          settingsStep: 1,
          settingsMin: 3,
          settingsMax: 5,
          settingsValue: 5
        },
        workIteration: {
          settingsElem: 'work-iteration',
          settingsStep: 1,
          settingsMin: 2,
          settingsMax: 5,
          settingsValue: 5
        },
        workTime: {
          settingsElem: 'work-time',
          settingsStep: 5,
          settingsMin: 15,
          settingsMax: 25,
          settingsValue: 25,
        },
      };
      return
    }
    this.settingsData = newSettingsData;

  }

  getSettingsData() {
    return this.settingsData;
  }
}
