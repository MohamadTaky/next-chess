"use client";

import Button from "@/components/shared/Button";
import useToggle from "@/hooks/shared/useToggle";
import { CheckIcon, PenIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Input from "@/components/shared/Input";
import { getCookie, setCookie } from "@/utils/cookies";

export default function PlayerInfo() {
  const [isEditingName, toggleEditingName] = useToggle(false);
  const [playerName, setPlayerName] = useState("");
  useEffect(() => setPlayerName(getCookie("username") ?? ""), []);

  const handleEditingToggle = () => {
    if (isEditingName)
      setCookie(`username=${playerName}; expires=${new Date(Date.now() + 60 * 60 * 24 * 365 * 1000)}; path=/`);
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
