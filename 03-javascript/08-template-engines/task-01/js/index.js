/**
 * Insert you task implementation here.
 */
var xmlhttp = new XMLHttpRequest();
var url = "./data/data.json";
var users;
xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        users = JSON.parse(this.responseText);
        console.log(users);

//header
        let headerSource = document.getElementById("header-template").innerHTML;
        let headerTemplate = Handlebars.compile(headerSource);
        let headerData = [{text: 'Handlebars', href: '#'}, {text: 'Dust', href: '#'}, {text: 'Lodash', href: '#'}]
        let headerHtml = headerTemplate(headerData);
        document.querySelector("header").innerHTML = headerHtml;
        let firstLink = document.querySelector(".navbar-nav>li:first-child");
        firstLink.classList.add("active");
//profile card
        let cardListSource = document.getElementById("user-template").innerHTML;
        let cardTemplate = Handlebars.compile(cardListSource);
        let cardHtml = cardTemplate(users);
        document.querySelector(".user-list").innerHTML = cardHtml;
//buttons
        let allButtonsNode = document.querySelectorAll("button");
        let allButtonsList = Array.from(allButtonsNode);
        allButtonsList.forEach(function (button) {
            button.addEventListener("click", fillModal)
        });
        function fillModal(e) {
            let userId =  e.target.getAttribute("id");
            users.forEach(function (user){
                if (user.employeeId ===userId){
                    let modalSource = document.getElementById("modal-template").innerHTML;
                    let modalTemplate = Handlebars.compile(modalSource);
                    let modalHtml = modalTemplate(user);
                    document.querySelector(".modal").innerHTML = modalHtml;
                }
            })

        }
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();


