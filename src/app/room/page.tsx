"use client";

import PlayerInfo from "@/components/room/PlayerInfo";
import Button from "@/components/shared/Button";
import Card from "@/components/shared/Card";
import Input from "@/components/shared/Input";
import Seperator from "@/components/shared/Seperator";
import useJoinRoomMutation from "@/hooks/room/useJoinRoomMutation";
import { FormEvent, useState } from "react";

export default function RoomsPage() {
  const [roomId, setRoomId] = useState("");

  const { mutate, isLoading } = useJoinRoomMutation();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submitEvent = e.nativeEvent as SubmitEvent;
    const submitButton = submitEvent.submitter as HTMLButtonElement;
    mutate(submitButton.value === "join" ? roomId : crypto.randomUUID());
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card
        asChild
        className="relative z-10 mx-auto w-full max-w-md space-y-4 disabled:cursor-not-allowed disabled:opacity-20"
      >
        <fieldset disabled={isLoading}>
          <PlayerInfo />
          <Button type="submit" value="create" className="w-full">
            Create room
          </Button>
          <Seperator>or</Seperator>
          <Input placeholder="Enter room id" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
          <Button disabled={!roomId} type="submit" value="join" className="w-full">
            Join room
          </Button>
        </fieldset>
      </Card>
    </form>
  );
}
