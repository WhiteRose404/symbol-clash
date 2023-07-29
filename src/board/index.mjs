import WhitePlayer from "../lib/players/local/white.mjs";
import BlackPlayer from "../lib/players/local/black.mjs";
import Board from "../lib/board/index.mjs";


import { colToDigit } from "../lib/utils/index.mjs";

// game board
const cells = document.querySelectorAll('#game-board .cell');

// info box
const timeInfo = document.querySelector('#info-box > #time');
const generalInfo = document.querySelector('#info-box > #general');

// error box
const error = document.querySelector('#error-box');

// game logic
const whitePlayer = new WhitePlayer();
const blackPlayer = new BlackPlayer();
let board = new Board(whitePlayer, blackPlayer);
const game_history = [board];

let alreadySelected = false;
let initialPosition = null;

cells.forEach((cell) => {
    updateBoard();
    const row = parseInt(cell.dataset.row);
    const column = parseInt(cell.parentNode.dataset.column);

    cell.addEventListener('click', (e) => {
        e.preventDefault();
        if(!alreadySelected){
            const validInitailPosition = checkingInitialPiece(row, column, board);
            if(validInitailPosition.moved){
                initialPosition = { row, column };
                alreadySelected = true;
                // error.classList.add('hidden');
            }else if(validInitailPosition.error){
                error.innerHTML = validInitailPosition.error;
                error.classList.remove('hidden');
            }
        }else{
            const initialPiece = board.getPiece(initialPosition.row, initialPosition.column); // to be refactored
            const targetPiece = board.getPiece(row, column); // to be refactored
            const response = board.move(initialPiece, targetPiece);
            if(!response.moved){
                // invalid move
                if(response.check)
                    board = rollback();
                error.innerHTML = response.error;
                error.classList.remove('hidden');
            }else{
                alreadySelected = false;
                initialPosition = null;
            }
        }
        updateBoard();
    });
});


function rollback(){
    // return the board to the previous state
    // and return the board
    if(game_history.length === 1){
        console.warn("You can't rollback anymore");
        return game_history[0];
    }
    game_history.pop();
    return game_history[game_history.length - 1];
}


// check if the piece is a valid initial position
function checkingInitialPiece(row, col, chessBoard){
    // to be specified

}

// update board
function updateBoard(){
    // to be specified
    const chess = board.getBoard();
    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
            const piece = chess[i][j].getPiece();
            cells[i * 8 + j].innerHTML = piece.type === "empty" ? "" : piece.type;
        }
    }
}