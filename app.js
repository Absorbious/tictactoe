const boxes = document.querySelectorAll('.box');
const resetBox = document.querySelector('.reset-game')
const playerX = document.querySelector('.player-x')
const playerO = document.querySelector('.player-o');
const character = 'X'
let turnSwap;


playerX.addEventListener('click', () => (turnSwap = false));
playerO.addEventListener('click', () => (turnSwap = true));

resetBox.addEventListener('click', resetGame);

boxes.forEach(box => {
    box.addEventListener('click', handleClick, { once:true });
})

function handleClick(e){
    console.log('clicked');
    const currentCharacter = turnSwap ? (e.target.innerText = 'O') : (e.target.innerText = 'X');
    swapTurns();
}

function swapTurns(){
    turnSwap = !turnSwap;
}

function resetGame(){
    boxes.forEach(box => {
        box.innerText = '';
        box.addEventListener('click', handleClick, { once:true });
    })
    turnSwap = false;
}