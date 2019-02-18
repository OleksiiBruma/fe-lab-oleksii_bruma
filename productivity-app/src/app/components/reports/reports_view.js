require('./reports.less');
import template from "./reports.handlebars";
import graph from "./reportsTable.handlebars";

export class Reports_view {
  constructor() {
    this.reportsTemplate = template;
    this.graph = graph;
  }

  init() {
    document.querySelector("body").insertAdjacentHTML("beforeend", this.reportsTemplate());
  }

  setActiveClass([type, value]) {
    document.querySelector(` .tab__link--active[data-${type}]`).classList.remove("tab__link--active");
    document.querySelector(`[data-${type}="${value}"`).classList.add("tab__link--active");
  }

  renderGraph(data) {
    document.querySelector(".report__graph").insertAdjacentHTML("beforeend", this.graph(data));
  }

}
