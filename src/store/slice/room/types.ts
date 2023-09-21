export type RoomSliceStates = {
  isGameStarted: boolean;
  isPlayerTurn: boolean;
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
  setOpponentInfo: (opponentInfo: RoomSliceStates["opponentInfo"]) => void;
  addMessage: (message: { text: string; recieved: boolean }) => void;
  initRoomSlice: () => void;
};

type RoomSlice = RoomSliceStates & RoomSliceActions;

export default RoomSlice;
