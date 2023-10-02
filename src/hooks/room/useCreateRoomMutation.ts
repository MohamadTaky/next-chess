import { pusherClient } from "@/lib/pusher";
import useStore from "@/store/useStore";
import { getCookie } from "@/utils/cookies";
import { toPusherKey } from "@/utils/pusher";
import stringifyStore from "@/utils/stringifyStore";
import { postRequestType } from "@/utils/validators/room/validator";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Members } from "pusher-js";
import useTransitionMutation from "../shared/useTransitionMutation";

export default function useCreateRoomMutation() {
  const { push } = useRouter();
  const addToastMessage = useStore((store) => store.addToastMessage);
  const initGameSlice = useStore((store) => store.initGameSlice);
  const initRoomSlice = useStore((store) => store.initRoomSlice);
  const setWhitePlayerId = useStore((store) => store.setWhitePlayerId);
  const setMembers = useStore((store) => store.setMembers);

  return useTransitionMutation({
    mutationFn: async () => {
      const userId = getCookie("userid") as string;
      initGameSlice();
      initRoomSlice();
      setWhitePlayerId(userId);
      const storeString = stringifyStore(useStore.getState());
      return await createRoomMutation({ storeString });
    },
    onSuccess: ({ roomId, members }) => {
      setMembers(members);
      addToastMessage({ text: "created room successfully !", type: "success" });
      push(`room/${roomId}`);
    },
    onError: () => addToastMessage({ text: "an error occurred", type: "error" }),
    onSettled: (variables) => {
      pusherClient.channel(toPusherKey(`presence-room:${variables?.roomId}`)).unbind_all();
    },
  });
}

async function createRoomMutation({ storeString }: postRequestType): Promise<{ roomId: string; members: Members }> {
  const response = await axios.post<{ roomId: string }>(`/api/room`, { storeString });
  const { roomId } = response.data;
  const channel = pusherClient.subscribe(toPusherKey(`presence-room:${roomId}`));
  return new Promise((resolve, reject) => {
    channel.bind("pusher:subscription_succeeded", (members: Members) => resolve({ roomId, members }));
    channel.bind("pusher:subscription_error", reject);
  });
}
