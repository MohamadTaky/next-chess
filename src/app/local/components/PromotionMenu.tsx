import Button from "@/components/Button";
import useStore from "@/lib/zustand/useStore";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Piece } from "../slice/types";

export default function PromotionMenu() {
  const promote = useStore((store) => store.promote);
  const promotionTile = useStore((store) => store.promotionTile);
  const selectedTile = useStore((store) => store.selectedTile);
  const isWhiteTurn = useStore((store) => store.isWhiteTurn);
  const handleClick = (piece: Piece) =>
    promote(
      (piece * (isWhiteTurn ? 1 : -1)) as Piece,
      selectedTile!.row,
      selectedTile!.col,
      promotionTile!.row,
      promotionTile!.col,
    );

  const animationProps = {
    initial: { opacity: 0, translateY: 10 },
    animate: { opacity: 1, translateY: 0 },
    exit: { opacity: 0, translateY: 10 },
  };

  return (
    <div className="mx-auto flex w-fit gap-2">
      <AnimatePresence>
        {promotionTile && (
          <>
            <Button key="rook" asChild className="aspect-square w-[2.375rem] !p-0" onClick={() => handleClick(2)}>
              <motion.button {...animationProps} transition={{ delay: 0 }}>
                <Image fill src={isWhiteTurn ? "/rook-white.svg" : "/rook-black.svg"} alt="" />
              </motion.button>
            </Button>
            <Button asChild className="aspect-square w-[2.375rem] !p-0" onClick={() => handleClick(3)}>
              <motion.button key="knight" {...animationProps} transition={{ delay: 0.1 }}>
                <Image fill src={isWhiteTurn ? "/knight-white.svg" : "/knight-black.svg"} alt="" />
              </motion.button>
            </Button>
            <Button asChild className="aspect-square w-[2.375rem] !p-0" onClick={() => handleClick(4)}>
              <motion.button key="bishop" {...animationProps} transition={{ delay: 0.2 }}>
                <Image fill src={isWhiteTurn ? "/bishop-white.svg" : "/bishop-black.svg"} alt="" />
              </motion.button>
            </Button>
            <Button asChild className="aspect-square w-[2.375rem] !p-0" onClick={() => handleClick(5)}>
              <motion.button key="queen" {...animationProps} transition={{ delay: 0.3 }}>
                <Image fill src={isWhiteTurn ? "/queen-white.svg" : "/queen-black.svg"} alt="" />
              </motion.button>
            </Button>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
