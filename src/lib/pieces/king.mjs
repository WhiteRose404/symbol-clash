import Piece from './index.mjs';
import { colToDigit, digitToCol, remapped } from "../utils/index.mjs";
export default class King extends Piece{
    constructor(row, col, color, dead = false, firstMove = true){
        super(row, col, "king", color, dead, firstMove);
        this.check = false;
    }

    // getters
    getMoves(board, frendlyFire = false){
        // the king is one of the most important pieces in the game
        // yet its one of the hardest to implement
        // the king can move one step in any direction
        // the king can move to any square that is not under attack by the opponent
        // the player cannot make a move that puts his king in check
        // the game ends when the king is in checkmate
        // special move: castling
        // the king can move two squares to the left or right and the rook will jump over the king
        // the king cannot castle if he is in check
        //                           he has moved before
        //                           the rook has moved before
        //                           there are pieces between the king and the rook
        //                           the king will be in check after castling
        //                           there is an attack on the king's path


        // implement the castling later

        // strategy: to implement check
        // we need to get all the moves of the opponent
        // and check if the king is in any of those moves
        // if the king is in any of those moves
        // then the king is in check
        // if the king is in check


        
        const chessBoard = board.getBoard();
        const moves = [];
        const push = (row, col) => {
            const piece = board.getPiece(row, col, chessBoard);
            if( piece.getColor() !== this.color ){
                moves.push(remapped(row, col));
            }
        };
        const { row, col } = this.getCellForBoard();
        // up
        if(row - 1 >= 0){
            push(row - 1, col);
        }
        // down
        if(row + 1 < 8){
            push(row + 1, col);
        }
        // left
        if(col - 1 >= 0){
            push(row, col - 1);
        }
        // right
        if(col + 1 < 8){
            push(row, col + 1);
        }
        // up right
        if(row - 1 >= 0 && col + 1 < 8){
            push(row - 1, col + 1);
        }
        // up left
        if(row - 1 >= 0 && col - 1 >= 0){
            push(row - 1, col - 1);
        }
        // down right
        if(row + 1 < 8 && col + 1 < 8){
            push(row + 1, col + 1);
        }
        // down left
        if(row + 1 < 8 && col - 1 >= 0){
            push(row + 1, col - 1);
        }
        return moves;
    }
    isBlocked(to, board){
        // the king cannot be blocked ??? BRUH
        return false;
    }
    isChecked(board){
        const opponentPieces = board.getPlayerPieces(this.color === "white" ? "black" : "white");
        // console.log("opponentPieces", opponentPieces, "who is this", this.color);        
        const setTarget = opponentPieces.filter(piece => {
            if(piece.getType() === "empty" || piece.isDead()) return false;
            const moves = piece.getMoves(board);
            return moves.some(move => move.row === this.row && move.col === this.col);
        });
        return setTarget.length > 0;
    }

    // setters
    setKingEnemys(board, opponent){
        // const chessBoard = board.getBoard();
        const opponentPieces = opponent.getPieces();
        const setTarget = opponentPieces.filter(piece => {
            if(piece.getPiece().type === "ghost" || piece.isDead()) return false;
            const moves = piece.getMoves(board);
            return moves.some(move => move.row === this.row && move.col === this.col);
        });
        setTarget.forEach(piece => {
            console.log("piece", piece.getMoves(board));
        });
        console.log("row", this.row, "col", this.col, "setTarget", setTarget)
        this.check = setTarget.length > 0;
    }
}