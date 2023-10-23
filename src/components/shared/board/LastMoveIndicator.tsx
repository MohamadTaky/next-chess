import useStore from "@/store/useStore";
import { getPositionObject } from "@/utils/helpers";

export default function LastMoveIndicator() {
  const moveHistory = useStore((store) => store.moveHistory);
  const lastMove = moveHistory.at(-1);
  if (!lastMove) return <></>;
  const [fromRow, fromCol] = getPositionObject(lastMove.from);
  const [toRow, toCol] = getPositionObject(lastMove.to);
  const dash = 8;
  return (
    <>
      <rect
        x={`${fromCol * 12.5}%`}
        y={`${fromRow * 12.5}%`}
        width="12.5%"
        height="12.5%"
        strokeDasharray={`${dash}% ${12.5 - dash}%`}
        strokeDashoffset={`${dash / 2}%`}
        className="pointer-events-none fill-transparent stroke-indigo-500 stroke-[3px]"
      />
      <rect
        x={`${toCol * 12.5}%`}
        y={`${toRow * 12.5}%`}
        width="12.5%"
        height="12.5%"
        strokeDasharray={`${dash}% ${12.5 - dash}%`}
        strokeDashoffset={`${dash / 2}%`}
        className="pointer-events-none fill-transparent stroke-indigo-500 stroke-[3px]"
      />
    </>
  );
}
