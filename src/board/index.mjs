import WhitePlayer from "../lib/players/local/white.mjs";
import BlackPlayer from "../lib/players/local/black.mjs";
import Board from "../lib/board/index.mjs";


import { mapping, to1DArray } from "../lib/utils/index.mjs";

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
const game_history = [board.getSnapShot()]; // to be refactored: should store metadata only which
                                            // will be used to create a new board

let alreadySelected = false;
let initialPosition = null;
updateBoard();
cells.forEach((cell) => {
    const row = parseInt(cell.dataset.row);
    const column = parseInt(cell.parentNode.dataset.column);

    cell.addEventListener('click', (e) => {
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
            if(!response.moved){
                // fix the check issue
                // invalid move
                if(response.check)
                    board = rollback();
                error.innerHTML = response.error;
                error.classList.remove('hidden');
            }
            initialPosition = null;
        }
        updateBoard();
    });
});


function rollback(){
    // return the board to the previous state
    // and return the board
    console.log("activated rollback")
    if(game_history.length === 1){
        console.warn("You can't rollback anymore");
        return game_history[0];
    }
    game_history.pop();
    console.log("game_history", game_history);
    return game_history[game_history.length - 1];
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
            cells[to1DArray(i, j)].innerHTML = piece.getType() === "empty" ? "" : `<img loading="lazy" class="piece" src="/media/pieces/${piece.getColor()}/${piece.getType().toLowerCase()}.png" alt="${piece.getColor()}-${piece.getType()}">`;
        }
    }
}