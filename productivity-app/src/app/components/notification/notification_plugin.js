import $ from 'jquery';
import template from './notification.hbs';

(function ($) {
  $.fn.notification = function (options) {
    const settings = {
      showTime: 6000,
      text: '',
      type: 'error',
    };
    $.extend(settings, options);
    this.append(template(settings));
    const message = $('.notification__wrapper');
    const closeButton = $('.notification__close-button');
    if (options === 'clean') {
      message.remove();
      return;
    }
    closeButton.click(() => message.remove());
    message.fadeIn('slow');
    if (settings.type !== 'error') {
      setTimeout(() => {
        message.fadeOut('slow', () => message.remove());
      }, settings.showTime);
    }
  };
}($));
