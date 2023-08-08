import Piece from './index.mjs';
import { colToDigit, digitToCol } from "../utils/index.mjs";

export default class Pawn extends Piece{
    constructor(row, col, color, dead = false, firstMove = true){
        super(row, col, "pawn", color, dead, firstMove);
    }
    getMoves(board){
        if(this.isDead()){
            return [];
        }
        const chessBoard = board.getBoard();
        const path = [];
        const push = (row, col, sides, color) => {
            if(row >= 1 && row <= 8 && colToDigit[col] >= 0 && colToDigit[col] < 8){
                const piece = board.getPiece(row, col, chessBoard);
                if((piece.getType() === "empty" && !sides) || (piece.getColor() === color && sides)){
                    path.push({
                        col: col,
                        row: row,
                    });
                    return true;
                }
                return false;
            }
        }
        if(this.color === "white"){
            if(this.firstMove){
                if(push(3, this.col)){
                    push(4, this.col);
                }
            }else if(this.row >= 8){
                // promotion
                return [];
            }else{
                push(parseInt(this.row) + 1, this.col);
            }
            // eat left & right
            push(parseInt(this.row) + 1, digitToCol[colToDigit[this.col] - 1], true, "black");
            push(parseInt(this.row) + 1, digitToCol[colToDigit[this.col] + 1], true, "black");
        }
        else{
            if(this.firstMove){
                if(push(6, this.col)){
                    push(5, this.col);
                }
            }else if(this.row === 1){
                return [];
            }
            else{
                push(parseInt(this.row) - 1, this.col);
            }
            // eat left & right
            push(parseInt(this.row) - 1, digitToCol[colToDigit[this.col] - 1], true, "white");
            push(parseInt(this.row) - 1, digitToCol[colToDigit[this.col] + 1], true, "white");
        }

        // special move: en passant
        const lastMove = board.getLastMove();
        if(lastMove){
            const { row, col, color, type } = lastMove;
            if(type !== "pawn") return path;
            if(color === this.color) return path;
            if(row !== this.row || (row !== 4 && color === "white") || (row !== 5 && color === "black")) return path;
            if(colToDigit[col] === colToDigit[this.col] - 1 || colToDigit[col] === colToDigit[this.col] + 1){
                if(color === "white"){
                    path.push({
                        row: 3,
                        col: col,
                        kill: { row, col }
                    });
                }else{
                    path.push({
                        row: 6,
                        col: col,
                        kill: { row, col }
                    });
                }
            }
        }
        return path;
    }
}