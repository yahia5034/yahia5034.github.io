let highScoreList=document.getElementById("highScoreList");
let highScores=JSON.parse(localStorage.getItem("highScore"));
highScoreList.innerHTML=
    highScores.map(score=>{
    let s="<li class='score'>"+score.name+" - "+score.score+"</li>" ;
        return s
    }
)
