import Piece from './index.mjs';
import { colToDigit, digitToCol } from "../utils/index.mjs";
export default class King extends Piece{
    constructor(cell, color){
        super(cell, color);
        this.check = false;
    }

    getMoves(board, frendlyFire = false){
        // the king is one of the most important pieces in the game
        // yet its one of the hardest to implement
        // the king can move one step in any direction
        // the king can move to any square that is not under attack by the opponent
        // the player cannot make a move that puts his king in check
        // the game ends when the king is in checkmate
        // special move: castling
        // the king can move two squares to the left or right and the rook will jump over the king
        // the king cannot castle if he is in check
        //                           he has moved before
        //                           the rook has moved before
        //                           there are pieces between the king and the rook
        //                           the king will be in check after castling
        //                           there is an attack on the king's path


        // implement the castling later

        // strategy: to implement check
        // we need to get all the moves of the opponent
        // and check if the king is in any of those moves
        // if the king is in any of those moves
        // then the king is in check
        // if the king is in check

        const chessBoard = board.getBoard();
        const rightfullMoves = [];
        const push = (row, col) => {
            if(chessBoard[row - 1][col].getPiece().color !== this.color || frendlyFire){
                rightfullMoves.push({
                    row: row,
                    col: digitToCol[col]
                });
            }
        };
        const row = parseInt(this.getCell().row) - 1; // for normalizing the row and col add +1 in the end
        const col = colToDigit[this.getCell().col];
        // up
        if(row - 1 >= 0){
            push(row, col);
        }
        // down
        if(row + 1 < 8){
            push(row + 2, col);
        }
        // left
        if(col - 1 >= 0){
            push(row + 1, col - 1);
        }
        // right
        if(col + 1 < 8){
            push(row + 1, col + 1);
        }
        // up right
        if(row - 1 >= 0 && col + 1 < 8){
            push(row, col + 1);
        }
        // up left
        if(row - 1 >= 0 && col - 1 >= 0){
            push(row, col - 1);
        }
        // down right
        if(row + 1 < 8 && col + 1 < 8){
            push(row + 2, col + 1);
        }
        // down left
        if(row + 1 < 8 && col - 1 >= 0){
            push(row + 2, col - 1);
        }

        // to avoid the king to move to a square that is under attack
        const illegalMoves = [];
        if(!frendlyFire){
            // ////////////////////////////////////////////////////////////////////////////////////////////////////////////
            // tmp solution
            board.getPlayerPieces(this.color === "white" ? "black" : "white").forEach(piece => {
                if(piece.getPiece().type === "ghost" || piece.isDead()) return;
                // console.log("piece of oponente is: ", piece.getPiece());
                // console.log("piece of oponente moves are: ", piece.getMoves(board, true));
                illegalMoves.push(...piece.getMoves(board, true));
            });
            // ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        }
        const moves = rightfullMoves.filter(move => {
            return !illegalMoves.some(m => m.row === move.row && m.col === move.col);
        });
        return moves;
    }
    canEat(to, board){
        const moves = this.getMoves(board);
        const { row, col } = to.getCell();
        return moves.some(move => move.row === row && move.col === col);
    }
    isBlocked(to, board){
        // the king cannot be blocked ??? BRUH
        return false;
    }
    setKingEnemys(board, opponent){
        // const chessBoard = board.getBoard();
        const opponentPieces = opponent.getPieces();
        const setTarget = opponentPieces.filter(piece => {
            if(piece.getPiece().type === "ghost" || piece.isDead()) return false;
            const moves = piece.getMoves(board);
            return moves.some(move => move.row === this.row && move.col === this.col);
        });
        setTarget.forEach(piece => {
            console.log("piece", piece.getMoves(board));
        });
        console.log("row", this.row, "col", this.col, "setTarget", setTarget)
        this.check = setTarget.length > 0;
    }
    isChecked(){
        return this.check;
    }
    getPiece(){
        return {
            type: "King",
            color: this.color,
            selected: this.selected,
        }
    }
}