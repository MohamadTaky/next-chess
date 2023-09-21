import { ThemeSlice, ThemeSliceActions, ThemeSliceStates } from "@/store/slice/theme/types";
import { PlayerSlice, PlayerSliceActions, PlayerSliceStates } from "@/store/slice/player/types";
import GameSlice from "@/store/slice/game/types";
import RoomSlice from "@/store/slice/room/types";

export type PersistedStates = ThemeSliceStates & PlayerSliceStates;

export type PersistedActions = ThemeSliceActions & PlayerSliceActions;

export type PersistedStore = ThemeSlice & PlayerSlice;

type Store = GameSlice & RoomSlice;

export default Store;
