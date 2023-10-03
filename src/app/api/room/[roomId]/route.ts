import { pusherServer } from "@/lib/pusher";
import redis from "@/lib/redis";
import { toPusherKey } from "@/utils/pusher";
import { putRequestValidator } from "@/utils/validators/room/[roomId]/validator";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params: { roomId } }: { params: { roomId: string } }) {
  const body = await req.json();
  const { storeString, socketId } = putRequestValidator.parse(body);
  try {
    await Promise.all([
      redis.json.set(`room:${roomId}`, "$.storeString", storeString),
      pusherServer.trigger(toPusherKey(`presence-room:${roomId}`), "change", { storeString }, { socket_id: socketId }),
    ]);
    return new Response("OK");
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
