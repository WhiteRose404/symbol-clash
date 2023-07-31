import Piece from './index.mjs';
import { colToDigit, digitToCol } from "../utils/index.mjs";

export default class Pawn extends Piece{
    constructor(row, col, color){
        super(row, col, "pawn", color);
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
                console.log("piece get type -------> ", piece, col, row)
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
        return path;
    }
    isBlocked(to, board){
        // // in the case of a pawn we need to check if the move is blocked
        // // by another piece
        // // we do that by checking whether is there a piece in the possible moves
        // // between the current cell and the destination cell
        
        // // hence the sorting of the moves by row
        // const moves = this.getMoves()
        //     .sort((a, b) => this.getPiece().color==="white" ? a.row - b.row : b.row - a.row);
        // const { row, col } = to.getCell();
        // if(!moves.some(move => move.row === row && move.col === col)){
        //     // seams like the move is intended to capture a piece
        //     // don't make any assumptions, let the validation handle it
        //     // we have this anomoaly because the only piece that captures differently
        //     // is the pawn (a better design wouldn't have these headaches)
        //     return false;
        // }
        // console.log("create a path ?", moves, row, col);
        // for(let i = 0; i < moves.length; i++){
        //     const piece = board.getPiece(moves[i].row - 1, colToDigit[moves[i].col]);
        //     if(piece.getPiece().type !== "ghost"){
        //         return true;
        //     }
        //     if(moves[i].row === row && moves[i].col === col){
        //         break;
        //     }
        // }
        return false;
    }
    // getCell(){
    //     throw Error("Cannot call abstract method");
    // }
    // setCell(){
    //     throw Error("Cannot call abstract method");
    // }
    // getColor(){
    //     throw Error("Cannot call abstract method");
    // }
    // getPiece(){
    //     return {
    //         type: "Pawn",
    //         color: this.color,
    //         selected: this.selected,
    //     }
    // }
}