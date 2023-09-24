import { ReactNode } from "react";

type SeperatorProps = {
  children: ReactNode;
};

export default function Seperator({ children }: SeperatorProps) {
  return (
    <div className="relative isolate">
      <span className="absolute top-1/2 h-0.5 w-full -translate-y-1/2 bg-black/80" />
      <div className="relative mx-auto grid aspect-square w-10 place-items-center bg-fill-2">{children}</div>
    </div>
  );
}
