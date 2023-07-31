import Piece from './index.mjs';
import { colToDigit, digitToCol, horizontal_diagonal } from "../utils/index.mjs";

export default class Bishop extends Piece{
    constructor(row, col, color){
        super(row, col, "bishop", color);
    }
    getMoves(board){
        // the bishop can move in 4 diagonal directions
        // 1. up right
        // 2. up left
        // 3. down right
        // 4. down left
        const chessBoard = board.getBoard();
        const moves = [];
        const { row, col } = this.getCellForBoard();
        // up right
        horizontal_diagonal(row, col, -1, 1, moves, this.color, chessBoard);
        // up left
        horizontal_diagonal(row, col, -1, -1, moves, this.color, chessBoard);
        // down right
        horizontal_diagonal(row, col, 1, 1, moves, this.color, chessBoard);
        // down left
        horizontal_diagonal(row, col, 1, -1, moves, this.color, chessBoard);
        return moves;
    }
    isBlocked(to, board){
        // const direction = (from, to) => {
        //     const { row: currentRow, col: currentCol } = from.getCell();
        //     const { row, col } = to.getCell();
        //     return ( 
        //         row > currentRow ?
        //             (
        //                 colToDigit[col] > colToDigit[currentCol] ?
        //                     "up right" : "up left"
        //             ) : (
        //                 colToDigit[col] > colToDigit[currentCol] ?
        //                     "down right" : "down left"
        //             )
        //     );
        // }
        // const { row, col } = to.getCell();
        // const { row: currentRow, col: currentCol } = this.getCell();
        // const whichDiagonal = direction(this, to);
        // console.log("whichDiagonal", whichDiagonal);
        // const path = this.getMoves()
        //   .filter(
        //         move =>{
        //             if( move.row === currentRow && move.col === currentCol) return false;
        //             switch(whichDiagonal){
        //                 case "up right":
        //                     return (move.row < row && colToDigit[move.col] < colToDigit[col]) && (move.row > currentRow && colToDigit[move.col] > colToDigit[currentCol]);
        //                 case "up left":
        //                     return (move.row < row && colToDigit[move.col] > colToDigit[col]) && (move.row > currentRow && colToDigit[move.col] < colToDigit[currentCol]);
        //                 case "down right":
        //                     return (move.row > row && colToDigit[move.col] < colToDigit[col]) && (move.row < currentRow && colToDigit[move.col] > colToDigit[currentCol]);
        //                 case "down left":
        //                     return (move.row > row && colToDigit[move.col] > colToDigit[col]) && (move.row < currentRow && colToDigit[move.col] < colToDigit[currentCol]);
        //             }
        //         });
        // const playground = board.getBoard();
        // return path.some(move => playground[move.row - 1][colToDigit[move.col]].getPiece().type !== 'ghost');
        return false;
    }
}