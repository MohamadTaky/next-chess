"use client";
import cn from "@/utils/cn";
import useStore from "@/store/useStore";
import { AnimatePresence, motion } from "framer-motion";

export default function MessagesList() {
  const messages = useStore((store) => store.messages);

  return (
    <div className="relative flex-1">
      <ul className="scrollbar-rounded absolute inset-0 flex flex-col gap-2 overflow-auto scrollbar-thin scrollbar-thumb-fill-1">
        <AnimatePresence>
          {messages.map(({ text, recieved }, i) => (
            <motion.li
              initial={{ opacity: 0, translateY: 10 }}
              animate={{ opacity: 1, translateY: 0 }}
              key={i}
              className={cn(
                "w-fit max-w-full break-words rounded-sm px-2 py-1",
                recieved ? "self-end bg-fill-1" : "bg-green-500 dark:bg-green-600",
              )}
            >
              {text}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
