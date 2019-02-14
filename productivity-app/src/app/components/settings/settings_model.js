export class Settings_model {
  constructor(){
    this.settingsData = {
      workTime: {
        settingsElem: 'work-time',
        settingsStep: 5,
        settingsMin: 15,
        settingsMax: 25,
        settingsValue: 25,
      },
      workIteration: {
        settingsElem: 'work-iteration',
        settingsStep: 1,
        settingsMin: 2,
        settingsMax: 5,
        settingsValue: 5
      },
      shortBreak: {
        settingsElem: 'short-break',
        settingsStep: 1,
        settingsMin: 3,
        settingsMax: 5,
        settingsValue: 5
      },
      longBreak:{
        settingsElem: 'long-break',
        settingsStep: 5,
        settingsMin: 15,
        settingsMax: 30,
        settingsValue: 30
      }
    };
  }
}
