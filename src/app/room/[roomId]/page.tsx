"use client";

import Board from "@/app/local/components/Board";
import { getPositionString, isWhite } from "@/app/local/lib/helpers";
import { pusherClient } from "@/lib/pusher";
import useStore from "@/lib/zustand/useStore";

import { Piece } from "@/app/local/slice/types";
import Button from "@/components/Button";
import Chat from "./components/ChatContainer";
import RoomInfo from "./components/RoomInfo";
import useMoveMutation from "./hooks/useMoveMutation";
import usePromotionMutation from "./hooks/usePromotionMutation";
import { usePusherCallbacks } from "./hooks/usePusherCallbacks";

export default function RoomPage() {
  const isGameStarted = useStore((store) => store.isGameStarted);
  const setIsGameStarted = useStore((store) => store.setIsGameStarted);
  const isPlayerTurn = useStore((store) => store.isPlayerTurn);
  const setIsPlayerTurn = useStore((store) => store.setIsPlayerTurn);
  const move = useStore((store) => store.move);
  const initGameSlice = useStore((store) => store.initGameSlice);
  const initRoomSlice = useStore((store) => store.initRoomSlice);

  const board = useStore((store) => store.board);
  const isWhiteTurn = useStore((store) => store.isWhiteTurn);
  const validMoves = useStore((store) => store.validMoves);
  const validAttacks = useStore((store) => store.validAttacks);
  const validPromotions = useStore((store) => store.validPromotions);
  const specialMoves = useStore((store) => store.specialMoves);
  const selectedTile = useStore((store) => store.selectedTile);
  const promotionTile = useStore((store) => store.promotionTile);
  const setSelectedTile = useStore((store) => store.setSelectedTile);
  const setPromotionTile = useStore((store) => store.setPromotionTile);
  const endGameStatus = useStore((store) => store.endGameStatus);
  const { mutate } = useMoveMutation();

  usePusherCallbacks();

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
    setSelectedTile({ row, col });
  };

  return isGameStarted ? (
    <section className="grid h-full gap-4 md:grid-cols-[minmax(auto,24rem)_1fr] lg:grid-cols-[minmax(auto,28rem)_1fr]">
      <Chat />
      <Board tileClickhandler={clickHandler} />
      {/* {promotionTile && <PromotionMenu />} */}
      {/* {endGameStatus !== "none" && <EndGameMenu />} */}
    </section>
  ) : (
    <RoomInfo />
  );
}

function PromotionMenu() {
  const promote = useStore((store) => store.promote);
  const selectedTile = useStore((store) => store.selectedTile);
  const promotionTile = useStore((store) => store.promotionTile);
  const { mutate } = usePromotionMutation();
  const isWhiteTurn = useStore((store) => store.isWhiteTurn);
  const handleClick = (piece: Piece) => {
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
  };
  return (
    <div className="fixed inset-0 grid place-items-center content-center gap-2 backdrop-blur-sm">
      <Button onClick={() => handleClick(2)}>rook</Button>
      <Button onClick={() => handleClick(3)}>knight</Button>
      <Button onClick={() => handleClick(4)}>bishop</Button>
      <Button onClick={() => handleClick(5)}>queen</Button>
    </div>
  );
}
