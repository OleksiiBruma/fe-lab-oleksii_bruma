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
        this.rawData.urgent += 1;
        break;
      case 2:
        this.rawData.high += 1;
        break;
      case 3:
        this.rawData.medium += 1;
        break;
      case 4:
        this.rawData.low += 1;
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

  getAllPreparedTasksbyTasks(tasks) {
    const preparedData = [];
    this.clearRawData();
    Object.keys(tasks).forEach((task) => {
      const completedDate = new Date(tasks[task].completeDate).setHours(0, 0, 0, 0);
      this.rawData.date = completedDate;
      if (tasks[task].failedPomodoros && tasks[task].failedPomodoros.length >= tasks[task].completedCount.length) {
        this.rawData.failed += 1;
      } else {
        this.setRawDataPriorityTasks(tasks[task].priority);
      }
      preparedData.push(this.rawData);
      this.clearRawData();
    });
    return preparedData;
  }

  getPreparedAllTasksByPomodoros(tasks) {
    const preparedData = [];
    this.clearRawData();
    Object.keys(tasks).forEach((task) => {
      this.rawData.date = new Date(tasks[task].completeDate).setHours(0, 0, 0, 0);
      this.rawData.failed = tasks[task].completedCount.length;
      this.setRawDataPriorityPomodoro([tasks[task].priority, tasks, task]);
      preparedData.push(this.rawData);
      this.clearRawData();
    });

    return preparedData;
  }

  prepareTasksDay(tasks, today) {
    this.clearRawData();
    const readyData = [];
    const preparedTasks = this.getAllPreparedTasksbyTasks(tasks);
    preparedTasks.filter(task => task.date === today).forEach((task) => {
      this.rawData.date = task.date;
      this.rawData.urgent += task.urgent;
      this.rawData.high += task.high;
      this.rawData.medium += task.medium;
      this.rawData.low += task.low;
      this.rawData.failed += task.failed;
    });
    readyData.push(this.rawData);

    return readyData;
  }

  preparePomodorosDay(tasks, today) {
    this.clearRawData();
    const readyData = [];
    const preparedTasks = this.getPreparedAllTasksByPomodoros(tasks);
    preparedTasks.filter(task => task.date === today).forEach((task) => {
      this.rawData.date = task.date;
      this.rawData.urgent += task.urgent;
      this.rawData.high += task.high;
      this.rawData.medium += task.medium;
      this.rawData.low += task.low;
      this.rawData.failed += task.failed;
    });
    readyData.push(this.rawData);

    return readyData;
  }

  prepareTasksWeek(currentDay, today, tasks) {
    this.clearRawData();
    const readyData = [];
    const preparedTasks = this.getAllPreparedTasksbyTasks(tasks);
    for (currentDay; currentDay <= today; currentDay = new Date(currentDay).setDate(new Date(currentDay).getDate() + 1)) {
      const currentTask = {
        date: currentDay,
        urgent: 0,
        high: 0,
        medium: 0,
        low: 0,
        failed: 0
      };
      preparedTasks.filter(task => task.date === currentDay).forEach((task) => {
        currentTask.urgent += task.urgent;
        currentTask.high += task.high;
        currentTask.medium += task.medium;
        currentTask.low += task.low;
        currentTask.failed += task.failed;

      });

      readyData.push(currentTask);
    }

    return readyData;
  }

  preparePomodorosWeek(currentDay, today, tasks) {
    this.clearRawData();
    const readyData = [];
    const preparedTasks = this.getPreparedAllTasksByPomodoros(tasks);
    for (currentDay; currentDay <= today; currentDay = new Date(currentDay).setDate(new Date(currentDay).getDate() + 1)) {
      const currentTask = {
        date: currentDay,
        urgent: 0,
        high: 0,
        medium: 0,
        low: 0,
        failed: 0,
      };
      preparedTasks.filter(task => task.date === currentDay).forEach((task) => {
        currentTask.urgent += task.urgent;
        currentTask.high += task.high;
        currentTask.medium += task.medium;
        currentTask.low += task.low;
        currentTask.failed += task.failed;
      });
      readyData.push(currentTask);
    }
    return readyData;
  }

  prepareTasksMonth(currentDayMonth, today, tasks) {
    this.clearRawData();
    const readyData = [];
    const preparedTasks = this.getAllPreparedTasksbyTasks(tasks);
    for (currentDayMonth; currentDayMonth <= today; currentDayMonth = new Date(currentDayMonth).setDate(new Date(currentDayMonth).getDate() + 1)) {
      const currentTask = {
        date: currentDayMonth,
        urgent: 0,
        high: 0,
        medium: 0,
        low: 0,
        failed: 0,
      };
      preparedTasks.filter(task => task.date === currentDayMonth).forEach((task) => {
        currentTask.urgent += task.urgent;
        currentTask.high += task.high;
        currentTask.medium += task.medium;
        currentTask.low += task.low;
        currentTask.failed += task.failed;
      });
      readyData.push(currentTask);
    }
    return readyData;
  }

  preparePomodorosMonth(currentDayMonth, today, tasks) {
    this.clearRawData();
    const readyData = [];
    const preparedTasks = this.getPreparedAllTasksByPomodoros(tasks);
    for (currentDayMonth; currentDayMonth <= today; currentDayMonth = new Date(currentDayMonth).setDate(new Date(currentDayMonth).getDate() + 1)) {
      const currentTask = {
        date: currentDayMonth,
        urgent: 0,
        high: 0,
        medium: 0,
        low: 0,
        failed: 0,
      };
      preparedTasks.filter(task => task.date === currentDayMonth).forEach((task) => {
        currentTask.urgent += task.urgent;
        currentTask.high += task.high;
        currentTask.medium += task.medium;
        currentTask.low += task.low;
        currentTask.failed += task.failed;
      });
      readyData.push(currentTask);
    }
    return readyData;
  }

  prepareData([type, time, tasks]) {
    const today = new Date().setHours(0, 0, 0, 0);
    const weekAgo = new Date(today).setDate(new Date(today).getDate() - 6);
    const monthAgo = new Date(today).setDate(new Date(today).getDate() - 30);
    const currentDay = new Date(weekAgo).setHours(0, 0, 0, 0);
    const currentDayMonth = new Date(monthAgo).setHours(0, 0, 0, 0);
    if (type === 'tasks' && time === 'day') {
      return this.prepareTasksDay(tasks, today);
    }
    if (type === 'pomodoros' && time === 'day') {
      return this.preparePomodorosDay(tasks, today);
    }
    if (type === 'tasks' && time === 'week') {
      return this.prepareTasksWeek(currentDay, today, tasks);
    }
    if (type === 'pomodoros' && time === 'week') {
      return this.preparePomodorosWeek(currentDay, today, tasks);
    }
    if (type === 'tasks' && time === 'month') {
      return this.prepareTasksMonth(currentDayMonth, today, tasks);
    }
    if (type === 'pomodoros' && time === 'month') {
      return this.preparePomodorosMonth(currentDayMonth, today, tasks);
    }
  }
}

export const reports_controller = new Reports_controller(new Reports_model(), new Reports_view());
