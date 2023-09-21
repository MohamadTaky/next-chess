import { ThemeSlice, ThemeSliceActions, ThemeSliceStates } from "@/app/(index)/slice/createThemeSlice";
import { PlayerSlice, PlayerSliceActions, PlayerSliceStates } from "@/app/room/slice/createPlayerSlice";
import GameSlice from "@/app/local/slice/types";
import RoomSlice from "@/app/room/slice/types";

export type PersistedStates = ThemeSliceStates & PlayerSliceStates;

export type PersistedActions = ThemeSliceActions & PlayerSliceActions;

export type PersistedStore = ThemeSlice & PlayerSlice;

type Store = GameSlice & RoomSlice;

export default Store;
