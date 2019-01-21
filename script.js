function extend(Child, Parent) {
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
}
////////////////////////////////////////////////////////////////////////////////////
function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    // const calculateAge = function () {
    //     console.log(this.age);
    // }
};
// add it to the prototype so we can inherit it
Person.prototype.calculateAge = function () {
    console.log(this.age);
}
////////////////////////////////////////////////////////////////////////////////////
function Athlete(name, age) {
    this.name = name;
    this.age = age;
};

extend(Athlete, Person);

let person = new Person('mike', 22, 'retired');
let ali = new Athlete('ali', 12);
console.log(person);
ali.calculateAge(12);

/////////////////////////////////////////////////////////////
////////        Object.create()
let personProto = {
    calculateAge: function () {
        console.log(2018 - this.yearOfBirth); // we do not have the yearOfBirth yet but will be called upon the object that we assign this proto to 
    }
};

let sarah = Object.create(personProto, {
    name: {
        value: 'akl'
    },
    yearOfBirth: {
        value: 2000
    }
});

///////////////////////////////////////////////////////
//// Quiz Exercise
// making the code private through the IIFE, so other developers can reuse this code without the stress of declared variables elsewhere
(function () {
    // function constructor
    function Question(question, answers, correct) {
        this.question = question;
        this.answers = answers;
        this.correct = correct;
    }
    // displaying the question and its answers from the array
    Question.prototype.displayQuestion = function () {
        console.log(this.question);

        for (let i = 0; i < this.answers.length; i++) {
            console.log(`${i} --> ${this.answers[i]}`);
        }
    };

    //Checkig the answers if are correct
    Question.prototype.checkAnswer = function (answer, callback) {
        let sc;

        if (answer == this.correct) {
            console.log('Correct Answer !!!');
            sc = callback(true);
        } else {
            console.log('Wrong Answer !!!');
            sc = callback(false);
        }
        
        this.displayScore(sc); // this refers to the object that checkAnswer function was called on
    };

    Question.prototype.displayScore = function (score) {
        console.log(`Your current score is: ${score}
        ------------------------------------`);
    };

    let q1 = new Question('Is JavaScript the coolest programming in the world?', ['Yes', 'No'], 0);
    let q2 = new Question('What is my name?', ['john', 'ali', 'mike'], 1);
    let q3 = new Question('What does best describe coding?', ['boring', 'difficult', 'fun', 'tedious'], 2);

    let questions = [q1, q2, q3];

    function score() {
        let sc = 0;
        // truthy is just a boolean passed in as 'true' or 'false'
        return function (truthy) {
            if (truthy) {
                sc++;
            }
            return sc;
        }
    }

    let keepScore = score(); // closure (truthy)

    function nextQuestion() {

        let randomQuestionIdx = Math.floor(Math.random() * questions.length); //creating random index for the questions to be asked
        //displaying the questions from the prototype method
        questions[randomQuestionIdx].displayQuestion();
        // saving the answer to check and display the message
        let answer = prompt(`Please select the correct answer: `);

        if (answer !== 'exit') {
            // passing the answer to get checked for the correctness
            questions[randomQuestionIdx].checkAnswer(parseInt(answer), keepScore);
            nextQuestion();
        }
    }
    nextQuestion();
})();