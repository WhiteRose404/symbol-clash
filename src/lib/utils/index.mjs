import BlackPlayer from "../players/local/black.mjs";
import WhitePlayer from "../players/local/white.mjs";
import Board from "../board/index.mjs";


// pieces
import Pawn from "../pieces/pawn.mjs";
import Rock from "../pieces/rock.mjs";
import Knight from "../pieces/knight.mjs";
import Bishop from "../pieces/bishop.mjs";
import Queen from "../pieces/queen.mjs";
import King from "../pieces/king.mjs";


export const colToDigit = {
    'a': 0,
    'b': 1,
    'c': 2,
    'd': 3,
    'e': 4,
    'f': 5,
    'g': 6,
    'h': 7
}
export const digitToCol = {
    0: 'a',
    1: 'b',
    2: 'c',
    3: 'd',
    4: 'e',
    5: 'f',
    6: 'g',
    7: 'h'
}
export const mapping = ({ row, col }) => {
    return {
        row: row - 1,
        col: colToDigit[col]
    }
}
export const remapped = ( row, col ) => {
    return {
        row: row + 1,
        col: digitToCol[col]
    }
}
export const to1DArray = (i, j) => {
    return j * 8 + i;
}
export const horizontal_diagonal = (row, col, dirow, dicol, moves, color, board) => {
    row += dirow;
    col += dicol;
    while(row >= 0 && row < 8 && col >= 0 && col < 8 && board[row][col].getColor() !== color){
        moves.push(remapped(row, col));
        if(board[row][col].getColor() !== "neutral") break;
        row += dirow;
        col += dicol;
    }
}

export const createBoardFromSnapShot = (snapShot) => {
    const { white, black, turn, lastMove } = snapShot;
    const pieces = (pieces) => {
        const arr = [];
        pieces.forEach(piece => {
            const { row, col, color, type, dead, firstMove } = piece;
            switch(type){
                case "pawn":
                    arr.push(new Pawn(row, col, color, dead, firstMove));
                    break;
                case "rock":
                    arr.push(new Rock(row, col, color, dead, firstMove));
                    break;
                case "knight":
                    arr.push(new Knight(row, col, color, dead, firstMove));
                    break;
                case "bishop":
                    arr.push(new Bishop(row, col, color, dead, firstMove));
                    break;
                case "queen":
                    arr.push(new Queen(row, col, color, dead, firstMove));
                    break;
                case "king":
                    arr.push(new King(row, col, color, dead, firstMove));
                    break;
                default:
                    new Error("Snapshot: invalid piece type");
            }
        });
        return arr;
    }
    const whitePlayer = new WhitePlayer(pieces(white));
    const blackPlayer = new BlackPlayer(pieces(black));
    const board = new Board(whitePlayer, blackPlayer, turn, lastMove);
    return board;
}