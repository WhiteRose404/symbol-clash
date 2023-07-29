import Player from '../index.mjs';
import Rook from '../../pieces/rock.mjs';
import Knight from '../../pieces/knight.mjs';
import Bishop from '../../pieces/bishop.mjs';
import Queen from '../../pieces/queen.mjs';
import King from '../../pieces/king.mjs';
import Pawn from '../../pieces/pawn.mjs';


export default class BlackPlayer extends Player{
    constructor(){
        super("black");
        this.initializePieces();
    }
    initializePieces(){
        this.pieces.push(new Rook("a8", "black"));
        this.pieces.push(new Knight("b8", "black"));
        this.pieces.push(new Bishop("c8", "black"));
        this.pieces.push(new Queen("d8", "black"));
        this.pieces.push(new Bishop("f8", "black"));
        this.pieces.push(new Knight("g8", "black"));
        this.pieces.push(new Rook("h8", "black"));
        this.pieces.push(new Pawn("a7", "black"));
        this.pieces.push(new Pawn("b7", "black"));
        this.pieces.push(new Pawn("c7", "black"));
        this.pieces.push(new Pawn("d7", "black"));
        this.pieces.push(new Pawn("e7", "black"));
        this.pieces.push(new Pawn("f7", "black"));
        this.pieces.push(new Pawn("g7", "black"));
        this.pieces.push(new Pawn("h7", "black"));

        // set up the king
        const king = new King("e8", "black");
        // this.pieces.forEach(piece => {
        //     piece.setKing(king);
        // });
        // king.setKing(king);
        this.pieces.push(king);
    }
}