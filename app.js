let gameSeq = [];
let userSeq = [];

let btns = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;
let highest = 0;
let h2 = document.querySelector("h2")

document.addEventListener("keypress", function(){
    if(started == false){
        console.log("started");
        started = true;

        levelUp();
    }
})

function levelUp(){
    level++;
    h2.innerText= `Level ${level}`;

    userSeq = [];

    let randIdx = Math.floor(Math.random()*3);
    let randColor = btns[randIdx];
    gameSeq.push(randColor);
    let randBtn = document.querySelector(`.${randColor}`);
    console.log(randBtn);
    gameFlash(randBtn);

    //for flashing a button we need select the whole div or button
}        

function gameFlash(btn){
    btn.classList.add("gameFlash");
    setTimeout(function(){
        btn.classList.remove("gameFlash");
    }, 250);
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    }, 250);
}

function checkAns(){
    let idx = userSeq.length-1;
    if(userSeq[idx]==gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML=`Game Over! Your Score is <b>${level-1}<b> <br> Press any key to start`;
        let body = document.querySelector("body");
        body.classList.add("bodyTemp");
        body.classList.remove("bodyMain");
        // document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            body.classList.remove("bodyTemp");
        body.classList.add("bodyMain");
            // document.querySelector("body").style.backgroundColor="white";
        }, 150);
        let h3=document.createElement("h3");
        h3.innerHTML= `<b>Highest Score ${highestScore()}<b>`
        document.querySelector("h2").appendChild(h3);
        reset();
    }
}

function btnPress(){
    console.log("button was pressed");
    let btn=this;
    console.log(btn);
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns();
}

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level = 0;
}

let allbtns = document.querySelectorAll(".btn");
for(btn of allbtns){
    btn.addEventListener("click", btnPress);
}

function highestScore(){
    if(level>highest){
        highest=level-1;
    }
    return highest;
}