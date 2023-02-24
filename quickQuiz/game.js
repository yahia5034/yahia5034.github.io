console.log("Hello from java script");
const question=document.getElementById("question");
const choices =Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText=document.getElementById("question-counter");
const scoreText=document.getElementById("score");
const progressBar=document.getElementById("fill-box");
let availableQuestions=[];
let currentQuestion={};
let questionCounter=0;
let acceptingAnswers=false;
let score =0;

let questions = []

fetch("questions.json")
    .then( res=>{
        return res.json()
    }      
).then(loadedQuestions=>{ 
    questions=loadedQuestions
    console.log(question)
    startGame();
}).catch(e=>{
    console.log(e);
})

const MAX_QUESTIONS=3;
const CORRECT_BONUS=10; 
startGame=()=>{
    score=0;
    currentQuestion=0;
    availableQuestions=[...questions];
    getNextQuestion();
};

getNextQuestion=()=>{
    if(questionCounter>= MAX_QUESTIONS || availableQuestions.length==0){
        //Go to the end page
        localStorage.setItem("recentScore",score);
       return window.location.assign('./end.html');
    }
    questionCounter++;
    questionCounterText.innerText='Question  '+questionCounter+'/'+MAX_QUESTIONS;
    progressBar.style.width=(questionCounter/MAX_QUESTIONS)*100+'%';
      //change the question dynamically 
    let questionIndex=Math.floor((Math.random()*availableQuestions.length));
    currentQuestion=availableQuestions[questionIndex];
    question.innerText=currentQuestion["question"];
    //change the choices dynamically
    choices.forEach(choice=>{
        let number=choice.dataset['number'];
        choice.innerText=currentQuestion["choice"+number]
    })
    availableQuestions.splice(questionIndex,1);
    acceptingAnswers=true;
};
//what to do if the button is clicked
choices.forEach(choice=>{
    choice.addEventListener("click",e => {
        if(!acceptingAnswers)return;

        acceptingAnswers=false;
        const selectedChoice=e.target;
        const selectedAnswer=selectedChoice.dataset['number'];
       
        const ClassToApply=
        selectedAnswer==currentQuestion.answer?"correct":"incorrect";
        if(ClassToApply=="correct"){
            increment(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(ClassToApply);
        //wait 1000 seconds then display this.
        setTimeout(()=>{
            selectedChoice.parentElement.classList.remove(ClassToApply);
            getNextQuestion();
        },1000);        
    });
});
increment=num=>{
    score+=num;
    scoreText.innerText=score;
}
// startGame();