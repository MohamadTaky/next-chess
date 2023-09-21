"use client";

import useStore from "@/store/useStore";
import EndGameMenu from "../shared/EndGameMenu";

export default function LocalEndGameMenu() {
  const initGameSlice = useStore((store) => store.initGameSlice);
  return <EndGameMenu handleEndGame={initGameSlice} />;
}
