"use client";

import { Slot } from "@radix-ui/react-slot";
import { ReactNode } from "react";
import useClientStore from "@/store/useClientStore";

export default function ThemeContainer({ children }: { children: ReactNode }) {
  const isDarkMode = useClientStore((store) => store.isDarkMode);
  return <Slot className={isDarkMode ? "dark" : ""}>{children}</Slot>;
}
