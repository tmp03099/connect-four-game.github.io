// Set up game
let pieceCurrentPlayer;
let piecePlayer1;
let piecePlayer2;

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
function currentPiece (btnID){
    const selectedBtn = document.getElementById(btnID);
    //get the last number in the id of getBtnID object
    const lastID = selectedBtn.id.slice(-1);
    
    const colSelected = document.querySelectorAll(`.col-${lastID}`);
    console.log(`%c--col${lastID}--`,`color:yellow`);
    console.log(colSelected)
    
   for (let i = colSelected.length - 1; i >= 0 ; i--){

        //check if element contains class Red or Yellow; iF not add class red or yellow and return
        if (colSelected[i].classList.contains('red') || colSelected[i].classList.contains('yellow') ){
            console.log("Y")    
            
        }else{
            colSelected[i].classList.add('red')
            break;
        }
        console.log(i)
   }

}


//Find which button will be selected 
const buttons = document.querySelectorAll('.select-button');

buttons.forEach(button =>{

    button.addEventListener('click', function(event){

        console.log(event.target.id);
        //When clicked the current piece will show on the board game
        //call function currentPiece 
       currentPiece(event.target.id);
    
    })
})
