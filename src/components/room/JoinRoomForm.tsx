"use client";

import Button from "@/components/shared/Button";
import { FormEvent, useState } from "react";
import useJoinRoomMutation from "../../hooks/room/useJoinRoomMutation";

export default function JoinRoomForm() {
  const [roomId, setRoomId] = useState("");
  const { mutate, isLoading } = useJoinRoomMutation();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(roomId);
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        placeholder="enter room id"
        className="w-full rounded-md bg-fill-1 text-primary placeholder:text-primary/50"
        required
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        type="text"
      />
      <Button isLoading={isLoading} disabled={!roomId || isLoading} className="w-full">
        Join room
      </Button>
    </form>
  );
}
