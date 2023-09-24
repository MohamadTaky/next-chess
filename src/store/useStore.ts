import createGameSlice from "@/store/slice/game/createGameSlice";
import createRoomSlice from "@/store/slice/room/createRoomSlice";
import Store from "./types";
import { create } from "zustand";
import createToastSlice from "./slice/toast/createToastSlice";

const useStore = create<Store>()((...a) => ({
  ...createGameSlice(...a),
  ...createRoomSlice(...a),
  ...createToastSlice(...a),
}));

export default useStore;
