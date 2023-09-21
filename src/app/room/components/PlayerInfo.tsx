"use client";

import Button from "@/components/Button";
import useClientStore from "@/lib/zustand/useClientStore";
import usePersistedStore from "@/lib/zustand/usePersistedStore";
import { CheckIcon, PenIcon } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

export default function PlayerInfo() {
  const playerName = useClientStore((store) => store.playerName);
  const setPlayerName = usePersistedStore((store) => store.setPlayerName);
  const [isEditing, setIsEditing] = useState(false);
  const [input, setInput] = useState("");
  useEffect(() => setInput(playerName ?? ""), [playerName]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEditing) {
      if (input.trim()) {
        setIsEditing(false);
        setPlayerName(input);
      }
    } else setIsEditing(true);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      {isEditing ? (
        <input
          placeholder="Enter your name"
          className="w-full rounded-md border bg-fill-1 placeholder:text-primary/50"
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
        />
      ) : (
        <span className="w-full rounded-md border bg-fill-1 px-3 py-2">{input}</span>
      )}
      <Button disabled={input.trim().length < 3}>{isEditing ? <CheckIcon /> : <PenIcon />}</Button>
    </form>
  );
}
