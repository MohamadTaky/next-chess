import { postRequestType } from "@/utils/validators/room/promote/validator";
import axios from "axios";
import { useParams } from "next/navigation";
import { useMutation } from "react-query";

export default function usePromotionMutation() {
  const { roomId } = useParams() as { roomId: string };
  return useMutation((variables: postRequestType) => moveMutation(variables, roomId));
}

function moveMutation(data: postRequestType, roomId: string) {
  return axios.post(`/api/room/${roomId}/promote`, data);
}
