import { colToDigit, digitToCol } from '../utils/index.mjs';
import Piece from './index.mjs';

export default class Knight extends Piece{
    constructor(cell, color){
        super(cell, color);
    }
    // isDead(){
    //     throw Error("Cannot call abstract method");
    // }
    getMoves(board, frendlyFire = false){
        // the knight can move in 8 directions
        const chessBoard = board.getBoard();
        const moves = [];
        const push = (row, col) => {
            if(chessBoard[row - 1][col].getPiece().color !== this.color || frendlyFire){
                moves.push({
                    row: row,
                    col: digitToCol[col]
                });
            }
        };
        const row = parseInt(this.getCell().row);
        const col = colToDigit[this.getCell().col];

        // 2 up 1 right
        if(row - 2 >= 1 && col + 1 < 8){
            push(row - 2, col + 1);
            // moves.push({
            //     row: row - 2,
            //     col: digitToCol[col + 1],
            // });
        }
        // 2 up 1 left
        if(row - 2 >= 1 && col - 1 >= 0){
            push(row - 2, col - 1);
            // moves.push({
            //     row: row - 2,
            //     col: digitToCol[col - 1] 
            // });
        }
        // 2 down 1 right
        if(row + 2 <= 8 && col + 1 < 8){
            push(row + 2, col + 1);
            // moves.push({
            //     row: row + 2,
            //     col: digitToCol[col + 1]
            // });
        }
        // 2 down 1 left
        if(row + 2 <= 8 && col - 1 >= 0){
            push(row + 2, col - 1);
            // moves.push({
            //     row: row + 2,
            //     col: digitToCol[col - 1]
            // });
        }
        // 2 right 1 up
        if(row - 1 >= 1 && col + 2 < 8){
            push(row - 1, col + 2);
            // moves.push({
            //     row: row - 1,
            //     col: digitToCol[col + 2]
            // });
        }
        // 2 right 1 down
        if(row + 1 <= 8 && col + 2 < 8){
            push(row + 1, col + 2);
            // moves.push({
            //     row: row + 1,
            //     col: digitToCol[col + 2]
            // });
        }
        // 2 left 1 up
        if(row - 1 >= 1 && col - 2 >= 0){
            push(row - 1, col - 2);
            // moves.push({
            //     row: row - 1,
            //     col: digitToCol[col - 2]
            // });
        }
        // 2 left 1 down
        if(row + 1 <= 8 && col - 2 >= 0){
            push(row + 1, col - 2);
            // moves.push({
            //     row: row + 1,
            //     col: digitToCol[col - 2]
            // });
        }
        return moves;
    }

    canEat(to, board){
        const moves = this.getMoves(board);
        const { row, col } = to.getCell();
        return moves.some(move => move.row === row && move.col === col);
    }
    isBlocked(){
        // the night can be never blocked // unless it is in the edge of the board or the king is in check
        // which will be handled later
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
    getPiece(){
        return {
            type: "Knight",
            color: this.color,
            selected: this.selected,
        }
    }
}