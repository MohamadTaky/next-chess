import { postRequestType } from "@/utils/validators/room/move/validator";
import axios from "axios";
import { useParams } from "next/navigation";
import { useMutation } from "react-query";

export default function useMoveMutation() {
  const { roomId } = useParams() as { roomId: string };
  return useMutation((variables: postRequestType) => moveMutation(variables, roomId));
}

async function moveMutation(data: postRequestType, roomId: string) {
  return axios.post(`/api/room/${roomId}/move`, data);
}
