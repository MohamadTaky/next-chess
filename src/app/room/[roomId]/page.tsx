import OnlineGame from "@/components/room/OnlineGame";
import redis from "@/lib/redis";
import { cookies } from "next/headers";

export default async function RoomPage({ params: { roomId } }: { params: { roomId: string } }) {
  const key = `room:${roomId}`;
  const room = (await redis.json.get(key)) as { storeString: string; players: string[] };

  if (!room) throw Error(`Room with id: ${roomId} does not exist`);

  const userId = cookies().get("userid")?.value as string;
  if (!room.players.includes(userId)) {
    if (room.players.length < 2) {
      await redis.json.arrappend(key, "$.players", `"${userId}"`);
    } else throw Error(`Room with id: ${roomId} is already full`);
  }

  return <OnlineGame storeString={room.storeString} />;
}
