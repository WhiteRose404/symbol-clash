import Piece from './index.mjs';
import { colToDigit, digitToCol, remapped, createBoardFromSnapShot } from "../utils/index.mjs";
export default class King extends Piece{
    constructor(row, col, color, dead = false, firstMove = true){
        super(row, col, "king", color, dead, firstMove);
        this.check = false;
    }

    // getters
    getMoves(board){
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
    isCheckMate(board){
        // the king is in check
        const attackers = this.setKingEnemys(board);
        if(attackers.length === 0) return false; // the king is not in check

        // the king cannot move to a safe square
        const moves = this.getMoves(board);
        const opponentPieces = board.getPlayerPieces(this.color === "white" ? "black" : "white");
        const safeMoves = moves.filter(move => {
            const { row, col } = move;
            const targets = this._safeCell(board, opponentPieces, row, col); 
            return targets.length === 0;
            // the case where the king can capture the attacker is considered here
            // since the opponentPieces array does not contain the attacker initial position
            // actually it does but the attacker is protected by another piece
            // so the king cannot capture the attacker

            // for now we have one way to discove whether the king is in check
            // is by actually making the move and then see if the our king is in check if thats the case
            // we would simply rollback, naive approach but it works for now.
            // with this new requirement we need to implement a new method in the board class
            // called fakeMove which will make a move and return the board
            // and another method called rollback which will rollback the board to its previous state

            // the fakeMove if showed promise will be used globally in the game
            // getting rid of the early implementation of the rollback method

        });
        if(safeMoves.length > 0){
            // we have safe moves, but do we actually can move there with the king 
            // the king cannot move if theres another piece protecting it (the safe move)
            const poisenedSafeMoves = safeMoves.filter(move => {
                // const newBoard = board.fakeMove(this, move); // need to implement this method
                const newBoard = createBoardFromSnapShot(board.getSnapShot());
                const target = newBoard.getPiece(move.row, move.col);
                const init = newBoard.getPiece(this.row, this.col);
                const response = newBoard.move(init, target);
                console.log(newBoard.getPlayerKing(this.color), board.getPlayerKing(this.color));
                return !response.moved;
            });
            if(poisenedSafeMoves.length > 0) return false;
        }
        
        // the king can be protected by another piece
        // burte force for now

        // optimization: we can get the pieces that are protecting the king
        // we can use them to make future decisions
        const alias = board.getPlayerPieces(this.color);
        const protectors = alias.filter(piece => {
            if(piece.getType() === "empty" || piece.isDead()) return false;
            const moves = piece.getMoves(board);
            const { row, col } = piece.getCell();
            const hasPotential = moves.some(move => {
                // const newBoard = board.fakeMove(piece, move);
                const newBoard = createBoardFromSnapShot(board.getSnapShot());
                // newBoard.specialMark = true; be aware that when you make a fake move
                // the code will also check for checkmate inside of the virtual board
                // luckily the first condition is met since that piece will be protecting the king
                const target = newBoard.getPiece(move.row, move.col);
                const init = newBoard.getPiece(row, col);
                const response = newBoard.move(init, target);
                return response.moved;
            });
            return hasPotential;
        });
        if(protectors.length > 0) return false;

        // the king is dead RIP
        return true;
    }
    isChecked(board){
        const targets = this.setKingEnemys(board);
        return targets.length > 0;
    }

    // setters
    setKingEnemys(board){
        const opponentPieces = board.getPlayerPieces(this.color === "white" ? "black" : "white");
        return this._safeCell(board, opponentPieces, this.row, this.col);
    }

    // methods
    _safeCell(board, opponentPieces, row, col){
        // return the attacker if the cell is not safe
        // belongs to utils/index.mjs
        const setTarget = opponentPieces.filter(piece => {
            if(piece.getType() === "empty" || piece.isDead()) return false;
            const moves = piece.getMoves(board);
            return moves.some(move => move.row === row && move.col === col);
        });
        return setTarget;
    }
}