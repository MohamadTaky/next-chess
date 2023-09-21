"use client";

import Button from "@/components/shared/Button";
import usePersistedStore from "@/store/usePersistedStore";
import { MoonIcon, SunIcon } from "lucide-react";
import useClientStore from "@/store/useClientStore";

export default function DarkModeToggle() {
  const isDarkMode = useClientStore((store) => store.isDarkMode);
  const setIsDarkMode = usePersistedStore((store) => store.setIsDarkMode);

  return (
    <Button variant="outline" onClick={() => setIsDarkMode(!isDarkMode)}>
      {isDarkMode ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
}
