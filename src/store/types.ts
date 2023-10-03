import { GameSliceActions, GameSliceStates } from "@/store/slice/game/types";
import { RoomSliceActions, RoomSliceStates } from "@/store/slice/room/types";
import { ToastSliceActions, ToastSliceStates } from "@/store/slice/toast/types";

export type StoreStates = GameSliceStates & RoomSliceStates & ToastSliceStates;

export type StoreActions = GameSliceActions & RoomSliceActions & ToastSliceActions;

type Store = StoreStates & StoreActions;

export default Store;
