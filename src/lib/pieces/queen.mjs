import Piece from './index.mjs';
import { colToDigit, horizontal_diagonal, digitToCol } from "../utils/index.mjs";


export default class Queen extends Piece{
    constructor(row, col, color, dead = false, firstMove = true){
        super(row, col, "queen", color, dead, firstMove);
    }
    // isDead(){
    //     throw Error("Cannot call abstract method");
    // }
    getMoves(board){
        // the queen can move in 8 directions
        // moves = rook moves + bishop moves
        const chessBoard = board.getBoard();
        const moves = [];
        const row = parseInt(this.getCell().row) - 1; // for normalizing the row and col add +1 in the end
        const col = colToDigit[this.getCell().col];

        // up right
        horizontal_diagonal(row, col, -1, 1, moves, this.color, chessBoard);
        // up left
        horizontal_diagonal(row, col, -1, -1, moves, this.color, chessBoard);
        // down right
        horizontal_diagonal(row, col, 1, 1, moves, this.color, chessBoard);
        // down left
        horizontal_diagonal(row, col, 1, -1, moves, this.color, chessBoard);

        // up
        horizontal_diagonal(row, col, -1, 0, moves, this.color, chessBoard);
        // down
        horizontal_diagonal(row, col, 1, 0, moves, this.color, chessBoard);
        // right
        horizontal_diagonal(row, col, 0, 1, moves, this.color, chessBoard);
        // left
        horizontal_diagonal(row, col, 0, -1, moves, this.color, chessBoard);
        // console.log("moves", moves);
        return moves;
    }
    searchPath(row, col){
        // const { row: currentRow, col: currentCol } = this.getCell();
        // // rock can move in 2 directions
        // // 1. horizontal
        // // 2. vertical
        // // check whether the target cell is in the horizontal direction
        // if(currentRow === row){
        //     console.log("horizontal");
        //     const moves = this.getMoves().filter(move => move.row === row);
        //     console.log("moves", moves);
        //     if(colToDigit[col] < colToDigit[currentCol]){
        //         // left direction
        //         const leftMoves = moves.filter(move => colToDigit[move.col] < colToDigit[currentCol] && colToDigit[move.col] > colToDigit[col]);
        //         console.log("left moves", leftMoves);
        //         return leftMoves;
        //     }else{
        //         // right direction
        //         const rightMoves = moves.filter(move => colToDigit[move.col] > colToDigit[currentCol] && colToDigit[move.col] < colToDigit[col]);
        //         console.log("right moves", rightMoves);
        //         return rightMoves;
        //     }
        // }else if(colToDigit[col] === colToDigit[currentCol]){
        //     // check whether the target cell is in the up direction
        //     const moves = this.getMoves().filter(move => move.col === col);
        //     console.log("vertical", moves)
        //     if(row < currentRow){
        //         // up direction
        //         const upMoves = moves.filter(move => move.row < currentRow && move.row > row);
        //         console.log("U moves", upMoves)
        //         return upMoves;
        //     }else{
        //         // down direction
        //         console.log("D checking", row, currentRow)
        //         const downMoves = moves.filter(move => move.row > currentRow && move.row < row);
        //         console.log("D moves", downMoves);
        //         return downMoves;
        //     }
        // }else {
        //     console.log("invalid move");
        //     return [];
        // }
    }
    isBlockedDiagonal(to, board){
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
    }
    isBlockedHorizontalOrVertical(to, board){
        // const { row, col } = to.getCell();
        // const path = this.searchPath(row, col);
        // console.log("path", path);
        // for(let i = 0; i < path.length; i++){
        //     const { row, col } = path[i];
        //     if(this.col === col && this.row === row){
        //         console.log("continue", this.col, this.row)
        //         continue;
        //     }
        //     console.log("checking", row, col)
        //     const cell = board.getPiece(row - 1, colToDigit[col]);
        //     if(cell.getPiece().type !== 'ghost'){
        //         return true;
        //     }
        // }
        // return false;
    }
    isBlocked(to, board){
        // the queen can move in 8 directions
        // const { row, col } = to.getCell();
        // const { row: currentRow, col: currentCol } = this.getCell();
        // console.log("currentRow", currentRow, "currentCol", currentCol);
        // if(currentRow === row || currentCol === col){
        //     // horizontal or vertical
        //     return this.isBlockedHorizontalOrVertical(to, board);
        // }
        // return this.isBlockedDiagonal(to, board);
        return false;
    }
    // getPiece(){
    //     return {
    //         type: "Queen",
    //         color: this.color,
    //         selected: this.selected,
    //     }
    // }
}