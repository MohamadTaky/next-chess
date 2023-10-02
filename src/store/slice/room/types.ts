import { ArrayElement } from "@/utils/arrayElement";
import { Members } from "pusher-js";

export type RoomSliceStates = {
  whitePlayerId: string;
  lastMovePlayerId: string;
  members: Members | null;
  messages: {
    text: string;
    senderId: string;
  }[];
};

export type RoomSliceActions = {
  setWhitePlayerId: (whitePlayerId: string) => void;
  setlastMovePlayerId: (lastMovePlayerId: string) => void;
  setMembers: (members: Members) => void;
  addMessage: (message: ArrayElement<RoomSliceStates["messages"]>) => void;
  initRoomSlice: () => void;
};

type RoomSlice = RoomSliceStates & RoomSliceActions;

export default RoomSlice;
