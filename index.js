// Set up game
//declare and assign variable for player
const player1 = 'red';
const player2 = 'yellow';  
let currentPlayer = player1;

//selector element
const body = document.querySelector('body');
const girdboardGame = document.getElementById('grid-board-game');
const board = document.querySelectorAll('board');
const winner = document.getElementById('winner');

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


//call function
body.appendChild(girdboardGame);
topBoardGame();
boardGame();

//Find which selected button
const buttons = document.querySelectorAll('.select-button');

buttons.forEach(button =>{

    button.addEventListener('click', function(event){

        //When clicked the current piece will show on the board game
        //call function currentPiece 
        putPiece(event.target.id);
        
        
    })
})


/* 
putPiece function to show color piece depend on players
Input: btnID  - as parameter to get which col will be selected
then show the current piece
*/
function putPiece (btnID){

    //select query button from buttonID parameter
    const selectedBtn = document.getElementById(btnID);
    console.log(`%c--button selected--`,`color:yellow`);
    console.log(selectedBtn.id);

    //get the last character in the id of selectedBtn.  This is the column number 
    const colNum = selectedBtn.id.slice(-1);
    
    //get all spots for column number
    const colSelected = document.querySelectorAll(`.col-${colNum}`);
    console.log(`%c--col${colNum}--`,`color:yellow`);
    console.log(colSelected);

    let c = colSelected.length - 1;

    //loop from botton to top to check where to put the piece
    for (c = colSelected.length - 1; c >= 0 ; c--){

        if (colSelected[c].classList.contains('red') || colSelected[c].classList.contains('yellow') ){
            console.log(`slot ${c} filled`)

        }else{
            colSelected[c].classList.add(currentPlayer);
            console.log(currentPlayer,"orgin");
            //call the checkWinner function before check the current player and change it
            checkWinner(colSelected, c);
            if (currentPlayer === player1){
                currentPlayer = player2;
            }else{
                currentPlayer = player1;
            }
            break;
        }
    }
    
}

let total = 0;
//Check winner
function checkWinner(getId, c){
    //vertical
    for( let i = getId.length - 1  ; i >= 0; i --){
        if(getId[i].classList.contains(currentPlayer)){
            total += 1;
            console.log(total,currentPlayer)
            if (total === 4){
                setWinner();
                break;
            }
        }else{
            total = 0 ;
        }
    }

    //horizontal
    const allRows = document.querySelectorAll(`.row-${c}`); // c is row number
    for (let r = 0; r < allRows.length ; r++){
        if(allRows[r].classList.contains('red')){
            total += 1;
            if (total === 4){
                setWinner();
                break;
            }
        }else{
            total = 0 ;
        }
    }

    //diagonal
    



}

function setWinner(){
    winner.textContent = (`${currentPlayer} WIN`);
    buttons.forEach(btn =>{
        btn.disabled = true;
    })
}


