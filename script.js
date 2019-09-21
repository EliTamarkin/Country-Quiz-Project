const nav = document.querySelector(".nav-bar");
const welcome_block = document.querySelector(".welcome");
const first_title = document.querySelector(".first-title-before");
let timesClicked = 0;

nav.addEventListener("mouseover", mouseOnNav);
nav.addEventListener("mouseout", mouseNotOnNav);
first_title.addEventListener("click", titlesChange);

function mouseOnNav() {
    welcome_block.classList.add("welcome-fixed");
    welcome_block.innerHTML = "Welcome!";
    console.log(welcome_block);
}

function mouseNotOnNav() {
    welcome_block.classList.remove("welcome-fixed");
    welcome_block.innerHTML = "";
    console.log(welcome_block);
}

function titlesChange(e) {
    if (timesClicked == 0) {
        first_title.innerHTML = "";
        first_title.classList.add("first-title-after");
        first_title.innerHTML = "The Future";
        let second_title = document.createElement("h2");
        document.querySelector(".lower-container").appendChild(second_title);
        setTimeout(() => {
            second_title.classList.add("second-title");
            second_title.innerHTML = "Is Here";
        }, 1500);
    }
    timesClicked++;
}