export const ItemTypes = {
  PIECE: 'piece'
};

export const boardToFEN = (boardState)=> {
  let FEN = "";
  for (let i = 0; i < 8; i++) {
    let spaces = 0;
    for (let j = 0; j < 8; j++) {
      if (boardState[i * 8 + j] === " ") {
        spaces++;
        continue;
      }
      if (spaces !== 0) {
        FEN += spaces;
        spaces = 0;
      }
      FEN += boardState[i * 8 + j];
    }
    if (spaces !== 0) {
      FEN += spaces;
      spaces = 0;
    }
    FEN += "/"
  }
  return FEN.slice(0, FEN.length - 1);
};

export const FENToBoard = (FEN) => {
  let boardState = [];
  for (let i = 0; i < FEN.length; i++) {
    if (FEN[i] === "/") {
      continue;
    }
    if (FEN[i] >= '0' && FEN[i] <= '9') {
      let spaces = FEN[i] - '0';
      for (let j = 0; j < spaces; j++) {
        boardState.push(" ");
      }
      if (boardState.length == 64) break;
      continue;
    }
    boardState.push(FEN[i]);
    if (boardState.length == 64) break;
  }
  return boardState;
};

export const coorToPos = (x, y) => {
  return String.fromCharCode(97 + y) + (8 - x).toString();
}
