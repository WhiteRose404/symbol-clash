import { mapping } from '../utils/index.mjs';

export default class Piece{
    constructor(row, col, type, color, dead = false){
        this.row = row;
        this.col = col;
        this.type = type;
        this.color = color;
        this.dead = false;
    }

    // getters
    isDead(){
        return this.dead;
    }
    getCell(){
        return {
            row: this.row,
            col: this.col,
            color: this.color,
            type: this.type
        }
    }
    getCellForBoard(){
        return mapping({
            row: this.row,
            col: this.col
        })
    }
    getType(){
        return this.type;
    }
    getColor(){
        return this.color;
    }
    kill(){
        this.dead = true;
        this.row = null;
        this.col = null;
        this.type = "empty";
        this.color = "neutral";
    }

    // methods
    move(target, board){
        const { targetRow, targetCol } = target;
        const moves = this.getMoves(board);
        const validMove = moves.find(move => move.row === targetRow && move.col === targetCol);
        if(!validMove){
            return {
                moved: false,
                error: "Invalid move"
            }
        }
        if(target.getType() !== "empty"){
            // kill the target
            const actualTarget = board.getPiece(targetRow, targetCol);
            actualTarget.kill();
        }
        // move the piece
        this.row = targetRow;
        this.col = targetCol;
        return {
            moved: true,
            error: ""
        }
    }
}