const option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4');

const optionElements = document.querySelectorAll ('.option');

const question = document.getElementById('question');

const numberOfQuestion = document.getElementById('number-of-question'),
      numberOfAllQuestions = document.getElementById('number-of-all-questions'); 

let indexOfQuestion,
    indexOfPage = 0;

const answersTracker = document.getElementById('answers-tracker');
const btnNext = document.getElementById('btn-next');

let score = 0;

const correctAnswer = document.getElementById('correct-answer'),
      numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'),
      btnTryAgain = document.getElementById('btn-try-again');
      btnTryAgain1 = document.getElementById('btn-try-again1');

const questions = [
    {
        question: 'Игрок выполняет угловой удар и после его касания мяч попадает в собственые ворота, решение арбитра:',
        options: [
            'Засчитать гол',
            'Повторить угловой удар',
            'Назначить угловой удар в ворота игрока, выполнявшего угловой удар',
            'Назначиь удар от ворот',
        ],
        rightAnswer: 2
    },
    {
        question: 'Какая длина штрафной площади? ',
        options: [
            '16м',
            '16.5м',
            '20м',
            '16.5см',
        ],
        rightAnswer: 1
    },
    {
        question: 'Защитник сбивает нападающего прямо на линии своей штрафной площади, решение арбитра:',
        options: [
            'Назначить 11-ти метровый удар',
            'Назначить свободный удар',
            'Назначить штрафной',
            'Нет правильного ответа',
        ],
        rightAnswer: 0
    },
    {
        question: 'Нападающий находится в штрафной площади, владеет мячем и готовится бить по воротам, защитник тянет за руку нападающего нарушая правила, решение арбитра:',
        options: [
            'Назначить 11-ти метровый удар',
            'Назначить 11-ти метровый удар + ЖК',
            'Назначить штрафной + КК',
            'Назначить 11-ти метровый удар + КК',
        ],
        rightAnswer: 3
    },
    {
        question: 'Для чего дуга на штрафной площади: ',
        options: [
            'Часть штрафной площади, вратарь может играть руками',
            'Расстояние 9.15м от 11-ти метровой отметки для ограничения нахождения игроков при выполнении 11-ти метрового удара',
            'Нарушение в этом секторе будут наказыватся не штрафным, а 11-ти метровым ударом',
            'Нет правильного ответа',
        ],
        rightAnswer: 1
    },
    {
        question: 'Положение вне игры не наказывается в случае если: ',
        options: [
            'Нападающий получает мяч после касания о каркас ворот',
            'Нападающий получает мяч после удара с углового',
            'Нападающий получает мяч после вбрасывания аута',
            'Ответы 2 и 3 верны',
        ],
        rightAnswer: 3
    },
];


numberOfAllQuestions.innerHTML = questions.length;

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question;

    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];
    
    numberOfQuestion.innerHTML = indexOfPage + 1;
    indexOfPage++;
}

let completedAnswers = [];

const randomQuestion = () => {
    let randomNumber = Math.floor( Math.random() * questions.length);
    let hitDuplicate = false; 

    if (indexOfPage == questions.length) {
        quizOver();
    } else {
        if(completedAnswers.length > 0) {
            completedAnswers.forEach(item => {
               if (item == randomNumber) {
                    hitDuplicate = true;
               }
            });
            if(hitDuplicate) {
                randomQuestion();
            }else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
    }   if (completedAnswers.length == 0) {
            indexOfQuestion = randomNumber;
            load();
    }
    completedAnswers.push(indexOfQuestion);
} 

const checkAnswer = el => {
    if (el.target.dataset.id == questions[indexOfQuestion].rightAnswer){
        el.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    } else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disableOptions();
}

for(option of optionElements) {
    option.addEventListener('click', e => checkAnswer(e));
}

const disableOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if (item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add('correct');
        }
    })
}

const enableOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong');
    })
}

const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
}

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
}

const validate = () => {
    if (!optionElements[0].classList.contains('disabled')){
        alert('Вам нужно выбрать один из вариантов ответа');
    } else {
        randomQuestion();
        enableOptions();
    }
}

const quizOver = () => {
    
    if (score >=4 ) {
        document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML =score;
    numberOfAllQuestions2.innerHTML = questions.length;
    } else {
        document.querySelector('.quiz-over-modal1').classList.add('active');
    correctAnswer.innerHTML =score;
    numberOfAllQuestions2.innerHTML = questions.length;
        
    }
}

const tryAgain = () => {
    window.location.reload();
}

btnTryAgain.addEventListener('click', tryAgain);
btnTryAgain1.addEventListener('click', tryAgain);
 
btnNext.addEventListener('click', () => {
    validate();
});

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});