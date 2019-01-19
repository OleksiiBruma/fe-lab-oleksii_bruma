require('./header.less');

var header = document.querySelector(".header");
var headerItem = header.querySelector(".header__item");
var headerLogo = header.querySelector(".header__logo");
var page = document.querySelector(".page");
var stickPoint = getDistance();

function getDistance() {
return header.offsetTop+140;
}

function makeHeaderSticky(e){
  var distance = getDistance() - window.pageYOffset;
  var offset = window.pageYOffset;
  if ( distance <= 0) {
    header.classList.remove("header--no-sticky");
    page.classList.remove("page--no-sticky");
    headerItem.classList.remove("header__item--no-sticky");
    headerLogo.classList.remove("header__logo--no-sticky");
  } else if (offset <= stickPoint){
    header.classList.add("header--no-sticky");
    page.classList.add("page--no-sticky");
    headerItem.classList.add("header__item--no-sticky");
    headerLogo.classList.add("header__logo--no-sticky");
  }
}

window.addEventListener("scroll",makeHeaderSticky);
