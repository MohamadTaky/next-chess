export type PlayerSliceStates = {
  playerName: string;
};

export type PlayerSliceActions = {
  setPlayerName: (playerName: string) => void;
};

export type PlayerSlice = PlayerSliceStates & PlayerSliceActions;
