import cn from "@/utils/cn";
import { cva } from "class-variance-authority";
import { PIECES } from "../../../utils/constants";
import { getVariant } from "../../../utils/helpers";
import { Piece } from "../../../store/slice/game/types";

const tileVariants = cva("cursor-pointer transition w-[12.5%] h-[12.5%]", {
  variants: {
    variant: {
      dark: "fill-yellow-800",
      light: "fill-brown-500",
      select: "fill-blue-500",
      move: "fill-green-500 hover:fill-green-600",
      attack: "fill-red-500 hover:fill-red-600",
      special: "fill-indigo-500 hover:fill-indigo-600",
      promotion: "fill-indigo-700 hover:fill-indigo-800",
      gray: "fill-gray-500",
      check: "fill-red-700",
    },
  },
});

type TileProps = {
  row: number;
  col: number;
  piece?: Piece | null;
  clickHandler: (row: number, col: number) => void;
};

export default function Tile({ row, col, piece, clickHandler }: TileProps) {
  return (
    <>
      <rect
        className={cn(tileVariants({ variant: getVariant(row, col) }))}
        x={`${col * 12.5}%`}
        y={`${row * 12.5}%`}
        onClick={() => clickHandler(row, col)}
      />
      {piece && (
        <image
          href={PIECES[piece as keyof typeof PIECES]}
          className="pointer-events-none z-50 h-[12.5%] w-[12.5%]"
          x={`${col * 12.5}%`}
          y={`${row * 12.5}%`}
        />
      )}
    </>
  );
}
