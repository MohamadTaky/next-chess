import Button from "@/components/Button";
import Card from "@/components/Card";
import { CopyIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
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
    timeoutRef.current = setTimeout(() => setHasCopied(false), 1000);
  };

  return (
    <Card
      asChild
      className="absolute left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 space-y-4 text-center text-lg"
    >
      <section>
        <p>Created a new room with the id</p>
        <div className="flex items-center gap-2">
          <Button className="peer p-2" onClick={handleCopy} variant="outline">
            <AnimatePresence>
              {hasCopied && (
                <motion.div
                  key="tooltip"
                  transition={{ ease: "easeInOut" }}
                  initial={{ translateY: 10, translateX: "-50%", opacity: 0.2 }}
                  animate={{ translateY: 0, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="pointer-events-none absolute bottom-full left-1/2 mb-2 rounded-sm bg-black/90 px-1.5 py-1 text-sm text-white"
                >
                  copied
                </motion.div>
              )}
            </AnimatePresence>
            <CopyIcon size={18} />
          </Button>
          <span className="transition-opacity peer-hover:opacity-70">{roomId}</span>
        </div>
        <p>waiting for other player to join</p>
      </section>
    </Card>
  );
}
