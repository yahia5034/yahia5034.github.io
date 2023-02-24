let username=document.getElementById("username");
let savebtn=document.getElementById("saveScoreBtn");
let finalscore=document.getElementById("finalscore");
let recentScore=localStorage.getItem("recentScore");

let highScores=JSON.parse(localStorage.getItem('highScore'))|| [];

finalscore.innerText=recentScore;

console.log(highScores);

username.addEventListener("keyup",()=>{
    savebtn.disabled= !username.value;
});
SaveHighScore=(e)=>{
    console.log("clicked");
    e.preventDefault();
    const score={
        name:username.value,
        score: recentScore
    };
    highScores.push(score);
    highScores.sort( (a,b) =>b.score-a.score);
    highScores.splice(5);
    localStorage.setItem("highScore",JSON.stringify(highScores));
    window.location.assign("./");
}