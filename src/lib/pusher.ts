import PusherServer from "pusher";
import PusherClient from "pusher-js";
import usePersistedStore from "@/store/usePersistedStore";

const globalPusher = globalThis as unknown as {
  pusherClient: PusherClient | null;
  pusherServer: PusherServer | null;
};

const pusherServer =
  globalPusher.pusherServer ??
  new PusherServer({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
    secret: process.env.PUSHER_SECRET!,
    cluster: "eu",
  });

const pusherClient =
  globalPusher.pusherClient ??
  new PusherClient(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
    cluster: "eu",
    channelAuthorization: {
      endpoint: "/api/channel/auth",
      transport: "ajax",
      params: {
        username: usePersistedStore.getState().playerName,
      },
    },
  });

if (process.env.NODE_ENV !== "production") {
  globalPusher.pusherClient = pusherClient;
  globalPusher.pusherServer = pusherServer;
}

export { pusherClient, pusherServer };
