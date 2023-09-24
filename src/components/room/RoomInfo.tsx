import Button from "@/components/shared/Button";
import Card from "@/components/shared/Card";
import { CopyIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function RoomInfo() {
  const { roomId } = useParams() as { roomId: string };
  const [hasCopied, setHasCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);
  const handleCopy = () => {
    navigator.clipboard.writeText(roomId);
    setHasCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setHasCopied(false), 5000);
  };

  return (
    <Card asChild className="mx-auto w-full max-w-md space-y-4 text-center">
      <section>
        <p>Created a new room with the id</p>
        <div className="flex flex-col-reverse gap-4">
          <Button
            className="peer mx-auto flex items-center gap-4"
            onClick={handleCopy}
            variant="outline"
            shape="squared"
          >
            {hasCopied ? "Copied !" : "Copy"}
            <CopyIcon size="18" />
          </Button>
          <p className="mx-auto transition-opacity peer-hover:opacity-75">{roomId}</p>
        </div>
        <p>waiting for other player to join</p>
      </section>
    </Card>
  );
}
