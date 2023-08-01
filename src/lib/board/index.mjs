
import { mapping, remapped } from '../utils/index.mjs';
// mapped convert from chess notation to array notation
// remapped convert from array notation to chess notation
import Ghost from "../pieces/ghost.mjs";
import Pawn from "../pieces/pawn.mjs";
import Rook from "../pieces/rock.mjs";
import Knight from "../pieces/knight.mjs";
import Bishop from "../pieces/bishop.mjs";
import Queen from "../pieces/queen.mjs";
import King from "../pieces/king.mjs";
import WhitePlayer from "../players/local/white.mjs";
import BlackPlayer from "../players/local/black.mjs";

export default class Board {    
    // intern methods
    emptyBoard() {
        const board = [];
        for(let i = 0; i < 8; i++){
            board.push([]);
            for(let j = 0; j < 8; j++){
                const { row, col } = remapped(i, j);
                const ghost = new Ghost(row, col);
                board[i].push(ghost);
            }
        }
        return board;
    }

    // constructors
    constructor(whitePlayer, blackPlayer, turn = "white") {
        this.whitePlayer = whitePlayer;
        this.blackPlayer = blackPlayer;
        this.turn = turn;
    }

    // getters
    getSnapShot() {
        // only store metadata of the board
        // to save memory
        // array deep copy
        function deep_copy(arr){
            const copy = [];
            for(let i = 0; i < arr.length; i++){
                const { row, col, color, type } = arr[i].getCell();
                const dead = arr[i].isDead();
                const firstMove = arr[i].isFirstMove();
                let element;
                switch(type){
                    case "empty":
                        element = new Ghost(row, col);
                        break;
                    case "pawn":
                        element = new Pawn(row, col, color, dead, firstMove);
                        break;
                    case "rock":
                        element = new Rook(row, col, color, dead, firstMove);
                        break;
                    case "knight":
                        element = new Knight(row, col, color, dead, firstMove);
                        break;
                    case "bishop":
                        element = new Bishop(row, col, color, dead, firstMove);
                        break;
                    case "queen":
                        element = new Queen(row, col, color, dead, firstMove);
                        break;
                    case "king":
                        element = new King(row, col, color, dead, firstMove);
                        break;
                }
                if(!element) {
                    console.log(arr[i]);
                    console.log(row, col, color, type, dead, firstMove)
                }
                copy.push(element);
            }
            return copy;
        }
        // console.log('white', this.getPlayerPieces("white"))
        const whitePiecesCopy = deep_copy(this.getPlayerPieces("white"));
        const blackPiecesCopy = deep_copy(this.getPlayerPieces("black"));
        const whiteCopy = new WhitePlayer(whitePiecesCopy);
        const blackCopy = new BlackPlayer(blackPiecesCopy);
        const boardCopy = new Board(whiteCopy, blackCopy, this.turn);
        console.log(boardCopy)
        return boardCopy;
    }
    getBoard() {
        return this.createBoard();
    }
    getPiece(row, col, board = this.getBoard()) {
        let mappedRow = row;
        let mappedCol = col;
        if(typeof col === "string"){
            const translation = mapping({ row, col });
            mappedRow = translation.row;
            mappedCol = translation.col;
        }
        return board[mappedRow][mappedCol];
    }
    getPlayerPieces(color) {
        return color === "white" ? this.whitePlayer.getPieces() : this.blackPlayer.getPieces();
    }
    getPlayerKing(color) {
        const pieces = color === "white" ? this.whitePlayer.getPieces() : this.blackPlayer.getPieces();
        const king = pieces.find(piece => piece.getType() === "king");
        if(!king) throw Error("King not found");
        return king;
    }
    getTurn() {
        return this.turn;
    }

    // methods
    createBoard() {
        const board = this.emptyBoard();
        const whitePieces = this.whitePlayer.getPieces();
        const blackPieces = this.blackPlayer.getPieces();
        const fill = (piece) => {
            if(piece.isDead()) return;
            const { row, col } = piece.getCellForBoard(); // accepts { row, col } and returns { row, col } 
            board[row][col] = piece;                      // with the correct mapping
        }
        for(let i = 0; i < 16; i++){
            fill(whitePieces[i]); 
            fill(blackPieces[i]); 
        }
        return board;
    }

    // move piece
    move(initialPiece, targetPiece) {
        // suppose for now that the move is valid
        const { color: initialColor } = initialPiece.getCell();
        const { color: targetColor } = targetPiece.getCell();

        // basic checks -- to be improved/removed
        // check if the target piece is not the same color as the initial piece
        if(initialColor !== this.turn) {
            return {
                moved: false,
                error: "It's not your turn"
            }
        }else if(initialPiece.getType() === "empty") {
            return {
                moved: false,
                error: ""
            }
        }else if(initialColor === targetColor) {
            return {
                moved: false,
                deselect: true,
            }
        }
        // move the piece
        const response = initialPiece.move(targetPiece, this);
        if(response.moved){
            initialPiece.firstMove = false;
            this.turn = this.turn === "white" ? "black" : "white";
        }
        return response;
    }
}