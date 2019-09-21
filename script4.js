const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const ageInput = document.querySelector("#age");
const continentInput = document.querySelector("#continent");
const reviewInput = document.querySelector("#review");
const form = document.querySelector("form");
const allInputs = [nameInput, emailInput, ageInput, continentInput, reviewInput];
let errorFlag = true;


nameInput.addEventListener("input", () => {
    let notLettersRegex = /[0-9\W]/;
    if (nameInput.value == "") {
        nameInput.parentElement.lastElementChild.innerHTML = "Please fill in your name";
        nameInput.style.border = "2px solid red";
        errorFlag = true;
    } else if (notLettersRegex.test(nameInput.value)) {
        nameInput.parentElement.lastElementChild.innerHTML = "Please fill in a proper name";
        nameInput.style.border = "2px solid red";
        errorFlag = true;
    } else {
        nameInput.parentElement.lastElementChild.innerHTML = "";
        nameInput.style.border = "";
        errorFlag = false;
    }
})

emailInput.addEventListener("input", () => {
    let emailRegex = /@/;
    let emailEndingRegex = /.com$/;
    if (emailInput.value == "") {
        emailInput.parentElement.lastElementChild.innerHTML = "Please fill in your email";
        emailInput.style.border = "2px solid red";
        errorFlag = true;
    } else if (!emailRegex.test(emailInput.value) || !emailEndingRegex.test(emailInput.value)) {
        emailInput.parentElement.lastElementChild.innerHTML = "Please fill in a proper email";
        emailInput.style.border = "2px solid red";
        errorFlag = true;
    } else {
        emailInput.parentElement.lastElementChild.innerHTML = "";
        emailInput.style.border = "";
        errorFlag = false;
    }
})

ageInput.addEventListener("input", () => {
    console.log(ageInput.value.length);
    let notNumbersRegex = /\D/;
    if (notNumbersRegex.test(ageInput.value)) {
        ageInput.parentElement.lastElementChild.innerHTML = "Age must be numbers only";
        ageInput.style.border = "2px solid red";
        errorFlag = true;
    } else if (ageInput.value.length > 2) {
        ageInput.parentElement.lastElementChild.innerHTML = "Age must be 2 digits or less";
        ageInput.style.border = "2px solid red";
        errorFlag = true;
    } else {
        ageInput.parentElement.lastElementChild.innerHTML = "";
        ageInput.style.border = "";
        errorFlag = false;
    }
})

continentInput.addEventListener("input", () => {
    if (continentInput.value == "") {
        console.log(continentInput.value == "");
        continentInput.parentElement.lastElementChild.innerHTML = "Please choose your continent";
        continentInput.style.border = "2px solid red";
        errorFlag = true;
    } else if (continentInput.value == "Antarctica") {
        continentInput.parentElement.lastElementChild.innerHTML = "Please choose your real continent";
        continentInput.style.border = "2px solid red";
        errorFlag = true;
    } else {
        continentInput.parentElement.lastElementChild.innerHTML = "";
        continentInput.style.border = "";
        errorFlag = false;
    }
})

reviewInput.addEventListener("input", () => {
    if (reviewInput.value == "") {
        reviewInput.parentElement.lastElementChild.innerHTML = "Please fill in your review";
        reviewInput.style.border = "2px solid red";
        errorFlag = true;
    } else {
        reviewInput.parentElement.lastElementChild.innerHTML = "";
        reviewInput.style.border = "";
        errorFlag = false;
    }
})

form.addEventListener("submit", (e) => {
    for (let i = 0; i < allInputs.length; i++) {
        if (allInputs[i].parentElement.lastElementChild.innerHTML == "") {
            if (allInputs[i].name !== "age") {
                if (allInputs[i].value == "") {
                    e.preventDefault();
                    alert(`Please fill in the ${allInputs[i].name} input`);
                    break;
                }
            }
        } else {
            e.preventDefault();
            alert(allInputs[i].parentElement.lastElementChild.innerHTML);
            break;
        }
    }
});






































const nav = document.querySelector(".nav-bar");
const welcome_block = document.querySelector(".welcome");

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


nav.addEventListener("mouseover", mouseOnNav);
nav.addEventListener("mouseout", mouseNotOnNav);