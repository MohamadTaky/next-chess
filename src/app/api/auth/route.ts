import { pusherServer } from "@/lib/pusher";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.text();
  const socketId = data.split("=")[1];

  const user = {
    id: "some_id",
    user_info: {
      name: "John Smith",
    },
    watchlist: ["another_id_1", "another_id_2"],
  };

  const authResponse = pusherServer.authenticateUser(socketId, user);
  return NextResponse.json(authResponse);
}
