import { postRequestType } from "@/utils/validators/room/message/validator";
import axios from "axios";
import { useParams } from "next/navigation";
import { useMutation } from "react-query";

export default function useSendMessageMutaion() {
  const { roomId } = useParams() as { roomId: string };
  return useMutation((variables: postRequestType) => sendMessageMutaion(variables, roomId));
}

async function sendMessageMutaion(data: postRequestType, roomId: string) {
  return axios.post(`/api/room/${roomId}/message`, data);
}
