export default class Player{
    constructor(color, pieces){
        this.color = color;
        this.pieces = pieces;
    }
    // getters
    getPieces(){
        return this.pieces;
    }
    getColor(){
        return this.color;
    }
}