import Chess from 'chess.js';
import {k, q, r, b, n, p, coorToPos} from './Constants';

// white pieces have posigive scores
export const findBestMove = (depth, chess, turn, score)=> {
  if (depth === 0) {
    return boardScore(chess, turn);
  }

  const validMoves = chess.moves();
  const currentTurn = chess.turn();
  if (currentTurn == turn) {
      let bestMove = -9999;
      for (let i = 0; i < validMoves.length; i++) {
        chess.move(validMoves[i]);
        bestMove = Math.max(bestMove, findBestMove(depth - 1, chess, turn, bestMove));
        chess.undo();
        if (bestMove >= score) {
          return bestMove;
        }
      }
      return bestMove;
  } else {
      let bestMove = 9999;
      for (let i = 0; i < validMoves.length; i++) {
        chess.move(validMoves[i]);
        bestMove = Math.min(bestMove, findBestMove(depth - 1, chess, turn, bestMove));
        chess.undo();
        if (bestMove < score) {
          return bestMove;
        }
      }
      return bestMove;
  }
};

const boardScore = (chess, turn) => {
  let score = 0;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (chess.get(coorToPos(i, j)) === null) {
        continue;
      }
      let bi = 7-i;
      let bj = 7-j;
      const piece = chess.get(coorToPos(i, j));
      if (piece.type == 'p' && piece.color == 'b') {
        score -= 10 * (p[bi][bj] + 1);
      } else if (piece.type == 'p' && piece.color == 'w') {
        score += 10 * (p[i][j] + 1);
      } else if (piece.type == 'n' && piece.color == 'b') {
        score -= 30 * (n[bi][bj] + 1);
      } else if (piece.type == 'n' && piece.color == 'w') {
        score += 30 * (n[i][j] + 1);
      } else if (piece.type == 'b' && piece.color == 'b') {
        score -= 30 * (b[bi][bj] + 1);
      } else if (piece.type == 'b' && piece.color == 'w') {
        score += 30 * (b[i][j] + 1);
      } else if (piece.type == 'r' && piece.color == 'b') {
        score -= 50 * (r[bi][bj] + 1);
      } else if (piece.type == 'r' && piece.color == 'w') {
        score += 50 * (r[i][j] + 1);
      } else if (piece.type == 'q' && piece.color == 'b') {
        score -= 90 * (q[bi][bj] + 1);
      } else if (piece.type == 'q' && piece.color == 'w') {
        score += 90 * (q[i][j] + 1);
      } else if (piece.type == 'k' && piece.color == 'b') {
        score -= 900 * (k[bi][bj] + 1);
      } else if (piece.type == 'k' && piece.color == 'w') {
        score += 900 * (k[i][j] + 1);
      }
    }
  }
  if (turn == 'b') {
    return -score;
  }
  return score;
};
