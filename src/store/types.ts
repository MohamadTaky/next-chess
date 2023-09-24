import GameSlice from "@/store/slice/game/types";
import { PlayerSlice, PlayerSliceActions, PlayerSliceStates } from "@/store/slice/player/types";
import RoomSlice from "@/store/slice/room/types";
import ToastSlice from "@/store/slice/toast/types";

export type PersistedStates = PlayerSliceStates;

export type PersistedActions = PlayerSliceActions;

export type PersistedStore = PlayerSlice;

type Store = GameSlice & RoomSlice & ToastSlice;

export default Store;
