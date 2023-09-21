import useStore from "@/lib/zustand/useStore";
import { Piece } from "../slice/types";

export function getVariant(row: number, col: number) {
  const {
    board,
    selectedTile,
    isWhiteTurn,
    validMoves,
    validAttacks,
    validPromotions,
    specialMoves,
    promotionTile,
    checks,
  } = useStore.getState();
  if (promotionTile?.row === row && promotionTile.col === col) return "promotion";
  if (selectedTile) {
    if (isOccupied(board, row, col) && selectedTile.row === row && selectedTile.col === col)
      return isWhiteTurn === isWhite(board, row, col) ? "select" : "gray";
    const selectedTilePosition = getPositionString(selectedTile.row, selectedTile.col);
    const isWhitePiece = isWhite(board, selectedTile.row, selectedTile.col);
    if (validMoves.get(selectedTilePosition)?.some((move) => move === getPositionString(row, col)))
      return isWhitePiece === isWhiteTurn ? "move" : "gray";
    if (validAttacks.get(selectedTilePosition)?.some((move) => move === getPositionString(row, col)))
      return isWhitePiece === isWhiteTurn ? "attack" : "gray";
    if (specialMoves.get(selectedTilePosition)?.some((move) => move === getPositionString(row, col)))
      return isWhitePiece === isWhiteTurn ? "special" : "gray";
    if (validPromotions.get(selectedTilePosition)?.some((move) => move === getPositionString(row, col)))
      return isWhitePiece === isWhiteTurn ? "special" : "gray";
  }
  if (checks.some((check) => check === getPositionString(row, col))) return "check";
  return (row + col) % 2 ? "dark" : "light";
}

export function isWhite(board: Piece[][], row: number, col: number) {
  return board[row][col] > 0;
}

export function isOccupied(board: Piece[][], row: number, col: number) {
  return !!board[row][col];
}

export function isWithinBounds(row: number, col: number) {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
}

export function getPositionString(row: number, col: number) {
  return `${row},${col}`;
}

export function getPositionObject(position: string) {
  return position.split(",").map((value) => Number(value));
}
