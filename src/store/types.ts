import { PlayerSlice, PlayerSliceActions, PlayerSliceStates } from "@/store/slice/player/types";
import GameSlice from "@/store/slice/game/types";
import RoomSlice from "@/store/slice/room/types";

export type PersistedStates = PlayerSliceStates;

export type PersistedActions = PlayerSliceActions;

export type PersistedStore = PlayerSlice;

type Store = GameSlice & RoomSlice;

export default Store;
