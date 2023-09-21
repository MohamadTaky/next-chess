"use client";

import Button from "@/components/Button";
import useJoinRoomMutation from "../hooks/useJoinRoomMutation";

export default function CreateRoomButton() {
  const { mutate, isLoading } = useJoinRoomMutation();
  return (
    <Button isLoading={isLoading} disabled={isLoading} onClick={() => mutate(crypto.randomUUID())} className="w-full">
      Create room
    </Button>
  );
}
