import { getPositionString, isOccupied, isWhite, isWithinBounds } from "./helpers";
import GameSlice, { Piece } from "../slice/types";
import useStore from "@/lib/zustand/useStore";

export function getValidMoves(
  board: Piece[][],
  movedPieces: GameSlice["movedPieces"],
  inPassingPawn: GameSlice["inPassingPawn"],
) {
  const validMovesMap = new Map();
  const validAttacksMap = new Map();
  const validPromotionsMap = new Map();
  const specialMovesMap = new Map();
  for (let row = 0; row < 8; row++)
    for (let col = 0; col < 8; col++)
      if (board[row][col]) {
        const { validMoves, validAttacks, specialMoves, validPromotions } = getPieceMoves(
          board,
          movedPieces,
          inPassingPawn,
          row,
          col,
        );
        validMovesMap.set(`${row},${col}`, validMoves);
        validAttacksMap.set(`${row},${col}`, validAttacks);
        specialMovesMap.set(`${row},${col}`, specialMoves);
        validPromotionsMap.set(`${row},${col}`, validPromotions);
      }
  return {
    validMoves: validMovesMap,
    validAttacks: validAttacksMap,
    specialMoves: specialMovesMap,
    validPromotions: validPromotionsMap,
  };
}

export function getAttacks(board: Piece[][], isWhitePiece: boolean, row: number, col: number) {
  const attacks = [];
  const directions = [
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
  ];
  const KnightOffsets = [
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, -2],
    [-2, -1],
    [-2, 1],
    [-1, 2],
    [1, 2],
  ];
  const pawnOffsets = [
    [isWhitePiece ? -1 : 1, -1],
    [isWhitePiece ? -1 : 1, 1],
  ];

  for (const [rowDir, colDir] of directions) {
    let nextRow = row + rowDir;
    let nextCol = col + colDir;
    while (isWithinBounds(nextRow, nextCol)) {
      if (isOccupied(board, nextRow, nextCol)) {
        const otherPiece = Math.abs(board[nextRow][nextCol]);
        if (
          isWhitePiece !== isWhite(board, nextRow, nextCol) &&
          (otherPiece === 5 ||
            (otherPiece === 6 && Math.abs(nextRow - row) < 2 && Math.abs(nextCol - col) < 2) ||
            (otherPiece === 2 && (rowDir === 0 || colDir === 0)) ||
            (otherPiece === 4 && rowDir !== 0 && colDir !== 0))
        )
          attacks.push(getPositionString(nextRow, nextCol));
        break;
      }
      nextRow += rowDir;
      nextCol += colDir;
    }
  }
  for (const [rowOffset, colOffset] of KnightOffsets) {
    const nextRow = row + rowOffset;
    const nextCol = col + colOffset;
    if (
      isWithinBounds(nextRow, nextCol) &&
      Math.abs(board[nextRow][nextCol]) === 3 &&
      isWhitePiece !== isWhite(board, nextRow, nextCol)
    )
      attacks.push(getPositionString(nextRow, nextCol));
  }
  for (const [rowOffset, colOffset] of pawnOffsets) {
    const nextRow = row + rowOffset;
    const nextCol = col + colOffset;
    if (
      isWithinBounds(nextRow, nextCol) &&
      Math.abs(board[nextRow][nextCol]) === 1 &&
      isWhitePiece !== isWhite(board, nextRow, nextCol)
    )
      attacks.push(getPositionString(nextRow, nextCol));
  }
  return attacks;
}

export function isValidMove(board: Piece[][], fromRow: number, fromCol: number, toRow: number, toCol: number) {
  const copyBoard = board.map((arr) => arr.map((piece) => piece));
  copyBoard[toRow][toCol] = copyBoard[fromRow][fromCol];
  copyBoard[fromRow][fromCol] = 0;

  const [kingRow, kingCol] =
    Math.abs(board[fromRow][fromCol]) === 6
      ? [toRow, toCol]
      : isWhite(board, fromRow, fromCol)
      ? useStore.getState().WhiteKingPosition
      : useStore.getState().blackKingPosition;
  return !getAttacks(copyBoard, isWhite(board, fromRow, fromCol), kingRow, kingCol).length;
}

export function getPieceMoves(
  board: Piece[][],
  movedPieces: GameSlice["movedPieces"],
  inPassingPawn: GameSlice["inPassingPawn"],
  row: number,
  col: number,
): { validMoves: string[]; validAttacks: string[]; specialMoves?: string[]; validPromotions?: string[] } {
  switch (Math.abs(board[row][col])) {
    case 1:
      return getPawnMoves(board, inPassingPawn, row, col);
    case 2:
      return getRookMoves(board, row, col);
    case 3:
      return getKnightMoves(board, row, col);
    case 4:
      return getBishopMoves(board, row, col);
    case 5:
      return getQueenMoves(board, row, col);
    case 6:
      return getKingMoves(board, movedPieces, row, col);
  }
  throw new Error("unknown piece provided");
}

export function getPawnMoves(board: Piece[][], inPassingPawn: GameSlice["inPassingPawn"], row: number, col: number) {
  const isWhitePawn = isWhite(board, row, col);
  const hasMoved = (isWhitePawn && row !== 6) || (!isWhitePawn && row !== 1);
  const validMoves = [];
  const validAttacks = [];
  const validPromotions = [];
  const moveOffsets = hasMoved ? [1] : [1, 2];
  const attackOffsets = [1, -1];
  for (const i of moveOffsets) {
    const nextRow = row + (isWhitePawn ? -i : i);
    if (!isWithinBounds(nextRow, col) || isOccupied(board, nextRow, col) || !isValidMove(board, row, col, nextRow, col))
      break;
    if (nextRow === 7 || nextRow === 0) validPromotions.push(getPositionString(nextRow, col));
    else validMoves.push(getPositionString(nextRow, col));
  }
  for (const i of attackOffsets) {
    const nextRow = row + (isWhitePawn ? -1 : 1);
    const nextCol = col + i;
    if (
      isWithinBounds(nextRow, nextCol) &&
      isOccupied(board, nextRow, nextCol) &&
      isWhitePawn !== isWhite(board, nextRow, nextCol) &&
      isValidMove(board, row, col, nextRow, nextCol)
    ) {
      if (nextRow === 7 || nextRow === 0) validPromotions.push(getPositionString(nextRow, nextCol));
      else validAttacks.push(getPositionString(nextRow, nextCol));
    }
  }
  if (inPassingPawn && inPassingPawn[0] === row && (inPassingPawn[1] === col + 1 || inPassingPawn[1] === col - 1)) {
    validAttacks.push(getPositionString(row + (isWhitePawn ? -1 : 1), inPassingPawn[1]));
  }
  return { validMoves, validAttacks, validPromotions };
}

export function getRookMoves(board: Piece[][], row: number, col: number) {
  const validMoves = [];
  const validAttacks = [];
  const directions = [
    [1, 0],
    [0, -1],
    [-1, 0],
    [0, 1],
  ];
  for (const [rowDir, colDir] of directions) {
    let nextRow = row + rowDir;
    let nextCol = col + colDir;
    while (isWithinBounds(nextRow, nextCol)) {
      const valid = isValidMove(board, row, col, nextRow, nextCol);
      if (isOccupied(board, nextRow, nextCol)) {
        if (isWhite(board, row, col) !== isWhite(board, nextRow, nextCol) && valid)
          validAttacks.push(getPositionString(nextRow, nextCol));
        break;
      }
      if (valid) validMoves.push(getPositionString(nextRow, nextCol));
      nextRow += rowDir;
      nextCol += colDir;
    }
  }
  return { validMoves, validAttacks };
}

export function getKnightMoves(board: Piece[][], row: number, col: number) {
  const validMoves = [];
  const validAttacks = [];
  const offsets = [
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, -2],
    [-2, -1],
    [-2, 1],
    [-1, 2],
    [1, 2],
  ];
  for (const [rowOffset, colOffset] of offsets) {
    let nextRow = row + rowOffset;
    let nextCol = col + colOffset;
    if (isWithinBounds(nextRow, nextCol)) {
      const valid = isValidMove(board, row, col, nextRow, nextCol);
      if (isOccupied(board, nextRow, nextCol)) {
        if (isWhite(board, row, col) !== isWhite(board, nextRow, nextCol) && valid)
          validAttacks.push(getPositionString(nextRow, nextCol));
        continue;
      }
      if (valid) validMoves.push(getPositionString(nextRow, nextCol));
    }
  }
  return { validMoves, validAttacks };
}

export function getBishopMoves(board: Piece[][], row: number, col: number) {
  const validMoves = [];
  const validAttacks = [];
  const directions = [
    [1, 1],
    [1, -1],
    [-1, -1],
    [-1, 1],
  ];
  for (const [rowDir, colDir] of directions) {
    let nextRow = row + rowDir;
    let nextCol = col + colDir;
    while (isWithinBounds(nextRow, nextCol)) {
      const valid = isValidMove(board, row, col, nextRow, nextCol);
      if (isOccupied(board, nextRow, nextCol)) {
        if (isWhite(board, row, col) !== isWhite(board, nextRow, nextCol) && valid)
          validAttacks.push(getPositionString(nextRow, nextCol));
        break;
      }
      if (valid) validMoves.push(getPositionString(nextRow, nextCol));
      nextRow += rowDir;
      nextCol += colDir;
    }
  }
  return { validMoves, validAttacks };
}

export function getQueenMoves(board: Piece[][], row: number, col: number) {
  const validMoves = [];
  const validAttacks = [];
  const directions = [
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
  ];
  for (const [rowDir, colDir] of directions) {
    let nextRow = row + rowDir;
    let nextCol = col + colDir;
    while (isWithinBounds(nextRow, nextCol)) {
      const valid = isValidMove(board, row, col, nextRow, nextCol);
      if (isOccupied(board, nextRow, nextCol)) {
        if (isWhite(board, row, col) !== isWhite(board, nextRow, nextCol) && valid)
          validAttacks.push(getPositionString(nextRow, nextCol));
        break;
      }
      if (valid) validMoves.push(getPositionString(nextRow, nextCol));
      nextRow += rowDir;
      nextCol += colDir;
    }
  }
  return { validMoves, validAttacks };
}

export function getKingMoves(board: Piece[][], movedPieces: GameSlice["movedPieces"], row: number, col: number) {
  const validMoves = [];
  const validAttacks = [];
  const specialMoves = [];
  const offsets = [
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
  ];
  for (const [rowOffset, colOffset] of offsets) {
    let nextRow = row + rowOffset;
    let nextCol = col + colOffset;
    if (isWithinBounds(nextRow, nextCol)) {
      const valid = isValidMove(board, row, col, nextRow, nextCol);
      if (isOccupied(board, nextRow, nextCol)) {
        if (isWhite(board, row, col) !== isWhite(board, nextRow, nextCol) && valid)
          validAttacks.push(getPositionString(nextRow, nextCol));
        continue;
      }
      if (valid) validMoves.push(getPositionString(nextRow, nextCol));
    }
  }

  if (movedPieces[getPositionString(row, col)] === false) {
    const isWhiteKing = isWhite(board, row, col);

    const leftRookPosition = [isWhiteKing ? 7 : 0, 0];
    const rightRookPosition = [isWhiteKing ? 7 : 0, 7];

    if (
      !movedPieces[getPositionString(leftRookPosition[0], leftRookPosition[1])] &&
      isOccupied(board, leftRookPosition[0], leftRookPosition[1])
    ) {
      let valid = true;
      for (let i = col; i > 0; i--)
        if ((i !== col && isOccupied(board, row, i)) || getAttacks(board, isWhiteKing, row, i).length) {
          valid = false;
          break;
        }
      if (valid) specialMoves.push(getPositionString(row, 1));
    }
    if (
      !movedPieces[getPositionString(rightRookPosition[0], rightRookPosition[1])] &&
      isOccupied(board, rightRookPosition[0], rightRookPosition[1])
    ) {
      let valid = true;
      for (let i = col; i < 7; i++)
        if ((i !== col && isOccupied(board, row, i)) || getAttacks(board, isWhiteKing, row, i).length) {
          valid = false;
          break;
        }
      if (valid) specialMoves.push(getPositionString(row, 6));
    }
  }

  return { validMoves, validAttacks, specialMoves };
}
