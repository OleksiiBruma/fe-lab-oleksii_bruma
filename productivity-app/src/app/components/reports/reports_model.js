export class Reports_model {
  constructor() {
    this.state = {
      reports__type: "tasks",
      reports__time: "day",
    };
    this.reportData = [];
  }

  getState() {
    return this.state;
  }

  setState([stateType, value]) {
    this.state[stateType] = value;
  }

  setReportData(data) {
    this.reportData = data;
  }
}
