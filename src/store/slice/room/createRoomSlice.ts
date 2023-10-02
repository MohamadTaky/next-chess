import { StateCreator } from "zustand";
import initialRoomSlice from "./inititalRoomSlice";
import RoomSlice from "./types";

const createRoomSlice: StateCreator<RoomSlice> = (set) => ({
  ...initialRoomSlice,
  setWhitePlayerId: (whitePlayerId) => set({ whitePlayerId }),
  setlastMovePlayerId: (lastMovePlayerId) => set({ lastMovePlayerId }),
  setMembers: (members) => set({ members }),
  addMessage: (message) => set((prev) => ({ messages: [...prev.messages, message] })),
  initRoomSlice: () => set({ ...initialRoomSlice }),
});

export default createRoomSlice;
