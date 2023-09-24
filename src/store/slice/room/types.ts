export type RoomSliceStates = {
  isGameStarted: boolean;
  isPlayerTurn: boolean;
  playerConnectionState: "connected" | "connecting" | "unavailable";
  opponentConnectionState: "";
  opponentInfo: {
    id: string;
    info: {
      username: string;
    };
  } | null;
  messages: {
    text: string;
    recieved: boolean;
  }[];
};

export type RoomSliceActions = {
  setIsGameStarted: (isGameStarted: boolean) => void;
  setIsPlayerTurn: (isPlayerTurn: boolean) => void;
  setPlayerConnectionState: (playerConnectionState: RoomSliceStates["playerConnectionState"]) => void;
  setOpponentConnectionState: (opponentConnectionState: RoomSliceStates["opponentConnectionState"]) => void;
  setOpponentInfo: (opponentInfo: RoomSliceStates["opponentInfo"]) => void;
  addMessage: (message: { text: string; recieved: boolean }) => void;
  initRoomSlice: () => void;
};

type RoomSlice = RoomSliceStates & RoomSliceActions;

export default RoomSlice;
