import Player from '../index.mjs';
import Rook from '../../pieces/rock.mjs';
import Knight from '../../pieces/knight.mjs';
import Bishop from '../../pieces/bishop.mjs';
import Queen from '../../pieces/queen.mjs';
import King from '../../pieces/king.mjs';
import Pawn from '../../pieces/pawn.mjs';


export default class WhitePlayer extends Player{
    constructor(pieces = []){
        super("white", pieces);
        if(pieces.length === 0) this.initializePieces();
    }
    initializePieces(){
        this.pieces.push(new Rook(1, "a", "white"));
        this.pieces.push(new Knight(1, "b", "white"));
        this.pieces.push(new Bishop(1, "c", "white"));
        this.pieces.push(new Queen(1, "d", "white"));
        this.pieces.push(new Bishop(1, "f", "white"));
        this.pieces.push(new Knight(1, "g", "white"));
        this.pieces.push(new Rook(1, "h", "white"));
        this.pieces.push(new Pawn(2, "a", "white"));
        this.pieces.push(new Pawn(2, "b", "white"));
        this.pieces.push(new Pawn(2, "c", "white"));
        this.pieces.push(new Pawn(2, "d", "white"));
        this.pieces.push(new Pawn(2, "e", "white"));
        this.pieces.push(new Pawn(2, "f", "white"));
        this.pieces.push(new Pawn(2, "g", "white"));
        this.pieces.push(new Pawn(2, "h", "white"));

        // set up the king
        const king = new King(1, "e", "white");
        // this.pieces.forEach(piece => {
        //     piece.setKing(king);
        // });
        // king.setKing(king);
        this.pieces.push(king);
    }
}