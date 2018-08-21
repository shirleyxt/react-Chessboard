import Chess from 'chess.js';

// white pieces have posigive scores
export const findBestMove = (depth, chess, turn)=> {
  if (depth === 0) {
    return boardScore(chess.board(), turn);
  }
  const validMoves = chess.moves();
  for (let i = 0; i < validMoves.length; i++) {
    if (chess.turn() == turn) {
        let bestMove = -9999;
        for (let i = 0; i < validMoves.length; i++) {
          chess.move(validMoves[i]);
          turn = turn === 'b' ? 'w' : 'b';
          bestMove = Math.max(bestMove, findBestMove(depth - 1, chess, turn));
          turn = turn === 'b' ? 'w' : 'b';
          chess.undo();
        }
        return bestMove;
    } else {
        let bestMove = 9999;
        for (let i = 0; i < validMoves.length; i++) {
          chess.move(validMoves[i]);
          turn = turn === 'b' ? 'w' : 'b';
          bestMove = Math.min(bestMove, findBestMove(depth - 1, chess, turn));
          turn = turn === 'b' ? 'w' : 'b';
          chess.undo();
        }
        return bestMove;
    }
  }
};

const boardScore = (board, turn) => {
  let whiteScores = 0;
  let blackSocres = 0;
  for (let i = 0; i < board.length; i++) {
    if (board[i].type == 'p' && board[i].color == 'b') {
      blackSocres += 10;
    } else if (board[i].type == 'p' && board[i].color == 'w') {
      whiteScores += 10;
    }
    if (board[i].type == 'k' && board[i].color == 'b') {
      blackSocres += 30;
    } else if (board[i].type == 'k' && board[i].color == 'w') {
      whiteScores += 30;
    }
    if (board[i].type == 'b' && board[i].color == 'b') {
      blackSocres += 30;
    } else if (board[i].type == 'b' && board[i].color == 'w') {
      whiteScores += 30;
    }
    if (board[i].type == 'r' && board[i].color == 'b') {
      blackSocres += 50;
    } else if (board[i].type == 'r' && board[i].color == 'w') {
      whiteScores += 50;
    }
    if (board[i].type == 'q' && board[i].color == 'b') {
      blackSocres += 90;
    } else if (board[i].type == 'q' && board[i].color == 'w') {
      whiteScores += 90;
    }
    if (board[i].type == 'k' && board[i].color == 'b') {
      blackSocres += 900;
    } else if (board[i].type == 'k' && board[i].color == 'w') {
      whiteScores += 900;
    }
  }
  if (turn == 'b') {
    return blackSocres - whiteScores;
  }
  return whiteScores - blackSocres;
};
