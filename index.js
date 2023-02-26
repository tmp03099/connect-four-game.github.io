// Set up game
let rows = 7;
let cols = 6;
let pieceCurrentPlayer;
let piecePlayer1;
let piecePlayer2;

//selector element
const body = document.querySelector('body');
const girdboardGame = document.getElementById('grid-board-game');

//create top board game to user control
function topBoardGame(){
    for (let i = 0; i < 7; i++){
        //create div, class and id
        const divOnTop = document.createElement('div');
        divOnTop.classList.add('top-board');

        //add button to select
        const btn = document.createElement('button');
        btn.classList.add('select-button');
        btn.id = `button-${i}`;
        divOnTop.appendChild(btn);
        girdboardGame.appendChild(divOnTop)
    }
}

//create board game
function boardGame(){
    for (let i = 0; i <42; i++){
        const div = document.createElement('div');
        div.classList.add('board');
        div.id = `item-${i}`;
        girdboardGame.appendChild(div);

    }
}

//create current piece function with color depend on players
function currentPiece (boxID){
    const applyID = document.getElementById('box');
    applyID.classList.add('red');
    girdboardGame.appendChild(applyID);
}


//Find which button will be selected 





body.appendChild(girdboardGame);
topBoardGame();
boardGame();
// showPiece();
