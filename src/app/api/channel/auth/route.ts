import { pusherServer } from "@/lib/pusher";
import { NextRequest, NextResponse } from "next/server";
import querystring from "querystring";

export async function POST(req: NextRequest) {
  const data = await req.text();
  const { socket_id, channel_name } = querystring.parse(data) as {
    socket_id: string;
    channel_name: string;
  };

  const userId = req.cookies.get("userid")?.value as string;
  const username = req.cookies.get("username")?.value as string;

  const presenceData = {
    user_id: userId,
    user_info: { username },
  };

  const authResponse = pusherServer.authorizeChannel(socket_id, channel_name, presenceData);
  return NextResponse.json(authResponse);
}
