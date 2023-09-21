"use client"

import useStore from "@/store/useStore";
import PromotionMenu from "../shared/PromotionMenu";
import { Piece } from "@/store/slice/game/types";

export default function LocalPromotionMenu() {
  const promote = useStore((store) => store.promote);
  const promotionTile = useStore((store) => store.promotionTile);
  const selectedTile = useStore((store) => store.selectedTile);
  const isWhiteTurn = useStore((store) => store.isWhiteTurn);

  const promotionHandler = (piece: Piece) =>
    promote(
      (piece * (isWhiteTurn ? 1 : -1)) as Piece,
      selectedTile!.row,
      selectedTile!.col,
      promotionTile!.row,
      promotionTile!.col,
    );

  return <PromotionMenu handlePromotion={promotionHandler} />;
}
