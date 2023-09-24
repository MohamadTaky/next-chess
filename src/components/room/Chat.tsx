"use client";

import Card from "@/components/shared/Card";
import useStore from "@/store/useStore";
import { User2Icon } from "lucide-react";
import MessageForm from "./MessageForm";
import MessagesList from "./MessagesList";

export default function Chat() {
  const opponentInfo = useStore((store) => store.opponentInfo);
  return (
    <Card className="flex h-screen flex-col max-md:order-last md:h-auto">
      <div className="mb-4 flex items-center gap-2">
        <User2Icon className="box-content rounded-full bg-fill-1 fill-primary stroke-none p-2" size="38" />
        <p className="text-lg font-semibold">{opponentInfo?.info.username}</p>
      </div>
      <MessagesList />
      <MessageForm />
    </Card>
  );
}
