import { StateCreator } from "zustand";
import { PlayerSlice } from "./types";

const createPlayerSlice: StateCreator<PlayerSlice> = (set) => ({
  playerName: "guest",
  setPlayerName: (playerName) => set({ playerName }),
});

export default createPlayerSlice;
