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

//loop button and addEventListener for click event 
buttons.forEach(button =>{

    button.addEventListener('click', function(event){

        //When clicked the current piece will show on the board game
        //call function currentPiece 
        putPiece(event.target.id);
        
        
    })
})


/* 
putPiece function to show color piece depend on players
Input: btnID  - as input parameter to get which col will be selected
then show the current piece
*/
function putPiece (btnID){

    //select element by ID with buttonID parameter
    const selectedBtn = document.getElementById(btnID);
    console.log(`%c--button selected--`,`color:yellow`);
    console.log(selectedBtn.id);

    //get the last character in the id of selectedBtn.  This is the column number 
    const colNum = selectedBtn.id.slice(-1);
    
    //get all spots for column number
    const colSelected = document.querySelectorAll(`.col-${colNum}`);
    console.log(`%c--col${colNum}--`,`color:yellow`);
    console.log(colSelected);

    let r = colSelected.length - 1;

    //loop from botton to top to check where to put the piece
    for (r = colSelected.length - 1; r >= 0 ; r--){

        if (colSelected[r].classList.contains('red') || colSelected[r].classList.contains('yellow') ){
            console.log(`slot ${r} filled`)

        }else{
            colSelected[r].classList.add(currentPlayer);
            console.log(currentPlayer,"orgin");
            //call the checkWinner function to check winner and change the currentplayer
            checkWinner(colNum, r);
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
/*
    Check winner function to check who is winner
    Input: colNum as a column number of current piece (last played piece)
           rolNum as a row number of current piece
*/
function checkWinner(colNum, rolNum){

    //vertical
    //get list element from the column number 
    const allColumns = document.querySelectorAll(`.col-${colNum}`);

    //loop each element to check 4 pieces are matching color is win
    for( let i = allColumns.length - 1  ; i >= 0; i --){
        if(allColumns[i].classList.contains(currentPlayer)){
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
    //get list element from the row number
    const allRows = document.querySelectorAll(`.row-${rolNum}`); // c is row number
    console.log(allRows)

    //loop each element to check 4 peices are matching color is win
    for (let r = 0; r < allRows.length ; r++){
        if(allRows[r].classList.contains(currentPlayer)){
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
    let r = rolNum; //5
    let c = Number(colNum); // 0
    while (r < 5 && c > 0){
        r = r + 1;
        c = c - 1;
        console.log(r,c);
    }
    console.log("pass", r,c)

    while(r > 0){
        r = r - 1;
        c = c + 1;
        console.log(r, c);
        const diagonal = document.querySelector(`.row-${r}.col-${c}`);
        console.log(diagonal);
    }

}

function setWinner(){
    winner.textContent = (`${currentPlayer} WIN`);
    buttons.forEach(btn =>{
        btn.disabled = true;
    })
}


