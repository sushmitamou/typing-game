const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endGameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

//list of words
const words = ['Application', 'table', 'fetch', 'ice-cream',
                'warlike', 'dependent', 'steer', 'admit',
                'superman', 'stranger-things','smooth',
                'alison-parker', 'drag-&-drop'];
    
//init word
let randomWord;

//init score
let score = 0;

//init time
let time =10;

//set difficulty
let difficulty = localStorage.getItem('difficulty') !== null ? 
        localStorage.getItem('difficulty') : 'easy';

//set difficulty Select value
difficultySelect.value = difficulty; 

//focus on text on start
text.focus();

//start counting down
const timeInterval = setInterval(updateTime, 1000);

//generate random word from array
function getRandomWord(){
    return words[Math.floor(Math.random() * words.length)];
}


//add word in DOM
function addWordToDOM(){
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

//update score
function updateScore(){
    score += 10;
    scoreEl.innerHTML = score;
}

function updateTime(){
    time--;
    timeEl.innerHTML = time + 's';

    if (time === 0 ){
        clearInterval(timeInterval);
        
        //end the game
        gameOver();
    }
}


function gameOver(){
    endGameEl.innerHTML = `
        <h1>Time Run Out</h1>
        <p>Your Final Score is ${score}</p>
        <button onclick='location.reload()'>Reload</button>
    `;
    endGameEl.style.display = 'flex';
}

addWordToDOM();

text.addEventListener('input', e => {
    const insertText = e.target.value;
    if(insertText === randomWord){
        addWordToDOM();
        updateScore();

        e.target.value = '';

        if(difficulty == 'hard'){
            time += 2;
        }
        else if(difficulty == 'medium'){
            time += 4;
        }
        else{
            time +=5 ;
        }

        updateTime();
    }
});

//settings btn click
settingsBtn.addEventListener('click', () =>
    settings.classList.toggle('hide'));

//settings select
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
});