import $ from 'jquery';
import {Router} from '../router';
import {EventBus} from '../eventBus';
import {notification} from './notification/notification_plugin';

export class Global_view {
  constructor() {
  }

  addEventListeners() {
    function chooseTarget(e) {
      if (e.target.dataset.id === 'tasklist') {
        e.preventDefault();
        Router.navigate('');
      } else if (e.target.dataset.id === 'reports') {
        e.preventDefault();
        Router.navigate('/reports/day/tasks');
      } else if (e.target.dataset.id === 'settings') {
        e.preventDefault();
        Router.navigate('/settings\/pomodoros/');
      } else if (e.target.dataset.id === 'tasklistfirsttime') {
        e.preventDefault();
        EventBus.emit('goToTaskList');
      } else if (e.target.classList.contains('task__indicator')) {
        e.preventDefault();
        if (e.target.parentElement.classList.contains('task--done')) {
          $('main').notification({type: 'info', text: 'The task has already been done'});
          return;
        }
        if (e.target.parentElement.parentElement.classList.contains('daily__tasks-list')) {
          EventBus.emit('writeActiveState', e.target.parentElement.dataset.id);
          Router.navigate('/timer/');
          return;
        }
        $('main').notification({type: 'info', text: 'Please drag the task to the daily list'});
      } else if (e.target.classList.contains('page__add-button')) {
        e.preventDefault();
        EventBus.emit('addNewTask');
      } else if (e.target.classList.contains('modal__close')) {
        e.preventDefault();
        EventBus.emit('closeModal');
      } else if (e.target.classList.contains('modal__submit--add')) {
        e.preventDefault();
        EventBus.emit('submitNewTask');
      } else if (e.target.classList.contains('modal__submit--edit')) {
        e.preventDefault();
        EventBus.emit('submitEditedTask');
      } else if (e.target.dataset.id === 'globalbutton') {
        EventBus.emit('toggleGlobalList');
      } else if (e.target.classList.contains('task__shift')) {
        EventBus.emit('globalToDaily', [e.target.parentElement.parentElement.dataset.id, 'DAILY_LIST']);
      } else if (e.target.hasAttribute('data-filterState')) {
        e.preventDefault();
        EventBus.emit('setFilterStatus', ['filterState', e.target.dataset.filterstate]);
      } else if (e.target.hasAttribute('data-todoView')) {
        e.preventDefault();
        EventBus.emit('setFilterStatus', ['todoView', e.target.dataset.todoview]);
      } else if (e.target.classList.contains('task__edit')) {
        EventBus.emit('openEditModal', e.target.parentElement.parentElement.dataset.id);
      } else if (e.target.classList.contains('modal__submit--edit')) {
        EventBus.emit('submitEdit');
      } else if (e.target.dataset.id === 'trash') {
        e.preventDefault();
        EventBus.emit('RemoveMode');
      } else if (e.target.classList.contains('task__delete')) {
        EventBus.emit('toggleSelectedTask', e.target.parentElement.parentElement);
      } else if (e.target.classList.contains('select')) {
        e.preventDefault();
        EventBus.emit('selectAll', e.target);
      } else if (e.target.classList.contains('deselect')) {
        e.preventDefault();
        EventBus.emit('deselectAll', e.target);
      } else if (e.target.classList.contains('button--close')) {
        EventBus.emit('closeRemoveModal');
      } else if (e.target.classList.contains('button--remove')) {
        EventBus.emit('submitDeleteTask');
      } else if (e.target.dataset.id === 'pomodoros') {
        e.preventDefault();
        Router.navigate('/settings\/pomodoros/');
      } else if (e.target.dataset.id === 'category') {
        e.preventDefault();
        Router.navigate('/settings\/categories/');
      } else if (e.target.dataset.id === 'saveNewSettings') {
        e.preventDefault();
        EventBus.emit('writeNewSettings');
        Router.navigate('todoList');
      } else if (e.target.dataset.id === 'from-timer-to-tasklist') {
        e.preventDefault();
        EventBus.emit('changeStatusBackToDaily');
        EventBus.emit('cancelTimer');
        Router.navigate('todoList');
      } else if (e.target.dataset.id === 'start-timer') {
        e.preventDefault();
        EventBus.emit('startTimer');
      } else if (e.target.dataset.id === 'increase-pomodoro') {
        e.preventDefault();
        EventBus.emit('increasePomodoros');
      } else if (e.target.dataset.id === 'fail-pomodora') {
        e.preventDefault();
        EventBus.emit('failPomodoro');
      } else if (e.target.dataset.id === 'finish-pomodora') {
        e.preventDefault();
        EventBus.emit('finishPomodoro');
      } else if (e.target.dataset.id === 'complete-task') {
        e.preventDefault();
        EventBus.emit('taskCompleted');
      } else if (e.target.hasAttribute('data-reports__time')) {
        e.preventDefault();
        EventBus.emit('setReportsState', ['reports__time', e.target.dataset.reports__time]);
      } else if (e.target.hasAttribute('data-reports__type')) {
        e.preventDefault();
        EventBus.emit('setReportsState', ['reports__type', e.target.dataset.reports__type]);
      }
    }


    document.body.addEventListener('click', chooseTarget);
  }
}
