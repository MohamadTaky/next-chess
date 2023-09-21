import createGameSlice from "@/app/local/slice/createGameSlice";
import createRoomSlice from "@/app/room/slice/createRoomSlice";
import Store from "./types";
import { create } from "zustand";

const useStore = create<Store>()((...a) => ({
  ...createGameSlice(...a),
  ...createRoomSlice(...a),
}));

export default useStore;
