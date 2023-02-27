// Set up game
//declare and assign variable for player
const player1 = 'red';
const player2 = 'yellow';  
let currentPlayer = player1;

//selector element
const body = document.querySelector('body');
const girdboardGame = document.getElementById('grid-board-game');
const board = document.querySelectorAll('board');


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
//For each row create 7 columns to get the match column id
function boardGame(){
    for (let r = 0; r < 6; r++){
        for(let c = 0; c < 7; c++){
            const div = document.createElement('div');
            div.classList.add('board')
            div.classList.add(`row-${r}`);
            div.classList.add(`col-${c}`);
            div.id = `${r}${c}` 
            girdboardGame.appendChild(div);
        }
    }
}


//call function
body.appendChild(girdboardGame);
topBoardGame();
boardGame();


/* create current piece function to show color piece depend on players
    add btnID as parameter to get which col will be selected
    then show the current piece
*/
function putPiece (btnID){

    //select query button from buttonID parameter
    const selectedBtn = document.getElementById(btnID);

    //get the last number in the id of getBtnID object
    const lastID = selectedBtn.id.slice(-1);
    
    const colSelected = document.querySelectorAll(`.col-${lastID}`);
    console.log(`%c--col${lastID}--`,`color:yellow`);
    console.log(colSelected)

    for (let c = colSelected.length - 1; c >= 0 ; c--){

        if (colSelected[c].classList.contains('red') || colSelected[c].classList.contains('yellow') ){
            console.log(`slot ${c} filled`)
        }else{
            colSelected[c].classList.add(currentPlayer);
            break;
        }
    }

    if (currentPlayer === player1){
        currentPlayer = player2;
    }else{
        currentPlayer = player1;
    }

}


//Find which button will be selected 
const buttons = document.querySelectorAll('.select-button');

buttons.forEach(button =>{

    button.addEventListener('click', function(event){

        //When clicked the current piece will show on the board game
        //call function currentPiece 
        putPiece(event.target.id);
        console.log(event.target.id);
        

    })
})
