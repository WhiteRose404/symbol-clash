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
export const horizontal_diagonal = (row, col, dirow, dicol, moves, color, board, frendlyFire = false) => {
    row += dirow;
    col += dicol;
    while(row >= 0 && row < 8 && col >= 0 && col < 8 && board[row][col].getColor() !== color){
        moves.push(remapped(row, col));
        if(board[row][col].getColor() !== "neutral") break;
        row += dirow;
        col += dicol;
    }
}