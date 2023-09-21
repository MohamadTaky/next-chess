import { StateCreator } from "zustand";

export type PlayerSliceStates = {
  playerName: string;
};

export type PlayerSliceActions = {
  setPlayerName: (playerName: string) => void;
};

export type PlayerSlice = PlayerSliceStates & PlayerSliceActions;

const createPlayerSlice: StateCreator<PlayerSlice> = (set) => ({
  playerName: "guest",
  setPlayerName: (playerName) => set({ playerName }),
});

export default createPlayerSlice;
