import { pusherClient } from "@/lib/pusher";
import useStore from "@/store/useStore";
import parseStore from "@/utils/parseStore";
import { toPusherKey } from "@/utils/pusher";
import { useParams, useRouter } from "next/navigation";
import { Members, PresenceChannel } from "pusher-js";
import { useEffect, useRef, useState } from "react";

export default function usePusherEffects() {
  const { replace } = useRouter();
  const { roomId } = useParams();
  const channelName = toPusherKey(`presence-room:${roomId}`);
  const channelRef = useRef<PresenceChannel>(pusherClient.channel(channelName) as PresenceChannel);
  const [isLoading, setIsLoading] = useState(!channelRef.current);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const addToastMessage = useStore((store) => store.addToastMessage);
  const setMembers = useStore((store) => store.setMembers);
  const initGameSlice = useStore((store) => store.initGameSlice);
  const initRoomSlice = useStore((store) => store.initRoomSlice);

  useEffect(() => {
    let opponentJoined = false;
    let redirectTimeout: NodeJS.Timeout;
    if (!channelRef.current) {
      channelRef.current = pusherClient.subscribe(channelName) as PresenceChannel;
      channelRef.current.bind("pusher:subscription_succeeded", (members: Members) => {
        setMembers(members);
        setIsLoading(false);
        addToastMessage({ text: "Joined room successfully !", type: "success" });
        if (members.count > 1) {
          setIsGameStarted(true);
          opponentJoined = true;
        }
      });

      channelRef.current.bind("pusher:subscription_error", () => {
        addToastMessage({ text: "An error occured while joining the room", type: "error" });
        setTimeout(() => replace("room"), 5000);
      });
    }

    channelRef.current.bind("pusher:member_added", () => {
      setMembers(channelRef.current.members);
      if (opponentJoined) {
        addToastMessage({ text: "Opponnent rejoined", type: "success" });
        clearTimeout(redirectTimeout);
      } else {
        addToastMessage({ text: "Opponnent joined successfully", type: "success" });
        opponentJoined = true;
      }
      setIsGameStarted(true);
    });

    channelRef.current.bind("pusher:member_removed", () => {
      setMembers(channelRef.current.members);
      addToastMessage({ text: "Opponnent left the room", type: "error" });
      redirectTimeout = setTimeout(() => replace("room"), 5000);
    });

    channelRef.current.bind("change", ({ storeString }: { storeString: string }) => {
      const parsedStore = parseStore(storeString);
      useStore.setState({ ...parsedStore });
    });

    return () => {
      channelRef.current.unbind_all();
      channelRef.current.unsubscribe();
      initGameSlice();
      initRoomSlice();
    };
  }, []);

  return { isLoading, isGameStarted };
}
