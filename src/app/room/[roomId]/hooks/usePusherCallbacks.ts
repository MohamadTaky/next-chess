import { pusherClient } from "@/lib/pusher";
import toPusherKey from "@/utils/toPusherKey";
import { useParams } from "next/navigation";
import { postRequestType as moveRequestType } from "@/utils/validators/room/move/validator";
import { postRequestType as messageRequestType } from "@/utils/validators/room/message/validator";
import { postRequestType as promoteRequestType } from "@/utils/validators/room/promote/validator";
import { useEffect } from "react";
import useStore from "@/lib/zustand/useStore";
import { Piece } from "@/app/local/slice/types";
import { RoomSliceStates } from "../../slice/types";

export function usePusherCallbacks() {
  const { roomId } = useParams() as { roomId: string };

  const move = useStore((store) => store.move);
  const promote = useStore((store) => store.promote);
  const setIsPlayerTurn = useStore((store) => store.setIsPlayerTurn);
  const setIsGameStarted = useStore((store) => store.setIsGameStarted);
  const setOpponentInfo = useStore((store) => store.setOpponentInfo);
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

    const channel = pusherClient.channel(toPusherKey(`presence-room:${roomId}`));
    channel.bind("move", moveHandler);
    channel.bind("promote", promotionHandler);
    channel.bind("incoming-message", incomingMessageHandler);
    channel.bind("pusher:member_added", opponentInfoHandler);

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      initGameSlice();
      initRoomSlice();
    };
  }, []);
}
