import { pusherClient } from "@/lib/pusher";
import { Piece } from "@/store/slice/game/types";
import { RoomSliceStates } from "@/store/slice/room/types";
import useStore from "@/store/useStore";
import toPusherKey from "@/utils/toPusherKey";
import { postRequestType as messageRequestType } from "@/utils/validators/room/message/validator";
import { postRequestType as moveRequestType } from "@/utils/validators/room/move/validator";
import { postRequestType as promoteRequestType } from "@/utils/validators/room/promote/validator";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function usePusherCallbacks() {
  const { roomId } = useParams() as { roomId: string };

  const move = useStore((store) => store.move);
  const promote = useStore((store) => store.promote);
  const setIsPlayerTurn = useStore((store) => store.setIsPlayerTurn);
  const setIsGameStarted = useStore((store) => store.setIsGameStarted);
  const setOpponentInfo = useStore((store) => store.setOpponentInfo);
  const setPlayerConnectionState = useStore((store) => store.setPlayerConnectionState);
  const addMessage = useStore((store) => store.addMessage);
  const initGameSlice = useStore((store) => store.initGameSlice);
  const initRoomSlice = useStore((store) => store.initRoomSlice);

  useEffect(() => {
    initGameSlice();

    const moveHandler = ({ fromRow, fromCol, toRow, toCol }: moveRequestType) => {
      move(fromRow, fromCol, toRow, toCol);
      setIsPlayerTurn(true);
    };

    const promotionHandler = ({ promotedPiece, fromRow, fromCol, toRow, toCol }: promoteRequestType) => {
      promote(promotedPiece as Piece, fromRow, fromCol, toRow, toCol);
      setIsPlayerTurn(true);
    };

    const incomingMessageHandler = ({ message }: messageRequestType) => {
      addMessage({ text: message, recieved: true });
    };

    const opponentInfoHandler = (member: RoomSliceStates["opponentInfo"]) => {
      setOpponentInfo(member);
      setIsGameStarted(true);
    };

    const connectionStateHandler = (states: {
      previous: RoomSliceStates["playerConnectionState"];
      current: RoomSliceStates["playerConnectionState"];
    }) => {
      setPlayerConnectionState(states.current);
    };

    const channelName = toPusherKey(`presence-room:${roomId}`);
    const channel = pusherClient.channel(channelName) ?? pusherClient.subscribe(channelName);
    channel.bind("move", moveHandler);
    channel.bind("promote", promotionHandler);
    channel.bind("incoming-message", incomingMessageHandler);
    channel.bind("pusher:member_added", opponentInfoHandler);
    pusherClient.connection.bind("state_change", connectionStateHandler);

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusherClient.connection.unbind_all();
      initGameSlice();
      initRoomSlice();
    };
  }, []);
}
