import Player from '../index.mjs';
import Rook from '../../pieces/rock.mjs';
import Knight from '../../pieces/knight.mjs';
import Bishop from '../../pieces/bishop.mjs';
import Queen from '../../pieces/queen.mjs';
import King from '../../pieces/king.mjs';
import Pawn from '../../pieces/pawn.mjs';


export default class WhitePlayer extends Player{
    constructor(){
        super("white");
        this.initializePieces();
    }
    initializePieces(){
        this.pieces.push(new Rook("a1", "white"));
        this.pieces.push(new Knight("b1", "white"));
        this.pieces.push(new Bishop("c1", "white"));
        this.pieces.push(new Queen("d1", "white"));
        this.pieces.push(new Bishop("f1", "white"));
        this.pieces.push(new Knight("g1", "white"));
        this.pieces.push(new Rook("h1", "white"));
        this.pieces.push(new Pawn("a2", "white"));
        this.pieces.push(new Pawn("b2", "white"));
        this.pieces.push(new Pawn("c2", "white"));
        this.pieces.push(new Pawn("d2", "white"));
        this.pieces.push(new Pawn("e2", "white"));
        this.pieces.push(new Pawn("f2", "white"));
        this.pieces.push(new Pawn("g2", "white"));
        this.pieces.push(new Pawn("h2", "white"));

        // set up the king
        const king = new King("e1", "white");
        // this.pieces.forEach(piece => {
        //     piece.setKing(king);
        // });
        // king.setKing(king);
        this.pieces.push(king);
    }
}