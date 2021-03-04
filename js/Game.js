//random stuff
document.addEventListener('click', freezeClicFn, true);
window.addEventListener('load', createplyf())
window.addEventListener('load', gethighscore())

//vars
freezeClic = false;

timevar = 4;

selectedcards = Array(0);
selectnum = Array(0) 
const cardtypes =  Array(1, 2, 3, 4)

cardvalnum = 0
clicksittook = 0
points = 0
gamepoint = 0

timevarsec = 60;
timevarmin = 3;

gameover = false;

function createplyf(){
//create table
    for(i=0; i<8; i++){
        var tile = document.createElement('div')

        //img creation
        var img = document.createElement("IMG");
        img.setAttribute('class', 'tile')
        img.setAttribute('id', i)
        img.setAttribute("src", "img/quistion.png");
        img.setAttribute("width", "200");
        img.setAttribute("height", "300");
        document.getElementById('tileCon').appendChild(img);
        
        // showing the card
        img.addEventListener('click', function(){
            showcard(this.id)
        })
    }
    gameover = false;
}

//showing the card value
function showcard(id){
    selectedcards[selectnum] = carddeck[id];
    selectnum[1+selectnum[0]] = id
    selectnum[0]++

    //changing img
    document.getElementById(id).src='img/'+carddeck[id]+'.png'

    //saving val & checking cards
    cardval = carddeck[id];
    checkvals(cardval, id);
}

function checkvals(cardval, id){
    //saving
    if(cardvalnum >= 1){
        cardval2 = cardval;
        cardval2id = id;
    }
    else{
        cardval1 = cardval;
        cardval1id = id;
    }
    cardvalnum++
    
    clicksittook++

    //checking cards
    if(cardvalnum == 2){
        //click prevention
        document.getElementById("tileCon").addEventListener("click", function(event){
            event.preventDefault()
        });
        //wrong anwser
        if(cardval1 !== cardval2){
            freezeClic = true;
            setTimeout(function(){
            document.getElementById(cardval1id).src='img/quistion.png'
            document.getElementById(cardval2id).src='img/quistion.png'

            //allows clicks again
            freezeClic = false;
            }, 1500);
        }
        else{
            points++
        }
        cardvalnum = 0
    }
    if(points == 4){
        gamepoint++;
        gameover = true;
        highscoreudp()
        freezeClic = true;
        setTimeout(() => {
            restpyf()
        }, 5000);
        points = 0
    }
    updscoreboard()
}

//updates scoreboard
function updscoreboard(){
    document.getElementById('scoreP').innerHTML = 'Your score is: '+ gamepoint +'';
    document.getElementById('clicksP').innerHTML = 'Amount of clicks in this game: '+ clicksittook +'';
}

//prevents clicks
function freezeClicFn(e) {
    if (freezeClic) {
      e.stopPropagation();
      e.preventDefault();
    }
}

//reset playing field
function restpyf(){
    clicksittook = 0
    timevarmin = 3;
    timevarsec = 59
    //clear playing field
    document.getElementById('tileCon').innerHTML = '';

    //suffle deck
    for (var i = carddeck.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = carddeck[i];
        carddeck[i] = carddeck[j];
        carddeck[j] = temp;
    }

    //creates playing flield
    createplyf();

    //unfreezes clicks
    freezeClic = false;
}

//timelimit
setInterval(() => {
    if(gameover !== true){
        timevarsec -= 1;
        if(timevarmin == 0){
            if(timevarsec == 0){
                freezeClic = true;
                gameover = true;
            }
        }
        if(timevarsec==0){
            if(timevarmin>=1){
                timevarmin--;
                timevarsec += 59;
            }
        }
        if(timevarsec <= 9){
            document.getElementById('timep').innerHTML = 'Time left: '+ timevarmin +':0'+ timevarsec +''
        }
        else{
            document.getElementById('timep').innerHTML = 'Time left: '+ timevarmin +':'+ timevarsec +''
        }
    }
}, 1000);

//high score
    //high score reader
    function gethighscore(){
        fetch('db.gethighscore.php')
        .then(function(res){
            return res.json();
        })
        .then(function(data){
            document.getElementById('hiscorep').innerHTML = 'Your HI-score: '+ data[0] +'';
            highscore = data[0];
        })
    }
    
    //new high score check
    function highscoreudp(){
        if(gamepoint > highscore){
            Sendhiscore(gamepoint);
            gethighscore();
        }
    }

    //sending data
    function Sendhiscore(highscore) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "db.updhighscore.php?q=" + highscore, true);
        xmlhttp.send();
    }

var carddeck = Array()

for(x=0;x<2;x++){
    for(i=0;i<cardtypes.length;i++){
        carddeck.push(cardtypes[i])
    }
}


//random mizing
for (var i = carddeck.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = carddeck[i];
    carddeck[i] = carddeck[j];
    carddeck[j] = temp;
}