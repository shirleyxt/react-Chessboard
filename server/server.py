from flask import Flask, render_template,request
import chess

app = Flask(__name__, static_folder="../frontend/", template_folder="../frontend/public/")


p = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
     5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0,
     1.0, 1.0, 2.0, 3.0, 3.0, 2.0, 1.0, 1.0,
     0.5, 0.5, 1.0, 2.5, 2.5, 1.0, 0.5, 0.5,
     0.0, 0.0, 0.0, 2.0, 2.0, 0.0, 0.0, 0.0,
     0.5, -0.5, -1.0, 0.0, 0.0, -1.0, -0.5, 0.5,
     0.5, 1.0, 1.0, -2.0, -2.0, 1.0, 1.0, 0.5,
     0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]

n = [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0,
     -4.0, -2.0, 0.0, 0.0, 0.0, 0.0, -2.0, -4.0,
     -3.0, 0.0, 1.0, 1.5, 1.5, 1.0, 0.0, -3.0,
     -3.0, 0.5, 1.5, 2.0, 2.0, 1.5, 0.5, -3.0,
     -3.0, 0.0, 1.5, 2.0, 2.0, 1.5, 0.0, -3.0,
     -3.0, 0.5, 1.0, 1.5, 1.5, 1.0, 0.5, -3.0,
     -4.0, -2.0, 0.0, 0.5, 0.5, 0.0, -2.0, -4.0,
     -5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0]

r = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
     0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5,
     -0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5,
     -0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5,
     -0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5,
     -0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5,
     -0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5,
     0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]

b = [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0,
     -1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0,
     -1.0, 0.0, 0.5, 1.0, 1.0, 0.5, 0.0, -1.0,
     -1.0, 0.5, 0.5, 1.0, 1.0, 0.5, 0.5, -1.0,
     -1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, -1.0,
     -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0,
     -1.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.5, -1.0,
     -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0]

k = [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0,
     -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0,
     -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0,
     -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0,
     -2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0,
     -1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0,
     2.0, 2.0, 0.0, 0.0, 0.0, 0.0, 2.0, 2.0,
     2.0, 3.0, 1.0, 0.0, 0.0, 1.0, 3.0, 2.0]

q = [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0,
     -1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0,
     -1.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0,
     -0.5, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5,
     0.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5,
     -1.0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0,
     -1.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, -1.0,
     -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0]

memo = {}
stats = {}


def boardScore(board, isWhiteTurn):
    boardPieces = board.piece_map()
    score = 0
    for i, piece in boardPieces.items():
        color_offset = 1 if piece.color else -1
        index = i if piece.color else 63-i
        if piece.piece_type == chess.PAWN:
            score += (p[index] + 10) * color_offset
        elif piece.piece_type == chess.KNIGHT:
            score += (n[index] + 30) * color_offset
        elif piece.piece_type == chess.BISHOP:
            score += (b[index] + 30) * color_offset
        elif piece.piece_type == chess.ROOK:
            score +=(r[index] + 50) * color_offset
        elif piece.piece_type == chess.QUEEN:
            score += (q[index] + 90) * color_offset
        elif piece.piece_type == chess.KING:
            score += (k[index] + 990) * color_offset
    if isWhiteTurn:
        return score
    return -score


def minimax(depth, board, isWhiteTurn, alpha, beta):
    stat = stats.get(depth, 0) + 1
    stats[depth] = stat
    if depth == 0:
        return boardScore(board, isWhiteTurn)
    fen = board.fen()
    if fen in memo:
        deepest = 0
        score = 0
        for lst in memo[fen]:
            if deepest < lst[0]:
                score = lst[1]
                deepest = lst[0]
        if deepest >= depth:
            return score

    if board.turn == isWhiteTurn :
        bestScore = -9999
        for move in board.legal_moves:
            board.push(move)
            bestScore = max(bestScore, minimax(depth-1, board, isWhiteTurn, alpha, beta))
            board.pop()
            alpha = max(alpha, bestScore)
            if beta <= alpha :
                saveToMemo(board.fen(), depth, bestScore)
                return bestScore
            # if bestScore >= score:
                # saveToMemo(board.fen(), depth, bestScore)
                # return bestScore
        saveToMemo(board.fen(), depth, bestScore)
        return bestScore
    else :
        bestScore = 9999
        for move in board.legal_moves:
            board.push(move)
            bestScore = min(bestScore, minimax(depth-1, board, isWhiteTurn, alpha, beta))
            board.pop()
            beta = min(beta, bestScore)
            if beta <= alpha:
                saveToMemo(board.fen(), depth, bestScore)
                return bestScore
            # if bestScore < score:
                # saveToMemo(board.fen(), depth, bestScore)
                # return bestScore
        saveToMemo(board.fen(), depth, bestScore)
        return bestScore

def saveToMemo(fen, depth, score):
    pairs = memo.get(fen, [])
    pairs.append([depth, score])
    memo[fen] = pairs



#     const validMoves = this.chess.moves();
#     let bestMove;
#     let bestScore = -9999;
#     const currentTurn = this.chess.turn();
#     for (let i = 0; i < validMoves.length; i++) {
#       this.chess.move(validMoves[i]);
#       let currentScore = findBestMove(2, this.chess, currentTurn, bestScore);
#       if (currentScore > bestScore) {
#         bestScore = currentScore;
#         bestMove = validMoves[i];
#       }
#       this.chess.undo();
#     }
#     this.chess.move(bestMove);
#     this.setState({boardState: FENToBoard(this.chess.fen())});
def minimaxRoot(board):
    bestMove = 0
    bestScore = -9999
    curTurn = board.turn
    for move in board.legal_moves:
        board.push(move)
        curScore = minimax(3, board, curTurn, -10000, 10000)
        print(board)
        print(curScore)
        print()
        if curScore > bestScore:
            bestScore = curScore
            bestMove = move
        board.pop()
    for depth, stat in stats.items():
        print(depth, "  ", stat)
    board.push(bestMove)


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/getstate")
def getState():
    boardString = request.args.get("board")
    # move = request.args.get("move")
    board = chess.Board(boardString)
    print(board.turn)

    minimaxRoot(board)


    print(board)
    # board.push(chess.Move.from_uci(move))

    return board.fen()

if __name__ == "__main__":
    app.run()
