import { EventBus } from '../../eventBus';

export class Timer_model {
  controller() {
    this.activeTask = null;
  }

  setActiveTask(activeTask) {
    this.activeTask = activeTask;
    this.estimation = this.activeTask.estimation;
    this.currentPomodoro = 0;
    this.completedCount = [];
    this.failedPomodoros = [];
  }

  increaseEstimation() {
    this.estimation++;
  }

  failPomodoro() {
    this.currentPomodoro++;
    this.failedPomodoros.push(this.currentPomodoro);
  }

  finishPomodoro() {
    this.currentPomodoro++;
    this.completedCount.push(this.currentPomodoro);
  }

  taskCompleted() {
    this.estimation = this.completedCount.length + this.failedPomodoros.length;
    this.activeTask.completedCount = this.completedCount;
    this.activeTask.failedPomodoros = this.failedPomodoros;
    this.activeTask.status = 'COMPLETED';
    this.activeTask.completeDate = new Date();
    EventBus.emit('completedTaskReady');
  }

  getCompletedTask() {
    return this.activeTask;
  }


  getActiveTask() {
    return {
      activeTask: this.activeTask,
      estimation: this.estimation,
      currentPomodoro: this.currentPomodoro,
      completedCount: this.completedCount,
      failedPomodoros: this.failedPomodoros,
    };
  }
}
