require('./reports.less');
import template from "./reports.handlebars";
import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';

Exporting(Highcharts);

export class Reports_view {
  constructor() {
    this.reportsTemplate = template;
  }

  init() {
    document.querySelector("body").insertAdjacentHTML("beforeend", this.reportsTemplate());
  }

  setActiveClass([type, value]) {
    document.querySelector(` .tab__link--active[data-${type}]`).classList.remove("tab__link--active");
    document.querySelector(`[data-${type}="${value}"`).classList.add("tab__link--active");
  }

  renderGraph({data, legend,type}) {
    let grouping = false;
    let stacking = null;

    if(legend.length === 7){
      grouping = true;
      stacking = "normal";
    }
    else if(legend.length >7){
      grouping = false;
      stacking = "normal";
    }
    Highcharts.setOptions({
      colors: ['#f75c4c', '#ffa837', '#fddc43', '#1abc9c', '#8da5b8']
    });
    Highcharts.chart('graph', {
      chart: {
        type: "column",
        backgroundColor: '#2a3f50',
      },
      title: {
        text: null,
      },
      plotOptions: {
        column: {
          grouping: grouping,
          stacking: stacking,

        },
        series: {
          borderWidth: 0,
          stickyTracking: true
        }
      },
      yAxis: {
        lineColor: 'white',
        lineWidth: 1,
        gridLineColor: '#8da5b8',
        gridLineWidth: 1,
        labels: {
          style: {
            color: 'white',
            textTransform: 'uppercase',
          }
        },
        title: {
          enabled: false,
        }
      },
      xAxis: {
        minPadding: 0.05,
        maxPadding: 0.05,
        categories: legend,
        tickWidth: 0,
        labels: {
          style: {
            color: 'white',
            textTransform: 'uppercase',
          }
        },
      },
      credits: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      legend: {
        itemStyle: {
          color: '#8da5b8',
          textTransform: 'capitalize',
        },
        symbolRadius: 0,
        margin: 49
      },
      tooltip: {
        headerFormat: `<b class="tooltip--reports">{series.name}</b><br/>`,
        pointFormat: `<b class="highcharts-tooltip">${type} : {point.y}</b><br>`,
        borderWidth: 0,
        useHTML: true,
        followTouchMove: true,
        followPointer: true,
      },
      series: data
    })
  }
}
