import {EventBus} from '../../eventBus';
import template from './header.hbs';
import header from './header.less';

export class Header_view {
  constructor() {
    this.headerTemplate = template;
    this.makeHeaderSticky = this.makeHeaderSticky.bind(this);
    this.debounce = this.debounce.bind(this);
  }

  init(context) {
    document.querySelector('body').innerHTML = this.headerTemplate(context);
  }

  addActiveClass(id) {
    document.querySelector(`[data-id="${id}"]`).classList.add('menu__link--active');
  }

  debounce(func, wait, immediate) {
    let timeout;
    return function () {
      let context = this, args = arguments;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      let callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  makeHeaderSticky() {
    this.debounce(function () {

      const page = document.querySelector('.page');
      const headerHTML = document.querySelector('.header');
      const distance = headerHTML.offsetTop + 140 - window.pageYOffset;
      const offset = window.pageYOffset;
      const headerItem = headerHTML.querySelector('.header__item');
      const headerLogo = headerHTML.querySelector('.header__logo');
      const addTask = headerHTML.querySelector('.page__add-button--header');
      if (distance <= 0) {
        if (addTask) {
          addTask.classList.remove('hidden');
        }
        headerHTML.classList.remove('header--no-sticky');
        page.classList.remove('page--no-sticky');
        headerItem.classList.remove('header__item--no-sticky');

        headerLogo.classList.remove('header__logo--no-sticky');
      } else if (offset <= headerHTML.offsetTop + 140) {
        if (addTask) {
          addTask.classList.add('hidden');
        }
        headerHTML.classList.add('header--no-sticky');
        page.classList.add('page--no-sticky');
        headerItem.classList.add('header__item--no-sticky');
        headerLogo.classList.add('header__logo--no-sticky');
      }
    }, 250)();
  }

  listenForSticky() {
    window.addEventListener('scroll', this.makeHeaderSticky);
  }

  openTrashCount() {
    document.querySelector('.trash__count').classList.add('trash__count--remove-mode');
  }

  closeTrashCount() {
    document.querySelector('.trash__count').classList.remove('trash__count--remove-mode');
  }

  updateTrashCount(amount) {
    document.querySelector('.trash__count').textContent = amount;
  }

  isChecked() {
    if (document.querySelectorAll('.task--delete-checked').length) {
      EventBus.emit('openTrashCount');
      EventBus.emit('updateTrashCount', document.querySelectorAll('.task--delete-checked').length);
    } else EventBus.emit('closeTrashCount');
  }
}
