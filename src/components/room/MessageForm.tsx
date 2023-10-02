import Button from "@/components/shared/Button";
import useStoreMutation from "@/hooks/room/useStoreMutation";
import { pusherClient } from "@/lib/pusher";
import useStore from "@/store/useStore";
import { getCookie } from "@/utils/cookies";
import stringifyStore from "@/utils/stringifyStore";
import { SendHorizonalIcon } from "lucide-react";
import { FormEvent, KeyboardEvent, useState } from "react";

export default function MessageForm() {
  const [input, setInput] = useState("");
  const addMessage = useStore((store) => store.addMessage);
  const { mutate } = useStoreMutation();

  const userId = getCookie("userid") as string;

  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addMessage({ text: input, senderId: userId });
    setTimeout(
      () => mutate({ storeString: stringifyStore(useStore.getState()), socketId: pusherClient.connection.socket_id }),
      0,
    );
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
    <form onSubmit={sendMessage} className="mt-auto flex items-center gap-2">
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
