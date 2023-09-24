"use client";

import Button from "@/components/shared/Button";
import useStore from "@/store/useStore";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

type PromotionMenuProps = {
  handlePromotion: (piece: 2 | 3 | 4 | 5) => void;
};

const animationProps = {
  initial: { opacity: 0, translateY: 10 },
  animate: { opacity: 1, translateY: 0 },
  exit: { opacity: 0, translateY: 10 },
};

export default function PromotionMenu({ handlePromotion }: PromotionMenuProps) {
  const promotionTile = useStore((store) => store.promotionTile);
  const isWhiteTurn = useStore((store) => store.isWhiteTurn);
  return (
    <div className="mx-auto flex min-h-[2.375rem] w-fit gap-2">
      <AnimatePresence>
        {promotionTile && (
          <>
            <Button key="rook" asChild className="aspect-square w-[2.375rem] !p-0" onClick={() => handlePromotion(2)}>
              <motion.button {...animationProps} transition={{ delay: 0 }}>
                <Image fill src={isWhiteTurn ? "/rook-white.svg" : "/rook-black.svg"} alt="" />
              </motion.button>
            </Button>
            <Button asChild className="aspect-square w-[2.375rem] !p-0" onClick={() => handlePromotion(3)}>
              <motion.button key="knight" {...animationProps} transition={{ delay: 0.1 }}>
                <Image fill src={isWhiteTurn ? "/knight-white.svg" : "/knight-black.svg"} alt="" />
              </motion.button>
            </Button>
            <Button asChild className="aspect-square w-[2.375rem] !p-0" onClick={() => handlePromotion(4)}>
              <motion.button key="bishop" {...animationProps} transition={{ delay: 0.2 }}>
                <Image fill src={isWhiteTurn ? "/bishop-white.svg" : "/bishop-black.svg"} alt="" />
              </motion.button>
            </Button>
            <Button asChild className="aspect-square w-[2.375rem] !p-0" onClick={() => handlePromotion(5)}>
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
