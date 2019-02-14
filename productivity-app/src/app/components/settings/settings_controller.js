import {Settings_view} from "./settings_view";
import {Settings_model} from "./settings_model";

export class Settings_controller{
  constructor(model,view){
    this.model = model;
    this.view = view;
  }
  init(){
this.view.init();
function SettingsItem(options){
  this.settingsElem = document.getElementById(`${options.settingsElem}`).parentElement;
  this.settingsStep = options.settingsStep;
  this.settingsMin = options.settingsMin;
  this.settingsMax = options.settingsMax;
  this.settingsValue = options.settingsValue;
  const settingsInput = this.settingsElem.querySelector('.number__input');
  const settingsUp = this.settingsElem.querySelector(".number__step--up");
  const settingsDown = this.settingsElem.querySelector(".number__step--down");

this.setValues = function(options){
    this.settingsElem = document.getElementById(`${options.settingsElem}`).parentElement;
    this.settingsStep = options.settingsStep;
    this.settingsMin = options.settingsMin;
    this.settingsMax = options.settingsMax;
    this.settingsValue = options.settingsValue;
  }

  this.settingsElem.onclick = function(event) {
    if (event.target.classList.contains('number__step--down')) {
      settingsItemDecrease();
      graph.drawGraph();
    } else if (event.target.classList.contains('number__step--up')) {
      settingsItemIncrease();
      graph.drawGraph();
    }
  };

  this.settingsElem.onmousedown = function() {
    return false;
  };
  function stepUp(){
    this.settingsValue += this.settingsStep;
    settingsInput.value = this.settingsValue;
  }
  function stepDown(){
    this.settingsValue -= this.settingsStep;
    settingsInput.value = this.settingsValue;
  }
  this.getValue = function(){
    return this.settingsValue;
  };
  function settingsItemDecrease() {
    if (parseInt(settingsInput.value) > this.settingsMin){
      settingsUp.removeAttribute("disabled");
      settingsUp.classList.remove("number__step--disabled");
      stepDown();
    }
    if(parseInt(settingsInput.value) === this.settingsMin) {
      settingsDown.setAttribute("disabled", "");
      settingsDown.classList.add("number__step--disabled");
    }
  }

  function settingsItemIncrease() {
    if (parseInt(settingsInput.value) < this.settingsMax){
      settingsDown.removeAttribute("disabled");
      settingsDown.classList.remove("number__step--disabled");
      stepUp();
    }
    if(parseInt(settingsInput.value) === this.settingsMax) {
      settingsUp.setAttribute("disabled", "");
      settingsUp.classList.add("number__step--disabled");
    }
  }
}

    this.workTime = new SettingsItem(this.model.settingsData.workTime);
    this.workIteration = new SettingsItem(this.model.settingsData.workIteration);
    this.shortBreak = new SettingsItem(this.model.settingsData.shortBreak);
    this.longBreak = new SettingsItem(this.model.settingsData.longBreak);

function Graph(){
  var progressFragment = document.createDocumentFragment();
  var progressBar = document.querySelector(".settings-pomodoro__progress-bar");
  var progress = document.createElement("div");
  progress.classList.add("progress__graph");

  function createProgressPart() {
    for (var i = 0; i < this.workIteration.getValue(); i++) {
      var workTimeHTML = document.createElement("div");
      workTimeHTML.classList.add("progress__work-time");
      workTimeHTML.style.width = calcPercentage(this.workTime.getValue() );
      progress.appendChild(workTimeHTML);
      if (i < this.workIteration.getValue() - 1) {
        var shortBreakHTML = document.createElement("div");
        shortBreakHTML.style.width = calcPercentage(this.shortBreak.getValue());
        shortBreakHTML.classList.add("progress__short-break");
        progress.appendChild(shortBreakHTML);
      }
    }
  }

  function createProgress() {
    while (progress.firstChild) {
      progress.removeChild(progress.firstChild);
    }
    createTopScale();
    createProgressPart();
    var longBreakHTML = document.createElement("div");
    longBreakHTML.classList.add("progress__long-break");
    longBreakHTML.style.width = calcPercentage(this.longBreak.getValue());
    progress.appendChild(longBreakHTML);
    createProgressPart();
    progressFragment.appendChild(progress);
    createBottomScale();
    while (progressBar.firstChild) {
      progressBar.removeChild(progressBar.firstChild);
    }
    progressBar.appendChild(progressFragment);
  }

  function createTopScale() {
    var topScale = document.createElement("div");
    topScale.classList.add("progress__top-scale");
    var startPoint = document.createElement("div");
    startPoint.classList.add("progress__start-point");
    startPoint.style.width = "0px";
    startPoint.textContent = "0m";
    topScale.appendChild(startPoint);
    var middlePoint = document.createElement("div");
    middlePoint.classList.add("progress__middle-point");
    var middlePointValue = document.createElement("span");
    middlePointValue.classList.add("progress__middle-point-value");
    middlePointValue.textContent = "First cycle: " + minToHours(getFirstCycle());
    middlePoint.style.width = calcPercentage(getFirstCycle());
    middlePoint.appendChild(middlePointValue);
    topScale.appendChild(middlePoint);
    var endPoint = document.createElement("div");
    endPoint.classList.add("progress__end-point");
    endPoint.textContent = minToHours(getFullCycle());
    topScale.appendChild(endPoint);
    progressFragment.appendChild(topScale);
  }

  function createBottomScale() {
    var bottomScale = document.createElement("div");
    bottomScale.classList.add("progress__bottom-scale");
    for (var i = 30; i < getFullCycle(); i += 30) {
      var bottomScaleItem = document.createElement("div");
      var bottomScaleValue = document.createElement("span");
      bottomScaleValue.textContent = minToHours(i);
      bottomScaleValue.classList.add("progress__bottom-scale-value");
      bottomScaleItem.classList.add("progress__bottom-scale-item");
      bottomScaleItem.style.width = calcPercentage(30);
      bottomScaleItem.appendChild(bottomScaleValue);
      bottomScale.appendChild(bottomScaleItem);
    }
    progressFragment.appendChild(bottomScale);
  }

  function getFullCycle() {

    return ((this.workTime.getValue() + this.shortBreak.getValue()) * this.workIteration.getValue())* 2 - 2 * this.shortBreak.getValue() + this.longBreak.getValue();
  }
  this.getFirstCycle = function(){
    console.log(this);
    return (this.workTime.getValue() + this.shortBreak.getValue()) * this.workIteration.getValue() - this.shortBreak.getValue() + this.longBreak.getValue();
  }

  function minToHours(data) {
    var minutes = data % 60;
    var hours = (data - minutes) / 60;
    if (hours === 0) {
      return minutes.toFixed(0) + "m";
    }
    if (minutes === 0) {
      return hours + "h" ;
    }

    return hours + "h" + " " + minutes.toFixed(0) + "m";
  }
  function calcPercentage(number) {
    return ((number / getFullCycle()) * 100) + "%";
  }
  this.drawGraph = function(){
    createProgress();
  }
}


    this.graph = new Graph();
this.graph.drawGraph();

  }
  showCategories(){
    this.view.showCategories();
  }
}

export const settings_controller = new Settings_controller(new Settings_model(), new Settings_view());



