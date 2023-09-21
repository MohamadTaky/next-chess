"use client";

import { Slot } from "@radix-ui/react-slot";
import { ReactNode } from "react";
import useClientStore from "../../../lib/zustand/useClientStore";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const isDarkMode = useClientStore((store) => store.isDarkMode);
  return <Slot className={isDarkMode ? "dark" : ""}>{children}</Slot>;
}
