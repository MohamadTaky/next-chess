import Button from "@/components/shared/Button";
import useStore from "@/store/useStore";
import { SendHorizonalIcon } from "lucide-react";
import { FormEvent, KeyboardEvent, useState } from "react";
import useSendMessageMutaion from "@/hooks/room/useSendMessageMutation";
import { pusherClient } from "@/lib/pusher";

export default function MessageForm() {
  const [input, setInput] = useState("");
  const addMessage = useStore((store) => store.addMessage);
  const { mutate } = useSendMessageMutaion();

  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addMessage({ text: input, recieved: false });
    mutate({ message: input, socketId: pusherClient.connection.socket_id });
    setInput("");
  };

  const enterSubmit = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = "";
    e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
    if (e.key === "Enter" && e.shiftKey === false) {
      e.preventDefault();
      if (input.trim()) e.currentTarget.form?.requestSubmit();
    }
  };
  return (
    <form onSubmit={sendMessage} className="mt-auto flex items-center gap-2 p-2">
      <textarea
        onChange={(e) => setInput(e.target.value)}
        onKeyUp={enterSubmit}
        onKeyDown={enterSubmit}
        value={input}
        dir="auto"
        rows={1}
        className="w-full resize-none rounded-sm border-fill-1 bg-transparent scrollbar-none"
        placeholder="Type a message"
      />
      <Button variant="ghost" disabled={!input} type="submit">
        <SendHorizonalIcon size="32" strokeWidth="1" />
      </Button>
    </form>
  );
}
