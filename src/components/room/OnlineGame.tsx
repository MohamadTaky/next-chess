"use client";

import Chat from "@/components/room/Chat";
import OnlineBoard from "@/components/room/OnlineBoard";
import OnlineEndGameMenu from "@/components/room/OnlineEndGameMenu";
import OnlinePromotionMenu from "@/components/room/OnlinePromotionMenu";
import RoomInfo from "@/components/room/RoomInfo";
import useHeartbeatMutation from "@/hooks/room/useHeartbeatMutation";
import usePusherEffects from "@/hooks/room/usePusherEffects";
import useStore from "@/store/useStore";
import parseStore from "@/utils/parseStore";
import { useEffect } from "react";

type OnlineGameProps = {
  storeString: string;
};

export default function OnlineGame({ storeString }: OnlineGameProps) {
  // useHeartbeatMutation();
  const { isLoading, isGameStarted } = usePusherEffects();
  useEffect(() => {
    const store = parseStore(storeString);
    useStore.setState({ ...store });
  }, []);

  return isLoading ? (
    <>Loading</>
  ) : isGameStarted ? (
    <section className="grid h-full gap-4 md:grid-cols-[minmax(auto,24rem)_1fr] lg:grid-cols-[minmax(auto,28rem)_1fr]">
      <Chat />
      <div className="space-y-2">
        <OnlineBoard />
        <OnlinePromotionMenu />
        <OnlineEndGameMenu />
      </div>
    </section>
  ) : (
    <RoomInfo />
  );
}
