
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
    constructor(whitePlayer, blackPlayer, turn = "white") {
        this.whitePlayer = whitePlayer;
        this.blackPlayer = blackPlayer;
        this.turn = turn;
    }

    // getters
    getSnapShot() {
        const whiteCopy = Object.assign(Object.getPrototypeOf(this.whitePlayer), this.whitePlayer);
        const blackCopy = Object.assign(Object.getPrototypeOf(this.blackPlayer), this.blackPlayer);
        const boardCopy = new Board(whiteCopy, blackCopy, turn);
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
            // const king = this.getPlayerPieces(this.turn).find(piece => piece.getPiece().type === "king");
            // if(king.isInCheck(this)){
            //     return {
            //         moved: false,
            //         check: true,
            //         error: "You cannot leave your king in check"
            //     }
            // }
            // change turn
            initialPiece.firstMove = false;
            this.turn = this.turn === "white" ? "black" : "white";
        }
        return response;
    }
}