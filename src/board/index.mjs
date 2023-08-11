import WhitePlayer from "../lib/players/local/white.mjs";
import BlackPlayer from "../lib/players/local/black.mjs";
import Board from "../lib/board/index.mjs";


import { createBoardFromSnapShot, mapping, to1DArray } from "../lib/utils/index.mjs";

// game board
const gameBoard = document.querySelector('#game-board');
const cells = document.querySelectorAll('#game-board .cell');

// info box
const timeInfo = document.querySelector('#info-box > #time');
const generalInfo = document.querySelector('#info-box > #general');

// button's
const backButton = document.querySelector('#back');
const resignButton = document.querySelector('#resign');
const menuButton = document.querySelector('#menu');
const playAgainButton = document.querySelector('#again');
const newGameButton = document.querySelector('#new-game');
const continueButton = document.querySelector('#continue');

// error box
const error = document.querySelector('#error-box');

// game logic
const whitePlayer = new WhitePlayer();
const blackPlayer = new BlackPlayer();
let board = new Board(whitePlayer, blackPlayer);
let gameEnded = false;
const game_history = [board.getSnapShot()]; // to be refactored: should store metadata only which
                                            // will be used to create a new board



// buttons listeners
backButton.addEventListener('click', (e)=>{
    e.preventDefault();
    board = rollback();
    updateBoard();
});

menuButton.addEventListener('click', (e)=>{
    e.preventDefault();
    window.location.href = "/";
});

playAgainButton.addEventListener('click', (e)=>{
    e.preventDefault();

    // show the board
    gameBoard.classList.remove('hidden');
    // hide the winner box
    document.querySelector('#winner').classList.add('hidden');
    // hide the second set of buttons
    document.querySelector('#second-set').classList.add('hidden');


    // show the third set of buttons
    if(!gameEnded && game_history.length > 1){
        document.querySelector('#third-set').classList.remove('hidden');
        return;
    }
    // new game
    const whitePlayer = new WhitePlayer();
    const blackPlayer = new BlackPlayer();
    board = new Board(whitePlayer, blackPlayer);
    gameEnded = false;
    // console.log(game_history.length);
    while(game_history.length > 0) game_history.pop(); // delete the history
    game_history.push(board.getSnapShot());
    backButton.disabled = true;
    updateBoard();
    // show the first set of buttons
    document.querySelector('#first-set').classList.remove('hidden');
    // reset the board
    
});

continueButton.addEventListener('click', (e)=>{
    e.preventDefault();
    // hide the winner box
    document.querySelector('#winner').classList.add('hidden');
    // hide the second set of buttons
    document.querySelector('#second-set').classList.add('hidden');
    // hide the third set of buttons
    document.querySelector('#third-set').classList.add('hidden');
    // show the first set of buttons
    document.querySelector('#first-set').classList.remove('hidden');
});

newGameButton.addEventListener('click', (e)=>{
    e.preventDefault();
    const whitePlayer = new WhitePlayer();
    const blackPlayer = new BlackPlayer();
    board = new Board(whitePlayer, blackPlayer);
    gameEnded = false;
    // console.log(game_history.length);
    while(game_history.length > 0) game_history.pop(); // delete the history
    game_history.push(board.getSnapShot());
    backButton.disabled = true;
    updateBoard();
    
    // hide the winner box
    document.querySelector('#winner').classList.add('hidden');
    // hide the second set of buttons
    document.querySelector('#second-set').classList.add('hidden');
    // hide the third set of buttons
    document.querySelector('#third-set').classList.add('hidden');
    // show the first set of buttons
    document.querySelector('#first-set').classList.remove('hidden');
});

resignButton.addEventListener('click', (e)=>{
    e.preventDefault();
    // hide the board
    gameBoard.classList.add('hidden');
    // hide the first set of buttons
    document.querySelector('#first-set').classList.add('hidden');
    // hide the board
    document.querySelector('#game-board').classList.add('hidden');
    // show the winner box
    document.querySelector('#winner').classList.remove('hidden');
    document.querySelector(`#winner .${board.getTurn()}-player`).classList.remove('hidden');
    // show the second set of buttons
    document.querySelector('#second-set').classList.remove('hidden');
});



// let alreadySelected = false;
let initialPosition = null;
updateBoard();
cells.forEach((cell) => {
    const row = parseInt(cell.dataset.row);
    const column = parseInt(cell.parentNode.dataset.column);
    cell.addEventListener('click', handleClick);
    function handleClick (e){
        e.preventDefault();
        if(!initialPosition){
            const validInitailPosition = checkingInitialPiece(row, column, board);
            if(validInitailPosition.moved){
                initialPosition = { row, column };
                const moves = board.getPiece(row, column).getMoves(board);
                moves.forEach(move => {
                    const { row, col } = mapping(move);
                    cells[to1DArray(row, col)].classList.add('target');
                });
                // error.classList.add('hidden');
            }else if(validInitailPosition.error){
                error.innerHTML = validInitailPosition.error;
                error.classList.remove('hidden');
            }
        }else{
            const initialPiece = board.getPiece(initialPosition.row, initialPosition.column); // to be refactored
            const targetPiece = board.getPiece(row, column); // to be refactored
            cells.forEach(cell => cell.classList.remove('target'));
            if(initialPosition.row === row && initialPosition.column === column){
                // deselect
                initialPosition = null;
                updateBoard();
                return;
            }
            const response = board.move(initialPiece, targetPiece);
            game_history.push(board.getSnapShot());
            // enable the back button
            backButton.disabled = false;
            if(!response.moved){
                // fix the check issue
                // invalid move
                // if(response.check){
                    board = rollback();
                // }
                error.innerHTML = response.error;
                error.classList.remove('hidden');
            }
            // there is a checkmate
            if(response.checkMate){
                // game over
                // show the winner
                // show the play again button
                // back to the main menu
                // show the game history

                // remove the event listener
                removeListeners();
                gameEnded = true;
                console.log("checkmate");
                console.log("game_history", game_history);
            }

            initialPosition = null;
        }
        updateBoard();
    }
    function removeListeners(){
        cells.forEach(cell => cell.removeEventListener('click', handleClick));
    }
});

function rollback(){
    // return the board to the previous state
    // and return the board
    console.log("activated rollback")
    if(game_history.length > 1)
        game_history.pop();
    else 
        new Error("Rollback error");
    if(game_history.length === 1){
        // disable the back button
        backButton.disabled = true;
    }
    console.log("game_history", game_history);
    const new_board = createBoardFromSnapShot(game_history[game_history.length - 1]);
    return new_board;
}


// check if the piece is a valid initial position
function checkingInitialPiece(row, col, chessBoard){
    const piece = chessBoard.getPiece(row, col);
    if(piece.getType() === "empty"){
        return {
            moved: false,
            error: "You can't select an empty cell"
        };
    }else if(piece.getColor() !== chessBoard.getTurn()){
        return {
            moved: false,
            error: "You can't select an opponent piece"
        };
    }
    return {
        moved: true,
        error: ""
    };
}

// update board
function updateBoard(){
    const chess = board.getBoard();
    // console.log(board, chess)

    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
            const piece = chess[i][j];
            const type = piece.getType();
            const color = piece.getColor();
            cells[to1DArray(i, j)].innerHTML = type === "empty" ? "" : `<img loading="lazy" class="piece ${type === "king" && piece.isChecked(board) ? "check": ""}" src="/media/pieces/${color}/${type.toLowerCase()}.png" alt="${color}-${type}">`;
        }
    }
}