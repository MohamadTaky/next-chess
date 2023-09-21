import { StateCreator } from "zustand";
import RoomSlice, { RoomSliceStates } from "./types";

const initialRoomSlice: RoomSliceStates = {
  isGameStarted: false,
  isPlayerTurn: true,
  opponentInfo: null,
  messages: [],
};

const createRoomSlice: StateCreator<RoomSlice> = (set) => ({
  ...initialRoomSlice,
  setIsGameStarted: (isGameStarted) => set({ isGameStarted }),
  setIsPlayerTurn: (isPlayerTurn) => set({ isPlayerTurn }),
  setOpponentInfo: (opponentInfo) => set({ opponentInfo }),
  addMessage: (message) => set((prev) => ({ messages: [...prev.messages, message] })),
  initRoomSlice: () => set({ ...initialRoomSlice }),
});

export default createRoomSlice;
