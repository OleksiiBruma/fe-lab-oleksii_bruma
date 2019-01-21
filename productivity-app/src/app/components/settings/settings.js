require('./settings.less');

var settingsItems = [
  {
    name: "workTime",
    min: 15,
    max: 25,
    value: 25,
    step: 5,
    id: "work-time"
  },
  {
    name: "workIteration",
    min: 2,
    max: 5,
    value: 3,
    step: 1,
    id: "work-iteration"
  },
  {
    name: "shortBreak",
    min: 3,
    max: 5,
    value: 4,
    step: 1,
    id: "short-break"
  },
  {
    name: "longBreak",
    min: 15,
    max: 30,
    value: 20,
    step: 5,
    id: "long-break"
  }];


var progressFragment = document.createDocumentFragment();
var settingsList = document.querySelector(".settings-pomodoro__list");
var progressBar = document.querySelector(".settings-pomodoro__progress-bar");
var progress = document.createElement("div");
progress.classList.add("progress__graph");

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

function createProgress() {
  while (progress.firstChild) {
    progress.removeChild(progress.firstChild);
  }
  createTopScale();
  createProgressPart();
  var longBreak = document.createElement("div");
  longBreak.classList.add("progress__long-break");
  longBreak.style.width = calcPercentage(settingsItems[3].value);
  progress.appendChild(longBreak);
  createProgressPart();
  progressFragment.appendChild(progress);
  createBottomScale();
  while (progressBar.firstChild) {
    progressBar.removeChild(progressBar.firstChild);
  }
  progressBar.appendChild(progressFragment);
}

function createProgressPart() {
  for (var i = 0; i < settingsItems[1].value; i++) {
    var workTime = document.createElement("div");
    workTime.classList.add("progress__work-time");
    workTime.style.width = calcPercentage(settingsItems[0].value);
    progress.appendChild(workTime);
    if (i < settingsItems[1].value - 1) {
      var shortBreak = document.createElement("div");
      shortBreak.style.width = calcPercentage(settingsItems[2].value);
      shortBreak.classList.add("progress__short-break");
      progress.appendChild(shortBreak);
    }
  }
}

function calcPercentage(number) {
  return ((number / getFullCycle()) * 100).toFixed(2) + "%";

}

function getFullCycle() {
  return ((settingsItems[0].value + settingsItems[2].value) * settingsItems[1].value)* 2 - 2 * settingsItems[2].value + settingsItems[3].value;
}
function getFirstCycle() {
  return (settingsItems[0].value + settingsItems[2].value) * settingsItems[1].value - settingsItems[2].value + settingsItems[3].value;
}

function minToHours(data) {
  var minutes = data % 60;
  var hours = (data - minutes) / 60;
  if (hours === 0) {
    return minutes.toFixed(0) + "m";
  }

  return hours + "h" + " " + minutes.toFixed(0) + "m";
}

function updateNumberInputes() {
  settingsItems.forEach(function (item) {
    document.querySelector("#" + item.id).value = item.value;
  })
}

function getProgressValue(e) {
  settingsItems.forEach(function (item) {
    if (e.target.parentElement.children[1].id === item.id) {
      if (e.target.classList.contains("number__step--up") && +e.target.parentElement.children[1].value < item.max) {
        e.target.parentElement.children[0].removeAttribute("disabled");
        e.target.parentElement.children[0].classList.remove("number__step--disabled");
        item.value += item.step;
        updateNumberInputes();
        createProgress();
        if (+e.target.parentElement.children[1].value === item.max) {
          e.target.parentElement.children[2].setAttribute("disabled", "");
          e.target.parentElement.children[2].classList.add("number__step--disabled")
        }
      } else if (e.target.classList.contains("number__step--down") && e.target.parentElement.children[1].value > item.min) {
        e.target.parentElement.children[2].removeAttribute("disabled");
        e.target.parentElement.children[2].classList.remove("number__step--disabled");
        item.value -= item.step;
        updateNumberInputes();
        createProgress();
        if (+e.target.parentElement.children[1].value === item.min) {
          e.target.parentElement.children[0].setAttribute("disabled", "");
          e.target.parentElement.children[0].classList.add("number__step--disabled")
        }
      }
    }
  });
}


createProgress();
updateNumberInputes();
settingsList.addEventListener("click", getProgressValue);



