"use client";

import useStore from "@/store/useStore";
import { AnimatePresence, motion } from "framer-motion";

export default function OnlineEndGameMenu() {
  const endGameStatus = useStore((store) => store.endGameStatus);
  return (
    <AnimatePresence>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        {endGameStatus === "draw" ? "draw" : `${endGameStatus} player won`}
      </motion.p>
    </AnimatePresence>
  );
}
