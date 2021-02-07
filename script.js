const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;

let text = document.getElementById('text');
let pic = document.getElementById('pic')

let A = document.getElementById('A');
let B = document.getElementById('B');
let C = document.getElementById('C');
let box = document.getElementById('chatbox');

let menuOne = document.getElementById('battleMenu');
let menuTwo = document.getElementById('difficultyMenu');
let menuThree = document.getElementById('answerMenu');

let loading= document.getElementById('loading');


function transition() {
    loading.classList.toggle('fade');
};
var wrongNum1 = 0 
var wrongNum2 = 0
var correctNum = 0;
var num1 = 0
var num2 = 0
var answer = 0
var operator = "add"
var difficulty = "hard"
var locked = false;
var challenged = false;
var once = false;
var lost = false;
var mapLevel = 1;
var ending = false;
const keys = [];
const player = {
    x: 304, 
    y: 230, 
    width: 32, // 4
    height: 32,  // 1
    frameX: 0,
    frameY: 0,
    speed: 2.5, // 2.5
    moving: false,
};

const minotaur = {
    x: 200,
    y: 250,
    width: 122.5, 
    height: 80,  
    frameX: 0,
    frameY: 0,
    maxFrameX: 7,
    speed: 1.00,
    moving: false,
    map: 2,
    direction: "right",
    leftBound: 150,
    rightBound: 350,
    defeated : false
};

const mushroom = {
    x: 200,
    y: 230,
    width: 140, //change
    height: 88,  //change
    frameX: 0,
    frameY: 0,
    maxFrameX: 7,
    speed: 1.00,
    moving: false,
    map: 4,
    direction: "right",
    leftBound: 100,
    rightBound: 350,
    defeated: false
};

const eye = {
    x: 350,
    y: 180,
    width: 100, //change
    height: 150,  //change
    frameX: 0,
    frameY: 0,
    maxFrameX: 7,
    speed: 1.00,
    moving: false,
    map: 3,
    direction: "right",
    leftBound: 250,
    rightBound: 450,
    defeated : false
};

const alan = {
    x: 200,
    y: 200,
    width: 149, //change
    height: 150,  //change
    frameX: 0,
    frameY: 0,
    maxFrameX: 3,
    speed: 1.00,
    moving: false,
    map: 5,
    direction: "right",
    leftBound: 100,
    rightBound: 300,
    defeated : false
};

const goblin = {
    x: 300,
    y: 200,
    width: 109, //change
    height: 140,  //change
    frameX: 0,
    frameY: 0,
    maxFrameX: 7,
    speed: 1.00,
    moving: false,
    map: 6,
    direction: "right",
    leftBound: 200,
    rightBound: 400,
    defeated : false
};


const playerSprite = new Image();
playerSprite.src = "ghost-Sheet.png";
const minotaurSprite = new Image();
minotaurSprite.src = "minotaur-sheet.png";
const mushroomSprite = new Image();
mushroomSprite.src = "mushroom-sheet.png";
const eyeSprite = new Image();
eyeSprite.src = "eye-Sheet.png";
const alanSprite = new Image();
alanSprite.src = "alan-sheet.png";
const goblinSprite = new Image();
goblinSprite.src = "goblin-sheet.png";
var background = new Image();
background.src = "1.png";


function hitCheck(playerx, playery, monsterx, monstery) {
    if ((Math.sqrt(Math.pow((Math.abs(monstery - playery)), 2) + 
        Math.pow((Math.abs(monsterx - playerx)), 2))) < 50 && !challenged) {
            openOperatorMenu();
            challenged = true;
            locked = true;
            keys[65] = false;
            keys[68] = false;
            keys[83] = false;
            keys[87] = false;
    }
}


function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function respawnMonsters() {
    minotaur.defeated = false;
    eye.defeated = false;
    mushroom.defeated = false;
    alan.defeated = false;
    goblin.defeated = false;
}

function lvlPassed() {
    if (mapLevel == 1) {
        return true;
    } else if (mapLevel == 2 && minotaur.defeated) {
        return true;
    } else if (mapLevel == 3 && eye.defeated) {
        return true;
    } else if (mapLevel== 4 && mushroom.defeated) {
        return true;
    } else if (mapLevel == 5 && alan.defeated) {
        return true;
    } else if (mapLevel == 6 && goblin.defeated) {
        ending = true;
        return true;
    }
    return false;
}

function drawEnding() {

}

function animate() {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    speech();
    drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width, player.height);
    if (ending && mapLevel == 7) {
        locked = true;
        drawSprite(minotaurSprite, minotaur.width * 3, minotaur.height * minotaur.frameY, minotaur.width, minotaur.height, 345, 2, minotaur.width, minotaur.height);
        drawSprite(eyeSprite, eye.width * 3, eye.height * eye.frameY, eye.width, eye.height, 270, -40, eye.width, eye.height);
        drawSprite(mushroomSprite, mushroom.width - 1 * 0, mushroom.height * mushroom.frameY, mushroom.width, mushroom.height, 430, 1, mushroom.width, mushroom.height);
        drawSprite(alanSprite, alan.width * 0, alan.height * alan.frameY, alan.width, alan.height, 170, -40, alan.width, alan.height);
        drawSprite(goblinSprite, goblin.width * 2, goblin.height * goblin.frameY, goblin.width, goblin.height, 490, -35, goblin.width, goblin.height);
        pic.src = 'mino.png'
        text.style.opacity ='1'
        pic.style.opacity = '1'
        text.innerHTML = 'Since you\'ve made it all the way here, you must really be the Legendary Math Ghost! Congratulations on completing the game, you are a true Math Legend!'
        
    } else if (mapLevel == 2 && !ending) {
        if (!minotaur.defeated) {
            if (!challenged) {
                hitCheck(player.x,player.y,minotaur.x+25,minotaur.y+20)
            }
            drawSprite(minotaurSprite, minotaur.width * minotaur.frameX, minotaur.height * minotaur.frameY, minotaur.width, minotaur.height, minotaur.x, minotaur.y, minotaur.width, minotaur.height);
            moveMonster(minotaur);
        }
    } else if (mapLevel == 3 && !ending) {
        if (!eye.defeated) {
            hitCheck(player.x,player.y,eye.x+25,eye.y+60)
            drawSprite(eyeSprite, eye.width * eye.frameX, eye.height * eye.frameY, eye.width, eye.height, eye.x, eye.y, eye.width, eye.height);
            moveMonster(eye);
        }
    } else if (mapLevel == 4 && !ending) {
        if (!mushroom.defeated){
            hitCheck(player.x,player.y,mushroom.x+45,mushroom.y+20)
            if (mushroom.frameX == 7) {
                drawSprite(mushroomSprite, mushroom.width - 1 * mushroom.frameX, mushroom.height * mushroom.frameY, mushroom.width, mushroom.height, mushroom.x, mushroom.y, mushroom.width, mushroom.height);
            } else {
                drawSprite(mushroomSprite, mushroom.width * mushroom.frameX, mushroom.height * mushroom.frameY, mushroom.width, mushroom.height, mushroom.x, mushroom.y, mushroom.width, mushroom.height);
            }
            moveMonster(mushroom);
        }
    } else if (mapLevel == 5 && !ending) {
        if (!alan.defeated){
            hitCheck(player.x,player.y,alan.x +60,alan.y+50)
            drawSprite(alanSprite, alan.width * alan.frameX, alan.height * alan.frameY, alan.width, alan.height, alan.x, alan.y, alan.width, alan.height);
            moveMonster(alan);
        }
    } else if (mapLevel == 6 && !ending) {
        if (!goblin.defeated){
            hitCheck(player.x,player.y,goblin.x+50,goblin.y+60)
            drawSprite(goblinSprite, goblin.width * goblin.frameX, goblin.height * goblin.frameY, goblin.width, goblin.height, goblin.x, goblin.y, goblin.width, goblin.height);
            moveMonster(goblin);
        }
    }

    movePlayer();   
    if (player.frameX == 0) {
        setTimeout(function () {
            player.frameX = 1;
        }, 100);
    } else if (player.frameX == 1) {
        setTimeout(function () {
            player.frameX = 2;
        }, 100);
    } else if (player.frameX == 2) {
        setTimeout(function () {
            player.frameX = 3;
        }, 100);
    } else if (player.frameX == 3) {
        setTimeout(function () {
            player.frameX = 0;
        }, 100);
    }
    if (keys[32] == true && player.x >= 615 && player.x <= 690 && player.y >= 0 && player.y <= 100 && !once && mapLevel < 3 && lvlPassed()) {
        locked = true;
        keys[65] = false;
        keys[68] = false;
        keys[83] = false;
        keys[87] = false;
        once = true;
        mapLevel += 1;
        background.src = mapLevel.toString().concat(".png");
        transition();
        respawnMonsters();
        player.x = 52;
        player.y = 400;
        setTimeout(function () {
            locked = false;
        }, 100);
        setTimeout(function () {
            transition();
        }, 400);
    } else if (keys[32] == true && player.x >= 615 && player.x <= 690 && player.y >= 0 && player.y <= 100 && !once && mapLevel == 3 && lvlPassed()) {
        locked = true;
        keys[65] = false;
        keys[68] = false;
        keys[83] = false;
        keys[87] = false;
        once = true;
        mapLevel += 1;
        background.src = mapLevel.toString().concat(".png");
        transition();
        respawnMonsters();
        player.x = 89;
        player.y = 460;
        setTimeout(function () {
            locked = false;
        }, 100);
        setTimeout(function () {
            transition();
        }, 400);
    } else if (keys[32] == true && player.x >= 615 && player.x <= 690 && player.y >= 0 && player.y <= 100 && !once && mapLevel > 3 && mapLevel < 6 && lvlPassed()) {
        locked = true;
        keys[65] = false;
        keys[68] = false;
        keys[83] = false;
        keys[87] = false;
        once = true;
        mapLevel += 1;
        background.src = mapLevel.toString().concat(".png");
        transition();
        respawnMonsters();
        player.x = 89;
        player.y = 440;
        setTimeout(function () {
            locked = false;
        }, 100);
        setTimeout(function () {
            transition();
        }, 400);
    } else if (keys[32] == true && player.x >= 615 && player.x <= 690 && player.y >= 0 && player.y <= 100 && !once && mapLevel == 6 && lvlPassed()) {
        once = true; // ending
        mapLevel += 1;
        background.src = mapLevel.toString().concat(".png");
        transition();
        respawnMonsters();
        player.x = 384;
        player.y = 460;
        setTimeout(function () {
            transition();
        }, 400);
        player.speed = 0.5;
        keys[87] = true;
        setTimeout(function () {
            movePlayer();
        }, 3000);
    } else if (keys[32] == true && player.x >= 25 && player.x <= 77.5 && player.y >= 370 && player.y <= 430 && mapLevel > 1 && !once && mapLevel < 4 && lvlPassed()) {
        locked = true;
        keys[65] = false;
        keys[68] = false;
        keys[83] = false;
        keys[97] = false;
        once = true;
        mapLevel -= 1;
        background.src = mapLevel.toString().concat(".png");
        transition();
        respawnMonsters();
        player.x = 650;
        player.y = 80;
        setTimeout(function () {
            locked = false;
        }, 100);
        setTimeout(function () {
            transition();
        }, 400);
    } else if (keys[32] == true && player.x >= 40 && player.x <= 140 && player.y >= 435 && player.y <= 500 && mapLevel < 6 && !once && mapLevel > 3 && lvlPassed()) {
        locked = true;
        keys[65] = false;
        keys[68] = false;
        keys[83] = false;
        keys[97] = false;
        once = true;
        mapLevel -= 1;
        background.src = mapLevel.toString().concat(".png");
        transition();
        respawnMonsters();
        player.x = 650;
        player.y = 80;
        setTimeout(function () {
            locked = false;
        }, 100);
        setTimeout(function () {
            transition();
        }, 400);
    }
    requestAnimationFrame(animate);
}
animate();

window.addEventListener('keydown', function (e) {
    if (!locked) {
            keys[e.keyCode] = true;
    }
});

window.addEventListener('keyup', function (e) {
    if (keys[e.keyCode] == keys[32]) {
        delete keys[e.keyCode];
        once = false;
    }
    delete keys[e.keyCode];
});

function movePlayer() {
    if (!ending) {
        if (keys[65] == true && keys[68] == true) {
        } else if (keys[87] == true && keys[83] == true) {
        } else {
            if (keys[65] && player.x > 10 && mapLevel < 4) { //left for levels 1-3
                player.x -= player.speed;
            } else if (keys[65] && player.x > 20 && mapLevel > 3) { //left for levels 4-X
                player.x -= player.speed;
            } else if (keys[68] && player.x < canvas.width - player.width - 10 && mapLevel < 4) { //right for levels 1-3
                player.x += player.speed;
            } else if (keys[68] && player.x < canvas.width - player.width - 25 && mapLevel > 3) { //right for levels 4-X
                player.x += player.speed;
            } else if (keys[87] && player.y > 77.5) { //up
                player.y -= player.speed;
            } else if (keys[83] && player.y < canvas.height - player.height - 8 && mapLevel < 5) { //down for levels 1-3
                player.y += player.speed;
            } else if (keys[83] && player.y < canvas.height - player.height - 35 && mapLevel > 4) { //down for levels 4-X
                player.y += player.speed;
            }
        }
    } else if (ending) {
        if (player.y > 200 && mapLevel == 7) { // final cutscene
            player.y -= player.speed;
        }
    }
}


function moveMonster(monster) {
    if (monster.direction == "left") {
        if (((monster.x - monster.speed) > monster.leftBound)) { //moving left is still greater than leftbound
            monster.x -= monster.speed;
            if (monster.frameX == monster.maxFrameX) {
                monster.frameX = 0;
            } else {
                for (i = monster.maxFrameX - 1; i >= 0; i--) {
                    if (monster.frameX == i) {
                        monster.frameX = i + 1;
                    }
                }
            }
        } else {   //moving left goes back leftbound
            monster.direction = "right";
            monster.frameY = 0;
        }
    } else if (monster.direction == "right") {
        if (((monster.x + monster.speed) < monster.rightBound)) { //moving right is still less than right bound
            monster.x += monster.speed;
            if (monster.frameX == monster.maxFrameX) {
                monster.frameX = 0;
            } else {
                for (i = monster.maxFrameX - 1; i >= 0; i--) {
                    if (monster.frameX == i) {
                        monster.frameX = i + 1;
                    }
                }
            }} else {  //moving right goes back rightbound
                monster.direction = "left";
                monster.frameY = 1;
            }
        }
}

function openOperatorMenu(){
    locked = true
    menuOne.style.width = '100%'
    menuOne.style.opacity = '1';
    box.style.opacity = '1';
    text.style.visibility ='hidden'
    pic.style.visibility = 'hidden'
}

function operatorAdd(){
    operator = "add"
    menuOne.style.opacity = '0';
    menuTwo.style.opacity = '1';
    menuOne.style.width = '0%'
    menuTwo.style.width = '100%'
}

function operatorSubtract(){
    operator = "subtract"
    menuOne.style.opacity = '0';
    menuTwo.style.opacity = '1';
    menuOne.style.width = '0%'
    menuTwo.style.width = '100%'
}

function operatorMultiply(){
    operator = "multiply"
    menuOne.style.opacity = '0';
    menuTwo.style.opacity = '1';
    menuOne.style.width = '0%'
    menuTwo.style.width = '100%'
}

function difficultyEasy() {
    difficulty = "easy"
    menuTwo.style.opacity = '0';
    menuTwo.style.width = '0%'
    createQuestion()
    menuThree.style.width = '100%'
    menuThree.style.opacity = '1';
}

function difficultyMedium(){
    difficulty = "medium"
    menuTwo.style.opacity = '0';
    menuTwo.style.width = '0%'
    createQuestion()
    menuThree.style.width = '100%'
    menuThree.style.opacity = '1';
}

function difficultyHard(){
    difficulty = "hard"
    menuTwo.style.opacity = '0';
    menuTwo.style.width = '0%'
    createQuestion()
    menuThree.style.width = '100%'
    menuThree.style.opacity = '1';
}

function createQuestion(){
    if (difficulty == "easy"){
        num1 = Math.round((Math.random() * 10) %10)
        num2 = Math.round((Math.random() * 10) %10)
    if (operator == "add"){
        answer = num1 + num2
    } else if (operator == "subtract"){
        answer = num1 - num2
    } else if (operator == "multiply"){
        answer = num1 * num2 
    }
} else if (difficulty == "medium"){
    num1 = Math.round((Math.random() * 100) % 100)
    num2 = Math.round((Math.random() * 100) % 100)
    if (operator == "add"){
        answer = num1 + num2
    } else if (operator == "subtract"){
        answer = num1 - num2
    } else if (operator == "multiply"){
      answer = num1 * num2
    }
} else if (difficulty == "hard"){
    num1 = Math.round((Math.random() * 1000) % 1000)
    num2 = Math.round((Math.random() * 1000) % 1000)
    if (operator == "add"){
        answer = num1 + num2
    } else if (operator == "subtract"){
        answer = num1 - num2
    } else if (operator == "multiply"){
        answer = num1 * num2
    }
    }
    generateWrong();
}

function generateWrong() {
    if (operator == "add" || operator == "subtract") {
        wrongNum1 = answer - (Math.floor(Math.random() * 10 + 1))
        wrongNum2 = answer + (Math.floor(Math.random() * 10 + 1))
    } else { //multiply
        wrongNum1 = answer + (Math.floor(Math.random() * 3 + 1)) * num1
        wrongNum2 = answer - (Math.floor(Math.random() * 3 + 1)) * num1
    }
    assignNum();
}

function assignNum() {
    correctNum = (Math.floor(Math.random() * 3 + 1))
    if (operator == "add"){
        document.getElementById("question").innerHTML = (num1.toString().concat(" + ").concat(num2.toString()).concat(" = "))
    } else if (operator == "subtract") {
        document.getElementById("question").innerHTML = (num1.toString().concat(" - ").concat(num2.toString()).concat(" = "))
    } else if (operator == "multiply") {
        document.getElementById("question").innerHTML = (num1.toString().concat(" x ").concat(num2.toString()).concat(" = "))
    }
    if (correctNum == 1) {
        A.value = answer.toString();
        B.value = wrongNum1.toString();
        C.value = wrongNum2.toString()
    } else if (correctNum == 2) {
        A.value = wrongNum1.toString();
        B.value = answer.toString();
        C.value = wrongNum2.toString()
    } else if (correctNum == 3) {
        A.value = wrongNum1.toString();
        B.value = wrongNum2.toString();
        C.value = answer.toString()
    }
}

function btn1() {
  if(correctNum == 1) { //chose correct answer
        if (mapLevel == 2) {
            minotaur.defeated = true;
        } else if (mapLevel == 3){
            eye.defeated = true;
        } else if (mapLevel == 4) { 
            mushroom.defeated = true;
        } else if (mapLevel == 5) { 
            alan.defeated = true;
        } else if (mapLevel == 6) {
            goblin.defeated = true;
        }
    }
    correctNum = 0
    menuThree.style.opacity = '0';
    menuThree.style.width = '0%'
    locked = false;
    box.style.opacity = '0';
    challenged = false;
    document.getElementById("question").innerHTML ='';
    text.style.visibility ='visible'
    pic.style.visibility = 'visible'
}

function btn2(){
    if(correctNum == 2){
        if (mapLevel == 2) {
            minotaur.defeated = true;
        } else if (mapLevel == 3){
            eye.defeated = true;
        } else if (mapLevel == 4) { 
            mushroom.defeated = true;
        } else if (mapLevel == 5) { 
            alan.defeated = true;
        } else if (mapLevel == 6) {
            goblin.defeated = true;
        }
    }
    correctNum = 0
    menuThree.style.opacity = '0';
    menuThree.style.width = '0%'
    locked = false;
    box.style.opacity = '0';
    challenged = false;
    document.getElementById("question").innerHTML ='';
    text.style.visibility ='visible'
    pic.style.visibility = 'visible'
}

function btn3() {
    if(correctNum == 3) {
        if (mapLevel == 2) {
            minotaur.defeated = true;
        } else if (mapLevel == 3) {
            eye.defeated = true;
        } else if (mapLevel == 4) {
            mushroom.defeated = true;
        } else if (mapLevel == 5) {
            alan.defeated = true;
        } else if (mapLevel == 6) {
            goblin.defeated = true;
        }
    }
    correctNum = 0
    menuThree.style.opacity = '0';
    menuThree.style.width = '0%'
    locked = false;
    box.style.opacity = '0';
    challenged = false;
    document.getElementById("question").innerHTML ='';
    text.style.visibility ='visible'
    pic.style.visibility = 'visible'
}

function speech() {
    if (mapLevel == 1) {
        text.style.opacity = '1'
        pic.style.opacity = '1'
        text.innerHTML='Uhhhh, where am I? Why is there a grave here? Okay, let\'s get our feet moving with my WASD keys. Oh wait, I don\'t have feet! I think if I go over to that ladder and press space I\'ll go to the next map.';
    } else if (mapLevel == 2 && minotaur.defeated == false) {
        text.style.opacity = '1'
        pic.style.opacity = '1'
        text.innerHTML='This minotaur is blocking my path to the ladder, I better go up to it and teach him a lesson... in math.';
    } else if (mapLevel == 3 && eye.defeated == false) {
        text.style.opacity = '1'
        pic.style.opacity = '1'
        text.innerHTML='is that the exit out of this dungeon? I\'ve gotta get through this flying eye to get out.';
    } else if (mapLevel == 4 && mushroom.defeated == false) {      
        text.style.opacity = '1'
        pic.style.opacity = '1'
        text.innerHTML='A walking mushroom, never seen that one before.';
    } else if (mapLevel == 5 && alan.defeated == false) {
        text.style.opacity = '1'
        pic.style.opacity = '1'
        text.innerHTML='Wow, a skeleton now how cliche are we gonna get?';
    } else if (mapLevel == 6 && goblin.defeated == false) {
        text.style.opacity = '1'
        pic.style.opacity = '1'
        text.innerHTML='Now a goblin, the game developers must have only have access to free assets. At least there seems to be a way out up ahead.';
        
    } else {
        text.style.opacity = '0'
        pic.style.opacity = '0'
    }
}

