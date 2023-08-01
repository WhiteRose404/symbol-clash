import Piece from './index.mjs';
import { colToDigit, digitToCol, horizontal_diagonal } from "../utils/index.mjs";

export default class Rock extends Piece{
    constructor(row, col, color, dead = false, firstMove = true){
        super(row, col, "rock", color, dead, firstMove);
    }
    // isDead(){
    //     throw Error("Cannot call abstract method");
    // }
    getMoves(board, frendlyFire = false){
        const chessBoard = board.getBoard();
        const moves = [];
        // console.log("in Rock getMoves", this.col, this.row);
        const row = parseInt(this.getCell().row) - 1; // for normalizing the row and col add +1 in the end
        const col = colToDigit[this.getCell().col];
        // up
        horizontal_diagonal(row, col, -1, 0, moves, this.color, chessBoard, frendlyFire);
        // down
        horizontal_diagonal(row, col, 1, 0, moves, this.color, chessBoard, frendlyFire);
        // right
        horizontal_diagonal(row, col, 0, 1, moves, this.color, chessBoard, frendlyFire);
        // left
        horizontal_diagonal(row, col, 0, -1, moves, this.color, chessBoard, frendlyFire);
        return moves;
    }
    // searchPath(row, col){
    //     // const { row: currentRow, col: currentCol } = this.getCell();
    //     // // rock can move in 2 directions
    //     // // 1. horizontal
    //     // // 2. vertical
    //     // // check whether the target cell is in the horizontal direction
    //     // if(currentRow === row){
    //     //     console.log("horizontal");
    //     //     const moves = this.getMoves().filter(move => move.row === row);
    //     //     console.log("moves", moves);
    //     //     if(colToDigit[col] < colToDigit[currentCol]){
    //     //         // left direction
    //     //         const leftMoves = moves.filter(move => colToDigit[move.col] < colToDigit[currentCol] && colToDigit[move.col] > colToDigit[col]);
    //     //         console.log("left moves", leftMoves);
    //     //         return leftMoves;
    //     //     }else{
    //     //         // right direction
    //     //         const rightMoves = moves.filter(move => colToDigit[move.col] > colToDigit[currentCol] && colToDigit[move.col] < colToDigit[col]);
    //     //         console.log("right moves", rightMoves);
    //     //         return rightMoves;
    //     //     }
    //     // }else if(colToDigit[col] === colToDigit[currentCol]){
    //     //     // check whether the target cell is in the up direction
    //     //     const moves = this.getMoves().filter(move => move.col === col);
    //     //     console.log("vertical", moves)
    //     //     if(row < currentRow){
    //     //         // up direction
    //     //         const upMoves = moves.filter(move => move.row < currentRow && move.row > row);
    //     //         console.log("U moves", upMoves)
    //     //         return upMoves;
    //     //     }else{
    //     //         // down direction
    //     //         console.log("D checking", row, currentRow)
    //     //         const downMoves = moves.filter(move => move.row > currentRow && move.row < row);
    //     //         console.log("D moves", downMoves);
    //     //         return downMoves;
    //     //     }
    //     // }else {
    //     //     console.log("invalid move");
    //     //     return [];
    //     // }
    // }



    // isBlocked(to, board){
    //     // another strategy is search for the piece in the board
    //     // return the path from the current cell to the target cell
    //     // and check whether there is a piece between the current cell
    //     // and the target cell
    //     // const { row, col } = to.getCell();
    //     // const path = this.searchPath(row, col);
    //     // console.log("path", path);
    //     // for(let i = 0; i < path.length; i++){
    //     //     const { row, col } = path[i];
    //     //     if(this.col === col && this.row === row){
    //     //         console.log("continue", this.col, this.row)
    //     //         continue;
    //     //     }
    //     //     console.log("checking", row, col)
    //     //     const cell = board.getPiece(row - 1, colToDigit[col]);
    //     //     if(cell.getPiece().type !== 'ghost'){
    //     //         return true;
    //     //     }
    //     // }
    //     return false;
    // }
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
    //         type: "Rock",
    //         color: this.color,
    //         selected: this.selected,
    //     }
    // }
}