"use client";

import Button from "@/components/shared/Button";
import useToggle from "@/hooks/shared/useToggle";
import useClientStore from "@/store/useClientStore";
import usePersistedStore from "@/store/usePersistedStore";
import { CheckIcon, PenIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Input from "@/components/shared/Input";

export default function PlayerInfo() {
  const [isEditingName, toggleEditingName] = useToggle(false);
  const [playerName, setPlayerName] = useState("");
  const persistedName = useClientStore((store) => store.playerName);
  const setPersistedName = usePersistedStore((store) => store.setPlayerName);
  useEffect(() => setPlayerName(persistedName ?? ""), [persistedName]);

  const handleEditingToggle = () => {
    if (isEditingName) setPersistedName(playerName);
    toggleEditingName();
  };

  return (
    <div className="flex gap-4">
      <Input
        disabled={!isEditingName}
        placeholder="Enter your name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <Button disabled={playerName.trim().length < 3} shape="squared" onClick={handleEditingToggle}>
        {isEditingName ? <CheckIcon /> : <PenIcon />}
      </Button>
    </div>
  );
}
