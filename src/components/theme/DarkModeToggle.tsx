"use client";

import Button from "@/components/shared/Button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type DarkModeToggleProps = {
  isDarkMode: boolean;
};

export default function DarkModeToggle({ isDarkMode }: DarkModeToggleProps) {
  const { refresh } = useRouter();
  const handleClick = () => {
    document.cookie = `dark=${!isDarkMode}; expires=${new Date(Date.now() + 60 * 60 * 24 * 365 * 1000)}; path=/`;
    refresh();
  };

  return (
    <Button variant="outline" onClick={handleClick}>
      {isDarkMode ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
}
