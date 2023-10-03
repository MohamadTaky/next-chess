import redis from "@/lib/redis";
import { postRequestValidator } from "@/utils/validators/room/validator";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userid = cookies().get("userid")?.value as string;
    const { storeString } = postRequestValidator.parse(body);
    const roomId = crypto.randomUUID();
    const transaction = redis.multi();
    const key = `room:${roomId}`;
    transaction.json.set(key, "$", { storeString, players: [userid] });
    transaction.expire(key, 3600);
    await transaction.exec();
    return NextResponse.json({ roomId }, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
