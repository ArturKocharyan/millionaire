let currentQuestionIndex = 0;
let questions;
let countOfAnswers = 0;

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


// function test11(questions) {
//     const currentQuestion = questions[currentQuestionIndex];

//     const questionDiv = document.getElementById('question');
//     questionDiv.textContent = currentQuestion.question;
//     console.log(questions);
// }




function renderQuestion(questions) {
    const currentQuestion = questions[currentQuestionIndex];

    const questionDiv = document.getElementById('quastion');
    questionDiv.textContent = currentQuestion.question;

    const answersContainer = document.querySelector('.answers_container');
    const answerDivs = answersContainer.querySelectorAll('.answer');

    answerDivs.forEach(answerDiv => {
        answerDiv.style.backgroundColor = '';
    });

    currentQuestion.content.forEach((answer, index) => {
        answerDivs[index].textContent = answer;
        answerDivs[index].addEventListener('click', function handleClick(event) {
            if (currentQuestion.correct !== index) {
                answerDivs[index].style.backgroundColor = '#FF3131';
            } else {
                answerDivs[index].style.backgroundColor = '#32de84';
                countOfAnswers++;
                addCount(countOfAnswers);
                answerDivs[index].removeEventListener('click', handleClick);
            }
            event.stopPropagation();
        });
    });
}

const nextButton = document.getElementById('next_button');
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        renderQuestion(questions);
    } else {
        alert("Quiz completed!");
    }
});