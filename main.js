let currentQuestionIndex = 0;
let questions;
let countOfAnswers = 0;
let chanceButton = document.getElementById("50")
const resetButton = document.getElementById("reset")

document.addEventListener('DOMContentLoaded', () => {
    fetch('https://raw.githubusercontent.com/ChristinaAjemyan/js_group_1/master/data/questions.js')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            questions = convertObj(data);
            renderQuestion(questions);
            const count = document.getElementById("count")
            count.textContent = `${questions.length}`
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});

function convertObj(string) {
    const trimmedString = string.replace(/^const\s+/g, '');
    const questionsArray = eval(trimmedString);
    return questionsArray;
}

function addCount(count) {
    const countElement = document.getElementById("userCount");
    if (countElement) {
        countElement.textContent = count;
    } else {
        console.error("Element with ID 'userCount' not found!");
    }
}


function renderQuestion(questions) {
    let currentQuestion = questions[currentQuestionIndex];



    const questionDiv = document.getElementById('quastion');
    questionDiv.textContent = currentQuestion.question;

    const answersContainer = document.querySelector('.answers_container');
    const answerDivs = answersContainer.querySelectorAll('.answer');

    answerDivs.forEach(answerDiv => {
        answerDiv.style.backgroundColor = '';
    });

    chanceButton.addEventListener('click', () => {
        const correctIndex = currentQuestion.correct;
        const selectedIndexes = [correctIndex];
        let count = 1;
        while (count < 2) {
            const randomIndex = Math.floor(Math.random() * currentQuestion.content.length);
            if (randomIndex !== correctIndex && !selectedIndexes.includes(randomIndex)) {
                selectedIndexes.push(randomIndex);
                count++;
            }
        }
        answerDivs.forEach((answerDiv, index) => {
            if (selectedIndexes.includes(index)) {
                answerDiv.style.backgroundColor = '';
            } else {
                answerDiv.style.backgroundColor = '#FF3131';
            }
        });
        chanceButton.disabled = true
    });

    currentQuestion.content.forEach((answer, index) => {
        answerDivs[index].textContent = answer;
        answerDivs[index].addEventListener('click', function handleClick(event) {
            if (currentQuestion.correct !== index) {
                answerDivs[index].style.backgroundColor = '#FF3131';
                answerDivs[currentQuestion.correct].style.backgroundColor = '#32de84'
                nextButton.disabled = false
                chanceButton.disabled = true
            } else {
                answerDivs[index].style.backgroundColor = '#32de84';
                countOfAnswers++;
                addCount(countOfAnswers);
                answerDivs[index].removeEventListener('click', handleClick);
                nextButton.disabled = false
                chanceButton.disabled = true
            }
            currentQuestion = ''
            event.stopPropagation();
        });

        nextButton.disabled = true
        chanceButton.disabled = false

    });
}

resetButton.addEventListener('click', () => {
    currentQuestionIndex = 0
    addCount(0)
    renderQuestion(questions)
})

const nextButton = document.getElementById('next_button');
nextButton.disabled = true
chanceButton.disabled = false
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        renderQuestion(questions);
    } else {
        alert("Quiz completed!");
    }
});