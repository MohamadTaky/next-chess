import { INITIAL_BOARD } from "@/utils/constants";
import { GameSliceStates, Piece } from "./types";

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

export default initialGameSlice;
