import Button from "@/components/shared/Button";
import { useRouter } from "next/navigation";

type JoinRoomButtonProps = {
  roomId: string;
};

export default function JoinRoomButton({ roomId }: JoinRoomButtonProps) {
  const { push } = useRouter();
  return (
    <Button onClick={() => push(`room/${roomId}`)} disabled={!roomId} className="w-full">
      Join room
    </Button>
  );
}
