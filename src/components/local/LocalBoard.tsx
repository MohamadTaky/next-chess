"use client";

import Board from "@/components/shared/board/Board";
import useStore from "@/store/useStore";
import { getPositionString, isWhite } from "@/utils/helpers";
import { useEffect } from "react";

export default function LocalBoard() {
  const board = useStore((store) => store.board);
  const validMoves = useStore((store) => store.validMoves);
  const validAttacks = useStore((store) => store.validAttacks);
  const validPromotions = useStore((store) => store.validPromotions);
  const specialMoves = useStore((store) => store.specialMoves);
  const selectedTile = useStore((store) => store.selectedTile);
  const isWhiteTurn = useStore((store) => store.isWhiteTurn);
  const setSelectedTile = useStore((store) => store.setSelectedTile);
  const setPromotionTile = useStore((store) => store.setPromotionTile);
  const move = useStore((store) => store.move);
  const initGameSlice = useStore((store) => store.initGameSlice);
  useEffect(initGameSlice, []);

  const clickHandler = (row: number, col: number) => {
    if (selectedTile && isWhiteTurn === isWhite(board, selectedTile.row, selectedTile.col)) {
      const seelctedTilePosition = getPositionString(selectedTile.row, selectedTile.col);
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
        return;
      }
    }
    setSelectedTile({ row, col });
    setPromotionTile(null);
  };

  return <Board tileClickhandler={clickHandler} />;
}
