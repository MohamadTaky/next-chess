import OnlineGame from "@/components/room/OnlineGame";
import redis from "@/lib/redis";
import { notFound } from "next/navigation";

export default async function RoomPage({ params: { roomId } }: { params: { roomId: string } }) {
  const room = (await redis.get(`room:${roomId}`)) as { storeString: string };
  if (!room) notFound();

  return <OnlineGame storeString={room.storeString} />;
}
