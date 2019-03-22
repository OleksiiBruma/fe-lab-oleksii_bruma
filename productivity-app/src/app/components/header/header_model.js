export class Header_model {
  constructor() {
    this.typeHeader = {
      full: {
        addButton: true,
      },
      basic: {
        addButton: false,
        tabs: [
          { class: 'list', id: 'tasklist', text: 'Go to Task list' },
          { class: 'statistics', id: 'reports', text: 'Go to reports' },
          { class: 'settings', id: 'settings', text: 'Go to Settings' },
        ],
      },
    };
    this.typeHeader.full.tabs = this.typeHeader.basic.tabs;
  }
}
