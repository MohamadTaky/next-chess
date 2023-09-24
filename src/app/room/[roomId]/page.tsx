"use client";

import Chat from "@/components/room/Chat";
import OnlineBoard from "@/components/room/OnlineBoard";
import OnlineEndGameMenu from "@/components/room/OnlineEndGameMenu";
import OnlinePromotionMenu from "@/components/room/OnlinePromotionMenu";
import RoomInfo from "@/components/room/RoomInfo";
import useHeartbeatMutation from "@/hooks/room/useHeartbeatMutation";
import usePusherCallbacks from "@/hooks/room/usePusherCallbacks";
import useStore from "@/store/useStore";

export default function RoomPage() {
  const isGameStarted = useStore((store) => store.isGameStarted);

  usePusherCallbacks();
  useHeartbeatMutation();

  return isGameStarted ? (
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
