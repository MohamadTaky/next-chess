import Board from "@/components/shared/board/Board";
import useMoveMutation from "@/hooks/room/useMoveMutation";
import { pusherClient } from "@/lib/pusher";
import useStore from "@/store/useStore";
import { getPositionString, isWhite } from "@/utils/helpers";

export default function OnlineBoard() {
  const board = useStore((store) => store.board);
  const validMoves = useStore((store) => store.validMoves);
  const validAttacks = useStore((store) => store.validAttacks);
  const validPromotions = useStore((store) => store.validPromotions);
  const specialMoves = useStore((store) => store.specialMoves);
  const selectedTile = useStore((store) => store.selectedTile);
  const isWhiteTurn = useStore((store) => store.isWhiteTurn);
  const isPlayerTurn = useStore((store) => store.isPlayerTurn);
  const setSelectedTile = useStore((store) => store.setSelectedTile);
  const setPromotionTile = useStore((store) => store.setPromotionTile);
  const setIsPlayerTurn = useStore((store) => store.setIsPlayerTurn);
  const move = useStore((store) => store.move);
  const initGameSlice = useStore((store) => store.initGameSlice);
  const { mutate } = useMoveMutation();

  const clickHandler = (row: number, col: number) => {
    if (selectedTile && isWhiteTurn === isWhite(board, selectedTile.row, selectedTile.col)) {
      const seelctedTilePosition = getPositionString(selectedTile.row, selectedTile.col);

      if (isPlayerTurn) {
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
          move(selectedTile.row, selectedTile.col, row, col);
          mutate({
            fromRow: selectedTile.row,
            fromCol: selectedTile.col,
            toRow: row,
            toCol: col,
            socketId: pusherClient!.connection.socket_id,
          });
          setIsPlayerTurn(false);
          return;
        }
      }
    }
    setPromotionTile(null);
    setSelectedTile({ row, col });
  };
  return <Board tileClickhandler={clickHandler} />;
}
