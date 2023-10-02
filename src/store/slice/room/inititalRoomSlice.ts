import { RoomSliceStates } from "./types";

const initialRoomSlice: RoomSliceStates = {
  whitePlayerId: "",
  lastMovePlayerId: "",
  members: null,
  messages: [],
};

export default initialRoomSlice;
