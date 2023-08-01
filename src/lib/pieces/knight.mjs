import { colToDigit, digitToCol, remapped } from '../utils/index.mjs';
import Piece from './index.mjs';

export default class Knight extends Piece{
    constructor(row, col, color, dead = false, firstMove = true){
        super(row, col, "knight", color, dead, firstMove);
    }
    getMoves(board, frendlyFire = false){
        // the knight can move in 8 directions
        const chessBoard = board.getBoard();
        const moves = [];
        const push = (row, col) => {
            const piece = board.getPiece(row, col, chessBoard);
            if(piece.getColor() !== this.color){
                moves.push(remapped(row, col));
            }
        };
        const { row, col } = this.getCellForBoard();
            
            // 2 up 1 right
        if(row - 2 >= 0 && col + 1 < 8) push(row - 2, col + 1);
                
            // 2 up 1 left
        if(row - 2 >= 0 && col - 1 >= 0) push(row - 2, col - 1);
                
            // 2 down 1 right
        if(row + 2 < 8 && col + 1 < 8) push(row + 2, col + 1);
                
            // 2 down 1 left
        if(row + 2 < 8 && col - 1 >= 0) push(row + 2, col - 1);
                
            // 2 right 1 up
        if(row - 1 >= 0 && col + 2 < 8) push(row - 1, col + 2);
                
            // 2 right 1 down
        if(row + 1 < 8 && col + 2 < 8) push(row + 1, col + 2);
                
            // 2 left 1 up
        if(row - 1 >= 0 && col - 2 >= 0) push(row - 1, col - 2);
                
            // 2 left 1 down
        if(row + 1 < 8 && col - 2 >= 0) push(row + 1, col - 2);
        return moves;
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
    // getPiece(){
    //     return {
    //         type: "Knight",
    //         color: this.color,
    //         selected: this.selected,
    //     }
    // }
}