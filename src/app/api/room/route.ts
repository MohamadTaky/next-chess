import redis from "@/lib/redis";
import { postRequestValidator } from "@/utils/validators/room/validator";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { storeString } = postRequestValidator.parse(body);
    const roomId = crypto.randomUUID();
    await redis.setex(`room:${roomId}`, 3600, { storeString });
    return NextResponse.json({ roomId }, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
