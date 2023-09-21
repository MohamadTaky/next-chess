export type Piece = -1 | -2 | -3 | -4 | -5 | -6 | 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type GameSliceStates = {
  board: Piece[][];
  blackKingPosition: [number, number];
  WhiteKingPosition: [number, number];
  inPassingPawn: [number, number] | null;
  validMoves: Map<string, string[]>;
  validAttacks: Map<string, string[]>;
  specialMoves: Map<string, string[]>;
  validPromotions: Map<string, string[]>;
  checks: string[];
  moveHistory: { from: string; to: string }[];
  movedPieces: Record<string, boolean>;
  selectedTile: { row: number; col: number } | null;
  promotionTile: { row: number; col: number } | null;
  isWhiteTurn: boolean;
  endGameStatus: "none" | "white" | "black" | "draw";
  noCaptureMoves: number;
};

export type GameSliceActions = {
  setBoard: (board: Piece[][]) => void;
  updateKingsPosition: () => void;
  updateInPassingPawn: () => void;
  updateMoves: () => void;
  updateChecks: () => void;
  move: (fromRow: number, fromCol: number, toRow: number, toCol: number) => void;
  updateMovedPieces: () => void;
  promote: (piece: Piece, fromRow: number, fromCol: number, toRow: number, toCol: number) => void;
  setSelectedTile: (tile: { row: number; col: number } | null) => void;
  setPromotionTile: (tile: { row: number; col: number } | null) => void;
  toggleIsWhiteTurn: () => void;
  updateEndGameStatus: () => void;
  initGameSlice: () => void;
};

type GameSlice = GameSliceStates & GameSliceActions;

export default GameSlice;
