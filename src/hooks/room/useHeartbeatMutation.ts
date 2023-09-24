import { pusherClient } from "@/lib/pusher";
import useStore from "@/store/useStore";
import toPusherKey from "@/utils/toPusherKey";
import { postRequestType } from "@/utils/validators/room/heartbeat/validator";
import axios from "axios";
import { UUID } from "crypto";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useMutation } from "react-query";

export default function useHeartbeatMutation() {
  const { roomId } = useParams() as { roomId: UUID };
  const { replace } = useRouter();
  const retriesRef = useRef(0);
  const lastSignalRef = useRef(0);
  const isGameStarted = useStore((store) => store.isGameStarted);
  const addToastMessage = useStore((store) => store.addToastMessage);
  const { mutate, isError } = useMutation((variables: postRequestType) => heartbeatMutaiton(variables, roomId), {
    onSettled: (_data, error, _variables) => {
      if (error) {
        if (retriesRef.current === 3) {
          addToastMessage({ text: "Failed to reconnect, redirecting to room page", type: "error" });
          setTimeout(() => replace("/room"), 3000);
        } else if (retriesRef.current === 0) {
          addToastMessage({ text: "Network error occurred, trying to reconnect", type: "error" });
        }
        retriesRef.current++;
        return;
      }
      if (retriesRef.current !== 0) {
        addToastMessage({ text: "Reconnected successfully, you can resume the session !", type: "success" });
        retriesRef.current = 0;
      }
    },
  });

  useEffect(() => {
    if (isError) return;
    lastSignalRef.current = performance.now();
  }, [isError]);

  useEffect(() => {
    if (!isGameStarted) return;
    lastSignalRef.current = performance.now();
    let opponentNetworkWarning = false;

    let heartbeatSendInterval = setInterval(() => {
      mutate({ socketId: pusherClient.connection.socket_id });
    }, 10000);
    let heartbeatCheckInterval = setInterval(() => {
      if (isError) return;
      const signalDeltatime = performance.now() - lastSignalRef.current;
      if (signalDeltatime > 27000) {
        addToastMessage({ text: "opponent disonected from the game", type: "error" });
      } else if (signalDeltatime > 13000) {
        opponentNetworkWarning = true;
        addToastMessage({ text: "opponent has encountered network errors, trying to reconnect", type: "error" });
      }
    }, 5000);
    const heartbeatHandler = () => {
      lastSignalRef.current = performance.now();
      if (opponentNetworkWarning) {
        addToastMessage({ text: "Opponent reconnected successfully", type: "success" });
        opponentNetworkWarning = false;
      }
    };

    const channelName = toPusherKey(`presence-room:${roomId}`);
    const channel = pusherClient.channel(channelName) ?? pusherClient.subscribe(channelName);
    channel.bind("heartbeat", heartbeatHandler);

    return () => {
      clearInterval(heartbeatSendInterval);
      clearInterval(heartbeatCheckInterval);
      channel.unbind("heartbeat", heartbeatHandler);
    };
  }, [isGameStarted]);
}

function heartbeatMutaiton(data: postRequestType, roomId: UUID) {
  return axios.post(`/api/room/${roomId}/heartbeat`, data);
}
