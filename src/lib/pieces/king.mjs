import Piece from './index.mjs';
import { remapped, createBoardFromSnapShot } from "../utils/index.mjs";
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


        // special move: castling
        // the king can switch places with the rook if the following conditions are met
        // 1. the king and the rook have not moved
        // 2. there are no pieces between the king and the rook
        // 3. the king is not in check
        // 4. the king will not be in check after castling
        const { right, left } = this.castling(board);
        if(right){
            moves.push(remapped(row, col + 2));
        }
        if(left){
            moves.push(remapped(row, col - 2));
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
    move(target, board){
        const { col: initCol } = this.getCellForBoard();
        const { col: targetCol } = target.getCellForBoard();
        const castling = Math.abs(initCol - targetCol) === 2;
        if(!castling){
            return super.move(target, board);
        }
        // special move: castling
        const moves = this.getMoves(board);
        const validMove = moves.find(move => {
            const { row, col } = move;
            const { row: targetRow, col: targetCol } = target.getCell();
            return row === targetRow && col === targetCol;
        });
        if(!validMove){
            return {
                moved: false,
                error: "Invalid move"
            }
        }
        // move the king
        if(initCol > targetCol){
            // left castling
            const leftRock = board.getPiece(this.row, 'a');
            leftRock.move(board.getPiece(this.row, 'd'), board);
        }else{
            // right castling
            const rightRock = board.getPiece(this.row, 'h');
            const red = rightRock.move(board.getPiece(this.row, 'f'), board);
            console.log("right castling" , rightRock, red)
        }
        // move the king
        const { row, col } = target.getCell();
        this.row = row;
        this.col = col;
        return {
            moved: true,
            error: null
        }
    }
    castling(board){
        // special move: castling
        // the king can switch places with the rook if the following conditions are met
        // 1. the king and the rook have not moved
        // 2. there are no pieces between the king and the rook
        // 3. the king is not in check
        // 4. the king will not be in check after castling


        const response = {
            right: false,
            left: false
        };

        // king has not moved
        if(!this.firstMove) return response;

        // the king is not in check
        // if(this.isChecked(board)) return moves; error: infinite loop
        // go arround this 

        // safe passage
        const safePassageCastling = (init, target) => {
            const { row: initRow, col: initCol } = init.getCellForBoard();
            const { row: targetRow, col: targetCol } = target.getCellForBoard();
            // basic checks rook side
            if(target.getType() !== "rock") return false;
            if(initRow !== targetRow) return false;
            if(!target.isFirstMove()) return false;

            // check if there are pieces between the king and the rook
            const colDiff = Math.abs(initCol - targetCol);
            const colDirection = initCol > targetCol ? -1 : 1;
            for(let i = 1; i < colDiff; i++){
                const col = initCol + (i * colDirection);
                const piece = board.getPiece(initRow, col);
                // backword check: from this position scan the board in all directions
                // and check if there are any pieces that can attack this cell
                // if there are then the king cannot castle
                const attack = this._reverseCheck(board, piece);
                if(piece.getType() !== "empty") return false;
                if(attack) return false;
            }
            return true;
        };
        // the king cannot castle if there are pieces between the king and the rook
        const leftRock = board.getPiece(this.row, 'a');
        response.left = safePassageCastling(this, leftRock);
        const rightRock = board.getPiece(this.row, 'h');
        response.right = safePassageCastling(this, rightRock);
        return response;
    }
    // internal methods
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
    _reverseCheck(board, piece){
        const {color} = this.getCell();
        const {row, col} = piece.getCellForBoard();
        const isAllowed = (dirow, dicol, enemys) => {
            for(let i = row + dirow, j = col + dicol; i >= 0 && i < 8 && j >= 0 && j < 8; i += dirow, j += dicol){
                const target = board.getPiece(i, j);
                const target_color = target.getColor();
                const target_type = target.getType();
                const hasEye = enemys.some(enemy => target_type === enemy);
                if(target_color !== color && hasEye) return true;
                if(target_type !== "empty") break;
            }
            return false;
        }
        const isPawnAttack = (dicol) => {
            const dirow = color === "white" ? -1 : 1;
            let i = row + dirow;
            let j = col + dicol;
            if(i < 0 || i >= 8 || j < 0 || j >= 8) return false;
            const target = board.getPiece(i, j);
            const target_color = target.getColor();
            const target_type = target.getType();
            if(target_color !== color && target_type === "pawn") return true;
            return false;
        }
        const isKnightAttack = (row, col, color) => {
            const dirow = [-2, -2, -1, -1, 1, 1, 2, 2];
            const dicol = [-1, 1, -2, 2, -2, 2, -1, 1];
            for(let i = 0; i < 8; i++){
                const r = row + dirow[i];
                const c = col + dicol[i];
                if(r < 0 || r >= 8 || c < 0 || c >= 8) continue;
                const target = board.getPiece(r, c);
                const target_color = target.getColor();
                const target_type = target.getType();
                if(target_color !== color && target_type === "knight") return true;
            }
            return false;
        }
        const isKingAttack = (row, col, color) => {
            const dirow = [-1, -1, -1, 0, 0, 1, 1, 1];
            const dicol = [-1, 0, 1, -1, 1, -1, 0, 1];
            for(let i = 0; i < 8; i++){
                const r = row + dirow[i];
                const c = col + dicol[i];
                if(r < 0 || r >= 8 || c < 0 || c >= 8) continue;
                const target = board.getPiece(r, c);
                const target_color = target.getColor();
                const target_type = target.getType();
                if(target_color !== color && target_type === "king") return true;
            }
            return false;
        }
        // special case: pawn
        if(isPawnAttack(1) || isPawnAttack(-1)) return true;
        // special case: knight
        if(isKnightAttack(row, col, color)) return true;
        // special case: king
        if(isKingAttack(row, col, color)) return true;
        // horizontal top to bottom
        if(isAllowed(-1, 0, ["queen", "rock"])) return true;
        // horizontal bottom to top
        if(isAllowed(1, 0, ["queen", "rock"])) return true;
        // vertical left to right
        if(isAllowed(0, 1, ["queen", "rock"])) return true;
        // vertical right to left
        if(isAllowed(0, -1, ["queen", "rock"])) return true;
        // diagonal top left to bottom right
        if(isAllowed(-1, 1, ["queen", "bishop"])) return true;
        // diagonal top right to bottom left
        if(isAllowed(-1, -1, ["queen", "bishop"])) return true;
        // diagonal bottom left to top right
        if(isAllowed(1, 1, ["queen", "bishop"])) return true;
        // diagonal bottom right to top left
        if(isAllowed(1, -1, ["queen", "bishop"])) return true;
        return false;
    }
}