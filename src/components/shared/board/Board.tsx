"use client";

import useStore from "@/store/useStore";
import Tile from "./Tile";
import cn from "@/utils/cn";

type BoardProps = {
  tileClickhandler: (row: number, col: number) => void;
  flipped?: boolean;
};

export default function Board({ tileClickhandler, flipped = false }: BoardProps) {
  const board = useStore((store) => store.board);
  const endgameStatus = useStore((store) => store.endGameStatus);

  return (
    <div className="relative m-auto aspect-square w-full max-w-[380px] overflow-hidden rounded-sm lg:max-w-[420px]">
      <svg
        className={cn(
          "h-full w-full stroke-black/80",
          endgameStatus === "none" ? "" : "pointer-events-none",
          flipped ? "rotate-180" : "",
        )}
      >
        {board.map((arr, row) =>
          arr.map((piece, col) => (
            <Tile
              key={`${row}${col}`}
              row={row}
              flipped={flipped}
              col={col}
              piece={piece}
              clickHandler={tileClickhandler}
            />
          )),
        )}
      </svg>
    </div>
  );
}
