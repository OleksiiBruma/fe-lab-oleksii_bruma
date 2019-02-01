export const EventBus = {
  handlers: [],
  emit: function (eventName) {
    this.handlers.filter(function (handler) {
      return handler.eventName === eventName;
    }).forEach(function (handler) {
      handler.handlerFn();
    });
  },
  subscribe: function (eventName, handlerFn) {
    this.handlers.push(
      {'eventName': eventName, 'handlerFn': handlerFn}
    )
  }
};







