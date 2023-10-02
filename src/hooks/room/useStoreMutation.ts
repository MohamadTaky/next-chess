import useStore from "@/store/useStore";
import { putRequestType } from "@/utils/validators/room/[roomId]/validator";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useMutation } from "react-query";

export default function useStoreMutation() {
  const { roomId } = useParams();
  const { replace } = useRouter();
  const addToastMessage = useStore((store) => store.addToastMessage);
  return useMutation((variables: putRequestType) => storeMutation(variables, roomId), {
    retry: 3,
    onError: () => {
      addToastMessage({
        text: "An error occured while sending request to the server, redirecting back",
        type: "error",
      });
      setTimeout(() => replace("room"), 3000);
    },
  });
}

async function storeMutation(data: putRequestType, roomId: string) {
  return axios.put(`/api/room/${roomId}`, data);
}
