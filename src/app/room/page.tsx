import Card from "@/components/Card";
import JoinRoomForm from "./components/JoinRoomForm";
import PlayerInfo from "./components/PlayerInfo";
import CreateRoomButton from "./components/CreateRoomButton";

export default function RoomsPage() {
  return (
    <Card asChild className="absolute left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 space-y-4">
      <section>
        <PlayerInfo />
        <CreateRoomButton />
        <div className="relative isolate">
          <span className="absolute top-1/2 h-0.5 w-full -translate-y-1/2 bg-black/80" />
          <div className="relative mx-auto grid aspect-square w-10 place-items-center bg-fill-2">or</div>
        </div>
        <JoinRoomForm />
      </section>
    </Card>
  );
}
