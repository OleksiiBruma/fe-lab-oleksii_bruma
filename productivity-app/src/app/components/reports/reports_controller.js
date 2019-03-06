import {Reports_view} from './reports_view';
import {Reports_model} from './reports_model';
import {EventBus} from '../../eventBus';

export class Reports_controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  init(tasks) {
    this.view.init();
    let props = location.pathname;
    props = props.split('/');
    const type = props[3];
    const time = props[2];
    const statistics = this.prepareData([type,
      time,
      tasks]);
    this.setState(['reports__time', time]);
    this.setState(['reports__type', type]);
    this.view.renderGraph(statistics);
  }

  setState(arg) {
    this.model.setState(arg);
    EventBus.emit('reportsNavigate', [this.model.getState().reports__time, this.model.getState().reports__type]);
    this.view.setActiveClass(arg);
  }

  getState() {
    return this.model.getState();
  }

  clearRawData() {
    this.rawData = {
      date: null,
      urgent: 0,
      high: 0,
      medium: 0,
      low: 0,
      failed: 0,
    };
  }

  setRawDataPriorityTasks(priority) {
    switch (priority) {
      case 1:
        this.rawData.urgent++;
        break;
      case 2:
        this.rawData.high++;
        break;
      case 3:
        this.rawData.medium++;
        break;
      case 4:
        this.rawData.low++;
        break;
    }
  }

  setRawDataPriorityPomodoro([priority, tasks, task]) {
    switch (priority) {
      case 1:
        this.rawData.urgent = Number(tasks[task].completedCount.length);
        break;
      case 2:
        this.rawData.high = Number(tasks[task].completedCount.length);
        break;
      case 3:
        this.rawData.medium = Number(tasks[task].completedCount.length);
        break;
      case 4:
        this.rawData.low = Number(tasks[task].completedCount.length);
        break;
    }
  }

  prepareTasksDay(tasks, today, preparedData) {
    this.clearRawData();
    Object.keys(tasks).forEach((task) => {
      if (tasks[task].completeDate) {
        if (new Date(tasks[task].completeDate).setHours(0, 0, 0, 0) === today) {
          this.rawData.date = new Date();
          if (tasks[task].failedPomodoros && tasks[task].failedPomodoros.length >= tasks[task].completedCount.length) this.rawData.failed++;
          else {
            this.setRawDataPriorityTasks(tasks[task].priority);
          }
        }
      }
    });
    if (this.rawData.date !== null) {
      preparedData.push(this.rawData);
    }
    return preparedData;
  }

  preparePomodorosDay(tasks, today, preparedData) {
    this.clearRawData();
    Object.keys(tasks).forEach((task) => {
      if (tasks[task].completeDate) {
        if (new Date(tasks[task].completeDate).setHours(0, 0, 0, 0) === today) {
          this.rawData.date = new Date();
          if (tasks[task].failedPomodoros && tasks[task].failedPomodoros.length >= tasks[task].completedCount.length) this.rawData.failed = Number(tasks[task].failedPomodoros.length);
          else {
            this.setRawDataPriorityPomodoro([tasks[task].priority,
              tasks,
              task]);
          }
        }
      }
    });
    if (this.rawData.date !== null) {
      preparedData.push(this.rawData);
    }
    return preparedData;
  }

  prepareTasksWeek(currentDay, today, tasks, preparedData) {
    this.clearRawData();
    for (currentDay; currentDay < today; currentDay = new Date(currentDay).setDate(new Date(currentDay).getDate() + 1)) {
      Object.keys(tasks).forEach((task) => {
        const completedDate = new Date(tasks[task].completeDate).setHours(0, 0, 0, 0);
        if (completedDate === currentDay) {
          this.rawData.date = completedDate;
          if (tasks[task].failedPomodoros && tasks[task].failedPomodoros.length >= tasks[task].completedCount.length) this.rawData.failed++;
          else {
            this.setRawDataPriorityTasks(tasks[task].priority);
          }
          preparedData.push(this.rawData);
          this.clearRawData();
        }
      });
    }
    return preparedData;
  }

  preparePomodorosWeek(currentDay, today, tasks, preparedData) {
    this.clearRawData();
    for (currentDay; currentDay < today; currentDay = new Date(currentDay).setDate(new Date(currentDay).getDate() + 1)) {
      Object.keys(tasks).forEach((task) => {
        const completedDate = new Date(tasks[task].completeDate).setHours(0, 0, 0, 0);
        if (completedDate === currentDay) {
          this.rawData.date = completedDate;
          if (tasks[task].failedPomodoros && tasks[task].failedPomodoros.length >= tasks[task].completedCount.length) this.rawData.failed = Number(tasks[task].failedPomodoros.length);
          else {
            this.setRawDataPriorityPomodoro([tasks[task].priority,
              tasks,
              task]);
          }
          preparedData.push(this.rawData);
          this.clearRawData();
        }
      });
    }
    return preparedData;
  }

  prepareTasksMonth(currentDayMonth, today, tasks, preparedData) {
    this.clearRawData();
    for (currentDayMonth; currentDayMonth < today; currentDayMonth = new Date(currentDayMonth).setDate(new Date(currentDayMonth).getDate() + 1)) {
      Object.keys(tasks).forEach((task) => {
        const completedDate = new Date(tasks[task].completeDate).setHours(0, 0, 0, 0);
        if (completedDate === currentDayMonth) {
          this.rawData.date = completedDate;
          if (tasks[task].failedPomodoros && tasks[task].failedPomodoros.length >= tasks[task].completedCount.length) this.rawData.failed++;
          else {
            this.setRawDataPriorityTasks(tasks[task].priority);
          }
          preparedData.push(this.rawData);
          this.clearRawData();
        }
      });
    }
    return preparedData;
  }

  preparePomororosMonth(currentDayMonth, tasks, preparedData, today) {
    this.clearRawData();
    for (currentDayMonth; currentDayMonth < today; currentDayMonth = new Date(currentDayMonth).setDate(new Date(currentDayMonth).getDate() + 1)) {
      Object.keys(tasks).forEach((task) => {
        const completedDate = new Date(tasks[task].completeDate).setHours(0, 0, 0, 0);
        if (completedDate === currentDayMonth) {
          this.rawData.date = completedDate;
          if (tasks[task].failedPomodoros && tasks[task].failedPomodoros.length >= tasks[task].completedCount.length) this.rawData.failed = Number(tasks[task].failedPomodoros.length);
          else {
            this.setRawDataPriorityPomodoro([tasks[task].priority,
              tasks,
              task]);
          }
          preparedData.push(this.rawData);
          this.clearRawData();
        }
      });
    }
    return preparedData;
  }

  prepareData([type,time,tasks]) {
    const preparedData = [];
    const today = new Date().setHours(0, 0, 0, 0);
    const weekAgo = new Date(today).setDate(new Date(today).getDate() - 7);
    const monthAgo = new Date(today).setDate(new Date(today).getDate() - 30);
    const currentDay = new Date(weekAgo).setHours(0, 0, 0, 0);
    const currentDayMonth = new Date(monthAgo).setHours(0, 0, 0, 0);
    if (type === 'tasks' && time === 'day') {
      return this.prepareTasksDay(tasks, today, preparedData);
    }
    if (type === 'pomodoros' && time === 'day') {
      return this.preparePomodorosDay(tasks, today, preparedData);
    }
    if (type === 'tasks' && time === 'week') {
      return this.prepareTasksWeek(currentDay, today, tasks, preparedData);
    }
    if (type === 'pomodoros' && time === 'week') {
      return this.preparePomodorosWeek(currentDay, today, tasks, preparedData);
    }
    if (type === 'tasks' && time === 'month') {
      return this.prepareTasksMonth(currentDayMonth, today, tasks, preparedData);
    }
    if (type === 'pomodoros' && time === 'month') {
      return this.preparePomororosMonth(currentDayMonth, tasks, preparedData, today);
    }
  }
}

export const reports_controller = new Reports_controller(new Reports_model(), new Reports_view());
