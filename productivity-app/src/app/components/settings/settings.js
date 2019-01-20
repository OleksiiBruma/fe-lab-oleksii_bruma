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


function updateNumberInputes() {
  settingsItems.forEach(function (item) {
    document.querySelector("#" + item.id).value = item.value;
  })
}

updateNumberInputes();


var settingsList = document.querySelector(".settings-pomodoro__list");

function getProgressValue(e) {
  settingsItems.forEach(function(item){
    if(e.target.parentElement.children[1].id === item.id ){
      if(e.target.classList.contains("number__step--up") && +e.target.parentElement.children[1].value < item.max ){
        e.target.parentElement.children[0].removeAttribute("disabled");
        e.target.parentElement.children[0].classList.remove("number__step--disabled");
        item.value += item.step;
        updateNumberInputes();
        if(+e.target.parentElement.children[1].value === item.max ){
          e.target.parentElement.children[2].setAttribute("disabled","")
          e.target.parentElement.children[2].classList.add("number__step--disabled")
        }}


      else if (e.target.classList.contains("number__step--down") && e.target.parentElement.children[1].value > item.min ){
        e.target.parentElement.children[2].removeAttribute("disabled");
        e.target.parentElement.children[2].classList.remove("number__step--disabled");
        item.value -= item.step;
        updateNumberInputes();
        if(+e.target.parentElement.children[1].value === item.min ){
          e.target.parentElement.children[0].setAttribute("disabled","")
          e.target.parentElement.children[0].classList.add("number__step--disabled")
        }
      }
    }});

  }


settingsList.addEventListener("click", getProgressValue);



