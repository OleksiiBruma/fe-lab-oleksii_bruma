require('./header.less');
import template from "./header.handlebars";

export class Header_view {
  constructor(){
    this.headerTemplate = template();

  }

  init(){
    document.querySelector("body").innerHTML = this.headerTemplate;
  }
;
   makeHeaderSticky(e) {
     this.page = document.querySelector(".page");
     this.headerHTML = document.querySelector(".header");
    const distance = this.headerHTML.offsetTop+140 - window.pageYOffset;
    const offset = window.pageYOffset;
     this.headerItem = this.headerHTML.querySelector(".header__item");
     this.headerLogo = this.headerHTML.querySelector(".header__logo");
    if ( distance <= 0) {
      this.headerHTML.classList.remove("header--no-sticky");
      this.page.classList.remove("page--no-sticky");
      this.headerItem.classList.remove("header__item--no-sticky");
      this.headerLogo.classList.remove("header__logo--no-sticky");
    } else if (offset <= this.headerHTML.offsetTop+140){
      this.headerHTML.classList.add("header--no-sticky");
      this.page.classList.add("page--no-sticky");
      this.headerItem.classList.add("header__item--no-sticky");
      this.headerLogo.classList.add("header__logo--no-sticky");
    }
  }
  listenForSticky(){
    window.addEventListener("scroll",this.makeHeaderSticky);
  }
}


