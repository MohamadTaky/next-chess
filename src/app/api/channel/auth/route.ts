import { pusherServer } from "@/lib/pusher";
import { NextRequest, NextResponse } from "next/server";
import querystring from "querystring";

export async function POST(req: NextRequest) {
  const data = await req.text();
  const { socket_id, channel_name, username } = querystring.parse(data) as {
    socket_id: string;
    channel_name: string;
    username: string;
  };

  const presenceData = {
    user_id: crypto.randomUUID(),
    user_info: { username },
  };

  const authResponse = pusherServer.authorizeChannel(socket_id, channel_name, presenceData);
  return NextResponse.json(authResponse);
}
