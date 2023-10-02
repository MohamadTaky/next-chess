import { pusherClient } from "@/lib/pusher";
import useStore from "@/store/useStore";
import {toPusherKey} from "@/utils/pusher";
import { postRequestType } from "@/utils/validators/room/heartbeat/validator";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useMutation } from "react-query";

export default function useHeartbeatMutation() {
  const { roomId } = useParams();
  const { replace } = useRouter();
  const retriesRef = useRef(0);
  const opponentNetworkWarningRef = useRef<NodeJS.Timeout>();
  const opponentNetworkErrorRef = useRef<NodeJS.Timeout>();
  const addToastMessage = useStore((store) => store.addToastMessage);
  const { mutate } = useMutation((variables: postRequestType) => heartbeatMutaiton(variables, roomId), {
    onSettled: (_data, error, _variables) => {
      if (error) {
        switch (retriesRef.current) {
          case 3:
            addToastMessage({ text: "Failed to reconnect, redirecting to room page", type: "error" });
            setTimeout(() => replace("/room"), 3000);
            break;
          case 0:
            addToastMessage({ text: "Network error occurred, trying to reconnect", type: "error" });
            clearTimeout(opponentNetworkWarningRef.current);
            clearTimeout(opponentNetworkErrorRef.current);
            break;
        }
        retriesRef.current++;
      } else if (retriesRef.current !== 0) {
        addToastMessage({ text: "Reconnected successfully, you can resume the session !", type: "success" });
        retriesRef.current = 0;
      }
    },
  });

  useEffect(() => {
    let opponentWarning = false;
    let heartbeatSendInterval = setInterval(() => {
      mutate({ socketId: pusherClient.connection.socket_id });
    }, 10000);

    const heartbeatHandler = () => {
      clearTimeout(opponentNetworkWarningRef.current);
      clearTimeout(opponentNetworkErrorRef.current);
      if (opponentWarning) {
        opponentWarning = false;
        addToastMessage({ text: "opponent reconnected successfully !", type: "success" });
      }
      opponentNetworkWarningRef.current = setTimeout(() => {
        addToastMessage({ text: "opponent has encountered network errors, trying to reconnect", type: "error" });
        opponentWarning = true;
      }, 13000);
      opponentNetworkErrorRef.current = setTimeout(() => {
        addToastMessage({ text: "opponent disonected from the game, redirecting to room page", type: "error" });
        setTimeout(() => replace("/room"), 3000);
      }, 33000);
    };

    const channelName = toPusherKey(`presence-room:${roomId}`);
    const channel = pusherClient.channel(channelName) ?? pusherClient.subscribe(channelName);
    channel.bind("heartbeat", heartbeatHandler);

    return () => {
      clearInterval(heartbeatSendInterval);
      clearTimeout(opponentNetworkWarningRef.current);
      clearTimeout(opponentNetworkErrorRef.current);
      channel.unbind("heartbeat", heartbeatHandler);
    };
  }, []);
}

function heartbeatMutaiton(data: postRequestType, roomId: string) {
  return axios.post(`/api/room/${roomId}/heartbeat`, data);
}
