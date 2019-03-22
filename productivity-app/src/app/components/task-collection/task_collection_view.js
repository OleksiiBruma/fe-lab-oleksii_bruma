import { EventBus } from '../../eventBus.js';
import template from './task_collection.handlebars';
import globalListTemplate from './task_collection_globalList.handlebars';
import globalRemove from './task_collection_globalRemove.handlebars';

require('./task_collection.less');

export class Task_collection_view {
  constructor() {
    this.task_collectionTemplate = template();
    this.globalListTemplate = globalListTemplate;
    this.globalRemove = globalRemove;
  }

  init() {
    if (document.querySelector('.daily')) {
      return;
    }
    document.querySelector('body').insertAdjacentHTML('beforeend', this.task_collectionTemplate);
  }

  firstVisit() {
    document.querySelector('.stub--first-visit').classList.remove('hidden');
    document.querySelector('.daily').classList.add('hidden');
    document.querySelector('.global').classList.add('hidden');
  }

  toggleGlobalList() {
    document.querySelector('.open-button__icon').classList.toggle('open-button__icon--active');
    document.querySelector('.global__filter').classList.toggle('global__filter--active');
    document.querySelector('.global__tasks').classList.toggle('global__tasks--active');
  }

  globalListRender(categories) {
    document.querySelector('.global__tasks').innerHTML = this.globalListTemplate(categories);
  }

  dailyListRender() {
    document.querySelector('.daily__nav').classList.remove('daily__nav--remove-mode');
    document.querySelector('.daily__remove').classList.remove('tab--remove-mode');
    document.querySelector('.daily__tasks-list').innerHTML = '';
  }

  removeModeOn() {
    document.querySelector('.global__tasks').insertAdjacentHTML('afterbegin', this.globalRemove());
    document.querySelector('.daily__nav').classList.add('daily__nav--remove-mode');
    document.querySelector('.daily__remove').classList.add('tab--remove-mode');
  }

  removeModeOff() {
    document.querySelector('.global__remove').remove();
    document.querySelector('.daily__nav').classList.remove('daily__nav--remove-mode');
    document.querySelector('.daily__remove').classList.remove('tab--remove-mode');
  }

  setActiveClass(args) {
    document.querySelector(` .tab__link--active[data-${args[0]}]`).classList.remove('tab__link--active');
    document.querySelector(`[data-${args[0]}="${args[1]}"`).classList.add('tab__link--active');
  }

  showAddYourFirstTasks() {
    document.querySelector('.stub--add-your-first-task').classList.remove('hidden');
    document.querySelector('.daily').classList.add('hidden');
    document.querySelector('.global').classList.add('hidden');
  }

  showTaskAdded() {
    document.querySelector('.daily__message--task-added').classList.remove('hidden');
  }

  showExcellentAllDaily() {
    document.querySelector('.daily__message--excellent').classList.remove('hidden');
  }

  showYouDoNotHaveAnyTasks() {
    document.querySelector('.page__stub--dont-have-any-tasks').classList.remove('hidden');
    document.querySelector('.global').classList.add('hidden');
  }

  hideAllMessages() {
    document.querySelector('.page__stub--dont-have-any-tasks').classList.add('hidden');
    document.querySelector('.daily__message--excellent').classList.add('hidden');
    document.querySelector('.daily__message--task-added').classList.add('hidden');
    document.querySelector('.stub--add-your-first-task').classList.add('hidden');
  }

  showGlobalList() {
    document.querySelector('.global').classList.remove('hidden');
  }
}
