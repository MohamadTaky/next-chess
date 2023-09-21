import Button from "@/components/Button";
import useStore from "@/lib/zustand/useStore";
import { AnimatePresence, motion } from "framer-motion";

export default function EndGameMenu() {
  const endGameStatus = useStore((store) => store.endGameStatus);
  const initGameSlice = useStore((store) => store.initGameSlice);
  return (
    <AnimatePresence>
      {endGameStatus !== "none" && (
        <motion.div
          key="end-game-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mx-auto w-fit space-y-2"
        >
          <p>{endGameStatus === "draw" ? "draw" : `${endGameStatus} player won`}</p>
          <Button className="mx-auto" onClick={initGameSlice}>
            play again
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
