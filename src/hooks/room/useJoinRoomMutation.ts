import { pusherClient } from "@/lib/pusher";
import { RoomSliceStates } from "@/store/slice/room/types";
import useStore from "@/store/useStore";
import toPusherKey from "@/utils/toPusherKey";
import { useRouter } from "next/navigation";
import { Channel, Members } from "pusher-js";
import useTransitionMutation from "../shared/useTransitionMutation";

export default function useJoinRoomMutation() {
  const { push } = useRouter();
  const setIsGameStarted = useStore((store) => store.setIsGameStarted);
  const addToastMessage = useStore((store) => store.addToastMessage);
  const setIsPlayerTurn = useStore((store) => store.setIsPlayerTurn);
  const setOpponentInfo = useStore((store) => store.setOpponentInfo);

  return useTransitionMutation<Members, string, string, Channel>({
    mutationFn: joinRoom,
    onMutate: (roomId) => {
      const channel = pusherClient.subscribe(toPusherKey(`presence-room:${roomId}`));
      return channel;
    },
    onSuccess: (members, roomId) => {
      push(`room/${roomId}`);
      if (members.count === 1) return;
      setIsGameStarted(true);
      setIsPlayerTurn(false);
      members.each((member: NonNullable<RoomSliceStates["opponentInfo"]>) => {
        if (member.id !== members.myID) setOpponentInfo(member);
      });
    },
    onError: (error) => {
      addToastMessage({ text: error, type: "error" });
    },
    onSettled: (_members, _error, _roomId, channel) => {
      channel?.unbind_all();
    },
  });
}

function joinRoom(roomId: string) {
  return new Promise<Members>((resolve, reject) => {
    const channel = pusherClient.channel(toPusherKey(`presence-room:${roomId}`));
    const successCallback = (members: Members) => {
      resolve(members);
    };
    const errorCallback = () => {
      reject(new Error("An error occurred"));
    };
    channel.bind("pusher:subscription_succeeded", successCallback);
    channel.bind("pusher:subscription_error", errorCallback);
  });
}
