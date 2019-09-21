const quizContainer = document.querySelector(".quiz-container");
const startQuiz = document.querySelector(".btn-dark");
const response = document.querySelector("#response-div");
let questionIndex = 1;
let numOfQuestions = 3;
let correctAnswersIndex = 0;
let resultsIconArr = [];

startQuiz.addEventListener("click", prepareQuizArea);
startQuiz.addEventListener("click", fetchQuizData);

function prepareQuizArea() {
    while (quizContainer.hasChildNodes()) {
        quizContainer.removeChild(quizContainer.lastChild);
    }
}

function makeRequest() {
    return new Promise((resolve, reject) => {
        var responseArr = [];
        let httpRequest = new XMLHttpRequest();
        httpRequest.responseType = "json";
        httpRequest.onload = function() {
            if (httpRequest.status == "200") {
                console.log(httpRequest.response);
                const responseLength = httpRequest.response.length;
                let randomIndex = Math.floor(Math.random() * responseLength);
                responseArr[0] = httpRequest.response[randomIndex].name;
                for (let i = 1; i < 5; i++) {
                    console.log(randomIndex);
                    httpRequest.response[randomIndex].capital == "" ? responseArr[i] = "No Capital" : responseArr[i] = httpRequest.response[randomIndex].capital;
                    randomIndex = Math.floor(Math.random() * responseLength);
                }
                resolve(responseArr);
            } else {
                reject("There was an error getting the information");
            }
        }
        httpRequest.open("GET", "http://restcountries.eu/rest/v2/all");
        httpRequest.send();
    });
}

async function fetchQuizData() {
    try {
        let responseArr = await makeRequest();
        let theCountry = responseArr.splice(0, 1);
        generateQuestion(theCountry);
        let copiedResponseArr = [...responseArr];
        let capitalCities = shuffle(copiedResponseArr);
        let capitalCitiesRadio = makeArrayInLabels(capitalCities);
        generateOptions(capitalCitiesRadio);
        const cityRadioButtons = document.querySelectorAll("[name=city]");
        cityRadioButtons.forEach(cityButton => {
            cityButton.addEventListener("click", () => {
                cityRadioButtons.forEach(cityButton => {
                    cityButton.parentElement.classList.toggle("active", cityButton.checked);
                })
            })

        })
        const mainButtonContainer = document.createElement("div");
        mainButtonContainer.classList.add("buttons-container-main");
        generateQuestionCounter(mainButtonContainer);
        generateButtons(responseArr, capitalCitiesRadio, mainButtonContainer);

    } catch (error) {
        alert(error);
    }
}

function shuffle(array) {
    let currentIndex = array.length
    let temporaryValue;
    let randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function makeArrayInLabels(arr) {
    return arr.map(city => {
        let label = document.createElement("label");
        label.classList.add("btn");
        label.classList.add("btn-primary");
        label.classList.add("option-button-design");
        let inputButton = document.createElement("input");
        inputButton.type = "radio";
        inputButton.name = "city";
        inputButton.value = city;
        label.appendChild(inputButton);
        label.appendChild(document.createTextNode(city));
        return label;
    })
}

function generateQuestion(countryName) {
    let questionContainer = document.createElement("div");
    questionContainer.classList.add("question-container");
    let question = document.createElement("h2");
    question.classList.add("question");
    question.innerHTML = "What is the capital of " + countryName + "?";
    questionContainer.appendChild(question);
    quizContainer.appendChild(questionContainer);
}

function generateOptions(citiesPreparedArray) {
    let mainOptionsContainer = document.createElement("div");
    mainOptionsContainer.classList.add("options-container-main");
    let secondaryOptionsContainer = document.createElement("div");
    secondaryOptionsContainer.classList.add("options-container-secondary");
    secondaryOptionsContainer.classList.add("btn-group-toggle");
    mainOptionsContainer.appendChild(secondaryOptionsContainer);
    citiesPreparedArray.forEach(cityRadio => {
        secondaryOptionsContainer.appendChild(cityRadio);

    });
    quizContainer.appendChild(mainOptionsContainer);
}

function generateQuestionCounter(mainButtonContainer) {
    const questionIndexContainer = document.createElement("div");
    questionIndexContainer.classList.add("buttons-container-left");
    mainButtonContainer.appendChild(questionIndexContainer);
    const questionsProgress = document.createElement("span");
    questionsProgress.classList.add("question-index-design");
    questionsProgress.innerHTML = questionIndex + " / " + numOfQuestions;
    questionIndexContainer.appendChild(questionsProgress);
}

function generateButtons(responseArr, cityRadioButtons, mainButtonContainer) {
    const secondaryButtonContainer = document.createElement("div");
    secondaryButtonContainer.classList.add("buttons-container-right");
    const checkAnswer = document.createElement("button");
    checkAnswer.classList.add("btn");
    checkAnswer.classList.add("btn-info");
    checkAnswer.innerHTML = "Check and Proceed";
    secondaryButtonContainer.appendChild(checkAnswer);
    mainButtonContainer.appendChild(secondaryButtonContainer);
    quizContainer.appendChild(mainButtonContainer);
    let answersArr = [];
    cityRadioButtons.forEach(cityRadioButton => {
        answersArr.push(cityRadioButton.childNodes[0].value);
    })
    checkAnswer.addEventListener("click", () => {
        cityRadioButtons.forEach(cityRadioButton => {
            if (cityRadioButton.classList.contains("active")) {
                let chosenCity = cityRadioButton.childNodes[0].value;
                const citiesMatch = chosenCity == responseArr[0];
                cityRadioButton.classList.remove("btn-primary");
                if (citiesMatch) {
                    cityRadioButton.classList.add("btn-success");
                    correctAnswersIndex++;
                    let resultIcon = document.createElement("i");
                    resultIcon.classList.add("fa");
                    resultIcon.classList.add("fa-check");
                    resultsIconArr.push(resultIcon);
                } else {
                    cityRadioButton.classList.add("btn-danger");
                    const indexOfAnswer = answersArr.indexOf(responseArr[0]);
                    cityRadioButtons[indexOfAnswer].classList.remove("btn-primary");
                    cityRadioButtons[indexOfAnswer].classList.add("btn-success");
                    let resultIcon = document.createElement("i");
                    resultIcon.classList.add("fa");
                    resultIcon.classList.add("fa-times");
                    resultsIconArr.push(resultIcon);
                }
            }
        })
        questionIndex++;
        if (questionIndex <= numOfQuestions) {
            setTimeout(() => {
                prepareQuizArea();
                fetchQuizData();
            }, 1500);
        } else {
            setTimeout(() => {
                prepareQuizArea();
                showResults();
            }, 2500);

        }
    })
}

function showResults() {
    const resultsContainer = document.createElement("div");
    resultsContainer.classList.add("results-container");
    const doneTitle = document.createElement("h2");
    doneTitle.innerHTML = "You Are \n Done!";
    const theResults = document.createElement("h3");
    theResults.innerHTML = "Here are your results: ";
    resultsContainer.appendChild(doneTitle);
    resultsContainer.appendChild(theResults);
    const resultsTable = document.createElement("table");
    const numbersRow = document.createElement("tr");
    const resultsRow = document.createElement("tr");
    resultsIconArr.forEach(icon => {
        const numberData = document.createElement("td");
        numberData.innerHTML = resultsIconArr.indexOf(icon) + 1;
        const resultData = document.createElement("td");
        resultData.appendChild(icon);
        numbersRow.appendChild(numberData);
        resultsRow.appendChild(resultData);
    })
    resultsTable.appendChild(numbersRow);
    resultsTable.appendChild(resultsRow);
    resultsContainer.appendChild(resultsTable);
    const yourResults = document.createElement("p");
    yourResults.innerHTML = "You got " + correctAnswersIndex + "/" + numOfQuestions + " questions right!";
    resultsContainer.appendChild(yourResults);
    const restartButton = document.createElement("button");
    restartButton.classList.add("btn");
    restartButton.classList.add("btn-dark");
    restartButton.innerHTML = "Retake Quiz";
    restartButton.addEventListener("click", () => {
        questionIndex = 1;
        numOfQuestions = 3;
        correctAnswersIndex = 0;
        resultsIconArr = [];
        prepareQuizArea();
        fetchQuizData();
    });
    resultsContainer.appendChild(restartButton);
    quizContainer.appendChild(resultsContainer);
}
























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