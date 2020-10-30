function rpsgame(yourChoice){
    let humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = comChoice();
    
    let result = gameWinner(humanChoice, botChoice);
    
    let msg = finalmessage(result);

    frontend(humanChoice, botChoice, msg);
}

function comChoice(){
    
    let ranValue = Math.floor(Math.random()*3);
    return ["scissor", "paper", "rock"][ranValue];
}

function gameWinner(humanC, botC){
    let gamedatabase = {
        "scissor" :{"paper":1, "rock": 0, "scissor":0.5},
        "rock" : {"scissor" : 1, "paper" :0, "rock": 0.5},
        "paper": {"rock" : 1, "scissor" :0, "paper": 0.5}
    };

    var yourScore = gamedatabase[humanC][botC];
    var comScore = gamedatabase[botC][humanC];

    return [yourScore, comScore];
}

function finalmessage([humanS, botS]){

    if (humanS === 1){
        return{"message" : "You Won!", 'color' : 'green' };
    }
    else if (humanS === 0.5){
        return{"message" : "You Tie!", 'color': 'yellow' };
    }
    else{
        return{"message" : "You Lost!", 'color' : 'red' };
    }
}

function frontend(hIMG, bIMG, fMSG){
    var frontDatabase = {
        "scissor" : document.getElementById("scissor").src,
        "rock" : document.getElementById("rock").src,
        "paper" : document.getElementById("paper").src
    }

    //clean  images
    document.getElementById('scissor').remove();
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var msgDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='"+frontDatabase[hIMG]+"' width='150px' height='150' style = 'box-shadow: 10px 13px 28px -5px rgba(13,255,0,0.71);'>";

    msgDiv.innerHTML = "<h2 style = 'color: "+fMSG['color']+"; font-size:40px; padding:40px ;'>" 
    +fMSG['message']+ "</h2>"

    botDiv.innerHTML = "<img src='"+frontDatabase[bIMG]+"' width='150px' height='150' px style = 'box-shadow: 10px 13px 28px -5px rgba(255,0,0,1);'>";
    
    document.getElementById('flex-box').appendChild(humanDiv);
    document.getElementById('flex-box').appendChild(msgDiv);
    document.getElementById('flex-box').appendChild(botDiv);
}

function refreshsite(){
    location.reload();  
}

//-------------------------------------------------------------------------
//chalange 4 change the color 

let all_button = document.getElementsByTagName("button");
let copy_all_button = [];

for(var i = 0; i<all_button.length; i++){
    copy_all_button.push(all_button[i].classList[1]);
}

console.log(copy_all_button);

function buttoncolorchange(valuebutton){
    if(valuebutton.value === 'red'){
        buttoncolor("btn-danger");
    }
    else if(valuebutton.value === 'green'){
        buttoncolor("btn-success");
    }
    else if(valuebutton.value === 'reset'){
        buttoncolorreset();
    }
    else if(valuebutton.value === 'random'){
        buttoncolorrandom();
    }
}

function buttoncolor(valuecolor){
    for(let i=0; i<all_button.length; i++){
        all_button[i].classList.remove(all_button[i].classList[1]);
        all_button[i].classList.add(valuecolor);    
    }
}

function buttoncolorreset(){
    for(let i=0; i<all_button.length; i++){
        all_button[i].classList.remove(all_button[i].classList[1]);
        all_button[i].classList.add(copy_all_button[i]);
    }
}

function buttoncolorrandom(){

    var classarray = ["btn-primary", "btn-danger", "btn-success", "btn-warning"];
    
    for(let i=0; i<all_button.length; i++){
        let randomnumber  = Math.floor(Math.random()*4);
        all_button[i].classList.remove(all_button[i].classList[1]);
        all_button[i].classList.add(classarray[randomnumber]);
    }
}


//blackjack challange

let blackjack_1 = {
    'you' : {'span':'#your-score', 'div':'#your-box','score':0},
    'dealer' : {'span':'#dealer-score', 'div':'#dealer-box','score':0},
    'cards' : ['A','2','3','4','5','6','7','8','9','2','J','Q','K'],
    'cardsmap' : {'A':1,'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'J':10,'Q':11,'K':12 },
    'wins' : 0,
    'losses' : 0,
    'draws' : 0,
    'isStand' : false,
    'over' : false,
};

const YOU = blackjack_1['you'];
const DEALER = blackjack_1['dealer'];

const HITSOUND = new Audio('sounds/hit.mp3');
const WINSOUND = new Audio('sounds/win.mp3');
const LOSSSOUND = new Audio('sounds/loss.mp3');

document.querySelector('#black-jack-hit').addEventListener('click', blackjackhit);
document.querySelector('#black-jack-stand').addEventListener('click', blackjackstand);
document.querySelector('#black-jack-deal').addEventListener('click', blackjackdeal);


function blackjackhit(){
    if(blackjack_1['isStand'] === false){
        let imageselect = imageselector();
        showcard(imageselect, YOU);
    }
}

function showcard(imagevalue, activePlayer){
    if(activePlayer['score'] <= 21){
        let cardimage = document.createElement('img');
        cardimage.src = `images/${imagevalue}.JPG`;
        document.querySelector(activePlayer['div']).appendChild(cardimage);
        HITSOUND.play();

        activePlayer['score'] = (blackjack_1['cardsmap'][imagevalue]) + activePlayer['score'];
        document.querySelector(activePlayer['span']).textContent = activePlayer['score'];

        if(activePlayer['score'] > 21){
            document.querySelector(activePlayer['span']).textContent = "Busted!";
            document.querySelector(activePlayer['span']).style.color = 'red';
        }
    }
} 

function sleep(ms){
    return new Promise (resolve => setTimeout(resolve, ms));
}

async function blackjackstand(){
    blackjack_1['isStand'] = true;  
    
    while(DEALER['score'] < 16 && blackjack_1['isStand'] === true){
        let imageselect = imageselector();
        showcard(imageselect, DEALER);
        await sleep(1000);
    }

    blackjack_1['over'] = true;
    findthewinner();
    
}

function blackjackdeal(){
    if (blackjack_1['over'] === true){
        blackjack_1['isStand'] = false;

        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

        let i;
        for(i=0; i<yourImages.length;i++){
            yourImages[i].remove();
        }

        for(i=0; i<dealerImages.length;i++){
            dealerImages[i].remove();
        }

        YOU['score'] = 0;
        DEALER['score'] = 0;
    
        document.querySelector(YOU['span']).textContent = "0";
        document.querySelector(YOU['span']).style.color = 'white';

        document.querySelector(DEALER['span']).textContent = "0";
        document.querySelector(DEALER['span']).style.color = 'white';

        document.querySelector('#black-jack-result').textContent = "Let's Play";
        document.querySelector('#black-jack-result').style.color = 'black';

        blackjack_1['over'] = false;
    }
}

function imageselector(){
    let randomnumberimage = Math.floor(Math.random()*13);
    return blackjack_1['cards'][randomnumberimage];
}

function findthewinner(){
    let winner;

    if(YOU['score'] <= 21){
        if(YOU['score'] > DEALER['score'] || DEALER['score'] > 21){
            winner = YOU;
            blackjack_1['wins']++;
        }
        else if (YOU['score'] < DEALER['score']){
            winner = DEALER;
            blackjack_1['losses']++;
        }
        else if (YOU['score'] === DEALER['score']){
            winner = "DRAW";
            blackjack_1['draws']++;
        }
    }
    else if (DEALER['score'] <= 21 && YOU['score'] > DEALER['score']){
        winner = DEALER;
        blackjack_1['losses']++;
    }
    else if (YOU['score'] > 21 && DEALER['score'] > 21){
        winner = "DRAW";
        blackjack_1['draws']++;
    }

    if (winner === YOU){
        document.querySelector('#wins').textContent = blackjack_1['wins'];
        document.querySelector('#black-jack-result').textContent = 'You Win!';
        document.querySelector('#black-jack-result').style.color = 'blue';
        WINSOUND.play();    
    }
    else if (winner === DEALER){
        document.querySelector('#losses').textContent = blackjack_1['losses'];
        document.querySelector('#black-jack-result').textContent = 'Dealer Win!';
        document.querySelector('#black-jack-result').style.color = 'red';
        LOSSSOUND.play();
    }
    else{
        document.querySelector('#draws').textContent = blackjack_1['draws'];
        document.querySelector('#black-jack-result').textContent = 'Draw!';
        document.querySelector('#black-jack-result').style.color = 'brown';
    }

    console.log(blackjack_1['wins']);
}