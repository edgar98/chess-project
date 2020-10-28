import Piece from './piece.js';
import { isSameDiagonal } from '../helpers'
import store from '../store/store'

export default class Pawn extends Piece {
  constructor(player) {
    super(player, (player === 1 ? "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg"));
    this.initialPositions = {
      1: [48, 49, 50, 51, 52, 53, 54, 55],
      2: [8, 9, 10, 11, 12, 13, 14, 15]
    }
    this.enPassantPositions = {
      1: [24, 25, 26, 27, 28, 29, 30, 31],
      2: [32, 33, 34, 35, 36, 37, 38, 39]
    }
  }

  isMovePossible(src, dest, isDestEnemyOccupied, boolSquares) {

    if (this.player === 1) {
      // check for en passant 
      if (
          (dest === src - 7 
            && !isDestEnemyOccupied 
            && isSameDiagonal(src, dest) 
            && this.enPassantPositions[1].indexOf(src) !== -1
            && boolSquares[src + 1]
            && store.state.canEnPassant == (src + 1)
          ) || 
          (dest === src - 9 
            && !isDestEnemyOccupied 
            && isSameDiagonal(src, dest)
            && this.enPassantPositions[1].indexOf(src) !== -1
            && boolSquares[src - 1]
            && store.state.canEnPassant == (src - 1)
          )
        ) {
        return true
      }
      // check for long_move
      if (dest === src - 16 && !isDestEnemyOccupied && this.initialPositions[1].indexOf(src) !== -1) {
        console.log('white long_move')
        store.state.canEnPassant = dest
        store.state.counter = -1
        return true
      }
      // check for usual move
      if ((dest === src - 8 && !isDestEnemyOccupied)) {
        return true;
      }
      // check for hit
      else if (isDestEnemyOccupied && isSameDiagonal(src, dest) && (dest === src - 9 || dest === src - 7)) {
        return true;
      }
    }
    else if (this.player === 2) {
      // check for usual move
      if ((dest === src + 8 && !isDestEnemyOccupied)) {
        return true;
      }
      // check for long_move
      if (dest === src + 16 && !isDestEnemyOccupied && this.initialPositions[2].indexOf(src) !== -1) {
        console.log('black long_move')
        store.state.canEnPassant = dest
        store.state.counter = -1
        return true;
      }
      // check for hit
      else if (isDestEnemyOccupied && isSameDiagonal(src, dest) && (dest === src + 9 || dest === src + 7)) {
        return true;
      }
      // check for en passant 
      if (
        (dest === src + 7 
          && !isDestEnemyOccupied 
          && isSameDiagonal(src, dest) 
          && this.enPassantPositions[2].indexOf(src) !== -1
          && boolSquares[src - 1]
          && store.state.canEnPassant == (src - 1)
        ) || 
        (dest === src + 9 
          && !isDestEnemyOccupied 
          && isSameDiagonal(src, dest)
          && this.enPassantPositions[2].indexOf(src) !== -1
          && boolSquares[src + 1]
          && store.state.canEnPassant == (src + 1)
        )
      ) {
      return true
    }
    }
    return false;
  }

  /**
   * returns array of one if pawn moves two steps, else returns empty array  
   * @param  {[type]} src  [description]
   * @param  {[type]} dest [description]
   * @return {[type]}      [description]
   */
  getSrcToDestPath(src, dest) {
    if (dest === src - 16) {
      return [src - 8];
    }
    else if (dest === src + 16) {
      return [src + 8];
    }
    return [];
  }
}
