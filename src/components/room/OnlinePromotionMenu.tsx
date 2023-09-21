"use client";

import PromotionMenu from "@/components/shared/PromotionMenu";
import usePromotionMutation from "@/hooks/room/usePromotionMutation";
import { pusherClient } from "@/lib/pusher";
import { Piece } from "@/store/slice/game/types";
import useStore from "@/store/useStore";

export default function OnlinePromotionMenu() {
  const promote = useStore((store) => store.promote);
  const selectedTile = useStore((store) => store.selectedTile);
  const promotionTile = useStore((store) => store.promotionTile);
  const isWhiteTurn = useStore((store) => store.isWhiteTurn);
  const setIsPlayerTurn = useStore((store) => store.setIsPlayerTurn);
  const { mutate } = usePromotionMutation();

  const promotionHandler = (piece: Piece) => {
    promote(
      (piece * (isWhiteTurn ? 1 : -1)) as Piece,
      selectedTile!.row,
      selectedTile!.col,
      promotionTile!.row,
      promotionTile!.col,
    );
    mutate({
      promotedPiece: piece,
      fromRow: selectedTile!.row,
      fromCol: selectedTile!.col,
      toRow: promotionTile!.row,
      toCol: promotionTile!.col,
      socketId: pusherClient.connection.socket_id,
    });
    setIsPlayerTurn(false);
  };

  return <PromotionMenu handlePromotion={promotionHandler} />;
}
