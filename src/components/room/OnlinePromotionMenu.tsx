"use client";

import PromotionMenu from "@/components/shared/PromotionMenu";
import useStoreMutation from "@/hooks/room/useStoreMutation";
import { pusherClient } from "@/lib/pusher";
import { Piece } from "@/store/slice/game/types";
import useStore from "@/store/useStore";
import stringifyStore from "@/utils/stringifyStore";

export default function OnlinePromotionMenu() {
  const promote = useStore((store) => store.promote);
  const selectedTile = useStore((store) => store.selectedTile);
  const promotionTile = useStore((store) => store.promotionTile);
  const isWhiteTurn = useStore((store) => store.isWhiteTurn);
  const { mutate } = useStoreMutation();

  const promotionHandler = (piece: Piece) => {
    promote(
      (piece * (isWhiteTurn ? 1 : -1)) as Piece,
      selectedTile!.row,
      selectedTile!.col,
      promotionTile!.row,
      promotionTile!.col,
    );
    setTimeout(
      () => mutate({ storeString: stringifyStore(useStore.getState()), socketId: pusherClient.connection.socket_id }),
      0,
    );
  };

  return <PromotionMenu handlePromotion={promotionHandler} />;
}
