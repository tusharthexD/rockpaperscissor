const socket = io();
const Lhand = document.querySelector("#Lhand")
const Rhand = document.querySelector("#Rhand")
const Player1Score = document.querySelectorAll('.Player1Star')
const Player2Score = document.querySelectorAll('.Player2Star')
const gestures = ["rock", 'paper', "scissor"]
var roomUniqueId = null
var players = []
var player1 = false
var P1 = 0
var P2 = 0

function createGame(){
    socket.emit("createGame")
    player1 = true
}

var roomcode = document.getElementById("roomUniqueId").value

if(roomcode.length == 6){
    joinGame()
}

function joinGame(){
  roomUniqueId = document.getElementById("roomUniqueId").value
  socket.emit("joinGame", {roomUniqueId: roomUniqueId})
}


socket.on("newGame", (data)=>{
    roomUniqueId = data.roomUniqueId
    document.getElementById("initial").style.display = "none";
    document.getElementById("waitingArea").innerHTML = `<div id="waitingarea"><h3>Waiting for opponent please share the code with your friend "<span id="roomcode" >${roomUniqueId}</span>"</h3><button class="btn2" onclick="copyToClipboard('#roomcode')" >Copy Link</button></div>`;
})


function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val("https://rockpaperscissor-4cag.onrender.com/multiplayer/"+$(element).text()).select();
    document.execCommand("copy");
    $temp.remove();
  }
  



socket.on("playersConnected",()=>{
    document.getElementById("waitingArea").style.display = "none";
    document.getElementById("initial").style.display = "none";
    document.querySelector(".gameArea").style.display = "block"
    document.querySelector("#namearea").style.display = "block"

})



function sendChoice(rpsvalue){
var choiceEvent = player1? "p1choice" : "p2choice"
$('.handButton').prop("disabled" , true)
$('.handButton').css("opacity", "50%")
document.querySelector('.guide').style.display ="none";

playerName = document.getElementById("playerName").value

socket.emit(choiceEvent,{
    rpsvalue: rpsvalue,
    roomUniqueId: roomUniqueId
})
}

socket.on('p1choice', function(data) {
    players.push({"id": 1, "choice": data.rpsvalue})
   check()

})
socket.on('p2choice', function(data) {
    players.push({"id": 2, "choice": data.rpsvalue})
    check()
})



function namePlayer(){
    
playerName = document.getElementById("playerName").value

var nameEvent = player1? "p1name" : "p2name"
socket.emit(nameEvent,{
    playername : playerName,
    roomUniqueId: roomUniqueId
})
}

socket.on('p1name', function(data) {
    $(".P1").text(data.playername)

})

socket.on('p2name', function(data) {
    $(".P2").text(data.playername)
})





function check(){

if(players[0] && players[1]){
    var playerFirst = players.find(item => item.id === 1);
    var playerSecond = players.find(item => item.id === 2);

    result(playerFirst.choice, playerSecond.choice)
      
}

else{
   
}}



function result(leftHand, rightHand){
    
    $(".hand").css("animationName", "wave-animation")


    setTimeout(() => {
    $(".hand").css("animationName", "") 

    Lhand.src = `/assets/L${leftHand}.png`
    Rhand.src = `/assets/R${rightHand}.png`
    $('.handButton').prop("disabled" , false)
    $('.handButton').css("opacity", "100%")
    }, 1000);

    if(leftHand === "rock" && rightHand === "scissor"){
       P1++

    }
    else if(leftHand === "rock" && rightHand === "paper"){
    P2++
    }

    else if(leftHand === "paper" && rightHand === "scissor"){
    P2++
    }

    else if(leftHand === "paper" && rightHand === "rock"){
    P1++
    }

    else if(leftHand === "scissor" && rightHand === "paper"){
    P1++
    }

    else if(leftHand === "scissor" && rightHand === "rock"){
        P2++
    }

    else{
        console.log("draw")
        
    }
    
setTimeout(() => {
   if(P1 >= 1){
    Player1Score[P1-1].style.color = "orange";}
    else{


    }
    if(P2 >= 1){
    Player2Score[P2-1].style.color = "orange";}
    else{
    }
players= []

if(P1 < 3 && P2 < 3){
    
}
else{
    gameOver()
}
}, 1000);  

}





function gameOver(){
    $("#gameover").css("display", "block")
    $("#handButtonSection").css("display" , "none")
        
for (let L1 = 0; L1 < P1; L1++) {
document.querySelectorAll(".L1Star")[L1].style.color = "orange"
    
}
for (let L2 = 0; L2 < P2; L2++) {
    document.querySelectorAll(".L2Star")[L2].style.color = "orange"
        
    }

}

function restartGame(){
    P1 = 0
    P2 = 0
    $(".Player1Star").css("color", 'black')
    $(".Player2Star").css("color", 'black')
    $("#gameover").css("display", "none")
    $("#handButtonSection").css("display" , "block")


}
