// Set up game
//declare and assign variable for player
const player1 = 'red';
const player2 = 'yellow';  
let currentPlayer = player1;

//selector element
const body = document.querySelector('body');
const girdboardGame = document.getElementById('grid-board-game');
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
        btn.innerHTML = '<i class="fa-solid fa-circle-arrow-down"></i>';
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

    button.addEventListener('click', function(){

        //When clicked the current piece will show on the board game
        //call function currentPiece 
        console.log(this.id)
        putPiece(this.id);
        

    });
    button.addEventListener('mouseover',function(){ 

        button.animate([
            //keyframes
            {transform: "translateY(0px)"},
            {transform: "translateY(300px)"},
        ],
        {
            duration:1000,
            iterations: 1,
        }
        )
    });

    

    
})


/* 
putPiece function to show color piece depend on players
Input: btnID  - as input parameter to get which col will be selected
then show the current piece
*/
function putPiece (btnID){

    //select element by ID with buttonID parameter
    const selectedBtn = document.getElementById(btnID);

    //get the last character in the id of selectedBtn.  This is the column number 
    const colNum = selectedBtn.id.slice(-1);
    
    //get all spots for column number
    const colSelected = document.querySelectorAll(`.col-${colNum}`);
    
    console.log(`%c--col${colNum}--`,`color:yellow`);
    console.log(colSelected);

    let rowNum = colSelected.length - 1;

    //loop from botton to top to check where to put the piece
    for (rowNum ; rowNum >= 0 ; rowNum--){

        if (!colSelected[rowNum].classList.contains('red') && !colSelected[rowNum].classList.contains('yellow') ){
            colSelected[rowNum].classList.add(currentPlayer);
            console.log(currentPlayer,"orgin");
            //call the checkWinner function to check winner and change the currentplayer
            checkWinner(colNum, rowNum);
            if (currentPlayer === player1){
                currentPlayer = player2;
            }else{
                currentPlayer = player1;
            }
            break;
        }
    }
    
}


/*
    Check winner function to check who is winner
    Input: colNum as a column number of current piece (last played piece)
           rowNum as a row number of current piece
*/
function checkWinner(colNum, rowNum){

    // TODO vertical
    //get list element from the column number 
    const allColumns = document.querySelectorAll(`.col-${colNum}`);
    checkMatchingColor(allColumns)

    //TODO horizontal
    //get list element from the row number
    const allRows = document.querySelectorAll(`.row-${rowNum}`); // c is row number
    checkMatchingColor(allRows)
    
   

    //TODO diagonal - bottom left to top right
    //assign empty new array
    let diagonalArray =  [];

    //assign new variable to keep row and column number of current piece.
    let row = rowNum; //5
    let col = Number(colNum); // 0

    //find the most bottom left cordinate (the first peice)
    while (row < 5 && col > 0){
        row ++ ;
        col -- ;
    }

    //get the first piece element with row and column class
    let firstPiece = document.querySelector(`.row-${row}.col-${col}`);
    console.log(`%c--first diagonal peice--`,`color:yellow`);
    console.log(firstPiece)

    // get list of element for diagonal line without null element
    while (firstPiece != null){
        diagonalArray.push(firstPiece)
        row --;
        col ++;
        firstPiece = document.querySelector(`.row-${row}.col-${col}`);
    }
    checkMatchingColor(diagonalArray)

    //TODO anti diagonal - bottom right to top left
    //assign new array
    const antiDiagonalArray =  [];

    //assign new variable to keep row and column number of current piece.
    let antiRow = rowNum
    let antiCol = Number(colNum)

    //find the most bottom right to top left cordinate ( the first anti diagonal peice)
    while( antiRow < 5 && antiCol < 6){
        antiRow ++;
        antiCol ++;
    }

    //get the first anti diagonal piece element with row and column class
    let firstAntiDiagonalPiece = document.querySelector(`.row-${antiRow}.col-${antiCol}`);
    console.log(`%c--anti first peice--`,`color:yellow`);
    console.log(firstAntiDiagonalPiece)

    // get list of element for anti diagonal line without null element
    while(firstAntiDiagonalPiece != null){
        antiDiagonalArray.push(firstAntiDiagonalPiece);
        antiRow --;
        antiCol --;
        firstAntiDiagonalPiece = document.querySelector(`.row-${antiRow}.col-${antiCol}`);
    }
    checkMatchingColor(antiDiagonalArray);
}

function setWinner(){
    winner.textContent = (`${currentPlayer.toUpperCase()} PLAYER WINS`);
    buttons.forEach(btn =>{
        btn.disabled = true;
    })
}

function checkMatchingColor(arrList){
    let total = 0;
    //loop each element to check 4 peices are matching color is win
    for( let i = 0 ; i < arrList.length ; i ++){
        if(arrList[i].classList.contains(currentPlayer)){
            total ++;
            if (total === 4){
                setWinner();
                break;
            }else{
                checkFullBoard();
            }
        }else{
            total = 0 ;
        }
    }
}

//check fullBoard
function checkFullBoard(){
    let totalCheck = 0;
    const fullBoard = document.querySelectorAll('.board');
    fullBoard.forEach(item =>{
        if (item.classList.contains('red') || item.classList.contains('yellow')){
            totalCheck ++;
            if (totalCheck === 42){
                winner.textContent= 'NO ONE WINS';
            }
        }
    });
    
}


//get the reset button
function resetButton(){
   const board = document.querySelectorAll('.board');
   board.forEach(item =>{
        item.classList.remove('red','yellow');
   });
   buttons.forEach(btn =>{
        btn.disabled = false;
   });
   winner.textContent = '';
}

const resetBtn = document.getElementById('reset');
resetBtn.addEventListener('click' , resetButton );
