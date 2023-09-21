import { StateCreator } from "zustand";
import { INITIAL_BOARD } from "../lib/constants";
import { getPositionObject, getPositionString, isWhite } from "../lib/helpers";
import { getAttacks, getValidMoves } from "../lib/moves";
import GameSlice, { GameSliceStates, Piece } from "./types";
import useStore from "@/lib/zustand/useStore";

const initialGameSlice: GameSliceStates = {
  board: INITIAL_BOARD.map((arr) => arr.map((piece) => piece as Piece)),
  blackKingPosition: [0, 4],
  WhiteKingPosition: [7, 4],
  inPassingPawn: null,
  validMoves: new Map(),
  validAttacks: new Map(),
  specialMoves: new Map(),
  validPromotions: new Map(),
  checks: [],
  movedPieces: { "0,0": false, "0,4": false, "0,7": false, "7,0": false, "7,4": false, "7,7": false },
  moveHistory: [],
  selectedTile: null,
  promotionTile: null,
  isWhiteTurn: true,
  endGameStatus: "none",
  noCaptureMoves: 0,
};

const createGameSlice: StateCreator<GameSlice> = (set) => ({
  ...initialGameSlice,
  setBoard: (board) => set({ board }),
  updateKingsPosition: () =>
    set((prev) => {
      const { board, moveHistory } = prev;
      const lastMove = moveHistory.at(-1);
      if (!lastMove) return prev;
      const [toRow, toCol] = getPositionObject(lastMove.to);
      if (board[toRow][toCol] === 6) return { WhiteKingPosition: [toRow, toCol] };
      if (board[toRow][toCol] === -6) return { blackKingPosition: [toRow, toCol] };
      return prev;
    }),
  updateInPassingPawn: () =>
    set((prev) => {
      const { board, moveHistory } = prev;
      const lastMove = moveHistory.at(-1);
      if (!lastMove) return prev;
      const [fromRow] = getPositionObject(lastMove.from);
      const [toRow, toCol] = getPositionObject(lastMove.to);
      if (Math.abs(board[toRow][toCol]) === 1 && Math.abs(toRow - fromRow) === 2)
        return { inPassingPawn: [toRow, toCol] };
      return { inPassingPawn: null };
    }),
  updateMoves: () =>
    set((prev) => {
      const { board, inPassingPawn, movedPieces } = prev;
      const moves = getValidMoves(board, movedPieces, inPassingPawn);
      return { ...moves };
    }),
  updateChecks: () =>
    set((prev) => {
      const { board, WhiteKingPosition, blackKingPosition, isWhiteTurn } = prev;
      const checks = isWhiteTurn
        ? getAttacks(board, true, WhiteKingPosition[0], WhiteKingPosition[1])
        : getAttacks(board, false, blackKingPosition[0], blackKingPosition[1]);
      if (checks.length)
        checks.push(isWhiteTurn ? getPositionString(...WhiteKingPosition) : getPositionString(...blackKingPosition));
      return { checks };
    }),
  updateMovedPieces: () =>
    set((prev) => {
      const { moveHistory } = prev;
      const lastMove = moveHistory.at(-1);
      if (!lastMove) return prev;
      if (lastMove.from in prev.movedPieces) return { movedPieces: { ...prev.movedPieces, [lastMove.from]: true } };
      return prev;
    }),
  move: (fromRow, fromCol, toRow, toCol) => {
    set((prev) => {
      const { board, inPassingPawn, isWhiteTurn, movedPieces } = prev;
      const piecePosition = getPositionString(fromRow, fromCol);
      const destinationPosition = getPositionString(toRow, toCol);
      const nextBoard = board.map((arr) => arr.map((piece) => piece));

      //#region castling
      if (nextBoard[fromRow][fromCol] === 6 && fromRow === 7 && fromCol === 4 && toRow === 7 && toCol === 6) {
        nextBoard[7][5] = 2;
        nextBoard[7][7] = 0;
      } else if (nextBoard[fromRow][fromCol] === 6 && fromRow === 7 && fromCol === 4 && toRow === 7 && toCol === 1) {
        nextBoard[7][2] = 2;
        nextBoard[7][0] = 0;
      }
      if (nextBoard[fromRow][fromCol] === -6 && fromRow === 0 && fromCol === 4 && toRow === 0 && toCol === 6) {
        nextBoard[0][5] = -2;
        nextBoard[0][7] = 0;
      } else if (nextBoard[fromRow][fromCol] === -6 && fromRow === 0 && fromCol === 4 && toRow === 0 && toCol === 1) {
        nextBoard[0][2] = -2;
        nextBoard[0][0] = 0;
      }
      //#endregion

      //#region in passing pawn
      if (
        inPassingPawn &&
        Math.abs(nextBoard[fromRow][fromCol]) === 1 &&
        toRow === inPassingPawn[0] + (isWhiteTurn ? -1 : 1) &&
        toCol === inPassingPawn[1]
      )
        nextBoard[inPassingPawn[0]][inPassingPawn[1]] = 0;
      //#endregion

      nextBoard[toRow][toCol] = nextBoard[fromRow][fromCol];
      nextBoard[fromRow][fromCol] = 0;

      const moves = getValidMoves(nextBoard, movedPieces, inPassingPawn);

      return {
        board: nextBoard,
        moveHistory: [...prev.moveHistory, { from: piecePosition, to: destinationPosition }],
        noCaptureMoves: board[toRow][toCol] ? 0 : prev.noCaptureMoves + 1,
        ...moves,
      };
    });
    const {
      toggleIsWhiteTurn,
      updateInPassingPawn,
      updateMoves,
      updateMovedPieces,
      updateChecks,
      updateKingsPosition,
      updateEndGameStatus,
      setSelectedTile,
    } = useStore.getState();
    toggleIsWhiteTurn();
    updateInPassingPawn();
    updateMoves();
    updateMovedPieces();
    updateChecks();
    updateKingsPosition();
    updateEndGameStatus();
    setSelectedTile(null);
  },
  setSelectedTile: (tile) => set({ selectedTile: tile }),
  setPromotionTile: (tile) => set({ promotionTile: tile }),
  toggleIsWhiteTurn: () => set((prev) => ({ isWhiteTurn: !prev.isWhiteTurn })),
  updateEndGameStatus: () =>
    set((prev) => {
      const { board, validMoves, validAttacks, isWhiteTurn, noCaptureMoves, WhiteKingPosition, blackKingPosition } =
        prev;
      if (noCaptureMoves >= 50) return { endGameStatus: "draw" };
      for (const [key, value] of validMoves) {
        const [row, col] = getPositionObject(key);
        if (isWhiteTurn === isWhite(board, row, col) && value.length) return { endGameStatus: "none" };
      }
      for (const [key, value] of validAttacks) {
        const [row, col] = getPositionObject(key);
        if (isWhiteTurn === isWhite(board, row, col) && value.length) return { endGameStatus: "none" };
      }
      const [kingRow, kingCol] = isWhiteTurn ? WhiteKingPosition : blackKingPosition;
      const isStalemate = !getAttacks(board, isWhite(board, kingRow, kingCol), kingRow, kingCol).length;
      if (isStalemate) return { endGameStatus: "draw" };
      return { endGameStatus: isWhiteTurn ? "black" : "white" };
    }),
  promote: (piece, fromRow, fromCol, toRow, toCol) => {
    set((prev) => {
      const { board } = prev;
      const nextBoard = board.map((arr) => arr.map((piece) => piece));
      nextBoard[fromRow][fromCol] = 0;
      nextBoard[toRow][toCol] = piece;
      return { board: nextBoard };
    });
    const { toggleIsWhiteTurn, updateMoves, updateChecks, updateEndGameStatus, setSelectedTile, setPromotionTile } =
      useStore.getState();
    toggleIsWhiteTurn();
    updateMoves();
    updateChecks();
    updateEndGameStatus();
    setSelectedTile(null);
    setPromotionTile(null);
  },
  initGameSlice: () => {
    set({ ...initialGameSlice });
    useStore.getState().updateMoves();
  },
});

export default createGameSlice;
