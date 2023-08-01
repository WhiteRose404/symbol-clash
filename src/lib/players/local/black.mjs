import Player from '../index.mjs';
import Rook from '../../pieces/rock.mjs';
import Knight from '../../pieces/knight.mjs';
import Bishop from '../../pieces/bishop.mjs';
import Queen from '../../pieces/queen.mjs';
import King from '../../pieces/king.mjs';
import Pawn from '../../pieces/pawn.mjs';


export default class BlackPlayer extends Player{
    constructor(pieces = []){
        super("black", pieces);
        if(pieces.length === 0) this.initializePieces();
    }
    initializePieces(){
        this.pieces.push(new Rook(8, "a", "black"));
        this.pieces.push(new Knight(8, "b", "black"));
        this.pieces.push(new Bishop(8, "c", "black"));
        this.pieces.push(new Queen(8, "d", "black"));
        this.pieces.push(new Bishop(8, "f", "black"));
        this.pieces.push(new Knight(8, "g", "black"));
        this.pieces.push(new Rook(8, "h", "black"));
        this.pieces.push(new Pawn(7, "a", "black"));
        this.pieces.push(new Pawn(7, "b", "black"));
        this.pieces.push(new Pawn(7, "c", "black"));
        this.pieces.push(new Pawn(7, "d", "black"));
        this.pieces.push(new Pawn(7, "e", "black"));
        this.pieces.push(new Pawn(7, "f", "black"));
        this.pieces.push(new Pawn(7, "g", "black"));
        this.pieces.push(new Pawn(7, "h", "black"));

        // set up the king
        const king = new King(8, "e", "black");
        // this.pieces.forEach(piece => {
        //     piece.setKing(king);
        // });
        // king.setKing(king);
        this.pieces.push(king);
    }
}