import { pusherClient } from "@/lib/pusher";
import useStore from "@/lib/zustand/useStore";
import toPusherKey from "@/utils/toPusherKey";
import { useRouter } from "next/navigation";
import { Members } from "pusher-js";
import { useMutation } from "react-query";
import { RoomSliceStates } from "../slice/types";

export default function useJoinRoomMutation() {
  const { push } = useRouter();
  const setIsGameStarted = useStore((store) => store.setIsGameStarted);
  const setOpponentInfo = useStore((store) => store.setOpponentInfo);
  return useMutation(joinRoom, {
    onSuccess: (members, roomId) => {
      push(`room/${roomId}`);
      if (members.count === 1) return;
      setIsGameStarted(true);
      members.each((member: NonNullable<RoomSliceStates["opponentInfo"]>) => {
        if (member.id !== members.myID) setOpponentInfo(member);
      });
    },
  });
}

function joinRoom(roomId: string) {
  return new Promise<Members>((resolve, reject) => {
    const channel = pusherClient.subscribe(toPusherKey(`presence-room:${roomId}`));
    const successCallback = (members: Members) => {
      resolve(members);
      channel.unbind_all();
    };
    const errorCallback = () => {
      reject(new Error());
      channel.unbind_all();
    };
    channel.bind("pusher:subscription_succeeded", successCallback);
    channel.bind("pusher:subscription_error", errorCallback);
  });
}
