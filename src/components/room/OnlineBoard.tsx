import Board from "@/components/shared/board/Board";
import useStoreMutation from "@/hooks/room/useStoreMutation";
import { pusherClient } from "@/lib/pusher";
import useStore from "@/store/useStore";
import { getCookie } from "@/utils/cookies";
import { getPositionString, isWhite } from "@/utils/helpers";
import stringifyStore from "@/utils/stringifyStore";

export default function OnlineBoard() {
  const board = useStore((store) => store.board);
  const validMoves = useStore((store) => store.validMoves);
  const validAttacks = useStore((store) => store.validAttacks);
  const validPromotions = useStore((store) => store.validPromotions);
  const specialMoves = useStore((store) => store.specialMoves);
  const selectedTile = useStore((store) => store.selectedTile);
  const isWhiteTurn = useStore((store) => store.isWhiteTurn);
  const lastMovePlayerId = useStore((store) => store.lastMovePlayerId);
  const setlastMovePlayerId = useStore((store) => store.setlastMovePlayerId);
  const whitePlayerId = useStore((store) => store.whitePlayerId);
  const userId = getCookie("userid");
  const setSelectedTile = useStore((store) => store.setSelectedTile);
  const setPromotionTile = useStore((store) => store.setPromotionTile);
  const move = useStore((store) => store.move);
  const initGameSlice = useStore((store) => store.initGameSlice);

  const { mutate } = useStoreMutation();

  const clickHandler = (row: number, col: number) => {
    if (selectedTile && isWhiteTurn === isWhite(board, selectedTile.row, selectedTile.col)) {
      const seelctedTilePosition = getPositionString(selectedTile.row, selectedTile.col);

      if (lastMovePlayerId !== userId) {
        const promotions = validPromotions.get(seelctedTilePosition);
        if (promotions?.some((promotion) => promotion === getPositionString(row, col))) {
          setPromotionTile({ row, col });
          return;
        }
        const moves = validMoves.get(seelctedTilePosition);
        const attacks = validAttacks.get(seelctedTilePosition);
        const specials = specialMoves.get(seelctedTilePosition);
        if (
          moves?.some((move) => move === getPositionString(row, col)) ||
          attacks?.some((attack) => attack === getPositionString(row, col)) ||
          specials?.some((attack) => attack === getPositionString(row, col))
        ) {
          const userId = getCookie("userid") as string;
          move(selectedTile.row, selectedTile.col, row, col);
          setlastMovePlayerId(userId);
          setTimeout(() => {
            mutate({ storeString: stringifyStore(useStore.getState()), socketId: pusherClient.connection.socket_id });
          }, 0);
          return;
        }
      }
    }
    setPromotionTile(null);
    setSelectedTile({ row, col });
  };
  return <Board tileClickhandler={clickHandler} flipped={userId !== whitePlayerId} />;
}
