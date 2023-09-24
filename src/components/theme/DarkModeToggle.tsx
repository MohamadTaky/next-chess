"use client";

import Button from "@/components/shared/Button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useState } from "react";

type DarkModeToggleProps = {
  darkMode: boolean;
};

export default function DarkModeToggle({ darkMode }: DarkModeToggleProps) {
  const [isDarkMode, setIsDarkMode] = useState(darkMode);
  const handleClick = () => {
    if (isDarkMode) {
      document.body.classList.remove("dark");
      document.cookie = "dark=; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    } else {
      document.body.classList.add("dark");
      document.cookie = `dark=1; expires=${new Date(Date.now() + 60 * 60 * 24 * 365 * 1000)}; path=/`;
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Button variant="outline" shape="squared" onClick={handleClick}>
      {isDarkMode ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
}
