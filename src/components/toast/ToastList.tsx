"use client";

import { AnimatePresence } from "framer-motion";
import ToastItem from "./ToastItem";
import useStore from "@/store/useStore";

export default function ToastList() {
  const toastMessages = useStore((store) => store.toastMessages);
  return (
    <ul className="fixed right-0 top-16 z-50 w-full max-w-xs space-y-2 overflow-hidden px-2">
      <AnimatePresence>
        {toastMessages.map((message) => (
          <ToastItem {...message} />
        ))}
      </AnimatePresence>
    </ul>
  );
}
