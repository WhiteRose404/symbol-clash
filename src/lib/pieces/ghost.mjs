// it is used to represent the empty cells
import Piece from './index.mjs';

export default class Ghost extends Piece{
    constructor(row, col){
        super(row, col, "empty", "neutral", false, false);
    }
}