const Lhand = document.querySelector("#Lhand")
const Rhand = document.querySelector("#Rhand")
const Player1Score = document.querySelectorAll('.Player1Star')
const Player2Score = document.querySelectorAll('.Player2Star')
const gestures = ["rock", 'paper', "scissor"]

document.getElementById("Playboard").style.display= "block";
document.getElementById("namearea").style.display= "block";


var P1 = 0
var P2 = 0
if(P1 <= 3 && P2 <= 3){
    
}

else{
    gameOver()
    console.log("Else case")
}



var nameList = [
    'Time', 'Past', 'Future', 'Dev',
    'Fly', 'Flying', 'Soar', 'Soaring', 'Power', 'Falling',
    'Fall', 'Jump', 'Cliff', 'Mountain', 'Rend', 'Red', 'Blue',
    'Green', 'Yellow', 'Gold', 'Demon', 'Demonic', 'Panda', 'Cat',
    'Kitty', 'Kitten', 'Zero', 'Memory', 'Trooper', 'XX', 'Bandit',
    'Fear', 'Light', 'Glow', 'Tread', 'Deep', 'Deeper', 'Deepest',
    'Mine', 'Your', 'Worst', 'Enemy', 'Hostile', 'Force', 'Video',
    'Game', 'Donkey', 'Mule', 'Colt', 'Cult', 'Cultist', 'Magnum',
    'Gun', 'Assault', 'Recon', 'Trap', 'Trapper', 'Redeem', 'Code',
    'Script', 'Writer', 'Near', 'Close', 'Open', 'Cube', 'Circle',
    'Geo', 'Genome', 'Germ', 'Spaz', 'Shot', 'Echo', 'Beta', 'Alpha',
    'Gamma', 'Omega', 'Seal', 'Squid', 'Money', 'Cash', 'Lord', 'King',
    'Duke', 'Rest', 'Fire', 'Flame', 'Morrow', 'Break', 'Breaker', 'Numb',
    'Ice', 'Cold', 'Rotten', 'Sick', 'Sickly', 'Janitor', 'Camel', 'Rooster',
    'Sand', 'Desert', 'Dessert', 'Hurdle', 'Racer', 'Eraser', 'Erase', 'Big',
    'Small', 'Short', 'Tall', 'Sith', 'Bounty', 'Hunter', 'Cracked', 'Broken',
    'Sad', 'Happy', 'Joy', 'Joyful', 'Crimson', 'Destiny', 'Deceit', 'Lies',
    'Lie', 'Honest', 'Destined', 'Bloxxer', 'Hawk', 'Eagle', 'Hawker', 'Walker',
    'Zombie', 'Sarge', 'Capt', 'Captain', 'Punch', 'One', 'Two', 'Uno', 'Slice',
    'Slash', 'Melt', 'Melted', 'Melting', 'Fell', 'Wolf', 'Hound',
    'Legacy', 'Sharp', 'Dead', 'Mew', 'Chuckle', 'Bubba', 'Bubble', 'Sandwich', 'Smasher', 'Extreme', 'Multi', 'Universe', 'Ultimate', 'Death', 'Ready', 'Monkey', 'Elevator', 'Wrench', 'Grease', 'Head', 'Theme', 'Grand', 'Cool', 'Kid', 'Boy', 'Girl', 'Vortex', 'Paradox'
  ];

  var finalName = nameList[Math.floor(Math.random() * nameList.length)];
        $('.P2').text(finalName)


function playerChoice(choice){

$(".hand").css("animationName", "wave-animation")
document.querySelector('.guide').innerText ="Wait...";

var randomGesture = Math.floor(Math.random()*3)

setTimeout(() => {
    $(".hand").css("animationName", "") 
    document.querySelector('.guide').innerText ="Select your gesture👇";

    Lhand.src = `/assets/L${choice}.png`
    Rhand.src = `/assets/R${gestures[randomGesture]}.png`
    }, 1000);

 result(choice , gestures[randomGesture])

}


function setName(){
    var hi = document.querySelector("input").value
    $(".P1").text(hi)
}


function result(leftHand, rightHand){

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
