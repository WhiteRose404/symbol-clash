
import { mapping, remapped } from '../utils/index.mjs';
// mapped convert from chess notation to array notation
// remapped convert from array notation to chess notation
import Ghost from "../pieces/ghost.mjs";

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
    constructor(whitePlayer, blackPlayer, turn = "white", lastMove = null) {
        this.whitePlayer = whitePlayer;
        this.blackPlayer = blackPlayer;
        this.turn = turn;
        this.lastMove = lastMove;
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
                const element = {
                    row, col, color, type, dead, firstMove
                }
                if(type === "empty"){
                    new Error("Snapshot: invalid piece type");
                }
                copy.push(element);
            }
            return copy;
        }
        const whitePiecesCopy = deep_copy(this.getPlayerPieces("white"));
        const blackPiecesCopy = deep_copy(this.getPlayerPieces("black"));
        return {
            white: whitePiecesCopy,
            black: blackPiecesCopy,
            turn: this.turn,
            lastMove: this.lastMove
        };
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
    getLastMove() {
        return this.lastMove;
    }

    // setters
    setTurn(turn) {
        this.turn = turn;
    }
    setLastMove(lastMove) {
        this.lastMove = lastMove;
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
            // update the last move
            this.setLastMove(initialPiece.getCell());
            this.turn = this.turn === "white" ? "black" : "white";
            // switched turn
            // check whether the king is dead
            const king = this.getPlayerKing(this.turn);
            if(king.isCheckMate(this)){
                return  {
                    moved: true,
                    checkMate: true,
                    error: ""
                }
            }
        }
        return response;
    }
}